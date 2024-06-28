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
  ModalHeader,
  Badge,
  ModalFooter,
} from "reactstrap"

import { connect } from "react-redux"

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useFormik } from "formik"
import * as Yup from "yup"
import _ from "lodash"
import { isEmpty } from "lodash"

//
import * as XLSX from "xlsx"

const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)

const ExaminationRankReportSuper = props => {
  document.title =
    "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard"

  const breadcrumbItems = [
    { title: "Smart school", link: "#" },
    { title: "Reports", link: "#" },
  ]

  const [section, setSection] = useState([])

  const [sections, setSections] = useState([])
  const [students, setStudent] = useState([])
  const [subject, setSubject] = useState([])
  const [oldData, setoldData] = useState([])

  const [show, setshow] = useState(false)
  const [X, setX] = useState()
  const [type, settype] = useState("new")
  const [search, setSearch] = useState("")

  async function getCountries() {
    const { data, error } = await supabase.from("ExamResult").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)

    setoldData(
      _.sortBy(data, el => Number(el?.percent))
        .reverse()
        .map((el, i) => ({ ...el, rank: i + 1 })),
    )

    setSection(
      _.sortBy(data, el => Number(el?.percent))
        .reverse()
        .map((el, i) => ({ ...el, rank: i + 1 })),
    )
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
  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
      props.setBreadcrumbItems("Examinations", breadcrumbItems)
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
      .or(`studentName.ilike.${search}%,result.ilike.%${search}%,rollNumber.ilike.%${search}%`)
    setSection(
      _.sortBy(
        data.map(el => {
          const old = oldData.find(elm => elm?.id === el?.id)
          return { ...el, rank: old.rank }
        }) ?? [],
        el => Number(el?.percent),
      ).reverse() ?? [],
    )
  }

  const handelEdit = async row => {
    setX(row.subjectList)
    setshow(true)
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
      name: "Rank",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: (row, index) => row?.rank ?? "None",
    },
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
      selector: row => row?.percent + " %" ?? "None",
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
                <i className="ti-eye"></i>
              </span>
              {/* <span
                    style={actionIconStyle}
                    // onClick={() => handelDelete(row?.id)}
                  >
                    <i className="ti-trash"></i>
                  </span> */}
            </>
          </div>
        )
      },
    },
  ]
  const toggleModal = () => setshow(!show)

  return (
    <React.Fragment>
      <Row>
        <div className="d-flex mb-2">
          <div></div>
          {/* Vos éléments de filtre ici */}

          <label className="col-form-label"> Search by anyKeyword </label>
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

          <button className="btn btn-primary ms-3" onClick={handleClickExcel}>
            Export Excel
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

      <Modal isOpen={show} toggle={toggleModal} centered={true}>
        <ModalHeader toggle={toggleModal}>View Exams Result</ModalHeader>
        <ModalBody>
          {X && (
            <div>
              {X &&
                X.map((e, i) => {
                  const subject = Object.keys(e)[0]
                  const value = Object.values(e)[0]
                  return (
                    <div key={i} className="">
                      <Row>
                        <Col>
                          {" "}
                          <h3>
                            <Badge>{subject}:</Badge>
                          </h3>
                        </Col>
                        <Col>
                          {" "}
                          <h3>
                            <Badge className="text-dark" color="light">
                              {value}
                            </Badge>
                          </h3>
                        </Col>
                      </Row>
                    </div>
                  )
                })}
            </div>
          )}
        </ModalBody>

        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
      <ToastContainer />
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(ExaminationRankReportSuper)
