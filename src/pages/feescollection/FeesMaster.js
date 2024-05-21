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
import { Field, FieldArray, Formik, getIn, useFormik } from "formik"
import * as Yup from "yup"
import { v4 as uuidv4 } from "uuid"
import _, { isEmpty } from "lodash"

const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)

const FeesMaster = props => {
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
  const [FeesGroup, setFeesGroup] = useState([])
  const [FeesType, setFeesType] = useState([])

  async function getRoutes() {
    const { data, error } = await supabase.from("FeesGroup").select("*")
    setFeesGroup(data ?? [])
  }

  async function getpickupPoints() {
    const { data, error } = await supabase.from("FeesType").select("*")
    setFeesType(data ?? [])
  }

  async function getCountries() {
    const { data, error } = await supabase.from("FeesMaster").select("*")

    if (data) {
      let grouped_data = _.groupBy(data, "FeesGroup")

      let dataconverted = []

      Object.keys(grouped_data)?.map(el => {
        dataconverted.push({
          FeesGroup: el,
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
      FeesGroup: "",
      FeesType: "",

      dueDate: "",
      amount: "",
      fineType: "",
      percentage: "",
      fixAmount: "",

      id: "",
    },

    
    onSubmit: async values => {
      if (type === "new") {
        const { data, error } = await supabase
          .from("FeesMaster")
          .insert([
            {
              FeesGroup: values.FeesGroup,
              FeesType: values.FeesType,
              dueDate: values.dueDate,
              amount: values.amount,
              fineType: values.fineType,
              percentage: values.percentage,
              fixAmount: values.fixAmount,
            },
          ])
          .select()

        if (error) {
          console.log("ez", error)
          toast.error("FeesMaster Inserted Failed", { autoClose: 2000 })
        } else {
          toast.success("FeesMaster Inserted", { autoClose: 2000 })
          setshow(false)
          getCountries()
          validation.resetForm()
        }
      } else {
        const { data, error } = await supabase
          .from("FeesMaster")
          .update([
            {
              FeesGroup: values.FeesGroup,
              FeesType: values.FeesType,
              dueDate: values.dueDate,
              amount: values.amount,
              fineType: values.fineType,
              percentage: values.percentage,
              fixAmount: values.fixAmount,
            },
          ])
          .eq("id", values.id)
          .select()

        if (error) {
          toast.error("FeesMaster Updated Failed", { autoClose: 2000 })
        } else {
          toast.success("FeesMaster Updated", { autoClose: 2000 })
          const { data, error } = await supabase.from("FeesMaster").select("*")

          if (data) {
            let grouped_data = _.groupBy(data, "FeesGroup")

            let dataconverted = []

            Object.keys(grouped_data).map(el => {
              dataconverted.push({
                FeesGroup: el,
                list: grouped_data[el],
              })
            })

            setcurrData(
              dataconverted.filter(el => el.route === values.FeesGroup)[0]
                ?.list ?? [],
            )
          }

          setshow(false)

          validation.resetForm()
        }
      }
    },
  })

  const navigate = useNavigate()

  useEffect(() => {
    console.log("first console");
    (async () => {
      props.setBreadcrumbItems("FeesMaster", breadcrumbItems)
      await getCountries()
      await  getRoutes()
      await  getpickupPoints()
    })()
    console.log("last console")

  }, [])

  const handleClick = () => {
    settype("new")
    setshow(true)
  }

  const handleSearch = async () => {
    const { data, error } = await supabase
      .from("FeesMaster")
      .select("*")
      .ilike("FeesGroup", `%${search}%`)
    if (data) {
      let grouped_data = _.groupBy(data, "FeesGroup")

      let dataconverted = []

      Object.keys(grouped_data)?.map(el => {
        dataconverted.push({
          FeesGroup: el,
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

    validation.setFieldValue("FeesGroup", values.FeesGroup)
    validation.setFieldValue("FeesType", values.FeesType)
    validation.setFieldValue("dueDate", values.dueDate)
    validation.setFieldValue("amount", values.amount)
    validation.setFieldValue("fineType", values.fineType)
    validation.setFieldValue("percentage", values.percentage)
    validation.setFieldValue("fixAmount", values.fixAmount)

    validation.setFieldValue("id", values.id)

    settype("edit")
  }

  const handelDelete = async id => {
    const { error } = await supabase.from("FeesMaster").delete().eq("FeesGroup", id)

    if (error) {
      toast.error("FeesMaster Deleted Failed", { autoClose: 2000 })
    } else {
      toast.success("FeesMaster Deleted", { autoClose: 2000 })
      getCountries()
    }
  }
  const handelDeleteline = async row => {
    const { error } = await supabase
      .from("FeesMaster")
      .delete()
      .eq("id", row.id)

    if (error) {
      toast.error("Fees Master Point line Deleted Failed", { autoClose: 2000 })
    } else {
      toast.success("FeesMaster line Deleted ", { autoClose: 2000 })
      const { data, error } = await supabase.from("FeesMaster").select("*")

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
      name: "FeesGroup",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.FeesGroup,
    },
    {
      name: "FeesType",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.FeesType,
      cell: row => (
        <ul className="mt-2">
          {row?.list.map(el => (
            <li>{el.FeesType}</li>
          ))}
        </ul>
      ),
    },
    {
      name: "Amount ($)",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.amount,
      cell: row => (
        <ul className="mt-2">
          {row.list.map(el => (
            <li>{el?.amount}$</li>
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
                onClick={() => handelDelete(row?.FeesGroup)}
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

          <label className="col-form-label">Fees Master </label>
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
            Add Fees Master Point
          </button>
        </div>
      </Row>
      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <CardTitle className="h4">Fees Master Point List </CardTitle>
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
                Fees Group
              </Label>
              <select
                id="FeesGroup"
                name="FeesGroup"
                className="form-control"
                placeholder="Enter FeesGroup"
                type="FeesGroup"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.FeesGroup || ""}
                invalid={
                  validation.touched.FeesGroup && validation.errors.FeesGroup
                    ? true
                    : false
                }
              >
                <option value={""}>Select FeesGroup</option>

                {FeesGroup.map(el => (
                  <option value={el.name}>{el.name} </option>
                ))}
              </select>

              {validation.touched.FeesGroup && validation.errors.FeesGroup ? (
                <FormFeedback type="invalid">
                  {validation.errors.FeesGroup}
                </FormFeedback>
              ) : null}
            </Row>

            <Row className="mb-3">
              <Label className="col-md-2 col-form-label" htmlFor="useremail">
                FeesType
              </Label>
              <select
                id="FeesType"
                name="FeesType"
                className="form-control"
                placeholder="Enter FeesType"
                type="FeesType"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.FeesType || ""}
                invalid={
                  validation.touched.FeesType && validation.errors.FeesType
                    ? true
                    : false
                }
              >
                <option value={""}>Select FeesType</option>
                {FeesType.map(el => (
                  <option value={el.name}>{el.name}</option>
                ))}
              </select>

              {validation.touched.FeesType && validation.errors.FeesType ? (
                <FormFeedback type="invalid">
                  {validation.errors.FeesType}
                </FormFeedback>
              ) : null}
            </Row>

            <Row className="mb-3">
              <Label className="col-md-2 col-form-label" htmlFor="useremail">
                Due Date
              </Label>

              <input
                className="form-control"
                id="dueDate"
                name="dueDate"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.dueDate || ""}
                type="date"
              />
            </Row>

            <Row className="mb-3">
              <Label className="col-md-2 col-form-label" htmlFor="useremail">
                Amount ($)
              </Label>

              <input
                className="form-control"
                id="amount"
                name="amount"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.amount || ""}
                type="number"
              />
            </Row>

            <Row className="mb-3">
              <Label className="col-md-2 col-form-label" htmlFor="useremail">
                Fine Type
              </Label>

              <input
                className="form-control"
                id="fineType"
                name="fineType"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.fineType || ""}
                type="text"
              />
            </Row>

            <Row className="mb-3">
              <Label className="col-md-2 col-form-label" htmlFor="useremail">
                Percentage (%)
              </Label>

              <input
                className="form-control"
                id="percentage"
                name="percentage"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.percentage || ""}
                type="number"
              />
            </Row>

            <Row className="mb-3">
              <Label className="col-md-2 col-form-label" htmlFor="useremail">
                Fix Amount ($)
              </Label>

              <input
                className="form-control"
                id="fixAmount"
                name="fixAmount"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.fixAmount || ""}
                type="number"
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
          <span className="mb-3"> Fees  : {currData[0]?.FeesGroup}</span>

          <ul>
            {currData.map(el => (
              <li>
                <div>
                  <span className="me-3"> Fees Group : {el.FeesGroup}</span>

                  <span className="me-3"> Fees Type : {el.FeesType}</span>

                  <span className="me-3"> Amount ($) : {el.amount}</span>

                  <span className="me-3">
                    {" "}
                    Percentage (%) : {el.percentage}
                  </span>

                  <span className="me-3"> Fix Amount ($) : {el.fixAmount}</span>

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

export default connect(null, { setBreadcrumbItems })(FeesMaster)
