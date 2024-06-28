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

const AddStaffMember = props => {
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

  async function getCountries() {
    const { data, error } = await supabase.from("Staff").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    const { data: libraryMemberdata, error: libraryMembererror } =
      await supabase.from("LibraryMember").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)

    setStudent(
      data.map(el => ({
        ...el,
        libraryCardNo:
          libraryMemberdata?.find(elm => elm.ref === String(el.id))
            ?.libraryCardNo ?? "NA",
      })) ?? [],
    )
  }

  async function getClass() {
    const { data, error } = await supabase.from("Class").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    setClas(data ?? [])
  }

  // async function getSections() {
  //   const { data, error } = await supabase.from("Section").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
  //   setSections(data ?? [])
  // }

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      title: "",
      ISBNNumber: "",
      author: "",
      rackNumber: "",
      price: "",
      number: "",
      publisher: "",
      subject: "",
      Qty: "",
      postDate: "",
      description: "",
    },

    validationSchema: Yup.object({
      title: Yup.string().required("Please Enter Your title"),
      ISBNNumber: Yup.string().required("Please Enter Your ISBNNumber"),
      author: Yup.string().required("Please Enter Your author"),
      rackNumber: Yup.string().required("Please Enter Your rackNumber"),
      price: Yup.string().required("Please Enter Your price"),
      number: Yup.string().required("Please Enter Your number"),
      publisher: Yup.string().required("Please Enter Your publisher"),

      subject: Yup.string().required("Please Enter Your subject"),
      Qty: Yup.string().required("Please Enter Your Qty"),
    }),
    onSubmit: async values => {
      if (type === "new") {
        const { data, error } = await supabase
          .from("Student")
          .insert([
            { brancheId: localStorage.getItem("BranchId") ?? 1,
              title: values.title,
              ISBNNumber: values.ISBNNumber,
              author: values.author,
              rackNumber: values.rackNumber,
              price: values.price,
              number: values.number,
              publisher: values.publisher,
              subject: values.subject,
              Qty: values.Qty,
              postDate: values.postDate,
              description: values.description,
            },
          ])
          .select()

        if (error) {
          toast.error("Student Inserted Failed", { autoClose: 2000 })
        } else {
          toast.success("Student Inserted", { autoClose: 2000 })
          setshow(false)
          getCountries()
          validation.resetForm()
        }
      } else {
        const { data, error } = await supabase
          .from("Student")
          .update([
            {
              title: values.title,
              ISBNNumber: values.ISBNNumber,
              author: values.author,
              rackNumber: values.rackNumber,
              price: values.price,
              number: values.number,
              publisher: values.publisher,
              subject: values.subject,
              Qty: values.Qty,
              postDate: values.postDate,
              description: values.description,
            },
          ])
          .eq("id", values.id)
          .select()

        if (error) {
          toast.error("Student Updated Failed", { autoClose: 2000 })
        } else {
          toast.success("Student Updated", { autoClose: 2000 })
          setshow(false)
          getCountries()
          validation.resetForm()
        }
      }
    },
  })

  const navigate = useNavigate()

  useEffect(() => {
    props.setBreadcrumbItems("Student", breadcrumbItems)
    getCountries()
    getClass()
    // getSections()
  }, [])

  const handleClick = () => {
    settype("new")
    validation.resetForm()
    setshow(true)
  }

  const handleSearch = async () => {
    const { data, error } = await supabase
      .from("Staff")
      .select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
      .ilike("firstName", `%${Class}%`)

    const { data: libraryMemberdata, error: libraryMembererror } =
      await supabase.from("LibraryMember").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)

    setStudent(
      data.map(el => ({
        ...el,
        libraryCardNo:
          libraryMemberdata?.find(elm => elm.ref === String(el.id))
            .libraryCardNo ?? "NA",
      })) ?? [],
    )
  }

  const handelDelete = async row => {
    if (row.libraryCardNo !== "NA") {
      const { error } = await supabase
        .from("LibraryMember")
        .delete()
        .eq("ref", row.id)

      if (error) {
        toast.error("LibraryMember Failed", { autoClose: 2000 })
      } else {
        toast.success("LibraryMember Deleted", { autoClose: 2000 })
        getCountries()
      }
    } else {
      const uuidv4Val = uuidv4()
      const { error } = await supabase.from("LibraryMember").insert({
        ref: row.id,
        type: row?.role,
        libraryCardNo: uuidv4Val,
      })

      if (error) {
        toast.error("LibraryMember Failed", { autoClose: 2000 })
      } else {
        toast.success("LibraryMember Affected", { autoClose: 2000 })
        getCountries()
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
      name: "libraryCardNo",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.libraryCardNo,
    },
    {
      name: "staffID",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.staffID ?? "None",
    },
    {
      name: "firstName",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.firstName ?? "None",
    },
    {
      name: "lastName",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.lastName ?? "None",
    },
    {
      name: "role",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.role ?? "None",
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
              <span style={actionIconStyle} onClick={() => handelDelete(row)}>
                {row?.libraryCardNo === "NA" ? (
                  <i className="ti-plus"></i>
                ) : (
                  <i className="ti-back-left"></i>
                )}
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
          <label className="col-form-label">name</label>&nbsp;
          <div className="col-md-2 me-1">
            <input
              type="text"
              onChange={val => {
                setClass(val.target.value)
              }}
              value={Class}
              className="form-control"
            />
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
      </Row>

      <ToastContainer />
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(AddStaffMember)
