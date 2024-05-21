import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import DataTable from "react-data-table-component"
import { createClient } from "@supabase/supabase-js"
import GoogleMapReact from "google-map-react"

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

const PickupPoint = props => {
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
    const { data, error } = await supabase.from("PickupPoint").select("*")
    setSection(data ?? [])
  }

  async function getClass() {
    const { data, error } = await supabase.from("Class").select("*")
    setClas(data ?? [])
  }

  async function getSubject() {
    const { data, error } = await supabase.from("Subjects").select("*")
    setSubject(data ?? [])
  }

  async function getSections() {
    const { data, error } = await supabase.from("Section").select("*")
    setSections(data ?? [])
  }

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: "",
      latitude: "",
      longitude: "",
      id: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Your name"),
    }),
    onSubmit: async values => {
      if (type === "new") {
        const { data, error } = await supabase
          .from("PickupPoint")
          .insert([
            {
              name: values.name,
              latitude: values.latitude,
              longitude: values.longitude,
            },
          ])
          .select()

        if (error) {
          toast.error("PickupPoint Inserted Failed", { autoClose: 2000 })
        } else {
          toast.success("PickupPoint Inserted", { autoClose: 2000 })
          setshow(false)
          getCountries()
          validation.resetForm()
        }
      } else {
        const { data, error } = await supabase
          .from("PickupPoint")
          .update([
            {
              name: values.name,
              latitude: values.latitude,
              longitude: values.longitude,
            },
          ])
          .eq("id", values.id)
          .select()

        if (error) {
          toast.error("PickupPoint Updated Failed", { autoClose: 2000 })
        } else {
          toast.success("PickupPoint Updated", { autoClose: 2000 })
          setshow(false)
          getCountries()
          validation.resetForm()
        }
      }
    },
  })

  const navigate = useNavigate()

  useEffect(() => {
    props.setBreadcrumbItems("PickupPoint", breadcrumbItems)
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
      .from("PickupPoint")
      .select("*")
      .ilike("name", `%${search}%`)
    setSection(data)
  }

  const handelEdit = async row => {
    validation.resetForm()

    validation.setFieldValue("name", row.name)
    validation.setFieldValue("longitude", row.longitude)
    validation.setFieldValue("latitude", row.latitude)

    validation.setFieldValue("id", row.id)
    setshow(true)
    settype("edit")
  }

  const handelDelete = async id => {
    const { error } = await supabase.from("PickupPoint").delete().eq("id", id)

    if (error) {
      toast.error("PickupPoint Deleted Failed", { autoClose: 2000 })
    } else {
      toast.success("PickupPoint Deleted", { autoClose: 2000 })
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
      name: "Latitude",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.latitude ?? "None",
    },
    {
      name: "Longitude",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.longitude ?? "None",
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

  const defaultProps = {
    center: {
      lat: 0,
      lng: 0,
    },
    zoom: 0,
  }

  const handelsetValues = e => {
    validation.setFieldValue("longitude", e.lng)
    validation.setFieldValue("latitude", e.lat)
  }
  return (
    <React.Fragment>
      <Row>
        <div className="d-flex mb-2">
          <div></div>
          {/* Vos éléments de filtre ici */}

          <label className="col-form-label">Pickup Point </label>
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
            Add Pickup Point
          </button>
        </div>
      </Row>
      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <CardTitle className="h4">Pickup Point List </CardTitle>
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

      <Modal
        isOpen={show}
        toggle={() => setshow(!show)}
        centered={true}
        fullscreen
      >
        <ModalBody className="py-3 px-5">
          <Row>
            <Col md={10}>
              <div className="mb-3" style={{ height: "90vh", width: "100%" }}>
                <GoogleMapReact
                  // bootstrapURLKeys={{ key: "" }}
                  defaultCenter={defaultProps.center}
                  defaultZoom={defaultProps.zoom}
                  onClick={e => handelsetValues(e)}
                >
            
                    <div
                      style={{
                        border: "5px solid #f44336",
                        borderRadius: "50%",
                        backgroundColor: "white",
                        textAlign: "center",
                        color: "#3f51b5",
                        fontSize: 16,
                        fontWeight: "bold",
                        padding: 4,
                      }}
                      lat={Number(validation.values.latitude)}
                      lng={Number(validation.values.longitude)}
                      text={validation.values.name}
                    ></div>

                </GoogleMapReact>
              </div>
            </Col>

            <Col>
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
                    <Input
                      id="name"
                      name="name"
                      className="form-control"
                      placeholder="Enter section Name"
                      type="name"
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
                    <Label htmlFor="useremail">Longitude</Label>
                    <Input
                      id="longitude"
                      name="longitude"
                      className="form-control"
                      placeholder="Enter section longitude"
                      type="longitude"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.longitude || ""}
                      invalid={
                        validation.touched.longitude &&
                        validation.errors.longitude
                          ? true
                          : false
                      }
                    />
                    {validation.touched.longitude &&
                    validation.errors.longitude ? (
                      <FormFeedback type="invalid">
                        {validation.errors.longitude}
                      </FormFeedback>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <Label htmlFor="useremail">Latitude</Label>
                    <Input
                      id="latitude"
                      name="latitude"
                      className="form-control"
                      placeholder="Enter section latitude"
                      type="latitude"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.latitude || ""}
                      invalid={
                        validation.touched.latitude &&
                        validation.errors.latitude
                          ? true
                          : false
                      }
                    />
                    {validation.touched.latitude &&
                    validation.errors.latitude ? (
                      <FormFeedback type="invalid">
                        {validation.errors.latitude}
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
            </Col>
          </Row>
        </ModalBody>
      </Modal>
      <ToastContainer />
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(PickupPoint)
