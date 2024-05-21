import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import DataTable from "react-data-table-component"
import { createClient } from "@supabase/supabase-js"
import { v4 as uuidv4 } from "uuid"

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
import { isEmpty } from "lodash"
import { isNil } from "lodash"

const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)

const PhoneCallLog = props => {
  document.title =
    "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard"

  const breadcrumbItems = [
    { title: "Smart school", link: "#" },
    { title: "Library", link: "#" },
  ]

  const [PhoneCallLog, setBooks] = useState([])
  const [staff, setStaff] = useState([])
  const [clss, setclss] = useState([])

  const [show, setshow] = useState(false)
  const [type, settype] = useState("new")

  const [cls, setCls] = useState("")
  const [source, setSource] = useState("")
  const [date, setDate] = useState("")
  const [nextFollowUpDate, setnextFollowUpDate] = useState("")
  const [status, setStatus] = useState("")
  const [attachDocument, setattachDocument] = useState("")

  async function getCountries() {
    const { data, error } = await supabase.from("PhoneCallLog").select("*")
    setBooks(data ?? [])
  }

  async function getVehicles() {
    const { data, error } = await supabase.from("Class").select("*")
    setclss(data ?? [])
  }

  async function getRoutes() {
    const { data, error } = await supabase.from("Staff").select("*")
    setStaff(data ?? [])
  }

  async function uploadDoc(e, setstate) {
    let file = e.target.files[0]

    const uuidv4Val = uuidv4()

    const { data, error } = await supabase.storage
      .from("uploads")
      .upload(uuidv4Val, file)

    if (data) {
      //   //   to get image
      //   const { data: datas, error: errors } = await supabase.storage
      //     .from("uploads")
      //     .download(data?.path)
      //   const url = URL.createObjectURL(datas)
      setstate(data?.path)
    } else {
      console.log(error)
    }
  }

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: "",
      phone: "",
      date: "",
      description: "",
      nextFollowUpDate: "",
      callDuration: "",
      note: "",
      callType: "",
    },

    validationSchema: Yup.object({}),
    onSubmit: async values => {
      if (type === "new") {
        const { data, error } = await supabase
          .from("PhoneCallLog")
          .insert([
            {
              name: values.name,
              phone: values.phone,
              date: values.date,
              description: values.description,
              nextFollowUpDate: values.nextFollowUpDate,
              callDuration: values.callDuration,
              note: values.note,
              callType: values.callType,
            },
          ])
          .select()

        if (error) {
          toast.error("PhoneCallLog Inserted Failed", { autoClose: 2000 })
        } else {
          toast.success("PhoneCallLog Inserted", { autoClose: 2000 })
          setshow(false)
          getCountries()
          validation.resetForm()
        }
      } else {
        const { data, error } = await supabase
          .from("PhoneCallLog")
          .update([
            {
              name: values.name,
              phone: values.phone,
              date: values.date,
              description: values.description,
              nextFollowUpDate: values.nextFollowUpDate,
              callDuration: values.callDuration,
              note: values.note,
              callType: values.callType,
            },
          ])
          .eq("id", values.id)
          .select()

        if (error) {
          toast.error("PhoneCallLog Updated Failed", { autoClose: 2000 })
        } else {
          toast.success("PhoneCallLog Updated", { autoClose: 2000 })
          setshow(false)
          getCountries()
          validation.resetForm()
        }
      }
    },
  })

  const navigate = useNavigate()

  useEffect(() => {
    props.setBreadcrumbItems("PhoneCallLog", breadcrumbItems)
    getCountries()
    getVehicles()
    getRoutes()
  }, [])

  const handleClick = () => {
    settype("new")
    validation.resetForm()
    setshow(true)
  }

  const handleSearch = async () => {
    const { data, error } = await supabase
      .from("PhoneCallLog")
      .select("*")
      .or(`name.ilike.%${cls}%`)
    setBooks(data ?? [])
  }

  const handleReset = async () => {
    const { data, error } = await supabase.from("PhoneCallLog").select("*")
    setBooks(data ?? [])
    setCls("")
  }

  const handelEdit = async row => {
    validation.resetForm()

    validation.setFieldValue("name", row.name)
    validation.setFieldValue("phone", row.phone)
    validation.setFieldValue("date", row.date)
    validation.setFieldValue("description", row.description)
    validation.setFieldValue("nextFollowUpDate", row.nextFollowUpDate)
    validation.setFieldValue("callDuration", row.callDuration)
    validation.setFieldValue("note", row.note)
    validation.setFieldValue("callType", row.callType)

    validation.setFieldValue("id", row.id)
    setshow(true)
    settype("edit")
  }

  const handelDelete = async id => {
    const { error } = await supabase.from("PhoneCallLog").delete().eq("id", id)

    if (error) {
      toast.error("PhoneCallLog Deleted Failed", { autoClose: 2000 })
    } else {
      toast.success("PhoneCallLog Deleted", { autoClose: 2000 })
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
      name: "Name",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.name,
    },
    {
      name: "Phone",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.phone,
    },
    {
      name: "Date",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.date,
    },
    {
      name: "Description",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.description,
    },
    {
      name: "Next Follow Up Date",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.nextFollowUpDate,
    },
    {
      name: "Call Duration",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.callDuration,
    },
    {
      name: "Note",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.note,
    },
    {
      name: "Call Type",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.callType,
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
        <div className="col-md-6">
          <Row>
            <div className="col-md-6">
              <label className="col-form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={cls}
                onChange={e => {
                  setCls(e.target.value)
                }}
              />
            </div>

            <div className="col-md-12 mt-4">
              <button className="btn btn-primary" onClick={handleSearch}>
                Search
              </button>
              <button className="btn btn-danger ms-2" onClick={handleReset}>
                Reset
              </button>
            </div>
          </Row>
        </div>
      </Row>
      <div className="d-flex justify-content-between  mb-2">
        <div></div>
        {/* Button */}
        <button className="btn btn-primary" onClick={handleClick}>
          Add PhoneCallLog
        </button>
      </div>
      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <CardTitle className="h4">PhoneCallLog List </CardTitle>
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
                  data={PhoneCallLog}
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
                <input
                  id="name"
                  name="name"
                  className="form-control"
                  placeholder="Enter name"
                  type="text"
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
                <Label htmlFor="useremail">Phone</Label>
                <input
                  id="phone"
                  name="phone"
                  className="form-control"
                  placeholder="Enter phone"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.phone || ""}
                  invalid={
                    validation.touched.phone && validation.errors.phone
                      ? true
                      : false
                  }
                />

                {validation.touched.phone && validation.errors.phone ? (
                  <FormFeedback type="invalid">
                    {validation.errors.phone}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label htmlFor="useremail">Date</Label>
                <input
                  id="date"
                  name="date"
                  className="form-control"
                  placeholder="Enter date"
                  type="Date"
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

              <div className="mb-3">
                <Label htmlFor="useremail">Next Follow Up Date</Label>
                <input
                  id="nextFollowUpDate"
                  name="nextFollowUpDate"
                  className="form-control"
                  placeholder="Enter nextFollowUpDate"
                  type="date"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.nextFollowUpDate || ""}
                  invalid={
                    validation.touched.nextFollowUpDate &&
                    validation.errors.nextFollowUpDate
                      ? true
                      : false
                  }
                />

                {validation.touched.nextFollowUpDate &&
                validation.errors.nextFollowUpDate ? (
                  <FormFeedback type="invalid">
                    {validation.errors.nextFollowUpDate}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label htmlFor="useremail">Call Duration</Label>
                <input
                  id="callDuration"
                  name="callDuration"
                  className="form-control"
                  placeholder="Enter callDuration"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.callDuration || ""}
                  invalid={
                    validation.touched.callDuration &&
                    validation.errors.callDuration
                      ? true
                      : false
                  }
                />

                {validation.touched.callDuration &&
                validation.errors.callDuration ? (
                  <FormFeedback type="invalid">
                    {validation.errors.callDuration}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label htmlFor="useremail">Note</Label>
                <input
                  id="note"
                  name="note"
                  className="form-control"
                  placeholder="Enter note"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.note || ""}
                  invalid={
                    validation.touched.note && validation.errors.note
                      ? true
                      : false
                  }
                />

                {validation.touched.note && validation.errors.note ? (
                  <FormFeedback type="invalid">
                    {validation.errors.note}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label htmlFor="useremail">Call Type</Label>
                <select
                  id="callType"
                  name="callType"
                  className="form-control"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.callType || ""}
                  invalid={
                    validation.touched.callType && validation.errors.callType
                      ? true
                      : false
                  }
                >
                  <option value={"Incoming"}>Incoming </option>
                  <option value={"Outgoing"}>Outgoing </option>
                </select>

                {validation.touched.callType && validation.errors.callType ? (
                  <FormFeedback type="invalid">
                    {validation.errors.callType}
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

export default connect(null, { setBreadcrumbItems })(PhoneCallLog)
