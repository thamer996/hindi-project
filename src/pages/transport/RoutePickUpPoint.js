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
import { Field, FieldArray, Formik, getIn, useFormik } from "formik"
import * as Yup from "yup"
import { v4 as uuidv4 } from "uuid"
import _, { isEmpty } from "lodash"

const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)

const RoutePickUpPoint = props => {
  document.title =
    "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard"

  const breadcrumbItems = [
    { title: "Smart school", link: "#" },
    { title: "Transport", link: "#" },
  ]

  const [section, setSection] = useState([])
  const [show, setshow] = useState(false)
  const [show2, setshow2] = useState(false)
  const [currData, setcurrData] = useState([])
  const [type, settype] = useState("new")
  const [search, setSearch] = useState("")
  const [Routes, setRoutes] = useState([])
  const [pickupPoints, setpickupPoints] = useState([])

  async function getRoutes() {
    const { data, error } = await supabase
      .from("Routes")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
    setRoutes(data ?? [])
  }

  const handleClickExcel = () => {
    const array = Routes

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

  async function getpickupPoints() {
    const { data, error } = await supabase
      .from("PickupPoint")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
    console.log("eeeeeeeeeeee", data)
    setpickupPoints(data ?? [])
  }

  async function getCountries() {
    const { data, error } = await supabase
      .from("RoutePickupPoint")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)

    if (data) {
      let grouped_data = _.groupBy(data, "route")

      let dataconverted = []

      Object.keys(grouped_data)?.map(el => {
        dataconverted.push({
          route: el,
          list: grouped_data[el],
        })
      })

      setSection(dataconverted ?? [])
    }
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

      console.log("eeeeeeeeeeeeeeeee", data?.path)
      setstate(data?.path)
    } else {
      console.log("eeeeeeeeeeeeeeeee", error)
      console.log(error)
    }
  }

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      route: "",

      pickupPoint: "",
      monthlyFees: "",
      pickupTime: "",
      distance: "",

      id: "",
    },

    validationSchema: Yup.object({}),
    onSubmit: async values => {
      console.log("values", values)
      // if (type === "new") {
      //   const { data, error } = await supabase
      //     .from("RoutePickupPoint")
      //     .insert([
      //       {
      //         route: values.route,
      //         pickupPoint: values.pickupPoint,
      //         monthlyFees: values.monthlyFees,
      //         pickupTime: values.pickupTime,
      //         distance: values.distance,
      //       },
      //     ])
      //     .select()

      //   if (error) {
      //     console.log("ez", error)
      //     toast.error("RoutePickupPoint Inserted Failed", { autoClose: 2000 })
      //   } else {
      //     toast.success("RoutePickupPoint Inserted", { autoClose: 2000 })
      //     setshow(false)
      //     getCountries()
      //     validation.resetForm()
      //   }
      // } else {
      //   const { data, error } = await supabase
      //     .from("RoutePickupPoint")
      //     .update([
      //       {
      //         route: values.route,
      //         pickupPoint: values.pickupPoint,
      //         monthlyFees: values.monthlyFees,
      //         pickupTime: values.pickupTime,
      //         distance: values.distance,
      //       },
      //     ])
      //     .eq("id", values.id)
      //     .select()

      //   if (error) {
      //     toast.error("RoutePickupPoint Updated Failed", { autoClose: 2000 })
      //   } else {
      //     toast.success("RoutePickupPoint Updated", { autoClose: 2000 })
      //     const { data, error } = await supabase
      //       .from("RoutePickupPoint")
      //       .select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)

      //     if (data) {
      //       let grouped_data = _.groupBy(data, "route")

      //       let dataconverted = []

      //       Object.keys(grouped_data).map(el => {
      //         dataconverted.push({
      //           route: el,
      //           list: grouped_data[el],
      //         })
      //       })

      //       setcurrData(
      //         dataconverted.filter(el => el.route === values.route)[0]?.list ??
      //           [],
      //       )
      //     }

      //     setshow(false)

      //     validation.resetForm()
      //   }
      // }
    },
  })

  const navigate = useNavigate()

  useEffect(() => {
    props.setBreadcrumbItems("RoutePickupPoint", breadcrumbItems)
    getCountries()
    getRoutes()
    getpickupPoints()
  }, [])

  const handleClick = () => {
    settype("new")
    setshow(true)
  }

  const handleSearch = async () => {
    const { data, error } = await supabase
      .from("RoutePickupPoint")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
      .ilike("route", `%${search}%`)
    if (data) {
      let grouped_data = _.groupBy(data, "route")

      let dataconverted = []

      Object.keys(grouped_data)?.map(el => {
        dataconverted.push({
          route: el,
          list: grouped_data[el],
        })
      })

      setSection(dataconverted ?? [])
    }
  }

  const handelEdit = async row => {
    setcurrData(row.list)
    setshow2(true)
  }

  const handelEditline = async values => {
    setshow(true)

    validation.setFieldValue("route", values.route)
    validation.setFieldValue("pickupPoint", values.pickupPoint)
    validation.setFieldValue("monthlyFees", values.monthlyFees)
    validation.setFieldValue("pickupTime", values.pickupTime)
    validation.setFieldValue("distance", values.distance)

    validation.setFieldValue("id", values.id)

    settype("edit")
  }

  const handelDelete = async id => {
    const { error } = await supabase
      .from("RoutePickupPoint")
      .delete()
      .eq("route", id)

    if (error) {
      toast.error("RoutePickupPoint Deleted Failed", { autoClose: 2000 })
    } else {
      toast.success("RoutePickupPoint Deleted", { autoClose: 2000 })
      getCountries()
    }
  }
  const handelDeleteline = async row => {
    const { error } = await supabase
      .from("RoutePickupPoint")
      .delete()
      .eq("id", row.id)

    if (error) {
      toast.error("Route Pickup Point line Deleted Failed", { autoClose: 2000 })
    } else {
      toast.success("RoutePickupPoint line Deleted ", { autoClose: 2000 })
      const { data, error } = await supabase
        .from("RoutePickupPoint")
        .select("*")
        .eq("brancheId", localStorage.getItem("BranchId") ?? 1)

      if (data) {
        let grouped_data = _.groupBy(data, "route")

        let dataconverted = []

        Object.keys(grouped_data).map(el => {
          dataconverted.push({
            route: el,
            list: grouped_data[el],
          })
        })

        setcurrData(
          dataconverted.filter(el => el.route === row.route)[0]?.list ?? [],
        )
      }
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
      name: "Route",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.route,
    },
    {
      name: "Pickup Point",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.pickupPoint,
      cell: row => (
        <ul className="mt-2">
          {row?.list.map(el => (
            <li>{el.pickupPoint}</li>
          ))}
        </ul>
      ),
    },
    {
      name: "Monthly Fees ($)",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.monthlyFees,
      cell: row => (
        <ul className="mt-2">
          {row.list.map(el => (
            <li>{el?.monthlyFees}</li>
          ))}
        </ul>
      ),
    },
    {
      name: "Distance(Km)",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.distance,
      cell: row => (
        <ul className="mt-2">
          {row.list.map(el => (
            <li>{el?.distance}</li>
          ))}
        </ul>
      ),
    },
    {
      name: "Pickup Time",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.pickupTime,
      cell: row => (
        <ul className="mt-2">
          {row.list.map(el => (
            <li>{el?.pickupTime}</li>
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
                onClick={() => handelDelete(row?.route)}
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

          <label className="col-form-label">Exam Type </label>
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
            Add Route Pickup Point
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
              <CardTitle className="h4">Route Pickup Point List </CardTitle>
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
        size="xl"
      >
        <ModalBody className="py-3 px-5">
          <Form
            className="form-horizontal mt-4"
            onSubmit={e => {
              e.preventDefault()
              validation.handleSubmit()
              return false
            }}
          >
            <Row className="mb-3">
              <Label className="col-md-2 col-form-label" htmlFor="useremail">
                Route
              </Label>
              <select
                id="route"
                name="route"
                className="form-control"
                placeholder="Enter route"
                type="route"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.route || ""}
                invalid={
                  validation.touched.route && validation.errors.route
                    ? true
                    : false
                }
              >
                <option value={""}>Select Route</option>
                {Routes.map(el => (
                  <option value={el.name}>{el.name}</option>
                ))}
              </select>

              {validation.touched.route && validation.errors.route ? (
                <FormFeedback type="invalid">
                  {validation.errors.route}
                </FormFeedback>
              ) : null}
            </Row>

            <Row className="mb-3">
              <Label className="col-md-2 col-form-label" htmlFor="useremail">
                pickupPoint
              </Label>
              <select
                id="pickupPoint"
                name="pickupPoint"
                className="form-control"
                placeholder="Enter pickupPoint"
                type="pickupPoint"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.pickupPoint || ""}
                invalid={
                  validation.touched.pickupPoint &&
                  validation.errors.pickupPoint
                    ? true
                    : false
                }
              >
                <option value={""}>Select pickupPoint</option>
                {pickupPoints.map(el => (
                  <option value={el.name}>{el.name}</option>
                ))}
              </select>

              {validation.touched.pickupPoint &&
              validation.errors.pickupPoint ? (
                <FormFeedback type="invalid">
                  {validation.errors.pickupPoint}
                </FormFeedback>
              ) : null}
            </Row>

            <Row className="mb-3">
              <Label className="col-md-2 col-form-label" htmlFor="useremail">
                Monthly Fees
              </Label>

              <input
                className="form-control"
                id="monthlyFees"
                name="monthlyFees"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.monthlyFees || ""}
                type="number"
              />
            </Row>
            <Row className="mb-3">
              <Label className="col-md-2 col-form-label" htmlFor="useremail">
                Distance
              </Label>

              <input
                className="form-control"
                id="distance"
                name="distance"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.distance || ""}
                type="number"
              />
            </Row>
            <Row className="mb-3">
              <Label className="col-md-2 col-form-label" htmlFor="useremail">
                pickup Time
              </Label>

              <input
                className="form-control"
                id="pickupTime"
                name="pickupTime"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.pickupTime || ""}
                type="time"
              />
            </Row>

            <div className="d-flex justify-content-center mt-3 mb-3">
              {" "}
              {/* mt-3 adds margin top, mb-3 adds margin bottom */}
              <button type="submit" className="btn btn-primary w-md">
                Submit
              </button>
            </div>
          </Form>
        </ModalBody>
      </Modal>

      <Modal
        isOpen={show2}
        toggle={() => setshow2(!show2)}
        centered={true}
        size="xl"
      >
        <ModalBody className="py-3 px-5">
          <span className="mb-3"> Exam Type : {currData[0]?.route}</span>

          <ul>
            {currData.map(el => (
              <li>
                <div>
                  <span className="me-3"> pickup Point : {el.pickupPoint}</span>

                  <span className="me-3"> Monthly Fees : {el.monthlyFees}</span>

                  <span className="me-3"> Distance : {el.distance}</span>

                  <span className="me-3"> Pickup Time : {el.pickupTime}</span>

                  <span
                    className="me-3"
                    style={editIconStyle}
                    onClick={() => handelEditline(el)}
                  >
                    <i className="ti-marker-alt"></i>
                  </span>

                  <span
                    className="me-3"
                    style={actionIconStyle}
                    onClick={() => handelDeleteline(el)}
                  >
                    <i className="ti-trash"></i>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </ModalBody>
      </Modal>
      <ToastContainer />
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(RoutePickUpPoint)
