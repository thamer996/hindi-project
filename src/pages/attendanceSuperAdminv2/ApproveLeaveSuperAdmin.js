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
} from "reactstrap"
import _ from "lodash"
import { isEmpty } from "lodash"

//
import * as XLSX from "xlsx"
import { connect } from "react-redux"
import DataTable from "react-data-table-component"
//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"
import { useFormik } from "formik"
import * as Yup from "yup"
import { ToastContainer, toast } from "react-toastify"
//supabase connection :::
const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)

const ApproveLeaveSuperAdmin = props => {
  document.title =
    "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard"


  const [ClassData, SetClass] = useState([])
  const [sections, setSections] = useState([])
  const [type, settype] = useState("new")
  const [section, setSection] = useState([])
  const [show, setshow] = useState(false)
  const [sectionValue, SetsectionValue] = useState("")
  const [classValue, SetclassValue] = useState("")
  const [student, setStudent] = useState([])
  const breadcrumbItems = [
    { title: "Smart school", link: "#" },
    { title: "Attendance", link: "#" },
  ]
  const navigate = useNavigate()
  //Fuction to get class select data
  async function getClass() {
    const { data, error } = await supabase.from("Class").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    SetClass(data ?? [])
    console.log("select class", data)
    console.log("ClassData", ClassData)
  }

  //end
  //GEt student
  async function getStudent() {
    const { data, error } = await supabase.from("Student").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    setStudent(data ?? [])
    console.log("students", data)
  }
  //end
  //Approvement table data function :::
  async function getSection() {
    const { data, error } = await supabase.from("Section").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    console.log("data get from section table ", data)

    setSections(data ?? [])
  }
  //end

  //get section :::
  async function getSections() {
    const { data, error } = await supabase.from("ApproveLeave").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    console.log("table data approvement ", data)
    setSection(data ?? [])
  }

  //end :::

  const handleClick = () => {
    settype("new")
    validation.resetForm()
    setshow(true)
  }
  useEffect(() => {
    props.setBreadcrumbItems("SubjectGroup", breadcrumbItems)
    getClass()
    getSections()
    getSection()
    getStudent()
  }, [])
  //validation function ::::
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      applyDate: "",
      approveDisapproveBy: "",
      classRef: "",
      created_at: "",
      fromDate: "",
      id: "",
      sectionRef: "",
      status: "pending",
      studentName: "",
      toDate: "",
    },

    validationSchema: Yup.object({
      applyDate: Yup.string().required("Please Enter the applyDate"),
      approveDisapproveBy: Yup.string().required(
        "Please Enter The approveDisapproveBy",
      ),

      fromDate: Yup.string().required("Please Enter The fromDate"),

      toDate: Yup.string().required("Please Enter toDate"),
    }),
    onSubmit: async values => {
      const student = JSON.parse(values.student)
      console.log("student", student)
      if (type === "new") {
        const { data, error } = await supabase
          .from("ApproveLeave")
          .insert([
            { brancheId: localStorage.getItem("BranchId") ?? 1,
              applyDate: values.applyDate,
              approveDisapproveBy: values.approveDisapproveBy,
              classRef: student.class,
              fromDate: values.fromDate,
              sectionRef: student.section,
              status: values.status,
              studentName: student.firstName,
              toDate: values.toDate,
            },
          ])
          .select()

        if (error) {
          console.log("ez", error)
          toast.error("Approve leave Inserted Failed", { autoClose: 2000 })
        } else {
          toast.success("Approve leave Inserted", { autoClose: 2000 })
          setshow(false)
          getSections()
          validation.resetForm()
        }
      } else {
        const { data, error } = await supabase
          .from("ApproveLeave")
          .update([
            {
              applyDate: values.applyDate,
              approveDisapproveBy: values.approveDisapproveBy,
              classRef: student.class,
              fromDate: values.fromDate,
              sectionRef: student.section,
              status: values.status,
              studentName: student.firstName,
              toDate: values.toDate,
              id: values.id,
            },
          ])
          .eq("id", values.id)
          .select()

        if (error) {
          console.log("ez", error)
          toast.error("Approve leave Updated Failed", { autoClose: 2000 })
        } else {
          toast.success("Approve leave Updated", { autoClose: 2000 })
          setshow(false)
          getSections()
          validation.resetForm()
        }
      }
    },
  })
  //end validation function :::
  //edit and delete functions :::
  const handelEdit = async row => {
    validation.resetForm()
    validation.setFieldValue("id", row.id)
    validation.setFieldValue("toDate", row.toDate)
    validation.setFieldValue("studentName", row.studentName)
    validation.setFieldValue("status", row.status)
    validation.setFieldValue("sectionRef", row.sectionRef)
    validation.setFieldValue("fromDate", row.fromDate)
    validation.setFieldValue("classRef", row.classRef)
    validation.setFieldValue("approveDisapproveBy", row.approveDisapproveBy)
    validation.setFieldValue("applyDate", row.applyDate)
    setshow(true)
    settype("edit")
  }
  const handelDelete = async id => {
    const { error } = await supabase.from("ApproveLeave").delete().eq("id", id)

    if (error) {
      toast.error("Subject Deleted Failed", { autoClose: 2000 })
    } else {
      toast.success("Subject Deleted", { autoClose: 2000 })
      getSections()
    }
  }

  //end :::
  //function search :::
  const handleSearch = async () => {
    const { data, error } = await supabase
      .from("ApproveLeave")
      .select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
      .ilike("classRef", `%${classValue}%`)
      .ilike("sectionRef", `%${sectionValue}%`)
    setSection(data)
  }
  const handleClickExcel = () => {
    const array = section

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
  //end :::
  //fuction to update status :::
  const handelupdateStatus = async row => {
    let newStatus
    if (row.status === "pending" || row.status === "disapprove") {
      newStatus = "approve"
    } else {
      newStatus = "disapprove"
    }
    const { data, error } = await supabase
      .from("ApproveLeave")
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
      toast.success(row.status === "pending" ? "To approve" : "To disapprove", {
        autoClose: 2000,
      })
      getSections()
    }
  }

  //end :::

  useEffect(() => {
    props.setBreadcrumbItems("Approve Leave", breadcrumbItems)
  })
  const onChangeSelectClass = value => {
    console.log("selected Class ", value)
    SetclassValue(value)
  }
  const onChangeSelectSection = value => {
    console.log("selected section ", value)
    SetsectionValue(value)
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
      name: "Student Name",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.studentName,
    },
    {
      name: "Class",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.classRef,
    },
    {
      name: "Section",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.sectionRef,
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
      name: "From Date",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.fromDate,
    },
    {
      name: "To Date",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.toDate,
    },
    {
      name: "Status",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.status,
    },
    {
      name: "Approve Disapprove By",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.approveDisapproveBy,
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
                {row.status === "pending" || row.status === "disapprove" ? (
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

          <Label className="col-form-label">Class</Label>
          <div className="col-md-2 ms-2">
            <select
              id="classRef"
              name="classRef"
              className="form-control me-1"
              placeholder="Enter  class"
              type="classRef"
              onChange={e => onChangeSelectClass(e.target.value)}
              onBlur={validation.handleBlur}
              value={validation.values.classRef || classValue || ""}
              invalid={
                validation.touched.classRef && validation.errors.classRef
                  ? true
                  : false
              }
            >
              <option value={""}>Select</option>
              {ClassData?.map(el => (
                <option value={el.className}>{el.className}</option>
              ))}
            </select> 

            {validation.touched.classRef && validation.errors.classRef ? (
              <FormFeedback type="invalid">
                {validation.errors.classRef}
              </FormFeedback>
            ) : null}
          </div>

          <Label className="col-form-label">Section</Label>
          <div className="col-md-2 ms-2">
            <select
              id="sectionRef"
              name="sectionRef"
              className="form-control me-1"
              placeholder="Enter  class"
              type="sectionRef"
              onChange={e => onChangeSelectSection(e.target.value)}
              onBlur={validation.handleBlur}
              value={validation.values.sectionRef || sectionValue || ""}
              invalid={
                validation.touched.sectionRef && validation.errors.sectionRef
                  ? true
                  : false
              }
            >
              <option value={""}>Select</option>
              {sections?.map(el => (
                <option value={el.sectionName}>{el.sectionName}</option>
              ))}
            </select> 

            {validation.touched.sectionRef && validation.errors.sectionRef ? (
              <FormFeedback type="invalid">
                {validation.errors.sectionRef}
              </FormFeedback>
            ) : null}
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
                SetclassValue("")
                SetsectionValue("")
                getSections()
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
            Add Approve Leave
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
              <CardTitle className="h4">Approve Leave List </CardTitle>
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
                <Label htmlFor="useremail">Student</Label>
                <select
                  id="student"
                  name="student"
                  className="form-control"
                  type="student"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.student || ""}
                  invalid={
                    validation.touched.student && validation.errors.student
                      ? true
                      : false
                  }
                >
                  <option value={""}>Select</option>
                  {student?.map(el => (
                    <option value={JSON.stringify(el)}>{el.firstName}</option>
                  ))}
                </select> 

                {validation.touched.student && validation.errors.student ? (
                  <FormFeedback type="invalid">
                    {validation.errors.student}
                  </FormFeedback>
                ) : null}
              </div>

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
                    validation.touched.applyDate && validation.errors.applyDate
                      ? true
                      : false
                  }
                />
                {validation.touched.applyDate && validation.errors.applyDate ? (
                  <FormFeedback type="invalid">
                    {validation.errors.applyDate}
                  </FormFeedback>
                ) : null}
              </div>
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

              <div className="mb-3">
                <Label htmlFor="useremail">Approve Disapprove by</Label>
                <Input
                  id="approveDisapproveBy"
                  name="approveDisapproveBy"
                  className="form-control"
                  placeholder="Enter approveDisapproveBy"
                  type="approveDisapproveBy"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.approveDisapproveBy || ""}
                  invalid={
                    validation.touched.approveDisapproveBy &&
                    validation.errors.approveDisapproveBy
                      ? true
                      : false
                  }
                />
                {validation.touched.approveDisapproveBy &&
                validation.errors.approveDisapproveBy ? (
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

export default connect(null, { setBreadcrumbItems })(ApproveLeaveSuperAdmin)
