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

const AssignVehicle = props => {
  document.title =
    "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard"

  const breadcrumbItems = [
    { title: "Smart school", link: "#" },
    { title: "Transport", link: "#" },
  ]

  const [vehiclesRoutes, setVehiclesRoutes] = useState([])
  const [Routes, setRoutes] = useState([])
  const [vehicles, setVehicles] = useState([])

  const [show, setshow] = useState(false)
  const [type, settype] = useState("new")
  const [search, setSearch] = useState("")

  async function getCountries() {
    const { data, error } = await supabase
      .from("VehiclesRoutes")
      .select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
    setVehiclesRoutes(data ?? [])
  }

  async function getVehicles() {
    const { data, error } = await supabase
      .from("Vehicles")
      .select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
    setVehicles(data ?? [])
  }

  async function getRoutes() {
    const { data, error } = await supabase
      .from("Routes")
      .select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
    setRoutes(data ?? [])
  }

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      routes: "",
      vehicles: [],
    },

    validationSchema: Yup.object({
      routes: Yup.string().required("Please Enter Your routes"),
    }),
    onSubmit: async values => {
      if (type === "new") {
        const { data, error } = await supabase
          .from("VehiclesRoutes")
          .insert([
            {
              brancheId: localStorage.getItem("BranchId") ?? 1,
              routes: values.routes,
              vehicles: values.vehicles,
            },
          ])
          .select()

        if (error) {
          toast.error("VehiclesRoutes Inserted Failed", { autoClose: 2000 })
        } else {
          toast.success("VehiclesRoutes Inserted", { autoClose: 2000 })
          setshow(false)
          getCountries()
          validation.resetForm()
        }
      } else {
        const { data, error } = await supabase
          .from("VehiclesRoutes")
          .update([
            {
              routes: values.routes,
              vehicles: values.vehicles,
            },
          ])
          .eq("id", values.id)
          .select()

        if (error) {
          toast.error("VehiclesRoutes Updated Failed", { autoClose: 2000 })
        } else {
          toast.success("VehiclesRoutes Updated", { autoClose: 2000 })
          setshow(false)
          getCountries()
          validation.resetForm()
        }
      }
    },
  })

  const navigate = useNavigate()

  useEffect(() => {
    props.setBreadcrumbItems("VehiclesRoutes", breadcrumbItems)
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
      .from("VehiclesRoutes")
      .select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
      .ilike("routes", `%${search}%`)
    setVehiclesRoutes(data)
  }

  const handelEdit = async row => {
    validation.resetForm()

    validation.setFieldValue("routes", row.routes)
    validation.setFieldValue("vehicles", row.vehicles)

    validation.setFieldValue("id", row.id)
    setshow(true)
    settype("edit")
  }

  const handelDelete = async id => {
    const { error } = await supabase
      .from("VehiclesRoutes")
      .delete()
      .eq("id", id)

    if (error) {
      toast.error("VehiclesRoutes Deleted Failed", { autoClose: 2000 })
    } else {
      toast.success("VehiclesRoutes Deleted", { autoClose: 2000 })
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
      name: "Route Title",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.routes,
    },
    {
      name: "Route Title",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.vehicles,
      cell: row => (
        <ul className="mt-3">
          {row?.vehicles.map(el => (
            <li>{el}</li>
          ))}
        </ul>
      ),
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

          <label className="col-form-label">Vehicles Routes </label>
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
            Add Vehicles Routes
          </button>
        </div>
      </Row>
      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <CardTitle className="h4">Vehicles Routes List </CardTitle>
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
                  data={vehiclesRoutes}
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
                <Label htmlFor="useremail">routes</Label>
                <select
                  id="routes"
                  name="routes"
                  className="form-control"
                  placeholder="Enter routes"
                  type="routes"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.routes || ""}
                  invalid={
                    validation.touched.routes && validation.errors.routes
                      ? true
                      : false
                  }
                >
                  <option value="">Select</option>
                  {Routes.map(el => (
                    <option value={el.name}>{el.name}</option>
                  ))}
                </select> 

                {validation.touched.routes && validation.errors.routes ? (
                  <FormFeedback type="invalid">
                    {validation.errors.routes}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label htmlFor="useremail">Vehicles</Label>
                <select
                  id="vehicles"
                  name="vehicles"
                  className="form-control"
                  placeholder="Enter vehicles"
                  type="vehicles"
                  multiple
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.vehicles || ""}
                  invalid={
                    validation.touched.vehicles && validation.errors.vehicles
                      ? true
                      : false
                  }
                >
                  {vehicles.map(el => (
                    <option value={el.vehicleNumber}>{el.vehicleNumber}</option>
                  ))}
                </select> 

                {validation.touched.vehicles && validation.errors.vehicles ? (
                  <FormFeedback type="invalid">
                    {validation.errors.vehicles}
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

export default connect(null, { setBreadcrumbItems })(AssignVehicle)
