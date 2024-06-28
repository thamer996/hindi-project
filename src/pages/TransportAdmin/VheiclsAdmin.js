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

const Vehicles = props => {
  document.title =
    "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard"

  const breadcrumbItems = [
    { title: "Smart school", link: "#" },
    { title: "Transport", link: "#" },
  ]

  const [section, setSection] = useState([])

  const [sections, setSections] = useState([])
  const [clas, setClas] = useState([])
  const [subject, setSubject] = useState([])

  const [show, setshow] = useState(false)
  const [type, settype] = useState("new")
  const [search, setSearch] = useState("")

  async function getCountries() {
    const { data, error } = await supabase.from("Vehicles").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
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
      vehicleNumber: "",
      vehicleModel: "",
      yearMade: "",
      registrationNumber: "",
      chasisNumber: "",
      maxSeatingCapacity: "",
      driverName: "",
      driverLicence: "",
      driverContact: "",
    },

    validationSchema: Yup.object({
      vehicleNumber: Yup.string().required("Please Enter Your name"),
    }),
    onSubmit: async values => {
      if (type === "new") {
        const { data, error } = await supabase
          .from("Vehicles")
          .insert([
            { brancheId: localStorage.getItem("BranchId") ?? 1,
              vehicleNumber: values.vehicleNumber,
              vehicleModel: values.vehicleModel,
              yearMade: values.yearMade,
              registrationNumber: values.registrationNumber,
              chasisNumber: values.chasisNumber,
              maxSeatingCapacity: values.maxSeatingCapacity,
              driverName: values.driverName,
              driverLicence: values.driverLicence,
              driverContact: values.driverContact,
            },
          ])
          .select()

        if (error) {
          toast.error("Vehicles Inserted Failed", { autoClose: 2000 })
        } else {
          toast.success("Vehicles Inserted", { autoClose: 2000 })
          setshow(false)
          getCountries()
          validation.resetForm()
        }
      } else {
        const { data, error } = await supabase
          .from("Vehicles")
          .update([
            {
                vehicleNumber: values.vehicleNumber,
                vehicleModel: values.vehicleModel,
                yearMade: values.yearMade,
                registrationNumber: values.registrationNumber,
                chasisNumber: values.chasisNumber,
                maxSeatingCapacity: values.maxSeatingCapacity,
                driverName: values.driverName,
                driverLicence: values.driverLicence,
                driverContact: values.driverContact,
            },
          ])
          .eq("id", values.id)
          .select()

        if (error) {
          toast.error("Vehicles Updated Failed", { autoClose: 2000 })
        } else {
          toast.success("Vehicles Updated", { autoClose: 2000 })
          setshow(false)
          getCountries()
          validation.resetForm()
        }
      }
    },
  })

  const navigate = useNavigate()

  useEffect(() => {
    props.setBreadcrumbItems("Vehicles", breadcrumbItems)
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
      .from("Vehicles")
      .select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
      .ilike("vehicleNumber", `%${search}%`)
    setSection(data)
  }

  const handelEdit = async row => {
    validation.resetForm()

    validation.setFieldValue("vehicleNumber", row.vehicleNumber)
    validation.setFieldValue("vehicleModel", row.vehicleModel)
    validation.setFieldValue("yearMade", row.yearMade)
    validation.setFieldValue("registrationNumber", row.registrationNumber)
    validation.setFieldValue("chasisNumber", row.chasisNumber)
    validation.setFieldValue("maxSeatingCapacity", row.maxSeatingCapacity)
    validation.setFieldValue("driverName", row.driverName)
    validation.setFieldValue("driverLicence", row.driverLicence)
    validation.setFieldValue("driverContact", row.driverContact)


    validation.setFieldValue("id", row.id)
    setshow(true)
    settype("edit")
  }

  const handelDelete = async id => {
    const { error } = await supabase.from("Vehicles").delete().eq("id", id)

    if (error) {
      toast.error("Vehicles Deleted Failed", { autoClose: 2000 })
    } else {
      toast.success("Vehicles Deleted", { autoClose: 2000 })
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
      name: "vehicleNumber",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.vehicleNumber,
    },
    {
      name: "vehicle Model",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.vehicleModel ?? "None",
    },
    {
      name: "year Made",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.yearMade ?? "None",
    },
    {
      name: "registration Number",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.registrationNumber ?? "None",
    },
    {
      name: "chasisNumber",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.chasisNumber ?? "None",
    },
    {
      name: "maxSeatingCapacity",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.maxSeatingCapacity ?? "None",
    },
    {
      name: "driverName",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.driverName ?? "None",
    },
    {
      name: "driverLicence",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.driverLicence ?? "None",
    },
    {
      name: "driverContact",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.driverContact ?? "None",
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

          <label className="col-form-label">Vehicle Number</label>
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

        <div className="d-flex justify-content-between  mb-2">
          <div></div>
          {/* Button */}
          <button className="btn btn-primary" onClick={handleClick}>
            Add Vehicles
          </button>
        </div>
      </Row>
      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <CardTitle className="h4">Vehicles List </CardTitle>
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
                <Label htmlFor="useremail">Vehicle Number</Label>
                <Input
                  id="vehicleNumber"
                  name="vehicleNumber"
                  className="form-control"
                  placeholder="Enter section vehicleNumber"
                  type="vehicleNumber"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.vehicleNumber || ""}
                  invalid={
                    validation.touched.vehicleNumber &&
                    validation.errors.vehicleNumber
                      ? true
                      : false
                  }
                />
                {validation.touched.vehicleNumber &&
                validation.errors.vehicleNumber ? (
                  <FormFeedback type="invalid">
                    {validation.errors.vehicleNumber}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label htmlFor="useremail">Vehicle Model</Label>
                <Input
                  id="vehicleModel"
                  name="vehicleModel"
                  className="form-control"
                  placeholder="Enter section vehicleModel"
                  type="vehicleModel"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.vehicleModel || ""}
                  invalid={
                    validation.touched.vehicleModel &&
                    validation.errors.vehicleModel
                      ? true
                      : false
                  }
                />
                {validation.touched.vehicleModel &&
                validation.errors.vehicleModel ? (
                  <FormFeedback type="invalid">
                    {validation.errors.vehicleModel}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label htmlFor="useremail">Year Made</Label>
                <Input
                  id="yearMade"
                  name="yearMade"
                  className="form-control"
                  placeholder="Enter section yearMade"
                  type="yearMade"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.yearMade || ""}
                  invalid={
                    validation.touched.yearMade && validation.errors.yearMade
                      ? true
                      : false
                  }
                />
                {validation.touched.yearMade && validation.errors.yearMade ? (
                  <FormFeedback type="invalid">
                    {validation.errors.yearMade}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label htmlFor="useremail">Registration Number</Label>
                <Input
                  id="registrationNumber"
                  name="registrationNumber"
                  className="form-control"
                  placeholder="Enter section registrationNumber"
                  type="registrationNumber"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.registrationNumber || ""}
                  invalid={
                    validation.touched.registrationNumber &&
                    validation.errors.registrationNumber
                      ? true
                      : false
                  }
                />
                {validation.touched.registrationNumber &&
                validation.errors.registrationNumber ? (
                  <FormFeedback type="invalid">
                    {validation.errors.registrationNumber}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label htmlFor="useremail">Chasis Number</Label>
                <Input
                  id="chasisNumber"
                  name="chasisNumber"
                  className="form-control"
                  placeholder="Enter section chasisNumber"
                  type="chasisNumber"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.chasisNumber || ""}
                  invalid={
                    validation.touched.chasisNumber &&
                    validation.errors.chasisNumber
                      ? true
                      : false
                  }
                />
                {validation.touched.chasisNumber &&
                validation.errors.chasisNumber ? (
                  <FormFeedback type="invalid">
                    {validation.errors.chasisNumber}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label htmlFor="useremail"> Max Seating Capacity</Label>
                <Input
                  id="maxSeatingCapacity"
                  name="maxSeatingCapacity"
                  className="form-control"
                  placeholder="Enter section maxSeatingCapacity"
                  type="maxSeatingCapacity"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.maxSeatingCapacity || ""}
                  invalid={
                    validation.touched.maxSeatingCapacity &&
                    validation.errors.maxSeatingCapacity
                      ? true
                      : false
                  }
                />
                {validation.touched.maxSeatingCapacity &&
                validation.errors.maxSeatingCapacity ? (
                  <FormFeedback type="invalid">
                    {validation.errors.maxSeatingCapacity}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label htmlFor="useremail">Driver Name</Label>
                <Input
                  id="driverName"
                  name="driverName"
                  className="form-control"
                  placeholder="Enter section driverName"
                  type="driverName"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.driverName || ""}
                  invalid={
                    validation.touched.driverName &&
                    validation.errors.driverName
                      ? true
                      : false
                  }
                />
                {validation.touched.driverName &&
                validation.errors.driverName ? (
                  <FormFeedback type="invalid">
                    {validation.errors.driverName}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label htmlFor="useremail">Driver Licence</Label>
                <Input
                  id="driverLicence"
                  name="driverLicence"
                  className="form-control"
                  placeholder="Enter section driverLicence"
                  type="driverLicence"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.driverLicence || ""}
                  invalid={
                    validation.touched.driverLicence &&
                    validation.errors.driverLicence
                      ? true
                      : false
                  }
                />
                {validation.touched.driverLicence &&
                validation.errors.driverLicence ? (
                  <FormFeedback type="invalid">
                    {validation.errors.driverLicence}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label htmlFor="useremail">Driver Contact</Label>
                <Input
                  id="driverContact"
                  name="driverContact"
                  className="form-control"
                  placeholder="Enter section driverContact"
                  type="driverContact"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.driverContact || ""}
                  invalid={
                    validation.touched.driverContact &&
                    validation.errors.driverContact
                      ? true
                      : false
                  }
                />
                {validation.touched.driverContact &&
                validation.errors.driverContact ? (
                  <FormFeedback type="invalid">
                    {validation.errors.driverContact}
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

export default connect(null, { setBreadcrumbItems })(Vehicles)
