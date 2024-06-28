import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { createClient } from "@supabase/supabase-js"

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
import _ from "lodash"
//supabase connection :::
const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)

const TeachersRating = props => {
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
  const [Student, setStudent] = useState([])
  const [Staff, setStaff] = useState([])

  const navigate = useNavigate()

  //end
  //GEt Staff

  async function getStudent() {
    const { data, error } = await supabase.from("Student").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    setStudent(data ?? [])
  }

  async function getStaff() {
    const { data, error } = await supabase.from("Staff").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1).ilike("role", `%Teacher%`)
    setStaff(data ?? [])
  }
  //end

  //get section :::
  async function getTeachersRating() {
    const { data, error } = await supabase
      .from("TeachersRating")
      .select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    setdata(data ?? [])
  }

  useEffect(() => {
    props.setBreadcrumbItems('Teachers Rating', breadcrumbItems)
    getStudent()
    getStaff()
    getTeachersRating()
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
      name: "",
      rating: "",
      comment: "",
      status: "pending",
      studentName: "",
    },

    validationSchema: Yup.object({
      staffID: Yup.string().required("Please Enter The staffID"),
      rating: Yup.string().required("Please Enter The rating"),
      comment: Yup.string().required("Please Enter The comment"),
      studentName: Yup.string().required("Please Enter studentName"),
    }),
    onSubmit: async values => {
        const staffOBJ = Staff.find(el => el.staffID === values.staffID)

      if (type === "new") {
        
        const { data, error } = await supabase
          .from("TeachersRating")
          .insert([
            { brancheId: localStorage.getItem("BranchId") ?? 1,
              staffID: staffOBJ.staffID,
              name:staffOBJ?.firstName + " " + staffOBJ?.lastName,
              rating:values.rating,
              comment:values.comment,
              status:values.status,
              studentName:values.studentName,
            
            },
          ])
          .select()

        if (error) {
          console.log("ez", error)
          toast.error("approved leave Inserted Failed", { autoClose: 2000 })
        } else {
          toast.success("approved leave Inserted", { autoClose: 2000 })
          setshow(false)
          getTeachersRating()
          validation.resetForm()
        }
      } else {
        const { data, error } = await supabase
          .from("TeachersRating")
          .update([
            {
                staffID: staffOBJ.staffID,
                name:staffOBJ?.firstName + " " + staffOBJ?.lastName,
                rating:values.rating,
                comment:values.comment,
                status:values.status,
                studentName:values.studentName,
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
          getTeachersRating()
          validation.resetForm()
        }
      }
    },
  })
  //end validation function :::
  //edit and delete functions :::
  const handelEdit = async row => {
    validation.resetForm()

    validation.setFieldValue("staffID",row.staffID)
    validation.setFieldValue("name",row.name)
    validation.setFieldValue("rating",row.rating)
    validation.setFieldValue("comment",row.comment)
    validation.setFieldValue("status",row.status)
    validation.setFieldValue("studentName",row.studentName)
  

    validation.setFieldValue("id", row.id)

    setshow(true)
    settype("edit")
  }

  const handelDelete = async id => {
    const { error } = await supabase
      .from("TeachersRating")
      .delete()
      .eq("id", id)

    if (error) {
      toast.error("ApproveRequest Deleted Failed", { autoClose: 2000 })
    } else {
      toast.success("ApproveRequest Deleted", { autoClose: 2000 })
      getTeachersRating()
    }
  }

  //end :::
  //function search :::
  const handleSearch = async () => {
    const { data, error } = await supabase
      .from("TeachersRating")
      .select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
      .or(
        `name.ilike.%${keyword}%,studentName.ilike.%${keyword}%,status.ilike.%${keyword}%`,
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
      .from("TeachersRating")
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
      getTeachersRating()
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
      name: "staffID",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.staffID,

    },
    {
      name: "name",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      cell: row => row?.name + "  ( " + row?.staffID + " ) ",
    },
    {
      name: "Rating",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      cell: row => _.times(5,(val)=>val<Number(row.rating)?<i className="ti-star" style={{color:"gold"}}></i>:<i className="ti-star"></i>),
    },
    {
      name: "Comment",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.comment,
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
        <div className="d-flex justify-content-between  mb-2">
          <div></div>
          {/* Button */}
          <button className="btn btn-primary" onClick={handleClick}>
            Add Leave Request
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
                <Label htmlFor="useremail">Rating</Label>
                <Input
                  id="rating"
                  name="rating"
                  className="form-control"
                  placeholder="Enter rating"
                  type="rating"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.rating || ""}
                  invalid={
                    validation.touched.rating &&
                    validation.errors.rating
                      ? true
                      : false
                  }
                />
                {validation.touched.rating &&
                validation.errors.rating ? (
                  <FormFeedback type="invalid">
                    {validation.errors.rating}
                  </FormFeedback>
                ) : null}
              </div>
            
              </Col>
            </Row>
          
            <Row>
              <Col>
              <div className="mb-3">
                <Label htmlFor="useremail">comment</Label>
                <Input
                  id="comment"
                  name="comment"
                  className="form-control"
                  placeholder="Enter comment"
                  type="comment"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.comment || ""}
                  invalid={
                    validation.touched.comment &&
                    validation.errors.comment
                      ? true
                      : false
                  }
                />
                {validation.touched.comment &&
                validation.errors.comment ? (
                  <FormFeedback type="invalid">
                    {validation.errors.comment}
                  </FormFeedback>
                ) : null}
              </div>
              </Col>
              <Col>
              <div className="mb-3">
                  <Label htmlFor="useremail">studentName</Label>
                  <select
                    id="studentName"
                    name="studentName"
                    className="form-control"
                    type="studentName"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.studentName || ""}
                    invalid={
                      validation.touched.studentName && validation.errors.studentName
                        ? true
                        : false
                    }
                  >
                    <option value={""}>Select</option>
                    {Student?.map(el => (
                      <option value={el.firstName}>
                        {el.firstName}
                      </option>
                    ))}
                  </select> 

                  {validation.touched.studentName && validation.errors.studentName ? (
                    <FormFeedback type="invalid">
                      {validation.errors.studentName}
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

export default connect(null, { setBreadcrumbItems })(TeachersRating)
