import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import * as XLSX from "xlsx"

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
  FormFeedback,
  Input,
} from "reactstrap"

import { connect } from "react-redux"

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

const Topic = props => {
  document.title =
    "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard"

  const breadcrumbItems = [
    { title: "Smart school", link: "#" },
    { title: "lesson plan", link: "#" },
  ]
  const navigate = useNavigate()
  const [topic, setTopic] = useState([])
  const [lesson, setLesson] = useState([])
  const [Subject, setSubject] = useState([])
  const [show2, setshow2] = useState(false)
  const [Subjects, setSubjects] = useState([])
  const [show, setshow] = useState(false)
  const [type, settype] = useState("new")
  const [search, setSearch] = useState("")
  const [clas, setClas] = useState([])
  const [currData, setcurrData] = useState([])
  async function getTopic() {
    const { data, error } = await supabase
      .from("Topic")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
    if (data) {
      let grouped_data = _.groupBy(data, "class")

      let dataconverted = []

      Object.keys(grouped_data)?.map(el => {
        dataconverted.push({
          class: el,
          list: grouped_data[el],
        })
      })
      setTopic(dataconverted ?? [])
    }
  }

  const handleClickExcel = () => {
    const array = topic

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

  console.log("dataaaaa", topic)
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
    props.setBreadcrumbItems("Topic List", breadcrumbItems)
    getTopic()
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
  const handelEditline = async values => {
    setshow(true)

    validation.setFieldValue("lessonName", values.lesson)
    validation.setFieldValue("classRef", values.class)
    validation.setFieldValue("section", values.section)
    validation.setFieldValue("subjectGroup", values.subjectGroup)
    validation.setFieldValue("subjects", values.subject)
    validation.setFieldValue("topic", values.topic)

    validation.setFieldValue("id", values.id)

    settype("edit")
  }
  const handelDeleteline = async row => {
    const { error } = await supabase.from("Topic").delete().eq("id", row.id)

    if (error) {
      toast.error("Topic line Deleted Failed", { autoClose: 2000 })
    } else {
      toast.success("Topic line Deleted ", { autoClose: 2000 })
      const { data, error } = await supabase
        .from("Topic")
        .select("*")
        .eq("brancheId", localStorage.getItem("BranchId") ?? 1)

      if (data) {
        let grouped_data = _.groupBy(data, "class")

        let dataconverted = []

        Object.keys(grouped_data).map(el => {
          dataconverted.push({
            class: el,
            list: grouped_data[el],
          })
        })

        setcurrData(
          dataconverted.filter(el => el.class === row.class)[0]?.list ?? [],
        )
      }
    }
  }
  const actionIconStyle = {
    ...iconStyle, // Inherit styles from iconStyle
    color: "red", // Example: Change color for delete icon
  }
  const editIconStyle = {
    ...iconStyle,
    color: "black", // Color for edit icon (black)
  }

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      classRef: "",
      section: "",
      subjectGroup: "",
      subjects: "",
      topic: "",
      lessonName: "",
      id: "",
    },

    validationSchema: Yup.object({}),
    onSubmit: async values => {
      console.log("values", values)
      if (type === "new") {
        const { data, error } = await supabase
          .from("Topic")
          .insert([
            {
              brancheId: localStorage.getItem("BranchId") ?? 1,
              lesson: values.lessonName,
              class: values.classRef,
              section: values.section,
              subjectGroup: values.subjectGroup,
              subject: values.subjects,
              topic: values.topic,
            },
          ])
          .select()

        if (error) {
          console.log("ez", error)
          toast.error("Topic Inserted Failed", { autoClose: 2000 })
        } else {
          toast.success("Topic Inserted", { autoClose: 2000 })
          setshow(false)
          getTopic()
          validation.resetForm()
        }
      } else {
        const { data, error } = await supabase
          .from("Topic")
          .update([
            {
              lesson: values.lessonName,
              class: values.classRef,
              section: values.section,
              subjectGroup: values.subjectGroup,
              subject: values.subjects,
              topic: values.topic,
            },
          ])
          .eq("id", values.id)
          .select()

        if (error) {
          toast.error("Topic Updated Failed", { autoClose: 2000 })
        } else {
          toast.success("Topic Updated", { autoClose: 2000 })
          setshow(false)
          getTopic()
          validation.resetForm()
        }
      }
    },
  })
  const handelEdit = async row => {
    validation.resetForm()

    setcurrData(row.list)
    setshow2(true)
  }
  const handelDelete = async id => {
    console.log("class", id)
    const { error } = await supabase.from("Topic").delete().eq("class", id)

    if (error) {
      toast.error("Topic Deleted Failed", { autoClose: 2000 })
    } else {
      toast.success("Topic Deleted", { autoClose: 2000 })
      getTopic()
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
      cell: row => (
        <ul className="mt-4">
          {row?.list.map(el => (
            <li className="mb-2">{el.section}</li>
          ))}
        </ul>
      ),
    },
    {
      name: "Subject Group",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.subjectGroup ?? "None",
      cell: row => (
        <ul className="mt-4">
          {row?.list.map(el => (
            <li className="mb-2">{el.subjectGroup}</li>
          ))}
        </ul>
      ),
    },
    {
      name: "subject",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.subject,
      cell: row => (
        <ul className="mt-4">
          {row?.list.map(el => (
            <li className="mb-2">{el.subject}</li>
          ))}
        </ul>
      ),
    },
    {
      name: "Lesson",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.lesson,
      cell: row => (
        <ul className="mt-4">
          {row?.list.map(el => (
            <li className="mb-2">{el.lesson}</li>
          ))}
        </ul>
      ),
    },
    {
      name: "Topic",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.topic,
      cell: row => (
        <ul className="mt-4">
          {row?.list.map(el => (
            <li className="mb-2">{el.topic}</li>
          ))}
        </ul>
      ),
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
                onClick={() => handelDelete(row?.class)}
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

          <label className="col-form-label">Topic </label>
          <div className="col-md-2 ms-2">
            <input
              type="text"
              //   onChange={
              //     e => setSearch(e.target.value)
              //   }
              //   value={search}
              className="form-control me-1"
              placeholder=""
            />
          </div>
          <div>
            <button
              className="btn btn-primary ms-2"
              onClick={() => {
                // handleSearch()
              }}
            >
              Search
            </button>
          </div>
          <div>
            <button
              className="btn btn-danger ms-2"
              onClick={() => {
                // setSearch("")
                // getLesson()
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
            Add Topic
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
              <CardTitle className="h4">Topic List </CardTitle>
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
                  data={topic}
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
                <Label htmlFor="useremail">Lesson</Label>
                <select
                  id="lessonName"
                  name="lessonName"
                  className="form-control"
                  placeholder="Enter  class"
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
                >
                  <option value={""}>Select</option>

                  {lesson
                    .filter(el => el.subject === validation.values.subjects)
                    .map((x, index) => (
                      <option value={x.lesson}>{x.lesson} </option>
                    ))}
                </select>

                {validation.touched.lessonName &&
                validation.errors.lessonName ? (
                  <FormFeedback type="invalid">
                    {validation.errors.lessonName}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label htmlFor="useremail">Topic</Label>
                <Input
                  id="topic"
                  name="topic"
                  className="form-control"
                  placeholder="Enter topic"
                  type="textarea"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.topic || ""}
                  invalid={
                    validation.touched.topic && validation.errors.topic
                      ? true
                      : false
                  }
                />
                {validation.touched.topic && validation.errors.topic ? (
                  <FormFeedback type="invalid">
                    {validation.errors.topic}
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

      <Modal
        isOpen={show2}
        toggle={() => setshow2(!show2)}
        centered={true}
        size="xl"
      >
        <ModalBody className="py-3 px-5">
          <span className="mb-3"> Class : {currData[0]?.class}</span>

          <ul>
            {currData.map(el => (
              <li>
                <div>
                  <span className="me-3"> Section : {el.section}</span>

                  <span className="me-3">
                    {" "}
                    Subject Group : {el.subjectGroup}
                  </span>

                  <span className="me-3"> Subject : {el.subject}</span>

                  <span className="me-3"> Lesson : {el.lesson}</span>
                  <span className="me-3"> Topic : {el.topic}</span>

                  <span
                    className="me-3"
                    style={editIconStyle}
                    onClick={() => handelEditline(el)}
                  >
                    <i className="ti-marker-alt"></i>
                  </span>

                  <span
                    className="me-3"
                    style={actionIconStyle}
                    onClick={() => handelDeleteline(el)}
                  >
                    <i className="ti-trash"></i>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </ModalBody>
      </Modal>
      <ToastContainer />
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(Topic)
