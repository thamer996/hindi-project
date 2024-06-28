import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import DataTable from "react-data-table-component"
import { createClient } from "@supabase/supabase-js"
import * as XLSX from "xlsx"

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
import _ from "lodash"

const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)

const AdmissionEnquiry = props => {
  document.title =
    "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard"

  const breadcrumbItems = [
    { title: "Smart school", link: "#" },
    { title: "Library", link: "#" },
  ]

  const [AdmissionEnquiry, setBooks] = useState([])
  const [staff, setStaff] = useState([])
  const [clss, setclss] = useState([])

  const [show, setshow] = useState(false)
  const [type, settype] = useState("new")

  const [cls, setCls] = useState("")
  const [source, setSource] = useState("")
  const [date, setDate] = useState("")
  const [nextFollowUpDate, setnextFollowUpDate] = useState("")
  const [status, setStatus] = useState("")

  async function getCountries() {
    const { data, error } = await supabase
      .from("AdmissionEnquiry")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
    setBooks(data ?? [])
  }

  const handleClickExcel = () => {
    const array = AdmissionEnquiry

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

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
      description: "",
      note: "",
      date: "",
      nextFollowUpDate: "",
      assigned: "",
      reference: "",
      source: "",
      numberOfChild: "",
    },

    validationSchema: Yup.object({}),
    onSubmit: async values => {
      if (type === "new") {
        const { data, error } = await supabase
          .from("AdmissionEnquiry")
          .insert([
            {
              brancheId: localStorage.getItem("BranchId") ?? 1,
              name: values.name,
              class: values.class,
              phone: values.phone,
              email: values.email,
              address: values.address,
              description: values.description,
              note: values.note,
              date: values.date,
              nextFollowUpDate: values.nextFollowUpDate,
              assigned: values.assigned,
              reference: values.reference,
              source: values.source,
              numberOfChild: values.numberOfChild,
            },
          ])
          .select()

        if (error) {
          toast.error("AdmissionEnquiry Inserted Failed", { autoClose: 2000 })
        } else {
          toast.success("AdmissionEnquiry Inserted", { autoClose: 2000 })
          setshow(false)
          getCountries()
          validation.resetForm()
        }
      } else {
        const { data, error } = await supabase
          .from("AdmissionEnquiry")
          .update([
            {
              name: values.name,
              class: values.class,
              phone: values.phone,
              email: values.email,
              address: values.address,
              description: values.description,
              note: values.note,
              date: values.date,
              nextFollowUpDate: values.nextFollowUpDate,
              assigned: values.assigned,
              reference: values.reference,
              source: values.source,
              numberOfChild: values.numberOfChild,
            },
          ])
          .eq("id", values.id)
          .select()

        if (error) {
          toast.error("AdmissionEnquiry Updated Failed", { autoClose: 2000 })
        } else {
          toast.success("AdmissionEnquiry Updated", { autoClose: 2000 })
          setshow(false)
          getCountries()
          validation.resetForm()
        }
      }
    },
  })

  const navigate = useNavigate()

  useEffect(() => {
    props.setBreadcrumbItems("AdmissionEnquiry", breadcrumbItems)
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
      .from("AdmissionEnquiry")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
      .or(
        `class.ilike.%${cls}%`,
        `date.ilike.%${date}%`,
        `nextFollowUpDate.ilike.%${nextFollowUpDate}%`,
      )
    setBooks(data ?? [])
  }

  const handleReset = async () => {
    const { data, error } = await supabase
      .from("AdmissionEnquiry")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)

    setBooks(data ?? [])
    setCls("")
    setDate(null)
    setnextFollowUpDate(null)
  }

  const handelEdit = async row => {
    validation.resetForm()

    validation.setFieldValue("name", row.name)
    validation.setFieldValue("phone", row.phone)
    validation.setFieldValue("email", row.email)
    validation.setFieldValue("address", row.address)

    validation.setFieldValue("description", row.description)
    validation.setFieldValue("note", row.note)
    validation.setFieldValue("date", row.date)
    validation.setFieldValue("nextFollowUpDate", row.nextFollowUpDate)
    validation.setFieldValue("assigned", row.assigned)
    validation.setFieldValue("reference", row.reference)
    validation.setFieldValue("source", row.source)
    validation.setFieldValue("class", row.class)
    validation.setFieldValue("numberOfChild", row.numberOfChild)

    validation.setFieldValue("id", row.id)
    setshow(true)
    settype("edit")
  }

  const handelDelete = async id => {
    const { error } = await supabase
      .from("AdmissionEnquiry")
      .delete()
      .eq("id", id)

    if (error) {
      toast.error("AdmissionEnquiry Deleted Failed", { autoClose: 2000 })
    } else {
      toast.success("AdmissionEnquiry Deleted", { autoClose: 2000 })
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
      name: "phone",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.phone,
    },
    {
      name: "email",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.email,
    },
    {
      name: "address",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.address,
    },
    {
      name: "date",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.date,
    },
    {
      name: "nextFollowUpDate",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.nextFollowUpDate,
    },
    {
      name: "source",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.source,
    },
    {
      name: "class",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.class,
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
          <label className="col-form-label">Class</label>&nbsp;
          <div className="col-md-2 me-1">
            <select
              className="form-control"
              value={cls}
              onChange={e => {
                setCls(e.target.value)
              }}
            >
              <option value={""}>select</option>
              {clss?.map(el => (
                <option value={el.className}> {el.className}</option>
              ))}
            </select>
          </div>
          <label className="col-form-label">Enquiry To Date</label>&nbsp;
          <div className="col-md-2 me-1">
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={e => {
                setDate(e.target.value)
              }}
            />
          </div>
          <label className="col-form-label">Enquiry next FollowUp Date</label>
          &nbsp;
          <div className="col-md-2 me-1">
            <input
              type="date"
              className="form-control"
              placeholder=""
              value={nextFollowUpDate}
              onChange={e => {
                setnextFollowUpDate(e.target.value)
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
          Add Admission Enquiry
        </button>
        <button className="btn btn-primary ms-3" onClick={handleClickExcel}>
          Export Excel
        </button>
      </div>
      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <CardTitle className="h4">Admission Enquiry List </CardTitle>
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
                  data={AdmissionEnquiry}
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
                <Label htmlFor="useremail">name</Label>
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
                <Label htmlFor="useremail">Email</Label>
                <input
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter email"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.email || ""}
                  invalid={
                    validation.touched.email && validation.errors.email
                      ? true
                      : false
                  }
                />

                {validation.touched.email && validation.errors.email ? (
                  <FormFeedback type="invalid">
                    {validation.errors.email}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label htmlFor="useremail">Address</Label>
                <input
                  id="address"
                  name="address"
                  className="form-control"
                  placeholder="Enter address"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.address || ""}
                  invalid={
                    validation.touched.address && validation.errors.address
                      ? true
                      : false
                  }
                />

                {validation.touched.address && validation.errors.address ? (
                  <FormFeedback type="invalid">
                    {validation.errors.address}
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
                <Label htmlFor="useremail">assigned</Label>
                <select
                  id="assigned"
                  name="assigned"
                  className="form-control"
                  placeholder="Enter assigned"
                  type="date"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.assigned || ""}
                  invalid={
                    validation.touched.assigned && validation.errors.assigned
                      ? true
                      : false
                  }
                >
                  <option value={""}> select </option>
                  {staff?.map(el => (
                    <option value={el.firstName}> {el.firstName}</option>
                  ))}
                </select>

                {validation.touched.assigned && validation.errors.assigned ? (
                  <FormFeedback type="invalid">
                    {validation.errors.assigned}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label htmlFor="useremail">Reference</Label>
                <input
                  id="reference"
                  name="reference"
                  className="form-control"
                  placeholder="Enter reference"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.reference || ""}
                  invalid={
                    validation.touched.reference && validation.errors.reference
                      ? true
                      : false
                  }
                />

                {validation.touched.reference && validation.errors.reference ? (
                  <FormFeedback type="invalid">
                    {validation.errors.reference}
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
                <Label htmlFor="useremail">Class</Label>
                <select
                  id="class"
                  name="class"
                  className="form-control"
                  placeholder="Enter class"
                  type="date"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.class || ""}
                  invalid={
                    validation.touched.class && validation.errors.class
                      ? true
                      : false
                  }
                >
                  <option value={""}> select </option>
                  {clss?.map(el => (
                    <option value={el.className}> {el.className}</option>
                  ))}
                </select>

                {validation.touched.class && validation.errors.class ? (
                  <FormFeedback type="invalid">
                    {validation.errors.class}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label htmlFor="useremail">Number Of Child</Label>
                <input
                  id="numberOfChild"
                  name="numberOfChild"
                  className="form-control"
                  placeholder="Enter numberOfChild"
                  type="number"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.numberOfChild || ""}
                  invalid={
                    validation.touched.numberOfChild &&
                    validation.errors.numberOfChild
                      ? true
                      : false
                  }
                />

                {validation.touched.numberOfChild &&
                validation.errors.numberOfChild ? (
                  <FormFeedback type="invalid">
                    {validation.errors.numberOfChild}
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

export default connect(null, { setBreadcrumbItems })(AdmissionEnquiry)
