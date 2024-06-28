/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import DataTable from "react-data-table-component"
import { createClient } from "@supabase/supabase-js"
import { v4 as uuidv4 } from "uuid"

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
import { isEmpty } from "lodash"
import { isNil } from "lodash"
import _ from "lodash"


//
import * as XLSX from "xlsx"
const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)

const ClosedHomeworkSuperAdmin = props => {
  document.title =
    "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard"

  const breadcrumbItems = [
    { title: "Smart school", link: "#" },
    { title: "Academics", link: "#" },
  ]

  const [section, setSection] = useState([])

  const [clas, setclas] = useState([])
  const [sections, setSections] = useState([])
  const [subject, setSubject] = useState([])
  const [subjectGroup, setSubjectGroup] = useState([])
  const [attachDocument, setattachDocument] = useState([])

  const [show, setshow] = useState(false)
  const [type, settype] = useState("new")
  const [search, setSearch] = useState("")

  async function getCountries() {
    const { data, error } = await supabase.from("Homework").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    setSection(data ?? [])
  }

  async function getSections() {
    const { data, error } = await supabase.from("Section").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    setSections(data ?? [])
  }

  async function getclas() {
    const { data, error } = await supabase.from("Class").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    setclas(data ?? [])
  }

  async function getSubject() {
    const { data, error } = await supabase.from("Subjects").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    setSubject(data ?? [])
  }

  async function getSubjectGroup() {
    const { data, error } = await supabase.from("SubjectGroup").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    setSubjectGroup(data ?? [])
  }

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      class: "",
      sections: "",
      subjectGroup: "",
      subject: "",
      homeworkDate: "",
      evaluationDate: "",
      submissionDate: "",
      maxMarks: "",
      attachDocument: "",
      description: "",
      id: "",
    },

    validationSchema: Yup.object({
      class: Yup.string().required("Please Enter Your  class"),
      sections: Yup.string().required("Please Enter Your  sections"),
      subjectGroup: Yup.string().required("Please Enter Your subjectGroup"),
      subject: Yup.string().required("Please Enter Your  subject"),
      homeworkDate: Yup.string().required("Please Enter Your  homeworkDate"),
      maxMarks: Yup.string().required("Please Enter Your  maxMarks"),
      description: Yup.string().required("Please Enter Your  description"),
    }),
    onSubmit: async values => {
      if (type === "new") {
        const { data, error } = await supabase
          .from("Homework")
          .insert([
            { brancheId: localStorage.getItem("BranchId") ?? 1,
              classRef: values.class,
              sectionRef: values.sections,
              subjectGroupRef: values.subjectGroup,
              subjectRef: values.subject,
              homeworkDate: values.homeworkDate,
              evaluationDate: values.evaluationDate,
              submissionDate: values.submissionDate,
              maxMarks: values.maxMarks,
              attachDocument: attachDocument,
              description: values.description,
              createdBy: values?.createdBy ?? "ADMIN",
              status: "upcoming",
            },
          ])
          .select()

        if (error) {
          console.log("ez", error)
          toast.error("Homework Inserted Failed", { autoClose: 2000 })
        } else {
          toast.success("Homework Inserted", { autoClose: 2000 })
          setshow(false)
          getCountries()
          validation.resetForm()
        }
      } else {
        const { data, error } = await supabase
          .from("Homework")
          .update([
            {
              classRef: values.class,
              sectionRef: values.sections,
              subjectGroupRef: values.subjectGroup,
              subjectRef: values.subject,
              homeworkDate: values.homeworkDate,
              evaluationDate: values.evaluationDate,
              submissionDate: values.submissionDate,
              maxMarks: values.maxMarks,
              attachDocument: attachDocument,
              description: values.description,
              createdBy: values?.createdBy ?? "ADMIN",
            },
          ])
          .eq("id", values.id)
          .select()

        if (error) {
          toast.error("Homework Updated Failed", { autoClose: 2000 })
        } else {
          toast.success("Homework Updated", { autoClose: 2000 })
          setshow(false)
          getCountries()
          validation.resetForm()
        }
      }
    },
  })

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

  const navigate = useNavigate()

  useEffect(() => {
    props.setBreadcrumbItems("Homework", breadcrumbItems)
    getCountries()

    getSubject()
    getclas()
    getSections()
    getSubjectGroup()
  }, [])

  const handleClick = () => {
    settype("new")
    validation.resetForm()
    setshow(true)
  }

  const handleSearch = async () => {
    const { data, error } = await supabase
      .from("Homework")
      .select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
      .ilike("classRef", `%${search}%`)
      .ilike("sectionRef", `%${search}%`)
      .ilike("subjectRef", `%${search}%`)
      .ilike("createdBy", `%${search}%`)
      .ilike("subjectGroupRef", `%${search}%`)
    setSection(data)
  }

  const handelEdit = async row => {
    validation.resetForm()

    validation.setFieldValue("class", row.classRef)
    validation.setFieldValue("sections", row.sectionRef)
    validation.setFieldValue("subjectGroup", row.subjectGroupRef)
    validation.setFieldValue("homeworkDate", row.homeworkDate)
    validation.setFieldValue("evaluationDate", row.evaluationDate)
    validation.setFieldValue("subject", row.subjectRef)
    validation.setFieldValue("maxMarks", row.maxMarks)
    // validation.setFieldValue("attachDocument", row.attachDocument)
    validation.setFieldValue("description", row.description)
    validation.setFieldValue("submissionDate", row.submissionDate)

    validation.setFieldValue("id", row.id)

    setattachDocument(row.attachDocument)
    setshow(true)
    settype("edit")
  }

  const handelDelete = async id => {
    const { error } = await supabase.from("Homework").delete().eq("id", id)

    if (error) {
      toast.error("Homework Deleted Failed", { autoClose: 2000 })
    } else {
      toast.success("Homework Deleted", { autoClose: 2000 })
      getCountries()
    }
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
  const handelupdateStatus = async row => {
    const { data, error } = await supabase
      .from("Homework")
      .update([
        {
          status: row.status === "upcoming" ? "closed" : "upcoming",
        },
      ])
      .eq("id", row.id)
      .select()

    if (error) {
      toast.error("Homework Deleted Failed", { autoClose: 2000 })
    } else {
      toast.success(row.status === "upcoming" ? "To Closed" : "To Upcoming", {
        autoClose: 2000,
      })
      getCountries()
    }
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
      name: "Class",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.classRef,
    },
    {
      name: "Homework",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.sectionRef,
    },
    {
      name: "Subject Group",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.subjectGroupRef,
    },
    {
      name: "Subject",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.subjectRef,
    },
    {
      name: "Homework Date",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.homeworkDate,
    },
    {
      name: "Submission Date",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.submissionDate,
    },
    {
      name: "Evaluation Date",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.evaluationDate,
    },
    {
      name: "Created by",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.createdBy,
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
                {row?.status !== "upcoming" ? (
                  <i className="ti-check"></i>
                ) : (
                  <i className="ti-power-off"></i>
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

          <label className="col-form-label">Homework </label>
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
            Add Homework
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
              <CardTitle className="h4">Homework List </CardTitle>
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
        fullscreen={true}
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
            <Row>
              <div className="mb-3">
                <Label htmlFor="useremail" className="me-1">
                  Class
                </Label>
                <select
                  id="class"
                  name="class"
                  className="form-control"
                  placeholder="Enter  class"
                  type="class"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.class || ""}
                  invalid={
                    validation.touched.class && validation.errors.class
                      ? true
                      : false
                  }
                >
                  <option value={""}>Select</option>
                  {clas?.map(el => (
                    <option value={el.className}>{el.className}</option>
                  ))}
                </select> 
                {validation.touched.class && validation.errors.class ? (
                  <FormFeedback type="invalid">
                    {validation.errors.class}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label htmlFor="useremail" className="me-1">
                  Section
                </Label>

                <select
                  id="sections"
                  name="sections"
                  className="form-control"
                  placeholder="Enter  class"
                  type="sections"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.sections || ""}
                  invalid={
                    validation.touched.sections && validation.errors.sections
                      ? true
                      : false
                  }
                >
                  <option value={""}>Select</option>
                  {sections?.map(el => (
                    <option value={el.sectionName}>{el.sectionName}</option>
                  ))}
                </select> 
                {validation.touched.sections && validation.errors.sections ? (
                  <FormFeedback type="invalid">
                    {validation.errors.sections}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label htmlFor="useremail" className="me-1">
                  subjectGroup
                </Label>

                <select
                  id="subjectGroup"
                  name="subjectGroup"
                  className="form-control"
                  placeholder="Enter  class"
                  type="subjectGroup"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.subjectGroup || ""}
                  invalid={
                    validation.touched.subjectGroup &&
                    validation.errors.subjectGroup
                      ? true
                      : false
                  }
                >
                  <option value={""}>Select</option>
                  {subjectGroup?.map(el => (
                    <option value={el.name}>{el.name}</option>
                  ))}
                </select> 
                {validation.touched.subjectGroup &&
                validation.errors.subjectGroup ? (
                  <FormFeedback type="invalid">
                    {validation.errors.subjectGroup}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label htmlFor="useremail" className="me-1">
                  subject
                </Label>
                <select
                  id="subject"
                  name="subject"
                  className="form-control"
                  placeholder="Enter  class"
                  type="subject"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.subject || ""}
                  invalid={
                    validation.touched.subject && validation.errors.subject
                      ? true
                      : false
                  }
                >
                  <option value={""}>Select</option>
                  {subject?.map(el => (
                    <option value={el.subjectName}>{el.subjectName}</option>
                  ))}
                </select> 
                {validation.touched.subject && validation.errors.subject ? (
                  <FormFeedback type="invalid">
                    {validation.errors.subject}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label htmlFor="useremail">homeworkDate</Label>
                <Input
                  id="homeworkDate"
                  name="homeworkDate"
                  homeworkDate="form-control"
                  placeholder="Enter section homeworkDate"
                  type="date"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.homeworkDate || ""}
                  invalid={
                    validation.touched.homeworkDate &&
                    validation.errors.homeworkDate
                      ? true
                      : false
                  }
                />
                {validation.touched.homeworkDate &&
                validation.errors.homeworkDate ? (
                  <FormFeedback type="invalid">
                    {validation.errors.homeworkDate}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label htmlFor="useremail">submissionDate</Label>
                <Input
                  id="submissionDate"
                  name="submissionDate"
                  submissionDate="form-control"
                  placeholder="Enter section submissionDate"
                  type="date"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.submissionDate || ""}
                  invalid={
                    validation.touched.submissionDate &&
                    validation.errors.submissionDate
                      ? true
                      : false
                  }
                />
                {validation.touched.submissionDate &&
                validation.errors.submissionDate ? (
                  <FormFeedback type="invalid">
                    {validation.errors.submissionDate}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label htmlFor="useremail">evaluationDate</Label>
                <Input
                  id="evaluationDate"
                  name="evaluationDate"
                  evaluationDate="form-control"
                  placeholder="Enter section evaluationDate"
                  type="date"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.evaluationDate || ""}
                  invalid={
                    validation.touched.evaluationDate &&
                    validation.errors.evaluationDate
                      ? true
                      : false
                  }
                />
                {validation.touched.evaluationDate &&
                validation.errors.evaluationDate ? (
                  <FormFeedback type="invalid">
                    {validation.errors.evaluationDate}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label htmlFor="useremail">maxMarks</Label>
                <Input
                  id="maxMarks"
                  name="maxMarks"
                  maxMarks="form-control"
                  placeholder="Enter section maxMarks"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.maxMarks || ""}
                  invalid={
                    validation.touched.maxMarks && validation.errors.maxMarks
                      ? true
                      : false
                  }
                />
                {validation.touched.maxMarks && validation.errors.maxMarks ? (
                  <FormFeedback type="invalid">
                    {validation.errors.maxMarks}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label htmlFor="useremail">attachDocument</Label>

                <Row>
                  {!isEmpty(attachDocument) && !isNil(attachDocument) && (
                    <Col md={1}>
                      <a
                        href={`https://ypduxejepwdmssduohpi.supabase.co/storage/v1/object/public/uploads/${attachDocument}`}
                        alt="img"
                        target="_blank"
                      >
                        link to AttachDocument
                      </a>
                    </Col>
                  )}

                  <Col>
                    <input
                      onChange={e => uploadDoc(e, setattachDocument)}
                      className="form-control"
                      type="file"
                    />
                  </Col>
                </Row>
              </div>

              <div className="mb-3">
                <Label htmlFor="useremail">description</Label>
                <Input
                  id="description"
                  name="description"
                  description="form-control"
                  placeholder="Enter section description"
                  type="textarea"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.description || ""}
                  invalid={
                    validation.touched.description &&
                    validation.errors.description
                      ? true
                      : false
                  }
                />
                {validation.touched.description &&
                validation.errors.description ? (
                  <FormFeedback type="invalid">
                    {validation.errors.description}
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
                  <button
                    className="btn btn-danger w-md waves-effect waves-light ms-3"
                    onClick={() => {
                      setshow(false)
                    }}
                  >
                    Close
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

export default connect(null, { setBreadcrumbItems })(ClosedHomeworkSuperAdmin)
