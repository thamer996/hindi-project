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
  Label,
  FormFeedback,
  Form,
} from "reactstrap"

import { connect } from "react-redux"

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../../store/actions"
import { createClient } from "@supabase/supabase-js"
import { v4 as uuidv4 } from "uuid"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useFormik } from "formik"
import * as Yup from "yup"
import { isEmpty } from "lodash"
import { isNil } from "lodash"
import DataTable from "react-data-table-component"

const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)

const Purpose = props => {
  document.title =
    "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard"

  const breadcrumbItems = [
    { title: "Smart school", link: "#" },
    { title: "Library", link: "#" },
  ]

  const [Purpose, setBooks] = useState([])
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
    const { data, error } = await supabase.from("Purpose").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
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
      type: "",
      description: "",
    },

    validationSchema: Yup.object({}),
    onSubmit: async values => {
      if (type === "new") {
        const { data, error } = await supabase
          .from("Purpose")
          .insert([
            { brancheId: localStorage.getItem("BranchId") ?? 1,
              type: values.type,
              description: values.description,
            },
          ])
          .select()

        if (error) {
          toast.error("Purpose Inserted Failed", { autoClose: 2000 })
        } else {
          toast.success("Purpose Inserted", { autoClose: 2000 })
          setshow(false)
          getCountries()
          validation.resetForm()
        }
      } else {
        const { data, error } = await supabase
          .from("Purpose")
          .update([
            {
              type: values.type,
              description: values.description,
            },
          ])
          .eq("id", values.id)
          .select()

        if (error) {
          toast.error("Purpose Updated Failed", { autoClose: 2000 })
        } else {
          toast.success("Purpose Updated", { autoClose: 2000 })
          setshow(false)
          getCountries()
          validation.resetForm()
        }
      }
    },
  })

  const navigate = useNavigate()

  useEffect(() => {
    props.setBreadcrumbItems("Purpose", breadcrumbItems)
    getCountries()
    getVehicles()
    getRoutes()
  }, [])

  const handleClick = () => {
    console.log("eeeeeeeeeeeee")
    settype("new")
    validation.resetForm()
    setshow(true)
  }

  const handleSearch = async () => {
    const { data, error } = await supabase
      .from("Purpose")
      .select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
      .or(`type.ilike.%${cls}%`)
    setBooks(data ?? [])
  }

  const handleReset = async () => {
    const { data, error } = await supabase.from("Purpose").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    setBooks(data ?? [])
    setCls("")
  }

  const handelEdit = async row => {
    validation.resetForm()

    validation.setFieldValue("type", row.type)
    validation.setFieldValue("description", row.description)

    setattachDocument(attachDocument)

    validation.setFieldValue("id", row.id)
    setshow(true)
    settype("edit")
  }

  const handelDelete = async id => {
    const { error } = await supabase.from("Purpose").delete().eq("id", id)

    if (error) {
      toast.error("Purpose Deleted Failed", { autoClose: 2000 })
    } else {
      toast.success("Purpose Deleted", { autoClose: 2000 })
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
      name: "Description",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.description,
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
      <div className="d-flex justify-content-between  mb-2">
        <div></div>
        {/* Button */}
        <button className="btn btn-primary" onClick={handleClick}>
          Add Purpose
        </button>
      </div>
      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <CardTitle className="h4">Purpose List </CardTitle>
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
                  data={Purpose}
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
                <Label htmlFor="useremail">Purpose Type</Label>
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
export default connect(null, { setBreadcrumbItems })(Purpose)
