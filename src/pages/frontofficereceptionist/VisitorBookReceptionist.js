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

const VisitorBook = props => {
  document.title =
    "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard"

  const breadcrumbItems = [
    { title: "Smart school", link: "#" },
    { title: "Library", link: "#" },
  ]

  const [VisitorBook, setBooks] = useState([])
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
    const { data, error } = await supabase.from("VisitorBook").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    setBooks(data ?? [])
  }

  async function getVehicles() {
    const { data, error } = await supabase.from("Class").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    setclss(data ?? [])
  }

  async function getRoutes() {
    const { data, error } = await supabase.from("Staff").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
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
      purpose: "",
      meetingWith: "",
      visitorName: "",
      phone: "",
      IDCard: "",
      date: "",
      inTime: "",
      outTime: "",
      attachDocument: "",
      note: "",
    },

    validationSchema: Yup.object({}),
    onSubmit: async values => {
      if (type === "new") {
        const { data, error } = await supabase
          .from("VisitorBook")
          .insert([
            { brancheId: localStorage.getItem("BranchId") ?? 1,
              purpose: values.purpose,
              meetingWith: values.meetingWith,
              visitorName: values.visitorName,
              phone: values.phone,
              IDCard: values.IDCard,
              date: values.date,
              inTime: values.inTime,
              outTime: values.outTime,
              attachDocument: attachDocument,
              note: values.note,
            },
          ])
          .select()

        if (error) {
          toast.error("VisitorBook Inserted Failed", { autoClose: 2000 })
        } else {
          toast.success("VisitorBook Inserted", { autoClose: 2000 })
          setshow(false)
          getCountries()
          validation.resetForm()
        }
      } else {
        const { data, error } = await supabase
          .from("VisitorBook")
          .update([
            {
              purpose: values.purpose,
              meetingWith: values.meetingWith,
              visitorName: values.visitorName,
              phone: values.phone,
              IDCard: values.IDCard,
              date: values.date,
              inTime: values.inTime,
              outTime: values.outTime,
              attachDocument: attachDocument,
              note: values.note,
            },
          ])
          .eq("id", values.id)
          .select()

        if (error) {
          toast.error("VisitorBook Updated Failed", { autoClose: 2000 })
        } else {
          toast.success("VisitorBook Updated", { autoClose: 2000 })
          setshow(false)
          getCountries()
          validation.resetForm()
        }
      }
    },
  })

  const navigate = useNavigate()

  useEffect(() => {
    props.setBreadcrumbItems("VisitorBook", breadcrumbItems)
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
      .from("VisitorBook")
      .select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
      .or(`visitorName.ilike.%${cls}%`)
    setBooks(data ?? [])
  }

  const handleReset = async () => {
    const { data, error } = await supabase.from("VisitorBook").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    setBooks(data ?? [])
    setCls("")
  }

  const handelEdit = async row => {
    validation.resetForm()

    validation.setFieldValue("purpose", row.purpose)
    validation.setFieldValue("meetingWith", row.meetingWith)
    validation.setFieldValue("visitorName", row.visitorName)
    validation.setFieldValue("phone", row.phone)

    validation.setFieldValue("IDCard", row.IDCard)
    validation.setFieldValue("note", row.note)
    validation.setFieldValue("inTime", row.inTime)
    validation.setFieldValue("outTime", row.outTime)

    setattachDocument(row.attachDocument)

    validation.setFieldValue("id", row.id)
    setshow(true)
    settype("edit")
  }

  const handelDelete = async id => {
    const { error } = await supabase.from("VisitorBook").delete().eq("id", id)

    if (error) {
      toast.error("VisitorBook Deleted Failed", { autoClose: 2000 })
    } else {
      toast.success("VisitorBook Deleted", { autoClose: 2000 })
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
      name: "Purpose",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.purpose,
    },
    {
      name: "Meeting With",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.meetingWith,
    },
    {
      name: "Visitor Name",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.visitorName,
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
      name: "ID Card",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.IDCard,
    },
    {
      name: "In Time",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.inTime,
    },
    {
      name: "Out Time",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.outTime,
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
          <label className="col-form-label">Visitor Name</label>&nbsp;
          <div className="col-md-2 me-1">
            <input
              type="text"
              className="form-control"
              value={cls}
              onChange={e => {
                setCls(e.target.value)
              }}
            />
          </div>
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
          <button className="btn btn-danger ms-2" onClick={handleReset}>
            Reset
          </button>
        </div>
      </Row>
      <div className="d-flex justify-content-between  mb-2">
        <div></div>
        {/* Button */}
        <button className="btn btn-primary" onClick={handleClick}>
          Add Visitor Book
        </button>
      </div>
      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <CardTitle className="h4">Visitor Book List </CardTitle>
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
                  data={VisitorBook}
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
                <Label htmlFor="useremail">Purpose</Label>
                <input
                  id="purpose"
                  name="purpose"
                  className="form-control"
                  placeholder="Enter purpose"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.purpose || ""}
                  invalid={
                    validation.touched.purpose && validation.errors.purpose
                      ? true
                      : false
                  }
                />

                {validation.touched.purpose && validation.errors.purpose ? (
                  <FormFeedback type="invalid">
                    {validation.errors.purpose}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label htmlFor="useremail">Meeting With</Label>
                <input
                  id="meetingWith"
                  name="meetingWith"
                  className="form-control"
                  placeholder="Enter meetingWith"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.meetingWith || ""}
                  invalid={
                    validation.touched.meetingWith &&
                    validation.errors.meetingWith
                      ? true
                      : false
                  }
                />

                {validation.touched.meetingWith &&
                validation.errors.meetingWith ? (
                  <FormFeedback type="invalid">
                    {validation.errors.meetingWith}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label htmlFor="useremail">Visitor Name</Label>
                <input
                  id="visitorName"
                  name="visitorName"
                  className="form-control"
                  placeholder="Enter visitorName"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.visitorName || ""}
                  invalid={
                    validation.touched.visitorName &&
                    validation.errors.visitorName
                      ? true
                      : false
                  }
                />

                {validation.touched.visitorName &&
                validation.errors.visitorName ? (
                  <FormFeedback type="invalid">
                    {validation.errors.visitorName}
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
                <Label htmlFor="useremail">ID Card</Label>
                <input
                  id="IDCard"
                  name="IDCard"
                  className="form-control"
                  placeholder="Enter IDCard"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.IDCard || ""}
                  invalid={
                    validation.touched.IDCard && validation.errors.IDCard
                      ? true
                      : false
                  }
                />

                {validation.touched.IDCard && validation.errors.IDCard ? (
                  <FormFeedback type="invalid">
                    {validation.errors.IDCard}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label htmlFor="useremail">In Time</Label>
                <input
                  id="inTime"
                  name="inTime"
                  className="form-control"
                  placeholder="Enter inTime"
                  type="time"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.inTime || ""}
                  invalid={
                    validation.touched.inTime && validation.errors.inTime
                      ? true
                      : false
                  }
                />

                {validation.touched.inTime && validation.errors.inTime ? (
                  <FormFeedback type="invalid">
                    {validation.errors.inTime}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label htmlFor="useremail">Out Time</Label>
                <input
                  id="outTime"
                  name="outTime"
                  className="form-control"
                  placeholder="Enter outTime"
                  type="time"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.outTime || ""}
                  invalid={
                    validation.touched.outTime && validation.errors.outTime
                      ? true
                      : false
                  }
                />

                {validation.touched.outTime && validation.errors.outTime ? (
                  <FormFeedback type="invalid">
                    {validation.errors.outTime}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label htmlFor="useremail">Attach Document</Label>

                <Row>
                  {!isEmpty(attachDocument) && !isNil(attachDocument) && (
                    <Col md={1}>
                      <a
                        href={`https://ypduxejepwdmssduohpi.supabase.co/storage/v1/object/public/uploads/${attachDocument}`}
                        alt="link"
                        target="_blank"
                        rel="noreferrer"
                      >
                        link to AttachDocument
                      </a>
                    </Col>
                  )}

                  <Col>
                    <input
                      onChange={e => uploadDoc(e, setattachDocument)}
                      className="form-control"
                      type="file"
                    />
                  </Col>
                </Row>
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

export default connect(null, { setBreadcrumbItems })(VisitorBook)
