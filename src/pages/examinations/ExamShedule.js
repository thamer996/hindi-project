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
import _ from "lodash"
import { isEmpty } from "lodash"

//
import * as XLSX from "xlsx"
const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)

const ExamShedule = props => {
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
    const { data, error } = await supabase.from("ExamSchedule").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    setSection(data ?? [])
  }

  async function getClass() {
    const { data, error } = await supabase.from("Class").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    setClas(data ?? [])
  }

  async function getSubject() {
    const { data, error } = await supabase.from("Subjects").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    setSubject(data ?? [])
  }

  async function getSections() {
    const { data, error } = await supabase.from("Section").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    setSections(data ?? [])
  }

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      subject: "",
      dateForm: "",
      startTime: "",
      duration: "",
      roomNo: "",
      marksMax: "",
      marksMin: "",
    },

    validationSchema: Yup.object({
      subject: Yup.string().required("Please Enter Your subject"),
      startTime: Yup.string().required("Please Enter Your startTime"),
      dateForm: Yup.string().required("Please Enter Your dateForm"),
      duration: Yup.string().required("Please Enter Your duration"),
      roomNo: Yup.string().required("Please Enter Your roomNo"),
      marksMax: Yup.string().required("Please Enter Your marksMax"),
      marksMin: Yup.string().required("Please Enter Your marksMin"),
    }),
    onSubmit: async values => {
      if (type === "new") {
        const { data, error } = await supabase
          .from("ExamSchedule")
          .insert([
            { brancheId: localStorage.getItem("BranchId") ?? 1,
              subject: values.subject,
              dateForm: values.dateForm,
              startTime: values.startTime,
              duration: values.duration,
              roomNo: values.roomNo,
              marksMax: values.marksMax,
              marksMin: values.marksMin,
            },
          ])
          .select()

        if (error) {
          toast.error("ExamSchedule Inserted Failed", { autoClose: 2000 })
        } else {
          toast.success("ExamSchedule Inserted", { autoClose: 2000 })
          setshow(false)
          getCountries()
          validation.resetForm()
        }
      } else {
        const { data, error } = await supabase
          .from("ExamSchedule")
          .update([
            {
              subject: values.subject,
              dateForm: values.dateForm,
              startTime: values.startTime,
              duration: values.duration,
              roomNo: values.roomNo,
              marksMax: values.marksMax,
              marksMin: values.marksMin,
            },
          ])
          .eq("id", values.id)
          .select()

        if (error) {
          toast.error("ExamSchedule Updated Failed", { autoClose: 2000 })
        } else {
          toast.success("ExamSchedule Updated", { autoClose: 2000 })
          setshow(false)
          getCountries()
          validation.resetForm()
        }
      }
    },
  })

  const navigate = useNavigate()

  useEffect(() => {
    props.setBreadcrumbItems("ExamSchedule", breadcrumbItems)
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
      .from("ExamSchedule")
      .select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
      .ilike("name", `%${search}%`)
    setSection(data)
  }

  const handelEdit = async row => {
    validation.resetForm()

    validation.setFieldValue("subject", row.subject)
    validation.setFieldValue("dateForm", row.dateForm)
    validation.setFieldValue("startTime", row.startTime)
    validation.setFieldValue("duration", row.duration)
    validation.setFieldValue("roomNo", row.roomNo)
    validation.setFieldValue("marksMax", row.marksMax)
    validation.setFieldValue("marksMin", row.marksMin)

    validation.setFieldValue("id", row.id)
    setshow(true)
    settype("edit")
  }

  const handelDelete = async id => {
    const { error } = await supabase.from("ExamSchedule").delete().eq("id", id)

    if (error) {
      toast.error("ExamSchedule Deleted Failed", { autoClose: 2000 })
    } else {
      toast.success("ExamSchedule Deleted", { autoClose: 2000 })
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
  const handleClickExcel = () => {
    const array = section

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
      name: "Subject",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.subject,
    },
    {
      name: "Date Form",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.dateForm ?? "None",
    },
    {
      name: "Start Time",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.startTime ?? "None",
    },
    {
      name: "Duration",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.duration ?? "None",
    },
    {
      name: "Room.No",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.roomNo ?? "None",
    },
    {
      name: "Marks(max)",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.marksMax ?? "None",
    },
    {
      name: "Marks(min)",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.marksMin ?? "None",
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

          <label className="col-form-label">Exam Schedule </label>
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

        <div className="d-flex justify-content-end  mb-2">
          <div></div>
          {/* Button */}
          <button className="btn btn-primary" onClick={handleClick}>
            Add Exam Schedule
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
              <CardTitle className="h4">Exam Schedule List </CardTitle>
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
                <Label htmlFor="useremail">Subject</Label>
                <select
                  id="subject"
                  name="subject"
                  className="form-control"
                  placeholder="Enter Subject"
                  type="subject"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.subject || ""}
                  invalid={
                    validation.touched.subject && validation.errors.subject
                      ? true
                      : false
                  }
                >
                  {subject?.map(el => (
                    <option value={el.subjectName}>{el.subjectName}</option>
                  ))}
                </select> 

                {validation.touched.subject && validation.errors.subject ? (
                  <FormFeedback type="invalid">
                    {validation.errors.subject}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label htmlFor="useremail">Date Form</Label>
                <input
                  id="dateForm"
                  name="dateForm"
                  className="form-control"
                  placeholder="Enter dateForm"
                  type="date"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.dateForm || ""}
                  invalid={
                    validation.touched.dateForm && validation.errors.dateForm
                      ? true
                      : false
                  }
                />

                {validation.touched.dateForm && validation.errors.dateForm ? (
                  <FormFeedback type="invalid">
                    {validation.errors.dateForm}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label htmlFor="useremail">Start Time</Label>
                <input
                  id="startTime"
                  name="startTime"
                  className="form-control"
                  placeholder="Enter startTime"
                  type="time"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.startTime || ""}
                  invalid={
                    validation.touched.startTime && validation.errors.startTime
                      ? true
                      : false
                  }
                />

                {validation.touched.startTime && validation.errors.startTime ? (
                  <FormFeedback type="invalid">
                    {validation.errors.startTime}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label htmlFor="useremail">Duration</Label>
                <input
                  id="duration"
                  name="duration"
                  className="form-control"
                  placeholder="Enter duration"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.duration || ""}
                  invalid={
                    validation.touched.duration && validation.errors.duration
                      ? true
                      : false
                  }
                />

                {validation.touched.duration && validation.errors.duration ? (
                  <FormFeedback type="invalid">
                    {validation.errors.duration}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label htmlFor="useremail">Room.No</Label>
                <input
                  id="roomNo"
                  name="roomNo"
                  className="form-control"
                  placeholder="Enter roomNo"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.roomNo || ""}
                  invalid={
                    validation.touched.roomNo && validation.errors.roomNo
                      ? true
                      : false
                  }
                />

                {validation.touched.roomNo && validation.errors.roomNo ? (
                  <FormFeedback type="invalid">
                    {validation.errors.roomNo}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label htmlFor="useremail"> Marks(max)</Label>
                <input
                  id="marksMax"
                  name="marksMax"
                  className="form-control"
                  placeholder="Enter marksMax"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.marksMax || ""}
                  invalid={
                    validation.touched.marksMax && validation.errors.marksMax
                      ? true
                      : false
                  }
                />

                {validation.touched.marksMax && validation.errors.marksMax ? (
                  <FormFeedback type="invalid">
                    {validation.errors.marksMax}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label htmlFor="useremail"> Marks(min)</Label>
                <input
                  id="marksMin"
                  name="marksMin"
                  className="form-control"
                  placeholder="Enter marksMin"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.marksMin || ""}
                  invalid={
                    validation.touched.marksMin && validation.errors.marksMin
                      ? true
                      : false
                  }
                />

                {validation.touched.marksMin && validation.errors.marksMin ? (
                  <FormFeedback type="invalid">
                    {validation.errors.marksMin}
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

export default connect(null, { setBreadcrumbItems })(ExamShedule)
