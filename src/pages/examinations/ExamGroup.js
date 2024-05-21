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

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useFormik } from "formik"
import * as Yup from "yup"

const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)

const ExamGroup = props => {
  document.title =
    "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard"

  const breadcrumbItems = [
    { title: "Smart school", link: "#" },
    { title: "Academics", link: "#" },
  ]

  const [section, setSection] = useState([])

  const [sections, setSections] = useState([])
  const [clas, setClas] = useState([])
  const [subject, setSubject] = useState([])

  const [show, setshow] = useState(false)
  const [type, settype] = useState("new")
  const [search, setSearch] = useState("")

  async function getCountries() {
    const { data, error } = await supabase.from("ExamGroup").select("*")
    setSection(data ?? [])
  }

  async function getClass() {
    const { data, error } = await supabase.from("Class").select("*")
    setClas(data ?? [])
  }

  async function getSubject() {
    const { data, error } = await supabase.from("Subjects").select("*")
    setSubject(data ?? [])
  }

  async function getSections() {
    const { data, error } = await supabase.from("Section").select("*")
    setSections(data ?? [])
  }

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: "",
      examType: "",
      noOfExams: "",
      description: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Your name"),
    }),
    onSubmit: async values => {
      if (type === "new") {
        const { data, error } = await supabase
          .from("ExamGroup")
          .insert([
            {
              name: values.name,
              examType: values.examType,
              noOfExams: values.noOfExams,
              description: values.description,
            },
          ])
          .select()

        if (error) {
          toast.error("ExamGroup Inserted Failed", { autoClose: 2000 })
        } else {
          toast.success("ExamGroup Inserted", { autoClose: 2000 })
          setshow(false)
          getCountries()
          validation.resetForm()
        }
      } else {
        const { data, error } = await supabase
          .from("ExamGroup")
          .update([
            {
              name: values.name,
              examType: values.examType,
              noOfExams: values.noOfExams,
              description: values.description,
            },
          ])
          .eq("id", values.id)
          .select()

        if (error) {
          toast.error("ExamGroup Updated Failed", { autoClose: 2000 })
        } else {
          toast.success("ExamGroup Updated", { autoClose: 2000 })
          setshow(false)
          getCountries()
          validation.resetForm()
        }
      }
    },
  })

  const navigate = useNavigate()

  useEffect(() => {
    props.setBreadcrumbItems("ExamGroup", breadcrumbItems)
    getCountries()
    getClass()
    getSubject()
    getSections()
  }, [])

  const handleClick = () => {
    settype("new")
    validation.resetForm()
    setshow(true)
  }

  const handleSearch = async () => {
    const { data, error } = await supabase
      .from("ExamGroup")
      .select("*")
      .ilike("name", `%${search}%`)
    setSection(data)
  }

  const handelEdit = async row => {
    validation.resetForm()

    validation.setFieldValue("name", row.name)
    validation.setFieldValue("description", row.description)
    validation.setFieldValue("noOfExams", row.noOfExams)
    validation.setFieldValue("examType", row.examType)


    validation.setFieldValue("id", row.id)
    setshow(true)
    settype("edit")
  }

  const handelDelete = async id => {
    const { error } = await supabase.from("ExamGroup").delete().eq("id", id)

    if (error) {
      toast.error("ExamGroup Deleted Failed", { autoClose: 2000 })
    } else {
      toast.success("ExamGroup Deleted", { autoClose: 2000 })
      getCountries()
    }
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

  const actionIconStyle = {
    ...iconStyle, // Inherit styles from iconStyle
    color: "red", // Example: Change color for delete icon
  }
  const editIconStyle = {
    ...iconStyle,
    color: "black", // Color for edit icon (black)
  }

  const columns = [
    {
      name: "name",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.name,
    },
    {
      name: "No Of Exams",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.noOfExams ?? "None",
    },
    {
      name: "Exam Type",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.examType ?? "None",
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
              <span style={editIconStyle} onClick={() => handelEdit(row)}>
                <i className="ti-marker-alt"></i>
              </span>
              <span
                style={actionIconStyle}
                onClick={() => handelDelete(row?.id)}
              >
                <i className="ti-trash"></i>
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

          <label className="col-form-label">Exam Group </label>
          <div className="col-md-2 ms-2">
            <input
              type="text"
              onChange={e => setSearch(e.target.value)}
              value={search}
              className="form-control me-1"
              placeholder=""
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

        <div className="d-flex justify-content-between  mb-2">
          <div></div>
          {/* Button */}
          <button className="btn btn-primary" onClick={handleClick}>
            Add Exam Group
          </button>
        </div>
      </Row>
      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <CardTitle className="h4">Exam Group List </CardTitle>
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
                  data={section}
                />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Modal isOpen={show} toggle={() => setshow(!show)} centered={true}>
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
              <div className="mb-3">
                <Label htmlFor="useremail">Name</Label>
                <Input
                  id="name"
                  name="name"
                  className="form-control"
                  placeholder="Enter section Name"
                  type="name"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.name || ""}
                  invalid={
                    validation.touched.name && validation.errors.name
                      ? true
                      : false
                  }
                />
                {validation.touched.name && validation.errors.name ? (
                  <FormFeedback type="invalid">
                    {validation.errors.name}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label htmlFor="useremail">No Of Exams</Label>
                <input
                  id="noOfExams"
                  name="noOfExams"
                  className="form-control"
                  placeholder="Enter noOfExams"
                  type="text"
                  multiple
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.noOfExams || ""}
                  invalid={
                    validation.touched.noOfExams && validation.errors.noOfExams
                      ? true
                      : false
                  }
                />

                {validation.touched.noOfExams && validation.errors.noOfExams ? (
                  <FormFeedback type="invalid">
                    {validation.errors.noOfExams}
                  </FormFeedback>
                ) : null}
              </div>


              <div className="mb-3">
                <Label htmlFor="useremail">Exam Type</Label>
                <select
                  id="examType"
                  name="examType"
                  className="form-control"
                  placeholder="Enter examType"
                  type="examType"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.examType || ""}
                  invalid={
                    validation.touched.examType && validation.errors.examType
                      ? true
                      : false
                  }
                >
                  <option value="">Select</option>
                  <option value="General Pupose (Pass/Fail)"> General Pupose (Pass/Fail) </option>
                  <option value="School Based Grading System"> School Based Grading System</option>
                  <option value="College Based Grading System">College Based Grading System</option>
                  <option value="GPA Based Grading System">GPA Based Grading System</option>
                  <option value="Average Passing">Average Passing</option>
                </select>

                {validation.touched.examType && validation.errors.examType ? (
                  <FormFeedback type="invalid">
                    {validation.errors.examType}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label htmlFor="useremail">Description</Label>
                <input
                  id="description"
                  name="description"
                  className="form-control"
                  placeholder="Enter description"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.description || ""}
                  invalid={
                    validation.touched.description &&
                    validation.errors.description
                      ? true
                      : false
                  }
                />

                {validation.touched.description &&
                validation.errors.description ? (
                  <FormFeedback type="invalid">
                    {validation.errors.description}
                  </FormFeedback>
                ) : null}
              </div>

              <div>
                <div className="col-12 text-end">
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
      <ToastContainer />
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(ExamGroup)
