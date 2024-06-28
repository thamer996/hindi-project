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
} from "reactstrap"

import { connect } from "react-redux"
import * as XLSX from "xlsx"
//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"
import DataTable from "react-data-table-component"
import { ToastContainer, toast } from "react-toastify"
import { createClient } from "@supabase/supabase-js"
import "react-toastify/dist/ReactToastify.css"
import { useFormik } from "formik"
import * as Yup from "yup"
import _, { isEmpty } from "lodash"

const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)

const Lesson = props => {
  document.title =
    "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard"

  const breadcrumbItems = [
    { title: "Smart school", link: "#" },
    { title: "lesson plan", link: "#" },
  ]
  const navigate = useNavigate()
  const [lesson, setLesson] = useState([])
  const [Subject, setSubject] = useState([])
  const [Subjects, setSubjects] = useState([])
  const [show, setshow] = useState(false)
  const [type, settype] = useState("new")
  const [search, setSearch] = useState("")
  const [clas, setClas] = useState([])
  async function getLesson() {
    const { data, error } = await supabase
      .from("Lesson")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
    setLesson(data ?? [])
  }
  async function getClass() {
    const { data, error } = await supabase
      .from("Class")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
    setClas(data ?? [])
  }
  async function getSubject() {
    const { data, error } = await supabase
      .from("SubjectGroup")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
    setSubject(data ?? [])
  }
  async function getSubjects() {
    const { data, error } = await supabase
      .from("Subjects")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
    setSubjects(data ?? [])
  }
  useEffect(() => {
    props.setBreadcrumbItems("Lesson List", breadcrumbItems)
    getLesson()
    getClass()
    getSubject()
    getSubjects()
  }, [])
  const handleClick = () => {
    settype("new")
    validation.resetForm()
    setshow(true)
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
  const handelEdit = async row => {
    validation.resetForm()

    validation.setFieldValue("lessonName", row.lesson)
    validation.setFieldValue("classRef", row.class)
    validation.setFieldValue("section", row.section)
    validation.setFieldValue("subjectGroup", row.subjectGroup)
    validation.setFieldValue("subjects", row.subject)

    validation.setFieldValue("id", row.id)
    setshow(true)
    settype("edit")
  }
  const handelDelete = async id => {
    const { error } = await supabase.from("Lesson").delete().eq("id", id)

    if (error) {
      toast.error("Lesson Deleted Failed", { autoClose: 2000 })
    } else {
      toast.success("Lesson Deleted", { autoClose: 2000 })
      getLesson()
    }
  }

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      lessonName: "",
      classRef: "",
      section: "",
      subjectGroup: "",
      subjects: "",
      id: "",
    },

    validationSchema: Yup.object({
      lessonName: Yup.string().required("Please Enter Your lessonName "),
      classRef: Yup.string().required("Please Enter Your classRef"),
      subjectGroup: Yup.string().required("Please Enter Your subjectGroup"),
      section: Yup.string().required("Please Enter Your section"),
      subjects: Yup.string().required("Please Enter Your subject"),
    }),
    onSubmit: async values => {
      console.log("values", values)
      if (type === "new") {
        const { data, error } = await supabase
          .from("Lesson")
          .insert([
            {
              brancheId: localStorage.getItem("BranchId") ?? 1,
              lesson: values.lessonName,
              class: values.classRef,
              section: values.section,
              subjectGroup: values.subjectGroup,
              subject: values.subjects,
            },
          ])
          .select()

        if (error) {
          console.log("ez", error)
          toast.error("Lesson Inserted Failed", { autoClose: 2000 })
        } else {
          toast.success("Lesson Inserted", { autoClose: 2000 })
          setshow(false)
          getLesson()
          validation.resetForm()
        }
      } else {
        const { data, error } = await supabase
          .from("Lesson")
          .update([
            {
              lesson: values.lessonName,
              class: values.classRef,
              section: values.section,
              subjectGroup: values.subjectGroup,
              subject: values.subjects,
            },
          ])
          .eq("id", values.id)
          .select()

        if (error) {
          toast.error("Lesson Updated Failed", { autoClose: 2000 })
        } else {
          toast.success("Lesson Updated", { autoClose: 2000 })
          setshow(false)
          getLesson()
          validation.resetForm()
        }
      }
    },
  })
  const handleSearch = async () => {
    const { data, error } = await supabase
      .from("Lesson")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
      .ilike("lesson", `%${search}%`)
    setLesson(data)
  }

  const handleClickExcel = () => {
    const array = lesson

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

  const columns = [
    {
      name: "class",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.class ?? "None",
    },
    {
      name: "section",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.section ?? "None",
    },
    {
      name: "Subject Group",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.subjectGroup ?? "None",
    },
    {
      name: "subject",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.subject,
    },
    {
      name: "Lesson",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.lesson,
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

          <label className="col-form-label">Lesson </label>
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
                getLesson()
              }}
            >
              Reset
            </button>
          </div>
        </div>
        <div className="d-flex justify-content-end  mb-2">
          <div></div>
          {/* Button */}
          <button className="btn btn-primary" onClick={handleClick}>
            Add Lesson
          </button>
          <button className="btn btn-primary ms-3" onClick={handleClickExcel}>
            Export Excel
          </button>
        </div>
      </Row>
      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <CardTitle className="h4">Lesson List </CardTitle>
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
                  data={lesson}
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
                  id="section"
                  name="section"
                  className="form-control"
                  placeholder="Enter  class"
                  type="section"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.section || ""}
                  invalid={
                    validation.touched.section && validation.errors.section
                      ? true
                      : false
                  }
                >
                  <option value={""}>Select</option>

                  {clas
                    .filter(el => el.className === validation.values.classRef)
                    .flatMap(el =>
                      el.sections.map((section, index) => (
                        <option value={section}>{section}</option>
                      )),
                    )}
                </select>

                {validation.touched.section && validation.errors.section ? (
                  <FormFeedback type="invalid">
                    {validation.errors.section}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label htmlFor="useremail">Subject Group</Label>
                <select
                  id="subjectGroup"
                  name="subjectGroup"
                  className="form-control"
                  placeholder="Enter  class"
                  type="subjectGroup"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.subjectGroup || ""}
                  invalid={
                    validation.touched.subjectGroup &&
                    validation.errors.subjectGroup
                      ? true
                      : false
                  }
                >
                  <option value={""}>Select</option>

                  {Subject.filter(
                    el => el.sectionRef === validation.values.section,
                  ).flatMap(el =>
                    el.subjects.map((subjects, index) => (
                      <option value={subjects}>{subjects}</option>
                    )),
                  )}
                </select>

                {validation.touched.section && validation.errors.section ? (
                  <FormFeedback type="invalid">
                    {validation.errors.section}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label htmlFor="useremail">Subject</Label>
                <select
                  id="subjects"
                  name="subjects"
                  className="form-control"
                  placeholder="Enter  class"
                  type="subjects"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.subjects || ""}
                  invalid={
                    validation.touched.subjects && validation.errors.subjects
                      ? true
                      : false
                  }
                >
                  <option value={""}>Select</option>

                  {Subjects.filter(
                    el => el.subjectName === validation.values.subjectGroup,
                  ).map((x, index) => (
                    <option value={x.subjectName}>
                      {x.subjectName} ({x.subjectCode})
                    </option>
                  ))}
                </select>

                {validation.touched.section && validation.errors.section ? (
                  <FormFeedback type="invalid">
                    {validation.errors.section}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label htmlFor="useremail">Lesson Name</Label>
                <Input
                  id="lessonName"
                  name="lessonName"
                  className="form-control"
                  placeholder="Enter lessonName"
                  type="lessonName"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.lessonName || ""}
                  invalid={
                    validation.touched.lessonName &&
                    validation.errors.lessonName
                      ? true
                      : false
                  }
                />
                {validation.touched.lessonName &&
                validation.errors.lessonName ? (
                  <FormFeedback type="invalid">
                    {validation.errors.lessonName}
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

export default connect(null, { setBreadcrumbItems })(Lesson)
