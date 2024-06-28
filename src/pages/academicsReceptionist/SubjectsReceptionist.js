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

const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)

const Subjects = props => {
  document.title =
    "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard"

  const breadcrumbItems = [
    { title: "Smart school", link: "#" },
    { title: "Academics", link: "#" },
  ]

  const [section, setSection] = useState([])
  const [show, setshow] = useState(false)
  const [type, settype] = useState("new")
  const [search, setSearch] = useState("")

  async function getCountries() {
    const { data, error } = await supabase.from("Subjects").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    setSection(data ?? [])
  }

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      subjectName: "",
      subjectCode: "",
      subjectType: "",
      id: "",
    },

    validationSchema: Yup.object({
      subjectName: Yup.string().required("Please Enter Your subject Name"),
      subjectCode: Yup.string().required("Please Enter Your subject Code"),
      subjectType: Yup.string().required("Please Enter Your subject Type"),
    }),
    onSubmit: async values => {
      if (type === "new") {
        const { data, error } = await supabase
          .from("Subjects")
          .insert([
            { brancheId: localStorage.getItem("BranchId") ?? 1,
              subjectName: values.subjectName,
              subjectCode: values.subjectCode,
              subjectType: values.subjectType,
            },
          ])
          .select()

        if (error) {
          console.log("ez", error)
          toast.error("Subject Inserted Failed", { autoClose: 2000 })
        } else {
          toast.success("Subject Inserted", { autoClose: 2000 })
          setshow(false)
          getCountries()
          validation.resetForm()
        }
      } else {
        const { data, error } = await supabase
          .from("Subjects")
          .update([
            {
              subjectName: values.subjectName,
              subjectCode: values.subjectCode,
              subjectType: values.subjectType,
            },
          ])
          .eq("id", values.id)
          .select()

        if (error) {
          toast.error("Subject Updated Failed", { autoClose: 2000 })
        } else {
          toast.success("Subject Updated", { autoClose: 2000 })
          setshow(false)
          getCountries()
          validation.resetForm()
        }
      }
    },
  })

  const navigate = useNavigate()

  useEffect(() => {
    props.setBreadcrumbItems("Subjects", breadcrumbItems)
    getCountries()
  }, [])

  const handleClick = () => {
    settype('new')
    validation.resetForm()
    setshow(true)
  }

  const handleSearch = async () => {
    const { data, error } = await supabase
      .from("Subjects")
      .select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
      .or(
`subjectName.like.%${search}%` ,
`subjectCode.like.%${search}%`,
`subjectType.like.%${search}%`     )
    setSection(data)
  }

  const handelEdit = async row => {
    validation.resetForm()
    validation.setFieldValue("subjectName", row.subjectName)
    validation.setFieldValue("subjectCode", row.subjectCode)
    validation.setFieldValue("subjectType", row.subjectType)
    validation.setFieldValue("id", row.id)
    setshow(true)
    settype("edit")
  }

  const handelDelete = async id => {
    const { error } = await supabase.from("Subjects").delete().eq("id", id)

    if (error) {
      toast.error("Subject Deleted Failed", { autoClose: 2000 })
    } else {
      toast.success("Subject Deleted", { autoClose: 2000 })
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
      name: "Subject",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.subjectName,
    },
    {
      name: "Subject Code",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.subjectCode,
    },
    {
      name: "Subject Type",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.subjectType,
    },
  ]

  return (
    <React.Fragment>
      <Row>
        <div className="d-flex mb-2">
          <div></div>
          {/* Vos éléments de filtre ici */}

          <label className="col-form-label">Subjects </label>
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
      </Row>
      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <CardTitle className="h4">Subjects List </CardTitle>
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
                <Label htmlFor="useremail">subject Name</Label>
                <Input
                  id="subjectName"
                  name="subjectName"
                  className="form-control"
                  placeholder="Enter subjectName"
                  type="subjectName"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.subjectName || ""}
                  invalid={
                    validation.touched.subjectName &&
                    validation.errors.subjectName
                      ? true
                      : false
                  }
                />
                {validation.touched.subjectName &&
                validation.errors.subjectName ? (
                  <FormFeedback type="invalid">
                    {validation.errors.subjectName}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label htmlFor="useremail">subject Code</Label>
                <Input
                  id="subjectCode"
                  name="subjectCode"
                  className="form-control"
                  placeholder="Enter subjectCode"
                  type="subjectCode"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.subjectCode || ""}
                  invalid={
                    validation.touched.subjectCode &&
                    validation.errors.subjectCode
                      ? true
                      : false
                  }
                />
                {validation.touched.subjectCode &&
                validation.errors.subjectCode ? (
                  <FormFeedback type="invalid">
                    {validation.errors.subjectCode}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label htmlFor="useremail">subject Type</Label>
                <Input
                  id="subjectType"
                  name="subjectType"
                  className="form-control"
                  placeholder="Enter subjectType"
                  type="subjectType"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.subjectType || ""}
                  invalid={
                    validation.touched.subjectType &&
                    validation.errors.subjectType
                      ? true
                      : false
                  }
                />
                {validation.touched.subjectType &&
                validation.errors.subjectType ? (
                  <FormFeedback type="invalid">
                    {validation.errors.subjectType}
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

export default connect(null, { setBreadcrumbItems })(Subjects)
