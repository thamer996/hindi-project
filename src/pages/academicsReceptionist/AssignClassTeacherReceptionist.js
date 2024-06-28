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

const AssignClassTeacher = props => {
  document.title =
    "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard"

  const breadcrumbItems = [
    { title: "Smart school", link: "#" },
    { title: "Academics", link: "#" },
  ]

  const [section, setSection] = useState([])

  const [sections, setSections] = useState([])
  const [clas, setClas] = useState([])
  const [teacher, setTeacher] = useState([])

  const [show, setshow] = useState(false)
  const [type, settype] = useState("new")
  const [search, setSearch] = useState("")

  async function getCountries() {
    const { data, error } = await supabase.from("ClassTeacher").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    setSection(data ?? [])
  }

  async function getClass() {
    const { data, error } = await supabase.from("Class").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    setClas(data ?? [])
  }

  async function getTeacher() {
    const { data, error } = await supabase.from("Teacher").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    setTeacher(data ?? [])
  }

  async function getSections() {
    const { data, error } = await supabase.from("Section").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    setSections(data ?? [])
  }

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      teacherName: "",
      classRef: "",
      sectionRef: "",
    },

    validationSchema: Yup.object({ }),
    onSubmit: async values => {
      if (type === "new") {
        const { data, error } = await supabase
          .from("ClassTeacher")
          .insert([
            { brancheId: localStorage.getItem("BranchId") ?? 1,
                teacherName:values.teacherName,
                classRef:values.classRef,
                sectionRef:values.sectionRef,
            },
          ])
          .select()

        if (error) {
          toast.error("ClassTeacher Inserted Failed", { autoClose: 2000 })
        } else {
          toast.success("ClassTeacher Inserted", { autoClose: 2000 })
          setshow(false)
          getCountries()
          validation.resetForm()
        }
      } else {
        const { data, error } = await supabase
          .from("ClassTeacher")
          .update([
            {
                teacherName:values.teacherName,
                classRef:values.classRef,
                sectionRef:values.sectionRef,
            },
          ])
          .eq("id", values.id)
          .select()

        if (error) {
          toast.error("ClassTeacher Updated Failed", { autoClose: 2000 })
        } else {
          toast.success("ClassTeacher Updated", { autoClose: 2000 })
          setshow(false)
          getCountries()
          validation.resetForm()
        }
      }
    },
  })

  const navigate = useNavigate()

  useEffect(() => {
    props.setBreadcrumbItems("ClassTeacher", breadcrumbItems)
    getCountries()
    getClass()
    getTeacher()
    getSections()
  }, [])

  const handleClick = () => {
    settype("new")
    validation.resetForm()
    setshow(true)
  }

  const handleSearch = async () => {
    const { data, error } = await supabase
      .from("ClassTeacher")
      .select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
      .ilike("teacherName", `%${search}%`)
    setSection(data)
  }

  const handelEdit = async row => {
    validation.resetForm()

    validation.setFieldValue("teacherName", row.teacherName)
    validation.setFieldValue("sectionRef", row.sectionRef)
    validation.setFieldValue("classRef", row.classRef)

    validation.setFieldValue("id", row.id)
    setshow(true)
    settype("edit")
  }

  const handelDelete = async id => {
    const { error } = await supabase.from("ClassTeacher").delete().eq("id", id)

    if (error) {
      toast.error("ClassTeacher Deleted Failed", { autoClose: 2000 })
    } else {
      toast.success("ClassTeacher Deleted", { autoClose: 2000 })
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
      name: "Teacher Name",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.teacherName,
    },
    {
      name: "class",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.classRef ?? "None",
    },
    {
      name: "section",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.sectionRef ?? "None",
    },
  ]

  return (
    <React.Fragment>
      <Row>
        <div className="d-flex mb-2">
          <div></div>
          {/* Vos éléments de filtre ici */}

          <label className="col-form-label">Class Teacher </label>
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

      </Row>
      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <CardTitle className="h4">Class Teacher List </CardTitle>
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
                <Label htmlFor="useremail">Class</Label>
                <select
                  id="classRef"
                  name="classRef"
                  className="form-control"
                  placeholder="Enter  class"
                  type="classRef"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.classRef || ""}
                  invalid={
                    validation.touched.classRef && validation.errors.classRef
                      ? true
                      : false
                  }
                >
                  <option value={""}>Select</option>
                  {clas?.map(el => (
                    <option value={el.className}>{el.className}</option>
                  ))}
                </select> 

                {validation.touched.classRef && validation.errors.classRef ? (
                  <FormFeedback type="invalid">
                    {validation.errors.classRef}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label htmlFor="useremail">Section</Label>
                <select
                  id="sectionRef"
                  name="sectionRef"
                  className="form-control"
                  placeholder="Enter  class"
                  type="sectionRef"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.sectionRef || ""}
                  invalid={
                    validation.touched.sectionRef &&
                    validation.errors.sectionRef
                      ? true
                      : false
                  }
                >
                  <option value={""}>Select</option>
                  {sections?.map(el => (
                    <option value={el.sectionName}>{el.sectionName}</option>
                  ))}
                </select> 

                {validation.touched.sectionRef &&
                validation.errors.sectionRef ? (
                  <FormFeedback type="invalid">
                    {validation.errors.sectionRef}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label htmlFor="useremail">Teachers</Label>
                <select
                  id="teacherName"
                  name="teacherName"
                  className="form-control"
                  type="teacherName"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.teacherName || ""}
                  invalid={
                    validation.touched.teacherName && validation.errors.teacherName
                      ? true
                      : false
                  }
                >
                    <option value={""}>Select</option>
                  {teacher?.map(el => (
                    <option value={el.teacherName}>{el.teacherName}</option>
                  ))}
                </select> 

                {validation.touched.teacherName && validation.errors.teacherName ? (
                  <FormFeedback type="invalid">
                    {validation.errors.teacherName}
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


export default connect(null, { setBreadcrumbItems })(AssignClassTeacher);