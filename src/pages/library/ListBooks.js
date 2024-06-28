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

const ListBooks = props => {
  document.title =
    "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard"

  const breadcrumbItems = [
    { title: "Smart school", link: "#" },
    { title: "Library", link: "#" },
  ]

  const [Books, setBooks] = useState([])
  const [Routes, setRoutes] = useState([])
  const [vehicles, setVehicles] = useState([])

  const [show, setshow] = useState(false)
  const [type, settype] = useState("new")
  const [search, setSearch] = useState("")

  async function getCountries() {
    const { data, error } = await supabase
      .from("Books")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
    setBooks(data ?? [])
  }

  async function getVehicles() {
    const { data, error } = await supabase
      .from("Vehicles")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
    setVehicles(data ?? [])
  }

  async function getRoutes() {
    const { data, error } = await supabase
      .from("Routes")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
    setRoutes(data ?? [])
  }

  const handleClickExcel = () => {
    const array = Books

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

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      title: "",
      ISBNNumber: "",
      author: "",
      rackNumber: "",
      price: "",
      number: "",
      publisher: "",
      subject: "",
      Qty: "",
      postDate: "",
      description: "",
    },

    validationSchema: Yup.object({
      title: Yup.string().required("Please Enter Your title"),
      ISBNNumber: Yup.string().required("Please Enter Your ISBNNumber"),
      author: Yup.string().required("Please Enter Your author"),
      rackNumber: Yup.string().required("Please Enter Your rackNumber"),
      price: Yup.string().required("Please Enter Your price"),
      number: Yup.string().required("Please Enter Your number"),
      publisher: Yup.string().required("Please Enter Your publisher"),

      subject: Yup.string().required("Please Enter Your subject"),
      Qty: Yup.string().required("Please Enter Your Qty"),
    }),
    onSubmit: async values => {
      if (type === "new") {
        const { data, error } = await supabase
          .from("Books")
          .insert([
            {
              brancheId: localStorage.getItem("BranchId") ?? 1,
              title: values.title,
              ISBNNumber: values.ISBNNumber,
              author: values.author,
              rackNumber: values.rackNumber,
              price: values.price,
              number: values.number,
              publisher: values.publisher,
              subject: values.subject,
              Qty: values.Qty,
              postDate: values.postDate,
              description: values.description,
            },
          ])
          .select()

        if (error) {
          toast.error("Books Inserted Failed", { autoClose: 2000 })
        } else {
          toast.success("Books Inserted", { autoClose: 2000 })
          setshow(false)
          getCountries()
          validation.resetForm()
        }
      } else {
        const { data, error } = await supabase
          .from("Books")
          .update([
            {
              title: values.title,
              ISBNNumber: values.ISBNNumber,
              author: values.author,
              rackNumber: values.rackNumber,
              price: values.price,
              number: values.number,
              publisher: values.publisher,
              subject: values.subject,
              Qty: values.Qty,
              postDate: values.postDate,
              description: values.description,
            },
          ])
          .eq("id", values.id)
          .select()

        if (error) {
          toast.error("Books Updated Failed", { autoClose: 2000 })
        } else {
          toast.success("Books Updated", { autoClose: 2000 })
          setshow(false)
          getCountries()
          validation.resetForm()
        }
      }
    },
  })

  const navigate = useNavigate()

  useEffect(() => {
    props.setBreadcrumbItems("Books", breadcrumbItems)
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
      .from("Books")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
      .ilike("title", `%${search}%`)
    setBooks(data ?? [])
  }

  const handelEdit = async row => {
    validation.resetForm()

    validation.setFieldValue("title", row.title)
    validation.setFieldValue("ISBNNumber", row.ISBNNumber)
    validation.setFieldValue("author", row.author)
    validation.setFieldValue("rackNumber", row.rackNumber)
    validation.setFieldValue("number", row.number)
    validation.setFieldValue("publisher", row.publisher)
    validation.setFieldValue("subject", row.subject)
    validation.setFieldValue("Qty", row.Qty)
    validation.setFieldValue("postDate", row.postDate)
    validation.setFieldValue("price", row.price)
    validation.setFieldValue("description", row.description)

    validation.setFieldValue("id", row.id)
    setshow(true)
    settype("edit")
  }

  const handelDelete = async id => {
    const { error } = await supabase.from("Books").delete().eq("id", id)

    if (error) {
      toast.error("Books Deleted Failed", { autoClose: 2000 })
    } else {
      toast.success("Books Deleted", { autoClose: 2000 })
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
      name: "Title",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.title,
    },
    {
      name: "ISBNNumber",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.ISBNNumber,
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
      name: "publisher",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.publisher,
    },
    {
      name: "number",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.number,
    },
    {
      name: "rackNumber",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.rackNumber,
    },

    {
      name: "price",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.price,
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

          <label className="col-form-label">Books </label>
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
            Add Books
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
              <CardTitle className="h4">Books List </CardTitle>
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
                  data={Books}
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
                <Label htmlFor="useremail">Title</Label>
                <input
                  id="title"
                  name="title"
                  className="form-control"
                  placeholder="Enter title"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.title || ""}
                  invalid={
                    validation.touched.title && validation.errors.title
                      ? true
                      : false
                  }
                />

                {validation.touched.title && validation.errors.title ? (
                  <FormFeedback type="invalid">
                    {validation.errors.title}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label htmlFor="useremail">ISBN Number</Label>
                <input
                  id="ISBNNumber"
                  name="ISBNNumber"
                  className="form-control"
                  placeholder="Enter ISBNNumber"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.ISBNNumber || ""}
                  invalid={
                    validation.touched.ISBNNumber &&
                    validation.errors.ISBNNumber
                      ? true
                      : false
                  }
                />

                {validation.touched.ISBNNumber &&
                validation.errors.ISBNNumber ? (
                  <FormFeedback type="invalid">
                    {validation.errors.ISBNNumber}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label htmlFor="useremail">Author</Label>
                <input
                  id="author"
                  name="author"
                  className="form-control"
                  placeholder="Enter author"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.author || ""}
                  invalid={
                    validation.touched.author && validation.errors.author
                      ? true
                      : false
                  }
                />

                {validation.touched.author && validation.errors.author ? (
                  <FormFeedback type="invalid">
                    {validation.errors.author}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label htmlFor="useremail">Rack Number</Label>
                <input
                  id="rackNumber"
                  name="rackNumber"
                  className="form-control"
                  placeholder="Enter rackNumber"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.rackNumber || ""}
                  invalid={
                    validation.touched.rackNumber &&
                    validation.errors.rackNumber
                      ? true
                      : false
                  }
                />

                {validation.touched.rackNumber &&
                validation.errors.rackNumber ? (
                  <FormFeedback type="invalid">
                    {validation.errors.rackNumber}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label htmlFor="useremail">Price ($)</Label>
                <input
                  id="price"
                  name="price"
                  className="form-control"
                  placeholder="Enter price"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.price || ""}
                  invalid={
                    validation.touched.price && validation.errors.price
                      ? true
                      : false
                  }
                />

                {validation.touched.price && validation.errors.price ? (
                  <FormFeedback type="invalid">
                    {validation.errors.price}
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
                <Label htmlFor="useremail">Book Number</Label>
                <input
                  id="number"
                  name="number"
                  className="form-control"
                  placeholder="Enter number"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.number || ""}
                  invalid={
                    validation.touched.number && validation.errors.number
                      ? true
                      : false
                  }
                />

                {validation.touched.number && validation.errors.number ? (
                  <FormFeedback type="invalid">
                    {validation.errors.number}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label htmlFor="useremail">Publisher</Label>
                <input
                  id="publisher"
                  name="publisher"
                  className="form-control"
                  placeholder="Enter publisher"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.publisher || ""}
                  invalid={
                    validation.touched.publisher && validation.errors.publisher
                      ? true
                      : false
                  }
                />

                {validation.touched.publisher && validation.errors.publisher ? (
                  <FormFeedback type="invalid">
                    {validation.errors.publisher}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label htmlFor="useremail">Subject</Label>
                <input
                  id="subject"
                  name="subject"
                  className="form-control"
                  placeholder="Enter subject"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.subject || ""}
                  invalid={
                    validation.touched.subject && validation.errors.subject
                      ? true
                      : false
                  }
                />

                {validation.touched.subject && validation.errors.subject ? (
                  <FormFeedback type="invalid">
                    {validation.errors.subject}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label htmlFor="useremail">Qty</Label>
                <input
                  id="Qty"
                  name="Qty"
                  className="form-control"
                  placeholder="Enter Qty"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.Qty || ""}
                  invalid={
                    validation.touched.Qty && validation.errors.Qty
                      ? true
                      : false
                  }
                />

                {validation.touched.Qty && validation.errors.Qty ? (
                  <FormFeedback type="invalid">
                    {validation.errors.Qty}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label htmlFor="useremail">post Date</Label>
                <input
                  id="postDate"
                  name="postDate"
                  className="form-control"
                  placeholder="Enter postDate"
                  type="date"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.postDate || ""}
                  invalid={
                    validation.touched.postDate && validation.errors.postDate
                      ? true
                      : false
                  }
                />

                {validation.touched.postDate && validation.errors.postDate ? (
                  <FormFeedback type="invalid">
                    {validation.errors.postDate}
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

export default connect(null, { setBreadcrumbItems })(ListBooks)
