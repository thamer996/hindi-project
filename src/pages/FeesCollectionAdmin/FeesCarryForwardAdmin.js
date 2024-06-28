import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import DataTable from "react-data-table-component"
import { createClient } from "@supabase/supabase-js"

import {
  Table,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Button,
  ModalBody,
  Modal,
  Label,
  Input,
  FormFeedback,
  Form,
} from "reactstrap"

import { connect } from "react-redux"
import { v4 as uuidv4 } from "uuid"

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useFormik } from "formik"
import * as Yup from "yup"
import moment from "moment"

const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)

const FeesCarryForward = props => {
  document.title =
    "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard"

  const breadcrumbItems = [
    { title: "Smart school", link: "#" },
    { title: "Library", link: "#" },
  ]

  const [Student, setStudent] = useState([])
  const [clas, setClas] = useState([])
  const [sections, setSections] = useState([])

  const [Class, setClass] = useState("")
  const [Sect, setSect] = useState("")

  const [show, setshow] = useState(false)
  const [type, settype] = useState("new")
  const [search, setSearch] = useState("")
  const [balance, setbalance] = useState(0)
  const [row, setrow] = useState(0)

  async function getCountries() {
    const { data, error } = await supabase.from("Student").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    const { data: FeesCarryForwarddata, error: FeesCarryForwarderror } =
      await supabase.from("FeesCarryForward").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)

    setStudent(
      data.map(el => ({
        ...el,
        balance:
          FeesCarryForwarddata?.find(elm => elm.ref === String(el.id))
            ?.balance ?? "0",
      })) ?? [],
    )
  }

  async function getClass() {
    const { data, error } = await supabase.from("Class").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    setClas(data ?? [])
  }

  const navigate = useNavigate()

  useEffect(() => {
    props.setBreadcrumbItems("Student", breadcrumbItems)
    getCountries()
    getClass()
    // getSections()
  }, [])

  const handleSearch = async () => {
    const { data, error } = await supabase
      .from("Student")
      .select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
      .ilike("class", `%${Class}%`)
      .ilike("section", `%${Sect}%`)

    const { data: FeesCarryForwarddata, error: FeesCarryForwarderror } =
      await supabase.from("FeesCarryForward").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)

    setStudent(
      data.map(el => ({
        ...el,
        balance:
          FeesCarryForwarddata?.find(elm => elm.ref === String(el.id))
            .balance ?? "0",
      })) ?? [],
    )
  }

  const handelDelete = async () => {
    if (row?.balance !== "0") {
      const { error } = await supabase
        .from("FeesCarryForward")
        .update({
          balance: balance,
        })
        .eq("ref", row?.id)

      if (error) {
        toast.error("FeesCarryForward Failed", { autoClose: 2000 })
      } else {
        toast.success("FeesCarryForward Deleted", { autoClose: 2000 })
        getCountries()
        setshow(false)
      }
    } else {
      const uuidv4Val = uuidv4()
      const { error } = await supabase.from("FeesCarryForward").insert({
        ref: row?.id,
        type: "student",
        balance: balance,
      })

      if (error) {
        toast.error("FeesCarryForward Failed", { autoClose: 2000 })
      } else {
        toast.success("FeesCarryForward Affected", { autoClose: 2000 })
        getCountries()
        setshow(false)
      }
    }
  }

  const iconStyle = {
    cursor: "pointer",
    display: "inline-block",
    marginRight: "10px",
    fontSize: "24px",
    color: "blue", // Change color as needed
  }

  const actionIconStyle = {
    ...iconStyle, // Inherit styles from iconStyle
    color: "black", // Example: Change color for delete icon
  }
  const editIconStyle = {
    ...iconStyle,
    color: "black", // Color for edit icon (black)
  }

  const columns = [
    {
      name: "student admissionNo",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.admissionNo,
    },
    {
      name: "student Name",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => `${row?.firstName} ${row?.lastName}`,
    },
    {
      name: "fatherName",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.fatherName ?? "None",
    },
    {
      name: "dateOfBirth",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.dateOfBirth ?? "None",
    },
    {
      name: "Class (section)",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => `${row?.class} (${row?.section})`,
    },

    {
      name: "Balance($)",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.balance,
    },

    {
      name: "Action",
      //allowOverflow: true,
      reorder: true,
      center: true,
      minWidth: "250px",

      cell: row => {
        return (
          <div className="d-flex">
            <>
              <span
                style={actionIconStyle}
                onClick={() => {
                  setshow(!show)
                  setbalance(row?.balance)
                  setrow(row)
                }}
              >
                <i className="ti-plus"></i>
              </span>
            </>
          </div>
        )
      },
    },
  ]

  return (
    <React.Fragment>
      <Row>
        <div className="d-flex mb-2">
          <div></div>
          {/* Vos éléments de filtre ici */}
          <label className="col-form-label">Class</label>&nbsp;
          <div className="col-md-2 me-1">
            <select
              onChange={val => {
                setClass(val.target.value)
                setSections(
                  clas.find(el => el.className === val.target.value)?.sections,
                )
              }}
              value={Class}
              className="form-control"
            >
              <option> Select </option>
              {clas?.map(el => (
                <option value={el.className}>{el.className}</option>
              ))}
            </select> 
          </div>
          <label className="col-form-label">Section</label>&nbsp;
          <div className="col-md-2 me-1">
            <select
              onChange={val => {
                setSect(val.target.value)
              }}
              value={Sect}
              className="form-control"
            >
              <option> Select </option>
              {sections?.map(el => (
                <option value={el}>{el}</option>
              ))}
            </select> 
          </div>
          <div>
            <button
              className="btn btn-primary ms-2"
              onClick={() => {
                handleSearch()
              }}
            >
              Search
            </button>
          </div>
          <div>
            <button
              className="btn btn-danger ms-2"
              onClick={() => {
                setSearch("")
                getCountries()
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </Row>
      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <CardTitle className="h4">Student List </CardTitle>
              <div className="table-responsive">
                <DataTable
                  noHeader
                  pagination
                  subHeader
                  selectableRowsHighlight={true}
                  highlightOnHover={true}
                  //   paginationServer
                  columns={columns}
                  //paginationPerPage={7}
                  className="react-dataTable"
                  paginationDefaultPage={1}
                  data={Student}
                />
              </div>
            </CardBody>
          </Card>
        </Col>

        <Modal isOpen={show} toggle={() => setshow(!show)} centered={true}>
          <ModalBody className="py-3 px-5">
            <div className="mb-3">
              <Label htmlFor="useremail">Balance</Label>
              <input
                className="form-control"
                type="number"
                value={balance}
                onChange={e => setbalance(e.target.value)}
                placeholder="update balance"
              ></input>
            </div>

            <Button onClick={() => handelDelete()}>Save</Button>
          </ModalBody>
        </Modal>
      </Row>

      <ToastContainer />
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(FeesCarryForward)
