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
  Alert,
} from "reactstrap"

import { connect } from "react-redux"

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"
import HeaderTeacher from "../../components/HorizontalLayoutTeacher/HeaderTeacher"
import NvbarTeacher from "../../components/HorizontalLayoutTeacher/NvbarTeacher"
import { useFormik } from "formik"
import * as Yup from "yup"
import { createClient } from "@supabase/supabase-js"
import { toast } from "react-toastify"
import DataTable from "react-data-table-component"
const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)
const DisabledStudentsSuper = props => {
  document.title =
    "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard"

  const breadcrumbItems = [
    { title: "Smart school", link: "#" },
    { title: "Student Details", link: "#" },
  ]
  const navigate = useNavigate()

  const [data, setdata] = useState([])
  const [show, setshow] = useState(false)
  const [type, settype] = useState("")
  const [Class, setClass] = useState("")
  const [Section, setSection] = useState("")
  const [keyword, setkeyword] = useState("")
  const [clas, setClas] = useState([])
  const [sectionss, setSectionss] = useState([])
  const [disableReasons, setdisableReasons] = useState([])

  async function getStudents() {
    const { data, error } = await supabase.from("Student").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    setdata(data ?? [])
  }
  async function getClass() {
    const { data, error } = await supabase.from("Class").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    setClas(data ?? [])
  }

  // async function getSections() {
  //   const { data, error } = await supabase.from("Section").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
  //   setSectionss(data ?? [])
  // }
  async function getdisableReasons() {
    const { data, error } = await supabase.from("DisableReason").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    setdisableReasons(data ?? [])
  }
  useEffect(() => {
    props.setBreadcrumbItems("Disabled Students", breadcrumbItems)
    getStudents()
    getClass()
    // getSections()
    getdisableReasons()
  }, [])

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      isDisabled: false,
      disableReason: "",
    },

    validationSchema:
      type === "disable"
        ? Yup.object({
            disableReason: Yup.string().required(
              "Please Enter Your disableReason",
            ),
          })
        : null,
    onSubmit: async values => {
      const { data, error } = await supabase
        .from("Student")
        .update([
          {
            disableReason: type === "enable" ? "" : values.disableReason,
            isDisabled: type === "enable" ? false : true,
          },
        ])
        .eq("id", values.id)
        .select()

      if (error) {
        toast.error("Student Updated Failed", { autoClose: 2000 })
      } else {
        toast.success("Student Updated", { autoClose: 2000 })
        setshow(false)
        getStudents()
        validation.resetForm()
      }
    },
  })

  const handleSearch = async () => {
    const { data, error } = await supabase
      .from("Student")
      .select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
      .ilike("class", `%${Class}%`)
      .ilike("section", `%${Section}%`)
      .or(
        `firstName.ilike.%${keyword}%,rollNumber.ilike.%${keyword}%,lastName.ilike.%${keyword}%,category.ilike.%${keyword}%,rollNumber.ilike.%${keyword}%,mobileNumber.ilike.%${keyword}%`,
      )

    setdata(data)
  }

  const handleAction = async (row, action) => {
    validation.resetForm()
    validation.setFieldValue("id", row.id)
    settype(action)
    setshow(true)
  }

  const handleClick = () => {
    navigate("/add-students")
  }
  const handleClickProfile = () => {
    navigate("/student-profile")
  }
  const iconStyle = {
    cursor: "pointer",
    display: "inline-block",
    marginRight: "10px",
    fontSize: "24px",
    color: "blue", // Change color as needed
  }

  const DisableIconStyle = {
    ...iconStyle, // Inherit styles from iconStyle
    color: "red", // Example: Change color for delete icon
  }
  const enableIconStyle = {
    ...iconStyle,
    color: "green", // Color for edit icon (black)
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
      name: "Class",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.class,
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
      name: "Disable Reason",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.disableReason,
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
      name: "Mobile Number",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.mobileNumber,
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
            {row.isDisabled ? (
              <span
                style={enableIconStyle}
                onClick={() => handleAction(row, "enable")}
              >
                <i className="ti-check"></i>
              </span>
            ) : (
              <span
                style={DisableIconStyle}
                onClick={() => handleAction(row, "disable")}
              >
                <i className="ti-close"></i>
              </span>
            )}
          </div>
        )
      },
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
                setSection(val.target.value)
              }}
              value={Section}
              className="form-control"
            >
              <option> Select </option>
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
                setkeyword("")
                setSectionss([])

                setClass("")
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
              <CardTitle className="h4"> Students Details </CardTitle>

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
      <Modal
        isOpen={show}
        toggle={() => setshow(!show)}
        centered={true}
        size="xl"
      >
        <ModalBody className="py-3 px-5">
          <Form
            className="form-horizontal mt-4"
            onSubmit={e => {
              e.preventDefault()
              validation.handleSubmit()
              return false
            }}
          >
            <Row>
              {type === "enable" ? (
                <Alert color="success">
                  <strong>Enabling student</strong>
                </Alert>
              ) : (
                <>
                  <Alert color="danger">
                    <strong>disabling student</strong>
                  </Alert>
                  <Col>
                    <div className="mb-3">
                      <Label htmlFor="useremail">Disable Reason</Label>
                      <select
                        id="disableReason"
                        name="disableReason"
                        className="form-control"
                        placeholder="Enter disableReason"
                        type="disableReason"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.disableReason || ""}
                        invalid={
                          validation.touched.disableReason &&
                          validation.errors.disableReason
                            ? true
                            : false
                        }
                      >
                        <option value={""}>Select</option>
                        {disableReasons?.map(el => (
                          <option value={el.disable_reason}>
                            {el.disable_reason}
                          </option>
                        ))}
                      </select> 
                      {validation.touched.disableReason &&
                      validation.errors.disableReason ? (
                        <FormFeedback type="invalid">
                          {validation.errors.disableReason}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                </>
              )}

              <div>
                <div className="col-12 text-center">
                  <button
                    className="btn btn-primary w-md waves-effect waves-light"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(DisabledStudentsSuper)
