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
import _, { isEmpty } from "lodash"
import { isNil } from "lodash"
import * as XLSX from "xlsx"
const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)

const Complain = props => {
  document.title =
    "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard"

  const breadcrumbItems = [
    { title: "Smart school", link: "#" },
    { title: "Library", link: "#" },
  ]

  const [Complain, setBooks] = useState([])
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
    const { data, error } = await supabase
      .from("Complain")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
    setBooks(data ?? [])
  }

  const handleClickExcel = () => {
    const array = Complain

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

  async function getVehicles() {
    const { data, error } = await supabase
      .from("Class")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
    setclss(data ?? [])
  }

  async function getRoutes() {
    const { data, error } = await supabase
      .from("Staff")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
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
      type: "",
      source: "",
      complainBy: "",
      phone: "",
      date: "",
      description: "",
      actionTaken: "",
      assigned: "",
      note: "",
    },

    validationSchema: Yup.object({}),
    onSubmit: async values => {
      if (type === "new") {
        const { data, error } = await supabase
          .from("Complain")
          .insert([
            {
              brancheId: localStorage.getItem("BranchId") ?? 1,
              type: values.type,
              source: values.source,
              complainBy: values.complainBy,
              phone: values.phone,
              date: values.date,
              description: values.description,
              actionTaken: values.actionTaken,
              assigned: values.assigned,
              note: values.note,
              attachDocument: attachDocument,
            },
          ])
          .select()

        if (error) {
          toast.error("Complain Inserted Failed", { autoClose: 2000 })
        } else {
          toast.success("Complain Inserted", { autoClose: 2000 })
          setshow(false)
          getCountries()
          validation.resetForm()
        }
      } else {
        const { data, error } = await supabase
          .from("Complain")
          .update([
            {
              type: values.type,
              source: values.source,
              complainBy: values.complainBy,
              phone: values.phone,
              date: values.date,
              description: values.description,
              actionTaken: values.actionTaken,
              assigned: values.assigned,
              note: values.note,
              attachDocument: attachDocument,
            },
          ])
          .eq("id", values.id)
          .select()

        if (error) {
          toast.error("Complain Updated Failed", { autoClose: 2000 })
        } else {
          toast.success("Complain Updated", { autoClose: 2000 })
          setshow(false)
          getCountries()
          validation.resetForm()
        }
      }
    },
  })

  const navigate = useNavigate()

  useEffect(() => {
    props.setBreadcrumbItems("Complain", breadcrumbItems)
    getCountries()
    getVehicles()
    getRoutes()
  }, [])

  const handleClick = () => {
    setattachDocument("")
    settype("new")
    validation.resetForm()
    setshow(true)
  }

  const handleSearch = async () => {
    const { data, error } = await supabase
      .from("Complain")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
      .or(`type.ilike.%${cls}%`)
    setBooks(data ?? [])
  }

  const handleReset = async () => {
    const { data, error } = await supabase
      .from("Complain")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
    setBooks(data ?? [])
    setCls("")
  }

  const handelEdit = async row => {
    validation.resetForm()

    validation.setFieldValue("type", row.type)
    validation.setFieldValue("source", row.source)
    validation.setFieldValue("complainBy", row.complainBy)
    validation.setFieldValue("phone", row.phone)
    validation.setFieldValue("date", row.date)
    validation.setFieldValue("description", row.description)
    validation.setFieldValue("actionTaken", row.actionTaken)
    validation.setFieldValue("assigned", row.assigned)
    validation.setFieldValue("note", row.note)

    setattachDocument(attachDocument)

    validation.setFieldValue("id", row.id)
    setshow(true)
    settype("edit")
  }

  const handelDelete = async id => {
    const { error } = await supabase.from("Complain").delete().eq("id", id)

    if (error) {
      toast.error("Complain Deleted Failed", { autoClose: 2000 })
    } else {
      toast.success("Complain Deleted", { autoClose: 2000 })
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
      name: "Type",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.type,
    },
    {
      name: "Source",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.source,
    },

    {
      name: "Complain By",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.complainBy,
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
          <label className="col-form-label">Type</label>&nbsp;
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
      <div className="d-flex justify-content-end  mb-2">
        <div></div>
        {/* Button */}
        <button className="btn btn-primary" onClick={handleClick}>
          Add Complain
        </button>
        <button className="btn btn-primary ms-3" onClick={handleClickExcel}>
          Export Excel
        </button>
      </div>
      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <CardTitle className="h4">Complain List </CardTitle>
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
                  data={Complain}
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
                <Label htmlFor="useremail">Complaint Type</Label>
                <input
                  id="type"
                  name="type"
                  className="form-control"
                  placeholder="Enter type"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.type || ""}
                  invalid={
                    validation.touched.type && validation.errors.type
                      ? true
                      : false
                  }
                />

                {validation.touched.type && validation.errors.type ? (
                  <FormFeedback type="invalid">
                    {validation.errors.type}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label htmlFor="useremail">Source</Label>
                <input
                  id="source"
                  name="source"
                  className="form-control"
                  placeholder="Enter source"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.source || ""}
                  invalid={
                    validation.touched.source && validation.errors.source
                      ? true
                      : false
                  }
                />

                {validation.touched.source && validation.errors.source ? (
                  <FormFeedback type="invalid">
                    {validation.errors.source}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label htmlFor="useremail">Complain By</Label>
                <input
                  id="complainBy"
                  name="complainBy"
                  className="form-control"
                  placeholder="Enter complainBy"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.complainBy || ""}
                  invalid={
                    validation.touched.complainBy &&
                    validation.errors.complainBy
                      ? true
                      : false
                  }
                />

                {validation.touched.complainBy &&
                validation.errors.complainBy ? (
                  <FormFeedback type="invalid">
                    {validation.errors.complainBy}
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
                <Label htmlFor="useremail">description</Label>
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
                <Label htmlFor="useremail">Action Taken</Label>
                <input
                  id="actionTaken"
                  name="actionTaken"
                  className="form-control"
                  placeholder="Enter actionTaken"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.actionTaken || ""}
                  invalid={
                    validation.touched.actionTaken &&
                    validation.errors.actionTaken
                      ? true
                      : false
                  }
                />

                {validation.touched.actionTaken &&
                validation.errors.actionTaken ? (
                  <FormFeedback type="invalid">
                    {validation.errors.actionTaken}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label htmlFor="useremail">Assigned</Label>
                <input
                  id="assigned"
                  name="assigned"
                  className="form-control"
                  placeholder="Enter assigned"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.assigned || ""}
                  invalid={
                    validation.touched.assigned && validation.errors.assigned
                      ? true
                      : false
                  }
                />

                {validation.touched.assigned && validation.errors.assigned ? (
                  <FormFeedback type="invalid">
                    {validation.errors.assigned}
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
                <Label htmlFor="useremail">Date</Label>
                <input
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

export default connect(null, { setBreadcrumbItems })(Complain)
