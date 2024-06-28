import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import {
  Table,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Container,
  Badge,
  Modal,
  ModalBody,
  Form,
  Label,
  Input,
  FormFeedback,
  ModalHeader,
} from "reactstrap"

import { connect } from "react-redux"

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"
import HeaderTeacher from "../../components/HorizontalLayoutTeacher/HeaderTeacher"
import NvbarTeacher from "../../components/HorizontalLayoutTeacher/NvbarTeacher"
import { createClient } from "@supabase/supabase-js"
import _, { isEmpty } from "lodash"
import { useFormik } from "formik"
import * as Yup from "yup"
import { toast, ToastContainer } from "react-toastify"
import DataTable from "react-data-table-component"
import { v4 as uuidv4 } from "uuid"
const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)

const Payroll = props => {
  document.title =
    "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard"

  const breadcrumbItems = [
    { title: "Smart school", link: "#" },
    { title: "Human Resource", link: "#" },
  ]
  const navigate = useNavigate()
  const [data, setdata] = useState([])
  const [Role, setRole] = useState("")
  const [month, setmonth] = useState("")
  const [year, setyear] = useState("")
  const [dataToUpdate, setdataToUpdate] = useState([])
  const [type, settype] = useState("add")
  const [show, setshow] = useState(false)

  async function handleSearch() {
    if (!isEmpty(month) && !isEmpty(year)) {
      const { data: staff } = await supabase
        .from("Staff")
        .select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
        .ilike("role", `%${Role}%`)
      const { data: PayRoll } = await supabase
        .from("PayRoll")
        .select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
        .ilike("monthYear", `%${month + "-" + year}%`)

      const intersectionStaffId = _.intersectionBy(
        staff,
        PayRoll,
        "staffID",
      ).map(el => el.staffID)

      const data = staff.map(el => {
        if (intersectionStaffId.includes(el.staffID)) {
          const Att = PayRoll.find(att => att.staffID === el.staffID)
          return { ...el, ...Att }
        } else {
          return { ...el, status: "Generated" }
        }
      })
      setdataToUpdate(PayRoll)
      setdata(data)
    } else {
      toast.error("month and year required !", { autoClose: 2000 })
    }
  }
  useEffect(() => {
    props.setBreadcrumbItems("Payroll", breadcrumbItems)
  }, [])

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      staffID: "",
      paymentAmount: "",
      paymentMode: "",
      monthYear: "",
      note: "",
      paymentDate: "",
      status: "",
    },

    validationSchema: Yup.object({
      paymentAmount: Yup.string().required("Please Enter Your paymentAmount"),
      paymentMode: Yup.string().required("please insert paymentMode"),
      monthYear: Yup.string().required("please insert monthYear"),
      note: Yup.string().required("please insert note"),
      paymentDate: Yup.string().required("please insert paymentDate"),
    }),
    onSubmit: async values => {
      if (type === "add") {
        const { data, error } = await supabase
          .from("PayRoll")
          .insert([
            { brancheId: localStorage.getItem("BranchId") ?? 1,
              staffID: values?.staffID,
              paymentAmount: values?.paymentAmount,
              paymentMode: values?.paymentMode,
              monthYear: values?.monthYear,
              note: values?.note,
              paymentDate: values?.paymentDate,
              status: "Paid",
            },
          ])
          .select()

        if (error) {
          toast.error("PayRoll Added Failed", { autoClose: 2000 })
        } else {
          toast.success("PayRoll Added", { autoClose: 2000 })
          setshow(false)
          handleSearch()
          validation.resetForm()
        }
      } else {
        const { data, error } = await supabase
          .from("PayRoll")
          .update([
            {
              staffID: values?.staffID,
              paymentAmount: values?.paymentAmount,
              paymentMode: values?.paymentMode,
              monthYear: values?.monthYear,
              note: values?.note,
              paymentDate: values?.paymentDate,
              status: values?.status,
            },
          ])
          .eq("id", values.id)
          .select()

        if (error) {
          toast.error("PayRoll Updated Failed", { autoClose: 2000 })
        } else {
          toast.success("PayRoll Updated", { autoClose: 2000 })
          setshow(false)
          handleSearch()
          validation.resetForm()
        }
      }
    },
  })

  const handelEdit = async row => {
    validation.resetForm()

    validation.setFieldValue("fullName", row.firstName + " " + row.lastName)

    validation.setFieldValue("staffID", row.staffID)
    validation.setFieldValue("paymentAmount", row?.paymentAmount)
    validation.setFieldValue("paymentMode", row?.paymentMode)
    validation.setFieldValue("monthYear", month + "-" + year)
    validation.setFieldValue("note", row?.note)
    validation.setFieldValue("status", row?.status)
    validation.setFieldValue("paymentDate", row?.paymentDate)

    settype("edit")
    validation.setFieldValue("id", row.id)
    setshow(true)
  }

  const handelDelete = async id => {
    const { error } = await supabase.from("PayRoll").delete().eq("id", id)

    if (error) {
      toast.error("PayRoll Deleted Failed", { autoClose: 2000 })
    } else {
      toast.success("PayRoll Deleted", { autoClose: 2000 })
      handleSearch()
    }
  }

  const handleAdd = row => {
    validation.resetForm()

    validation.setFieldValue("fullName", row.firstName + " " + row.lastName)
    validation.setFieldValue("staffID", row.staffID)
    validation.setFieldValue("monthYear", month + "-" + year)

    settype("add")
    setshow(true)
  }
  const handleClick = () => {
    navigate("/add-marks-grade-teacher")
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
    color: "green", // Color for edit icon (black)
  }

  const columns = [
    {
      name: "staffID",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "130px",
      selector: row => row?.staffID ?? "None",
    },
    {
      name: "firstName",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.firstName ?? "None",
    },
    {
      name: "role",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.role ?? "None",
    },
    {
      name: "department",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.department,
    },
    {
      name: "designation",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.designation,
    },

    {
      name: "mobileNumber",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.mobileNumber,
    },

    {
      name: "status",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      cell: row =>
        row?.status === "Paid" ? (
          <Badge color="success" className="rounded-pill bg-success">
            {row?.status}
          </Badge>
        ) : (
          <Badge color="warning" className="rounded-pill bg-warning">
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
              <span
                style={editIconStyle}
                onClick={() =>
                  row.status === "Generated" ? handleAdd(row) : handelEdit(row)
                }
              >
                <i className="ti-money"></i>
              </span>
              {row.status === "Paid" && (
                <span
                  style={actionIconStyle}
                  onClick={() => handelDelete(row?.id)}
                >
                  <i className="ti-back-right"></i>
                </span>
              )}
            </>
          </div>
        )
      },
    },
  ]

  return (
    <React.Fragment>
      <Row>
        <div className="d-flex  mb-4">
          <div></div>
          {/* Button */}
          <label className="col-form-label">Role</label>&nbsp;
          <div className="col-md-2 me-1">
            <select
              onChange={val => {
                setRole(val.target.value)
              }}
              value={Role}
              className="form-control"
            >
              <option> Select </option>
              <option>Admin</option>
              <option>Teacher</option>
              <option>Accountant</option>
              <option>Librarian</option>
              <option>Receptionist</option>
              <option>Super Admin</option>
            </select> 
          </div>
          <label className="col-form-label">Month</label>&nbsp;
          <div className="col-md-2 me-1">
            <select
              onChange={val => {
                setmonth(val.target.value)
              }}
              value={month}
              className="form-control"
            >
              <option> Select </option>
              <option>January</option>
              <option>February</option>
              <option>March</option>
              <option>April</option>
              <option>May</option>
              <option>June</option>
              <option>July</option>
              <option>August</option>
              <option>September</option>
              <option>October</option>
              <option>November</option>
              <option>December</option>
            </select> 
          </div>
          <label className="col-form-label">Year</label>&nbsp;
          <div className="col-md-2 me-1">
            <select
              onChange={val => {
                setyear(val.target.value)
              }}
              value={year}
              className="form-control"
            >
              <option> Select </option>
              <option>2023</option>
              <option>2024</option>
            </select> 
          </div>
          <div>
            <button className="btn btn-primary" onClick={handleSearch}>
              Search
            </button>
          </div>
          <div>
            <button
              className="btn btn-danger ms-2"
              onClick={() => {
                setRole("")
                setmonth("")
                setyear("")
                setdata([])
              }}
            >
              Reset
            </button>
          </div>
        </div>

        <Col lg={12}>
          <Card>
            <CardBody>
              <CardTitle className="h4">Payroll List</CardTitle>

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
      <Modal
        isOpen={show}
        toggle={() => setshow(!show)}
        centered={true}
        size="xl"
      >
        <ModalHeader toggle={() => setshow(!show)}>
          {type === "add" ? "Proceed To Pay" : "Update Pay"}
        </ModalHeader>
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
                  <Label htmlFor="useremail">Staff Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    className="form-control"
                    placeholder="Enter role fullName"
                    type="fullName"
                    disabled
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.fullName || ""}
                    invalid={
                      validation.touched.fullName && validation.errors.fullName
                        ? true
                        : false
                    }
                  />
                  {validation.touched.fullName && validation.errors.fullName ? (
                    <FormFeedback type="invalid">
                      {validation.errors.fullName}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col>
                <div className="mb-3">
                  <Label htmlFor="useremail">Payment Amount ($)</Label>
                  <Input
                    id="paymentAmount"
                    name="paymentAmount"
                    className="form-control"
                    placeholder="Enter role paymentAmount"
                    type="number"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.paymentAmount || ""}
                    invalid={
                      validation.touched.paymentAmount &&
                      validation.errors.paymentAmount
                        ? true
                        : false
                    }
                  />
                  {validation.touched.paymentAmount &&
                  validation.errors.paymentAmount ? (
                    <FormFeedback type="invalid">
                      {validation.errors.paymentAmount}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="mb-3">
                  <Label htmlFor="useremail">Month - Year</Label>
                  <Input
                    id="monthYear"
                    name="monthYear"
                    className="form-control"
                    placeholder="Enter role monthYear"
                    type="monthYear"
                    disabled
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.monthYear || ""}
                    invalid={
                      validation.touched.monthYear &&
                      validation.errors.monthYear
                        ? true
                        : false
                    }
                  />
                  {validation.touched.monthYear &&
                  validation.errors.monthYear ? (
                    <FormFeedback type="invalid">
                      {validation.errors.monthYear}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col>
                <div className="mb-3">
                  <Label htmlFor="useremail">Payment Mode</Label>
                  <select
                    id="paymentMode"
                    name="paymentMode"
                    className="form-control"
                    placeholder="Enter paymentMode"
                    type="paymentMode"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.paymentMode || ""}
                    invalid={
                      validation.touched.paymentMode &&
                      validation.errors.paymentMode
                        ? true
                        : false
                    }
                  >
                    <option> Select </option>
                    <option>Cash</option>
                    <option>Cheque</option>
                    <option>transfer to Bank Accountant</option>
                  </select> 

                  {validation.touched.paymentMode &&
                  validation.errors.paymentMode ? (
                    <FormFeedback type="invalid">
                      {validation.errors.paymentMode}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="mb-3">
                  <Label htmlFor="useremail">Payment Date</Label>
                  <input
                    id="paymentDate"
                    name="paymentDate"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.paymentDate || ""}
                    className="form-control"
                    type="date"
                  />
                  {validation.touched.paymentDate &&
                  validation.errors.paymentDate ? (
                    <FormFeedback type="invalid">
                      {validation.errors.paymentDate}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col>
                <div className="mb-3">
                  <Label htmlFor="useremail">Note</Label>
                  <Input
                    id="note"
                    name="note"
                    className="form-control"
                    placeholder="Enter role note"
                    type="note"
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
              </Col>
            </Row>

            <Row>
              <div>
                <div className="col-12 text-center">
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

export default connect(null, { setBreadcrumbItems })(Payroll)
