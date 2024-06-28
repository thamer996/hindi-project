import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { createClient } from "@supabase/supabase-js"
import * as XLSX from "xlsx"

import {
  Table,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Label,
  FormFeedback,
  Input,
  Modal,
  ModalBody,
  Form,
  Badge,
} from "reactstrap"

import { connect } from "react-redux"
import DataTable from "react-data-table-component"
//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"
import { useFormik } from "formik"
import * as Yup from "yup"
import { ToastContainer, toast } from "react-toastify"
import moment from "moment-timezone"
import { isEmpty } from "lodash"
import _ from "lodash"
//supabase connection :::
const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)

const ApproveRequest = props => {
  document.title =
    "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard"

  const breadcrumbItems = [
    { title: "Smart school", link: "#" },
    { title: "Human Resource", link: "#" },
  ]

  const [data, setdata] = useState([])
  const [type, settype] = useState("new")
  const [show, setshow] = useState(false)
  const [keyword, Setkeyword] = useState("")
  const [Staff, setStaff] = useState([])
  const [leave, setleave] = useState([])

  const navigate = useNavigate()

  //end
  //GEt Staff
  async function getStaff() {
    const { data, error } = await supabase
      .from("Staff")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
    setStaff(data ?? [])
  }
  async function getLeaveType() {
    const { data, error } = await supabase
      .from("LeaveType")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
    setleave(data ?? [])
  }
  //end

  //get section :::
  async function getApproveRequestStaff() {
    const { data, error } = await supabase
      .from("ApproveRequestStaff")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
    setdata(data ?? [])
  }

  const handleClickExcel = () => {
    const array = data

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

  useEffect(() => {
    props.setBreadcrumbItems("approved Leave Request", breadcrumbItems)
    getStaff()
    getLeaveType()
    getApproveRequestStaff()
  }, [])

  const handleClick = () => {
    settype("new")
    validation.resetForm()
    setshow(true)
  }

  //validation function ::::
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      staffID: "",
      leaveType: "",
      fromDate: "",
      toDate: "",
      days: "",
      applyDate: "",
      status: "pending",
      firstName: "",
      lastName: "",
    },

    validationSchema: Yup.object({
      leaveType: Yup.string().required("Please Enter the leaveType"),
      fromDate: Yup.string().required("Please Enter The fromDate"),
      toDate: Yup.string().required("Please Enter The toDate"),
      applyDate: Yup.string().required("Please Enter applyDate"),
    }),
    onSubmit: async values => {
      const staffOBJ = Staff.find(el => el.staffID === values.staffID)
      if (type === "new") {
        const { data, error } = await supabase
          .from("ApproveRequestStaff")
          .insert([
            {
              brancheId: localStorage.getItem("BranchId") ?? 1,
              staffID: staffOBJ.staffID,
              leaveType: values?.leaveType,
              fromDate: values?.fromDate,
              toDate: values?.toDate,
              days: Math.abs(
                moment(values.toDate, "YYYY-MM-DD").diff(
                  moment(values.fromDate, "YYYY-MM-DD"),
                  "days",
                ),
              ),
              applyDate: values?.applyDate,
              status: values?.status,
              firstName: staffOBJ.firstName,
              lastName: staffOBJ.lastName,
            },
          ])
          .select()

        if (error) {
          console.log("ez", error)
          toast.error("approved leave Inserted Failed", { autoClose: 2000 })
        } else {
          toast.success("approved leave Inserted", { autoClose: 2000 })
          setshow(false)
          getApproveRequestStaff()
          validation.resetForm()
        }
      } else {
        const { data, error } = await supabase
          .from("ApproveRequestStaff")
          .update([
            {
              staffID: staffOBJ.staffID,
              leaveType: values?.leaveType,
              fromDate: values?.fromDate,
              toDate: values?.toDate,
              days: Math.abs(
                moment(values.toDate, "YYYY-MM-DD").diff(
                  moment(values.fromDate, "YYYY-MM-DD"),
                  "days",
                ),
              ),
              applyDate: values?.applyDate,
              status: values?.status,
              firstName: staffOBJ.firstName,
              lastName: staffOBJ.lastName,
            },
          ])
          .eq("id", values.id)
          .select()

        if (error) {
          console.log("ez", error)
          toast.error("approved leave Updated Failed", { autoClose: 2000 })
        } else {
          toast.success("approved leave Updated", { autoClose: 2000 })
          setshow(false)
          getApproveRequestStaff()
          validation.resetForm()
        }
      }
    },
  })
  //end validation function :::
  //edit and delete functions :::
  const handelEdit = async row => {
    validation.resetForm()

    validation.setFieldValue("staffID", row.staffID)
    validation.setFieldValue("leaveType", row.leaveType)
    validation.setFieldValue("fromDate", row.fromDate)
    validation.setFieldValue("toDate", row.toDate)
    validation.setFieldValue("days", row.days)
    validation.setFieldValue("applyDate", row.applyDate)
    validation.setFieldValue("status", row.status)
    validation.setFieldValue("firstName", row.firstName)
    validation.setFieldValue("lastName", row.lastName)

    validation.setFieldValue("id", row.id)

    setshow(true)
    settype("edit")
  }

  const handelDelete = async id => {
    const { error } = await supabase
      .from("ApproveRequestStaff")
      .delete()
      .eq("id", id)

    if (error) {
      toast.error("ApproveRequest Deleted Failed", { autoClose: 2000 })
    } else {
      toast.success("ApproveRequest Deleted", { autoClose: 2000 })
      getApproveRequestStaff()
    }
  }

  //end :::
  //function search :::
  const handleSearch = async () => {
    const { data, error } = await supabase
      .from("ApproveRequestStaff")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
      .or(
        `firstName.ilike.%${keyword}%,applyDate.ilike.%${keyword}%,status.ilike.%${keyword}%,lastName.ilike.%${keyword}%`,
      )

    setdata(data)
  }

  //end :::
  //fuction to update status :::
  const handelupdateStatus = async row => {
    let newStatus
    if (row.status === "pending" || row.status === "disapproved") {
      newStatus = "approved"
    } else {
      newStatus = "disapproved"
    }
    const { data, error } = await supabase
      .from("ApproveRequestStaff")
      .update([
        {
          status: newStatus,
        },
      ])
      .eq("id", row.id)
      .select()

    if (error) {
      toast.error("Status changing Failed", { autoClose: 2000 })
    } else {
      toast.success(
        row.status === "pending" ? "To approved" : "To disapproved",
        {
          autoClose: 2000,
        },
      )
      getApproveRequestStaff()
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
      name: "Staff",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      cell: row =>
        row?.firstName + " " + row?.lastName + "  ( " + row?.staffID + " ) ",
    },
    {
      name: "Leave Type",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.leaveType,
    },
    {
      name: "Leave Date",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      cell: row => row?.fromDate + " - " + row?.toDate,
    },
    {
      name: "Days",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.days,
    },
    {
      name: "Apply Date",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.applyDate,
    },

    {
      name: "Status",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      cell: row =>
        row?.status === "approved" ? (
          <Badge color="success" className="rounded-pill bg-success">
            {row?.status}
          </Badge>
        ) : row?.status === "pending" ? (
          <Badge color="warning" className="rounded-pill bg-warning">
            {row?.status}
          </Badge>
        ) : (
          <Badge color="danger" className="rounded-pill bg-danger">
            {row?.status}
          </Badge>
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
              <span
                style={editIconStyle}
                onClick={() => handelupdateStatus(row)}
              >
                {row.status === "pending" || row.status === "disapproved" ? (
                  <i className={"ti-check"}></i>
                ) : (
                  <i className="ti-close"></i>
                )}
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

          <Label className="col-form-label">Keyword</Label>
          <div className="col-md-2 ms-2">
            <input
              value={keyword}
              onChange={val => Setkeyword(val.target.value)}
              type="text"
              className="form-control"
              placeholder="Search by any keyword"
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
                Setkeyword("")
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
            Add Leave Request
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
              <CardTitle className="h4">Approve Leave Request </CardTitle>
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
                  data={data}
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
              <Col>
                <div className="mb-3">
                  <Label htmlFor="useremail">Staff</Label>
                  <select
                    id="staffID"
                    name="staffID"
                    className="form-control"
                    type="staffID"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.staffID || ""}
                    invalid={
                      validation.touched.staffID && validation.errors.staffID
                        ? true
                        : false
                    }
                  >
                    <option value={""}>Select</option>
                    {Staff?.map(el => (
                      <option value={el.staffID}>
                        {el.firstName + " " + el.lastName}
                      </option>
                    ))}
                  </select>

                  {validation.touched.staffID && validation.errors.staffID ? (
                    <FormFeedback type="invalid">
                      {validation.errors.staffID}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col>
                <div className="mb-3">
                  <Label htmlFor="useremail">leave Type</Label>
                  <select
                    id="leaveType"
                    name="leaveType"
                    className="form-control"
                    type="leaveType"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.leaveType || ""}
                    invalid={
                      validation.touched.leaveType &&
                      validation.errors.leaveType
                        ? true
                        : false
                    }
                  >
                    <option value={""}>Select</option>
                    {leave?.map(el => (
                      <option value={el.name}>{el.name}</option>
                    ))}
                  </select>

                  {validation.touched.leaveType &&
                  validation.errors.leaveType ? (
                    <FormFeedback type="invalid">
                      {validation.errors.leaveType}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="mb-3">
                  <Label htmlFor="useremail">From Date</Label>
                  <Input
                    id="fromDate"
                    name="fromDate"
                    className="form-control"
                    placeholder="Enter fromDate"
                    type="Date"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.fromDate || ""}
                    invalid={
                      validation.touched.fromDate && validation.errors.fromDate
                        ? true
                        : false
                    }
                  />
                  {validation.touched.fromDate && validation.errors.fromDate ? (
                    <FormFeedback type="invalid">
                      {validation.errors.fromDate}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col>
                <div className="mb-3">
                  <Label htmlFor="useremail">To Date</Label>
                  <Input
                    id="toDate"
                    name="toDate"
                    className="form-control"
                    placeholder="Enter toDate"
                    type="Date"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.toDate || ""}
                    invalid={
                      validation.touched.toDate && validation.errors.toDate
                        ? true
                        : false
                    }
                  />
                  {validation.touched.toDate && validation.errors.toDate ? (
                    <FormFeedback type="invalid">
                      {validation.errors.toDate}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="mb-3">
                  <Label htmlFor="useremail">days</Label>
                  <Input
                    id="days"
                    name="days"
                    className="form-control"
                    placeholder="Enter days"
                    type="text"
                    disabled
                    value={Math.abs(
                      moment(validation.values.toDate, "YYYY-MM-DD").diff(
                        moment(validation.values.fromDate, "YYYY-MM-DD"),
                        "days",
                      ),
                    )}
                    invalid={
                      validation.touched.days && validation.errors.days
                        ? true
                        : false
                    }
                  />
                  {validation.touched.days && validation.errors.days ? (
                    <FormFeedback type="invalid">
                      {validation.errors.days}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col>
                <div className="mb-3">
                  <Label htmlFor="useremail">Apply Date</Label>
                  <Input
                    id="applyDate"
                    name="applyDate"
                    className="form-control"
                    placeholder="Enter applyDate"
                    type="Date"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.applyDate || ""}
                    invalid={
                      validation.touched.applyDate &&
                      validation.errors.applyDate
                        ? true
                        : false
                    }
                  />
                  {validation.touched.applyDate &&
                  validation.errors.applyDate ? (
                    <FormFeedback type="invalid">
                      {validation.errors.applyDate}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
            </Row>
            <Row>
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

export default connect(null, { setBreadcrumbItems })(ApproveRequest)
