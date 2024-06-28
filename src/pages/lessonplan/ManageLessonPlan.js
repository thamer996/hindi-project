import React, { useEffect, useState, useRef } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import _, { isEmpty } from "lodash"
import { setBreadcrumbItems } from "../../store/actions"
import { Link } from "react-router-dom"
import TimePicker from "react-time-picker"

import * as XLSX from "xlsx"

import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap"
import { AvField, AvForm } from "availity-reactstrap-validation"

import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin, { Draggable } from "@fullcalendar/interaction"
import BootstrapTheme from "@fullcalendar/bootstrap"
import listPlugin from "@fullcalendar/list"

import {
  addNewEvent,
  deleteEvent,
  getCategories,
  getEvents,
  updateEvent,
} from "../../store/actions"
import DeleteModal from "../lessonplan/DeleteModal"
import DataTable from "react-data-table-component"
import { ToastContainer, toast } from "react-toastify"
import { createClient } from "@supabase/supabase-js"
import "react-toastify/dist/ReactToastify.css"
import { useFormik } from "formik"
import * as Yup from "yup"
import "react-time-picker/dist/TimePicker.css"
import "react-clock/dist/Clock.css"
const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)

const ManageLessonPlan = props => {
  document.title = "Calendar | Lexa - Responsive Bootstrap 5 Admin Dashboard"

  //BreadCrumd add
  const breadcrumbItems = [
    { title: "Lexa", link: "#" },
    { title: "Manage Lesson Plan", link: "#" },
  ]
  const [lessonPlans, setLessonPlans] = useState([])
  const [teacher, setteacher] = useState([])
  const [show, setshow] = useState(false)
  const [Subject, setSubject] = useState([])
  const [Room, setroom] = useState([])
  const [type, settype] = useState("new")
  const [search, setSearch] = useState("")
  const [time, setTime] = useState([])
  async function getLessonPlan() {
    const { data, error } = await supabase
      .from("LessonPlan")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
    setLessonPlans(data ?? [])
  }
  const handleClickExcel = () => {
    const array = lessonPlans

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

  async function getteacher() {
    const { data, error } = await supabase
      .from("Teacher")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
    setteacher(data ?? [])
  }
  async function getRoom() {
    const { data, error } = await supabase
      .from("Room")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
    setroom(data ?? [])
  }
  async function getSubject() {
    const { data, error } = await supabase
      .from("SubjectGroup")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
    setSubject(data ?? [])
  }
  const handleClick = () => {
    settype("new")
    validation.resetForm()
    setshow(true)
  }
  const handelEdit = async row => {
    validation.resetForm()

    validation.setFieldValue("classRef", row.class)
    validation.setFieldValue("subjects", row.subject)
    validation.setFieldValue("teacherName", row.teacherName)
    validation.setFieldValue("date", row.date)
    validation.setFieldValue("room", row.room)

    validation.setFieldValue("endtime", row.endTime)
    validation.setFieldValue("begintime", row.beginTime)

    validation.setFieldValue("id", row.id)
    setshow(true)
    settype("edit")
  }
  const handelDelete = async id => {
    const { error } = await supabase.from("LessonPlan").delete().eq("id", id)

    if (error) {
      toast.error("LessonPlan Deleted Failed", { autoClose: 2000 })
    } else {
      toast.success("LessonPlan Deleted", { autoClose: 2000 })
      getLessonPlan()
    }
  }
  const handleSearch = async () => {
    const { data, error } = await supabase
      .from("LessonPlan")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
      .ilike("teacherName", `%${search}%`)
    setLessonPlans(data)
  }
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      classRef: "",
      subjects: "",
      teacherName: "",
      date: "",
      room: "",
      endtime: "",
      begintime: "",
      id: "",
    },

    validationSchema: Yup.object({
      classRef: Yup.string().required("Please Enter Your classRef"),
      subjects: Yup.string().required("Please Enter Your subject"),
      teacherName: Yup.string().required("Please Enter Your teacherName"),
      date: Yup.string().required("Please Enter Your date"),
      room: Yup.string().required("Please Enter Your room"),
      endtime: Yup.string().required("Please Enter Your endtime"),
      begintime: Yup.string().required("Please Enter Your begintime"),
    }),
    onSubmit: async values => {
      console.log("values", values)

      if (type === "new") {
        console.log("eeeeeeeeeeeeeee", values)
        const { data, error } = await supabase
          .from("LessonPlan")
          .insert([
            {
              brancheId: localStorage.getItem("BranchId") ?? 1,
              class: values.classRef,
              subject: values.subjects,
              teacherName: values.teacherName,
              date: values.date,
              room: values.room,
              beginTime: values.begintime,
              endTime: values.endtime,
            },
          ])
          .select()

        if (error) {
          console.log("ez", error)
          toast.error("LessonPlan Inserted Failed", { autoClose: 2000 })
        } else {
          toast.success("LessonPlan Inserted", { autoClose: 2000 })
          setshow(false)
          getLessonPlan()
          validation.resetForm()
        }
      } else {
        const { data, error } = await supabase
          .from("LessonPlan")
          .update([
            {
              lesson: values.lessonName,
              class: values.classRef,
              section: values.section,
              subjectGroup: values.subjectGroup,
              subject: values.subjects,
              beginTime: values.begintime,
              endTime: values.endtime,
            },
          ])
          .eq("id", values.id)
          .select()

        if (error) {
          toast.error("LessonPlan Updated Failed", { autoClose: 2000 })
        } else {
          toast.success("LessonPlan Updated", { autoClose: 2000 })
          setshow(false)
          getLessonPlan()
          validation.resetForm()
        }
      }
    },
  })
  useEffect(() => {
    props.onSetBreadCrumbs("Lesson Plan", breadcrumbItems)
    getLessonPlan()
    getteacher()
    getSubject()
    getRoom()
  }, [])
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
  // Define your columns configuration
  const columns1 = [
    {
      name: "Date",
      selector: row => row?.date,
      sortable: true,
      center: true,
      minWidth: "230px",
    },
    {
      name: "Teacher name",
      selector: row => row?.teacherName,
      sortable: true,
      center: true,
      minWidth: "230px",
    },
    {
      name: "Subject",
      selector: row => row?.subject,
      sortable: true,
      center: true,
      minWidth: "230px",
    },
    {
      name: "Class",
      selector: row => row?.class,
      sortable: true,
      center: true,
      minWidth: "230px",
    },
    {
      name: "Time",
      selector: row => {
        return (
          <div className="ss">
            <>
              {row?.beginTime} AM - {row?.endTime} AM
            </>
          </div>
        )
      },
      sortable: true,
      center: true,
      minWidth: "430px",
    },
    {
      name: "Room",
      selector: row => row?.room,
      sortable: true,
      center: true,
      minWidth: "230px",
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
  console.log("Subject", Subject)
  return (
    <React.Fragment>
      <Row>
        <div className="d-flex mb-2">
          <div></div>
          {/* Vos éléments de filtre ici */}

          <label className="col-form-label">Teacher Name </label>
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
                getLessonPlan()
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
            Add Lesson Plan
          </button>
          <button className="btn btn-primary ms-3" onClick={handleClickExcel}>
            Export Excel
          </button>
        </div>
      </Row>

      <Row className="mb-4">
        <Col>
          <div className="table-responsive">
            <DataTable
              noHeader
              pagination
              subHeader
              selectableRowsHighlight={true}
              highlightOnHover={true}
              columns={columns1}
              className="react-dataTable"
              paginationDefaultPage={1}
              data={lessonPlans}
            />
          </div>
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
                <Label htmlFor="useremail">Date</Label>
                <Input
                  id="date"
                  name="date"
                  className="form-control"
                  placeholder="Enter date"
                  type="date"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.date || ""}
                  invalid={
                    validation.touched.date && validation.errors.date
                      ? true
                      : false
                  }
                />
                {validation.touched.date && validation.errors.date ? (
                  <FormFeedback type="invalid">
                    {validation.errors.date}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label htmlFor="useremail">Teacher Name</Label>
                <select
                  id="teacherName"
                  name="teacherName"
                  className="form-control"
                  placeholder="Enter  class"
                  type="teacherName"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.teacherName || ""}
                  invalid={
                    validation.touched.teacherName &&
                    validation.errors.teacherName
                      ? true
                      : false
                  }
                >
                  <option value={""}>Select</option>
                  {teacher?.map(el => (
                    <option value={el.teacherName}>{el.teacherName}</option>
                  ))}
                </select>

                {validation.touched.teacherName &&
                validation.errors.teacherName ? (
                  <FormFeedback type="invalid">
                    {validation.errors.teacherName}
                  </FormFeedback>
                ) : null}
              </div>
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
                  {Subject?.map(el => (
                    <option value={el.classRef}>{el.classRef}</option>
                  ))}
                </select>

                {validation.touched.classRef && validation.errors.classRef ? (
                  <FormFeedback type="invalid">
                    {validation.errors.classRef}
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
                  {Subject?.filter(
                    e => e.classRef === validation.values.classRef,
                  )

                    .flatMap(el =>
                      el.subjects.map((s, z) => <option value={s}>{s}</option>),
                    )}
                </select>

                {validation.touched.subjects && validation.errors.subjects ? (
                  <FormFeedback type="invalid">
                    {validation.errors.subjects}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label htmlFor="useremail">Begin Time</Label>
                <Input
                  id="begintime"
                  name="begintime"
                  className="form-control"
                  placeholder="Enter begintime"
                  type="time"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.begintime || ""}
                  invalid={
                    validation.touched.begintime && validation.errors.begintime
                      ? true
                      : false
                  }
                />
                {validation.touched.begintime && validation.errors.begintime ? (
                  <FormFeedback type="invalid">
                    {validation.errors.begintime}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label htmlFor="useremail">End Time</Label>
                <Input
                  id="endtime"
                  name="endtime"
                  className="form-control"
                  placeholder="Enter endtime"
                  type="time"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.endtime || ""}
                  invalid={
                    validation.touched.endtime && validation.errors.endtime
                      ? true
                      : false
                  }
                />
                {validation.touched.endtime && validation.errors.endtime ? (
                  <FormFeedback type="invalid">
                    {validation.errors.endtime}
                  </FormFeedback>
                ) : null}
              </div>
              <div></div>
              <div className="mb-3">
                <Label htmlFor="useremail">Room</Label>
                <select
                  id="room"
                  name="room"
                  className="form-control"
                  placeholder="Enter  class"
                  type="room"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.room || ""}
                  invalid={
                    validation.touched.room && validation.errors.room
                      ? true
                      : false
                  }
                >
                  <option value={""}>Select</option>

                  {Room.map(e => (
                    <option key={e.type} value={e.type}>
                      {e.type}
                    </option>
                  ))}
                </select>

                {validation.touched.room && validation.errors.room ? (
                  <FormFeedback type="invalid">
                    {validation.errors.room}
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
ManageLessonPlan.propTypes = {
  events: PropTypes.array,
  categories: PropTypes.array,
  className: PropTypes.string,
  onGetEvents: PropTypes.func,
  onAddNewEvent: PropTypes.func,
  onUpdateEvent: PropTypes.func,
  onDeleteEvent: PropTypes.func,
  c: PropTypes.func,
  onSetBreadCrumbs: PropTypes.func,
}

const mapStateToProps = ({ calendar }) => ({
  events: calendar.events,
  categories: calendar.categories,
})

const mapDispatchToProps = dispatch => ({
  onGetEvents: () => dispatch(getEvents()),
  onGetCategories: () => dispatch(getCategories()),
  onAddNewEvent: event => dispatch(addNewEvent(event)),
  onUpdateEvent: event => dispatch(updateEvent(event)),
  onDeleteEvent: event => dispatch(deleteEvent(event)),
  onSetBreadCrumbs: (title, breadcrumbItems) =>
    dispatch(setBreadcrumbItems(title, breadcrumbItems)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ManageLessonPlan)
