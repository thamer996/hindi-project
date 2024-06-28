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
import _ from "lodash"

const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)

const ExamResult = props => {
  document.title =
    "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard"

  const breadcrumbItems = [
    { title: "Smart school", link: "#" },
    { title: "Academics", link: "#" },
  ]

  const [section, setSection] = useState([])

  const [sections, setSections] = useState([])
  const [students, setStudent] = useState([])
  const [subject, setSubject] = useState([])
  const [subjectValues, setSubjectValues] = useState([])

  const [show, setshow] = useState(false)
  const [type, settype] = useState("new")
  const [search, setSearch] = useState("")

  async function getCountries() {
    const { data, error } = await supabase.from("ExamResult").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    setSection(_.sortBy(data, "percent").reverse() ?? [])
  }

  async function getstudents() {
    const { data, error } = await supabase.from("Student").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    setStudent(data ?? [])
  }

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      student: "",
      id: "",
    },

    validationSchema: Yup.object({}),
    onSubmit: async values => {
      if (type === "new") {
        const student = JSON.parse(values.student)

        const subjectList = []
        const value = []

        _.union(Object.keys(values), subject)
          .filter(elmm => elmm !== "student" && elmm !== "id")
          .forEach(el => {
            let obj = {}
            // define a single property of obj object
            Object.defineProperty(obj, el, {
              value: values[el],
              writable: true,
              enumerable: true,
              configurable: true,
            })

            value.push(values[el])
            subjectList.push(obj)
          })

        const { data, error } = await supabase
          .from("ExamResult")
          .insert([
            { brancheId: localStorage.getItem("BranchId") ?? 1,
              subjectList: subjectList,

              admissionNo: student.admissionNo,
              rollNumber: student.rollNumber,
              studentName: `${student.firstName} ${student.lastName}`,
              studentRef: student.id,

              grandTotal: _.sum(value.map(el => Number(el))),
              percent: Number(_.mean(value.map(el => Number(el)))).toFixed(2),
              result:
                _.mean(value.map(el => Number(el))) >= 50 ? "pass" : "fail",
            },
          ])
          .select()

        if (error) {
          toast.error("ExamResult Inserted Failed", { autoClose: 2000 })
        } else {
          toast.success("ExamResult Inserted", { autoClose: 2000 })
          setshow(false)
          getCountries()
          setSubject([])
          validation.resetForm()
        }
      } else {
        const student = JSON.parse(values.student)

        const subjectList = []
        const value = []

        _.union(Object.keys(values), subject)
          .filter(elmm => elmm !== "student" && elmm !== "id")
          .forEach(el => {
            let obj = {}
            // define a single property of obj object
            Object.defineProperty(obj, el, {
              value: values[el],
              writable: true,
              enumerable: true,
              configurable: true,
            })

            value.push(values[el])
            subjectList.push(obj)
          })

        const { data, error } = await supabase
          .from("ExamResult")
          .update([
            {
              subjectList: subjectList,

              admissionNo: student.admissionNo,
              rollNumber: student.rollNumber,
              studentName: `${student.firstName} ${student.lastName}`,
              studentRef: student.id,
              grandTotal: _.sum(value.map(el => Number(el))),
              percent: Number(_.mean(value.map(el => Number(el)))).toFixed(2),
              result:
                _.mean(value.map(el => Number(el))) >= 50 ? "pass" : "fail",
            },
          ])
          .eq("id", values.id)
          .select()

        if (error) {
          toast.error("ExamResult Updated Failed", { autoClose: 2000 })
        } else {
          toast.success("ExamResult Updated", { autoClose: 2000 })
          setshow(false)
          getCountries()
          setSubject([])
          validation.resetForm()
        }
      }
    },
  })

  const navigate = useNavigate()

  useEffect( () => {
    (async()=>{
      props.setBreadcrumbItems("ExamResult", breadcrumbItems)
     await getCountries()
     await getstudents()
    })()

  }, [])

  const handleClick = () => {
    settype("new")
    validation.resetForm()
    setshow(true)
  }

  const handleSearch = async () => {
    const { data, error } = await supabase
      .from("ExamResult")
      .select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
      .ilike("studentName", `%${search}%`)
    setSection(_.sortBy(data ?? [], "percent").reverse() ?? [])
  }

  const handelEdit = async row => {
    const { data: stdn } = await supabase
      .from("Student")
      .select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
      .eq("id", row.studentRef)
      .single()

    validation.setFieldValue("student", JSON.stringify(stdn))
    validation.setFieldValue("id", row.id)

    const { data, error } = await supabase
      .from("SubjectGroup")
      .select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
      .match({ classRef: stdn.class, sectionRef: stdn.section })
      .single()

    if (data && !error) {
      setSubject(data.subjects)
      setSubjectValues(row.subjectList)
      row.subjectList.map(el => {
        // console.log(
        //   "eeeeeeeeeeeeedddd",
        //   Object.keys(el)[0],
        //   el[Object.keys(el)],
        // )

        validation.setFieldValue(Object.keys(el)[0], el[Object.keys(el)])
      })
    } else {
      setSubject([])
      toast.error("No subject for this student", { autoClose: 2000 })
    }
    setshow(true)
    settype("edit")
  }

  const handelDelete = async id => {
    const { error } = await supabase.from("ExamResult").delete().eq("id", id)

    if (error) {
      toast.error("ExamResult Deleted Failed", { autoClose: 2000 })
    } else {
      toast.success("ExamResult Deleted", { autoClose: 2000 })
      getCountries()
    }
  }

  const handelsetStudentdata = async e => {
    validation.setFieldValue("student", e.target.value)
    const stdval = JSON.parse(e.target.value)

    const { data, error } = await supabase
      .from("SubjectGroup")
      .select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
      .match({ classRef: stdval.class, sectionRef: stdval.section })
      .single()

    if (data && !error) {
      setSubject(data.subjects)
    } else {
      setSubject([])
      toast.error("No subject for this student", { autoClose: 2000 })
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
      name: "Admission No",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.admissionNo,
    },
    {
      name: "Roll Number",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.rollNumber ?? "None",
    },
    {
      name: "Student Name",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.studentName ?? "None",
    },
    // {
    //   name: "subjectList",
    //   sortable: true,
    //   reorder: true,
    //   center: true,
    //   minWidth: "230px",
    //   selector: row => row?.subjectList ?? "None",
    // },
    {
      name: "Grand Total",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.grandTotal ?? "None",
    },
    {
      name: "Percent",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.percent ?? "None",
    },
    {
      name: "Rank",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: (row, index) => index + 1 ?? "None",
    },
    {
      name: "Result",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.result ?? "None",
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

          <label className="col-form-label">Exam Result </label>
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
            Add Exam Result
          </button>
        </div>
      </Row>
      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <CardTitle className="h4">Exam Result List </CardTitle>
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
                <Label htmlFor="useremail">Students</Label>
                <select
                  id="student"
                  name="student"
                  className="form-control"
                  placeholder="Enter Subject"
                  type="student"
                  onChange={e => {
                    handelsetStudentdata(e)
                  }}
                  onBlur={validation.handleBlur}
                  value={validation.values.student || ""}
                  invalid={
                    validation.touched.student && validation.errors.student
                      ? true
                      : false
                  }
                >
                  {students?.map(el => (
                    <option value={JSON.stringify(el)}>
                      {el.firstName} {el.lastName}
                    </option>
                  ))}
                </select> 

                {validation.touched.student && validation.errors.student ? (
                  <FormFeedback type="invalid">
                    {validation.errors.student}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                {subject.map((el, i) => (
                  <>
                    <Label htmlFor="useremail">
                      {el} (
                      {type === "edit" &&
                        ` Old Value : ${subjectValues.map(el => el[Object.keys(el)])[i]}`}
                      )
                    </Label>
                    <input
                      id={el}
                      name={el}
                      className="form-control"
                      type="number"
                      defaultValue={
                        type === "edit"
                          ? subjectValues.map(el => el[Object.keys(el)])[i]
                          : null
                      }
                      onChange={validation.handleChange}
                    />
                  </>
                ))}
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

export default connect(null, { setBreadcrumbItems })(ExamResult)
