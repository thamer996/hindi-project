import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import {
  Table,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Modal,
  ModalBody,
  Form,
  Label,
  Input,
  FormFeedback,
  ModalHeader,
} from "reactstrap"

import { connect } from "react-redux"

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"
import HeaderTeacher from "../../components/HorizontalLayoutTeacher/HeaderTeacher"
import NvbarTeacher from "../../components/HorizontalLayoutTeacher/NvbarTeacher"
import { useFormik } from "formik"
import * as Yup from "yup"
import { createClient } from "@supabase/supabase-js"
import { toast, ToastContainer } from "react-toastify"
import DataTable from "react-data-table-component"
import { v4 as uuidv4 } from "uuid"
import _ from "lodash"
import { isEmpty } from "lodash"

//
import * as XLSX from "xlsx"
const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)

const StudentInformationReportSuper = props => {
  document.title =
    "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard"

  const breadcrumbItems = [
    { title: "Smart school", link: "#" },
    { title: "Reports", link: "#" },
  ]

  const navigate = useNavigate()

  const [data, setdata] = useState([])
  const [show, setshow] = useState(false)
  const [Class, setClass] = useState("")
  const [Section, setSection] = useState("")
  const [keyword, setkeyword] = useState("")
  const [type, settype] = useState("add")
  const [clas, setClas] = useState([])
  const [cat, setcat] = useState([])
  const [houses, sethouses] = useState([])
  const [sectModal, setsectModal] = useState([])

  const [sectionss, setSectionss] = useState([])

  const [StudentPhoto, setStudentPhoto] = useState("")

  const [FatherPhoto, setFatherPhoto] = useState("")

  const [MotherPhoto, setMotherPhoto] = useState("")
  const [IfGuardianIs, setIfGuardianIs] = useState("")
  const [GuardianPhoto, setGuardianPhoto] = useState("")

  async function getStudents() {
    const { data, error } = await supabase
      .from("Student")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
    setdata(data ?? [])
  }
  async function getClass() {
    const { data, error } = await supabase
      .from("Class")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
    setClas(data ?? [])
  }

  // async function getSections() {
  //   const { data, error } = await supabase.from("Section").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
  //   setSectionss(data ?? [])
  // }
  async function getCategorys() {
    const { data, error } = await supabase
      .from("Category")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
    setcat(data ?? [])
  }
  async function getHouse() {
    const { data, error } = await supabase
      .from("House")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
    sethouses(data ?? [])
  }
  useEffect(() => {
    props.setBreadcrumbItems("Student Informations", breadcrumbItems)

    getStudents()
    getClass()
    getCategorys()
    getHouse()
  }, [])

  const handleSearch = async () => {
    const { data, error } = await supabase
      .from("Student")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
      .ilike("class", `%${Class}%`)
      .ilike("section", `%${Section}%`)
      .or(
        `firstName.ilike.%${keyword}%,rollNumber.ilike.%${keyword}%,lastName.ilike.%${keyword}%,category.ilike.%${keyword}%,rollNumber.ilike.%${keyword}%,mobileNumber.ilike.%${keyword}%,fatherName.ilike.%${keyword}%`,
      )

    setdata(data)
  }

  const handleAddProfile = () => {
    navigate("/student-profile")
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
    color: "red", // Example: Change color for delete icon
  }
  const editIconStyle = {
    ...iconStyle,
    color: "black", // Color for edit icon (black)
  }
  const handleClickExcel = () => {
    const array = data

    if (!isEmpty(array)) {
      const wb = XLSX.utils.book_new()
      const ws = XLSX.utils.json_to_sheet(array)

      const colsize = []

      Object.keys(array[0]).forEach(element => {
        const arrayGrouped = _.groupBy(array, element)
        const max = _.maxBy(Object.keys(arrayGrouped), function (o) {
          return o?.length
        })
        colsize.push({
          wch:
            element?.length > max?.length
              ? element?.length
              : max?.length ?? 0 + 10,
        })
      })
      ws["!cols"] = colsize

      XLSX.utils.book_append_sheet(wb, ws, "Details")

      XLSX.writeFile(wb, `EXPORT.xlsx`)
    } else {
      toast.error("NO DATA TO EXPORT")
    }
  }
  const handelDelete = async id => {
    const { error } = await supabase.from("Student").delete().eq("id", id)

    if (error) {
      toast.error("Student Deleted Failed", { autoClose: 2000 })
    } else {
      toast.success("Student Deleted", { autoClose: 2000 })
      getStudents()
    }
  }

  const columns = [
    {
      name: "Admission No",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.admissionNo ?? "None",
    },
    {
      name: "Student Name",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.firstName ?? "None",
    },
    {
      name: "Roll No",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.rollNumber ?? "None",
    },
    {
      name: "Class",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.class,
    },
    {
      name: "Section",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.section,
    },
    {
      name: "Father Name",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.fatherName,
    },
    {
      name: "Date of Birth",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.dateOfBirth,
    },
    {
      name: "Gender",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.gender,
    },
    {
      name: "Category",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.category,
    },
    {
      name: "Mobile Number",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.mobileNumber,
    },
  ]

  return (
    <React.Fragment>
      <Row>
        <div className="d-flex mb-2">
          {/* Vos éléments de filtre ici */}
          <label className="col-form-label">Class</label>&nbsp;
          <div className="col-md-2 me-1">
            <select
              onChange={val => {
                setClass(val.target.value)
                setSectionss(
                  clas.find(el => el.className === val.target.value)?.sections,
                )
              }}
              value={Class}
              className="form-control"
            >
              <option value=""> Select </option>
              {clas?.map(el => (
                <option value={el.className}>{el.className}</option>
              ))}
            </select>
          </div>
          <label className="col-form-label">Section</label>&nbsp;
          <div className="col-md-2 me-1">
            <select
              onChange={val => {
                setSection(val.target.value)
              }}
              value={Section}
              className="form-control"
            >
              <option value=""> Select </option>
              {sectionss?.map(el => (
                <option value={el}>{el}</option>
              ))}
            </select>
          </div>
          <label className="col-form-label">Search By Keyword</label>&nbsp;
          <div className="col-md-2 me-1">
            <input
              type="text"
              value={keyword}
              onChange={val => {
                setkeyword(val.target.value)
              }}
              className="form-control"
              placeholder="Search By Student Name, Roll Number, Enroll Number.."
            />
          </div>
          <div>
            <button className="btn btn-primary" onClick={handleSearch}>
              Search
            </button>
          </div>
          <div>
            <button
              className="btn btn-danger ms-2"
              onClick={() => {
                setSection("")
                setSectionss([])
                setkeyword("")
                setClass("")
              }}
            >
              Reset
            </button>
          </div>
        </div>
        <div className="d-flex justify-content-end  mb-2">
          <div></div>
          {/* Button */}
      
          <button className="btn btn-primary ms-3" onClick={handleClickExcel}>
            Export Excel
          </button>
        </div>
      </Row>
      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <CardTitle className="h4"> Student Report </CardTitle>

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
                  data={data}
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

export default connect(null, { setBreadcrumbItems })(
  StudentInformationReportSuper,
)
