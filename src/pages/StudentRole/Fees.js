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
  Badge,
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
import { sumBy } from "lodash"

const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)

const Fees = props => {
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
  const [FeesGroupval, setFeesGroupval] = useState("")
  const [FeesGroup, setFeesGroup] = useState([])
  const [row, setrow] = useState([])
  const [user, setuser] = useState("")

  async function getRoutes() {
    const { data, error } = await supabase
      .from("FeesGroup")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
    setFeesGroup(data ?? [])
  }

  async function getCountries() {
    const authUser = JSON.parse(localStorage.getItem("authUser") ?? "{}")
    const refUser = localStorage.getItem("StudentId") ?? ""
    const { data, error } = await supabase
      .from("Student")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
      .eq("id", refUser)
      .single()
    const { data: FeesCarryForwarddata, error: FeesCarryForwarderror } =
      await supabase
        .from("FeesCarryForward")
        .select("*")
        .eq("brancheId", localStorage.getItem("BranchId") ?? 1)

    const { data: DueFeesData, error: DueFeeserror } = await supabase
      .from("DueFees")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)

    console.log(
      "eeeeeeeeeee",
      DueFeesData?.filter(elm => elm?.user === String(15))[0]?.FeesGroup,
    )


    setStudent(
      [data].map(el => ({
        ...el,
        balance:
          FeesCarryForwarddata?.find(elm => elm.ref === String(el.id))
            ?.balance ?? "0",

        Fees: DueFeesData?.filter(elm => elm.user === String(el.id)) ?? "0",
      })) ?? [],
    )
  }

  async function getClass() {
    const { data, error } = await supabase
      .from("Class")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
    setClas(data ?? [])
  }

  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
      props.setBreadcrumbItems("Student", breadcrumbItems)
      await getCountries()
      await getClass()
      await getRoutes()
      // getSections()
    })()
  }, [])

  console.log("eeeeeeeeeeeeeeeeeeeeeee", Student)

  const handelDelete = async () => {
    const { data, error } = await supabase
      .from("DueFees")
      .insert([
        {
          FeesGroup: FeesGroupval,
          amount: balance,
          date: moment().format("YYYY-MM-DD"),
          user: user,
          status: "pending",
        },
      ])
      .select()

    if (error) {
      toast.error("DueFees Inserted Failed", { autoClose: 2000 })
    } else {
      toast.success("DueFees Inserted", { autoClose: 2000 })
      getCountries()
    }

    const { data: DueFeesData, error: DueFeeserror } = await supabase
      .from("DueFees")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
      .eq("user", user)

    setrow(DueFeesData ?? [])
    setuser(user)
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
    color: "red", // Color for edit icon (black)
  }

  const handelsetData = async row => {
    const { data: DueFeesData, error: DueFeeserror } = await supabase
      .from("DueFees")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
      .eq("user", row.id)

    setrow(DueFeesData ?? [])
    setuser(row.id)
    setshow(true)
  }

  const columns = [
    {
      name: "Admission No",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.admissionNo,
    },
    {
      name: "Student Name",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => `${row?.firstName} ${row?.lastName}`,
    },
    {
      name: "Father Name",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.fatherName ?? "None",
    },
    {
      name: "Date Of Birth",
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
      name: "Balance ($)",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.balance ?? "NA",
    },

    {
      name: "FeesGroup",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.Fees.map(el => ` ${el?.FeesGroup} | `) ?? "NA",
    },

    {
      name: "Amount Fees",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row =>
        `${sumBy(row?.Fees, function (o) {
          return Number(o?.amount)
        })} $` ?? "NA",
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
                  handelsetData(row)
                }}
              >
                <i className="ti-eye"></i>
              </span>
            </>
          </div>
        )
      },
    },
  ]

  const handelpay = async row => {
    const { data, error } = await supabase
      .from("DueFees")
      .update([
        {
          date: moment().format("YYYY-MM-DD"),
          status: "payed",
        },
      ])
      .eq("id", row.id)
      .select()

    if (error) {
      toast.error("DueFees Inserted Failed", { autoClose: 2000 })
    } else {
      toast.success("DueFees Payed", { autoClose: 2000 })
      getCountries()
    }

    const { data: DueFeesData, error: DueFeeserror } = await supabase
      .from("DueFees")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
      .eq("user", user)

    setrow(DueFeesData ?? [])
  }

  const handelunpay = async row => {
    const { data, error } = await supabase
      .from("DueFees")
      .update([
        {
          date: moment().format("YYYY-MM-DD"),
          status: "not Payed",
        },
      ])
      .eq("id", row.id)
      .select()

    if (error) {
      toast.error("DueFees Inserted Failed", { autoClose: 2000 })
    } else {
      toast.success("DueFees Payed", { autoClose: 2000 })
      getCountries()
    }

    const { data: DueFeesData, error: DueFeeserror } = await supabase
      .from("DueFees")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
      .eq("user", user)

    setrow(DueFeesData ?? [])
  }

  const handelRemove = async row => {
    const { data, error } = await supabase
      .from("DueFees")
      .delete()
      .eq("id", row.id)
      .select()

    if (error) {
      toast.error("DueFees delete Failed", { autoClose: 2000 })
    } else {
      toast.success("DueFees deleted", { autoClose: 2000 })
      getCountries()
    }

    const { data: DueFeesData, error: DueFeeserror } = await supabase
      .from("DueFees")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
      .eq("user", user)

    setrow(DueFeesData ?? [])
  }

  const columns2 = [
    {
      name: "FeesGroup",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.FeesGroup ?? "None",
    },
    {
      name: "Amount",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.amount + "$" ?? "None",
    },
    {
      name: "Date",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.date ?? "None",
    },
    {
      name: "status",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.status ?? "NA",
      cell: row => {
        if (row.status === "pending") {
          return <Badge color="warning">{row.status}</Badge>
        } else if (row.status === "payed") {
          return <Badge color="success">{row.status}</Badge>
        }
        return <Badge color="danger">{row.status}</Badge>
      },
    },
  ]

  return (
    <React.Fragment>
      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <CardTitle className="h4">Fees List </CardTitle>
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

        <Modal
          isOpen={show}
          toggle={() => setshow(!show)}
          centered={true}
          size="xl"
        >
          <ModalBody className="py-3 px-5">
            <div className="table-responsive">
              <DataTable
                noHeader
                pagination
                subHeader
                selectableRowsHighlight={true}
                highlightOnHover={true}
                //   paginationServer
                columns={columns2}
                //paginationPerPage={7}
                className="react-dataTable"
                paginationDefaultPage={1}
                data={row}
              />
            </div>
          </ModalBody>
        </Modal>
      </Row>

      <ToastContainer />
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(Fees)
