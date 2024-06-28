import React, { useEffect, useState } from "react"
import { Form, useNavigate } from "react-router-dom"
import { createClient } from "@supabase/supabase-js"
import { useFormik } from "formik"
import * as Yup from "yup"
import { ToastContainer, toast } from "react-toastify"
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
  ModalBody,
  Modal,
} from "reactstrap"
import { connect } from "react-redux"
import { setBreadcrumbItems } from "../../store/actions"
import DataTable from "react-data-table-component"
import _, { isEmpty } from "lodash"

const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)
const AttendanceSuperAdmin = props => {
  document.title =
    "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard"

  useEffect(() => {
    props.setBreadcrumbItems("Student Attendance", breadcrumbItems)
    getClass()
    getSections()

    getSection()
    // getStudent()
  }, [])
  //staff attendance::::
  const [data, setdata] = useState([])
  const [dataToUpdate, setdataToUpdate] = useState([])
  const [Role, setRole] = useState("")
  const [AttendanceDate, setAttendanceDate] = useState("")
  const [GlobalAttendanceDate, setGlobalAttendanceDate] = useState("")
  const [type, settype] = useState("new")
  const [show, setshow] = useState(false)
  const [section, setSection] = useState([])
  const [classValue, SetclassValue] = useState("")
  const [ClassData, SetClass] = useState([])
  const [sectionValue, SetsectionValue] = useState("")
  const [sections, setSections] = useState([])

  async function handleSearch() {
    if (!isEmpty(AttendanceDate)) {
      const { data: Student } = await supabase
        .from("Student")
        .select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
        .ilike("class", `%${classValue}%`)
        console.log("student", Student)
      const { data: attendance } = await supabase
        .from("StudentAttendance")
        .select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
        .ilike("attendance_date", `%${AttendanceDate}%`)
        console.log("StudentAttendance", attendance)

      const intersectionadmissionNo = _.intersectionBy(
        Student,
        attendance,
        "admissionNo",
      ).map(el => el.admissionNo)
      console.log("intersectionadmissionNo", intersectionadmissionNo)

      const data = Student.map(el => {
        if (intersectionadmissionNo.includes(el.admissionNo)) {
          const Att = attendance.find(att => att.admissionNo === el.admissionNo)
          console.log("Att", Att)
          return { ...el, ...Att, source: "manual" }
        } else {
          return { ...el, source: "manual" }
        }
      })
      console.log("data ", data)

      setdataToUpdate(attendance)
      setdata(data)
    } else {
      toast.error("AttendanceDate required !", { autoClose: 2000 })
    }
  }
  async function handleSave() {
    let dataToProcess = data
    if (!isEmpty(GlobalAttendanceDate)) {
      dataToProcess = data.map(el => ({
        ...el,
        attendance: GlobalAttendanceDate,
      }))
    }
console.log('data to process', dataToProcess)
    const datatoSave = dataToProcess
      .filter(
        el =>
          !dataToUpdate.find(
            row => row.id === el.id && row.admissionNo === el.admissionNo,
          ),
      )
      .map(el => ({
        admissionNo: el.admissionNo,
        attendance: el.attendance,
        attendance_date: AttendanceDate,
        source: el.source,
        note: el.note,
        name:el.firstName,
        rollNumber:el.rollNumber,
      }))
      console.log('data to save', datatoSave)
    const dataToUpdateAtt = dataToProcess
      .filter(el =>
        dataToUpdate.find(
          row => row.id === el.id && row.admissionNo === el.admissionNo,
        ),
        
      )
      
      .map(el => ({
        id: el.id,
        admissionNo: el.admissionNo,
        attendance: el.attendance,
        attendance_date: AttendanceDate,
        source: el.source,
        note: el.note,
        name:el.firstName,
        rollNumber:el.rollNumber,
      }))
      console.log('data to update', dataToUpdateAtt)

    const { error } = await supabase
      .from("StudentAttendance")
      .upsert(dataToUpdateAtt)
    const { error: error2 } = await supabase
      .from("StudentAttendance")
      .insert(datatoSave)

    if (error || error2) {
      toast.error("Attendance save Failed", { autoClose: 2000 })
    } else {
      toast.success("Attendance save success", { autoClose: 2000 })
      handleSearch()
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
  //end :::::

  const breadcrumbItems = [
    { title: "Smart school", link: "#" },
    { title: "Attendance", link: "#" },
  ]
  const navigate = useNavigate()
  //get section :::
  async function getSections() {
    const { data, error } = await supabase.from("StudentAttendance").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    console.log("table StudentAttendance ", data)
    setSection(data ?? [])
  }
  //end :::

  //fuction attendance
  const [selectedAttendance, setSelectedAttendance] = useState([])

  const handleAttendanceChange = event => {
    const newSelection = event.target.value
    setSelectedAttendance([...selectedAttendance, newSelection])
  }

  //end :::::
  //end :::

  const onChangeSelectClass = value => {
    console.log("selected Class ", value)
    SetclassValue(value)
  }
  //Fuction to get class select data
  async function getClass() {
    const { data, error } = await supabase.from("Class").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    SetClass(data ?? [])
    console.log("select class", data)
    console.log("ClassData", ClassData)
  }

  //end
  const onChangeSelectSection = value => {
    console.log("selected section ", value)
    SetsectionValue(value)
  }
  //Approvement table data function :::
  async function getSection() {
    const { data, error } = await supabase.from("Section").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    console.log("data get from section table ", data)

    setSections(data ?? [])
  }
  //end

  const columns1 = [
    {
      name: "#",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.id,
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
      selector: row => row?.rollNumber,
    },
    {
      name: "Name",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.name,
    },
    {
      name: "Attendance",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "430px",
      cell: row => (
        <>
          <span className="p-2">
            <input
              className="form-check-input me-1"
              type="radio"
              id={row.id}
              checked={row?.attendance === "Present"}
              onClick={() => {
                if (row?.attendance !== "Present") {
                  setdata(
                    data.map(el =>
                      el?.id === row?.id
                        ? { ...el, attendance: "Present" }
                        : el,
                    ),
                  )
                }
              }}
            />
            <label className="form-check-label" htmlFor="exampleRadios2">
              Present
            </label>
          </span>

          <span className="p-2">
            <input
              className="form-check-input me-1"
              type="radio"
              id={row.id}
              checked={row?.attendance === "Late"}
              onClick={() => {
                if (row?.attendance !== "Late") {
                  setdata(
                    data.map(el =>
                      el?.id === row?.id ? { ...el, attendance: "Late" } : el,
                    ),
                  )
                }
              }}
            />
            <label className="form-check-label" htmlFor="exampleRadios2">
              Late
            </label>
          </span>
          <span className="p-2">
            <input
              className="form-check-input me-1"
              type="radio"
              id={row.id}
              checked={row?.attendance === "Absent"}
              onClick={() => {
                if (row?.attendance !== "Absent") {
                  setdata(
                    data.map(el =>
                      el?.id === row?.id ? { ...el, attendance: "Absent" } : el,
                    ),
                  )
                }
              }}
            />
            <label className="form-check-label" htmlFor="exampleRadios2">
              Absent
            </label>
          </span>
          <span className="p-2">
            <input
              className="form-check-input me-1"
              type="radio"
              id={row.id}
              checked={row?.attendance === "HalfDay"}
              onClick={() => {
                if (row?.attendance !== "HalfDay") {
                  setdata(
                    data.map(el =>
                      el?.id === row?.id
                        ? { ...el, attendance: "HalfDay" }
                        : el,
                    ),
                  )
                }
              }}
            />
            <label className="form-check-label" htmlFor="exampleRadios2">
              Half Day
            </label>
          </span>
          <span className="p-2">
            <input
              className="form-check-input me-1"
              type="radio"
              id={row.id}
              checked={row?.attendance === "Holiday"}
              onClick={() => {
                if (row?.attendance !== "Holiday") {
                  setdata(
                    data.map(el =>
                      el?.id === row?.id
                        ? { ...el, attendance: "Holiday" }
                        : el,
                    ),
                  )
                }
              }}
            />
            <label className="form-check-label" htmlFor="exampleRadios2">
              Holiday
            </label>
          </span>
        </>
      ),
    },

    {
      name: "Source",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.source,
    },

    {
      name: "Note",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      cell: row => (
        <input
          type="text"
          value={row.note}
          onChange={val => {
            setdata(
              data.map(el =>
                el?.id === row?.id ? { ...el, note: val.target.value } : el,
              ),
            )
          }}
          className="form-control"
        />
      ),
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
              value={classValue || ""}
            >
              <option value={""}>Select</option>
              {ClassData?.map(el => (
                <option value={el.className}>{el.className}</option>
              ))}
            </select> 
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
              value={sectionValue || ""}
            >
              <option value={""}>Select</option>
              {sections?.map(el => (
                <option value={el.sectionName}>{el.sectionName}</option>
              ))}
            </select> 
          </div>
          <label
            htmlFor="example-date-input"
            className="col-md- col-form-label"
          >
            Attendance Date
          </label>
          <div className="col-md-3">
            <input
              onChange={val => setAttendanceDate(val.target.value)}
              value={AttendanceDate}
              className="form-control"
              type="date"
              id="example-date-input"
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
                SetclassValue("")
                SetsectionValue("")
                setAttendanceDate("")
                // getSections()
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </Row>
      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <CardTitle className="h4">Student List </CardTitle>
              <Row>
                <Col md={2}>
                  <label>Set attendance for all Student's as</label>
                </Col>
                <Col md={8}>
                  <span className="p-2">
                    <input
                      className="form-check-input me-1"
                      type="radio"
                      id="exampleRadios1"
                      checked={GlobalAttendanceDate === "Present"}
                      onClick={() => {
                        if (GlobalAttendanceDate !== "Present") {
                          setGlobalAttendanceDate("Present")
                        }
                      }}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="exampleRadios1"
                    >
                      Present
                    </label>
                  </span>

                  <span className="p-2">
                    <input
                      className="form-check-input me-1"
                      type="radio"
                      id="exampleRadios1"
                      checked={GlobalAttendanceDate === "Late"}
                      onClick={() => {
                        if (GlobalAttendanceDate !== "Late") {
                          setGlobalAttendanceDate("Late")
                        }
                      }}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="exampleRadios1"
                    >
                      Late
                    </label>
                  </span>
                  <span className="p-2">
                    <input
                      className="form-check-input me-1"
                      type="radio"
                      id="exampleRadios1"
                      checked={GlobalAttendanceDate === "Absent"}
                      onClick={() => {
                        if (GlobalAttendanceDate !== "Absent") {
                          setGlobalAttendanceDate("Absent")
                        }
                      }}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="exampleRadios1"
                    >
                      Absent
                    </label>
                  </span>
                  <span className="p-2">
                    <input
                      className="form-check-input me-1"
                      type="radio"
                      id="exampleRadios1"
                      checked={GlobalAttendanceDate === "HalfDay"}
                      onClick={() => {
                        if (GlobalAttendanceDate !== "HalfDay") {
                          setGlobalAttendanceDate("HalfDay")
                        }
                      }}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="exampleRadios1"
                    >
                      Half Day
                    </label>
                  </span>
                  <span className="p-2">
                    <input
                      className="form-check-input me-1"
                      type="radio"
                      id="exampleRadios1"
                      checked={GlobalAttendanceDate === "Holiday"}
                      onClick={() => {
                        if (GlobalAttendanceDate !== "Holiday") {
                          setGlobalAttendanceDate("Holiday")
                        }
                      }}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="exampleRadios1"
                    >
                      Holiday
                    </label>
                  </span>
                </Col>
                <Col>
                  <button
                    className="btn btn-primary w-100"
                    onClick={handleSave}
                  >
                    Save Attendance
                  </button>
                </Col>
              </Row>
              <div className="table-responsive">
                <DataTable
                  noHeader
                  pagination
                  subHeader
                  selectableRowsHighlight={true}
                  highlightOnHover={true}
                  //   paginationServer
                  columns={columns1}
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
      <ToastContainer />
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(AttendanceSuperAdmin)
