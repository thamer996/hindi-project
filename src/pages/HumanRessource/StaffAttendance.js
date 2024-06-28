import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { Table, Row, Col, Card, CardBody, CardTitle } from "reactstrap"

import { connect } from "react-redux"

import * as XLSX from "xlsx"

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"
import HeaderTeacher from "../../components/HorizontalLayoutTeacher/HeaderTeacher"
import NvbarTeacher from "../../components/HorizontalLayoutTeacher/NvbarTeacher"
import TeacherLayout from "../../components/HorizontalLayoutTeacher/TeacherLayout"
import { createClient } from "@supabase/supabase-js"
import _, { isEmpty } from "lodash"
import DataTable from "react-data-table-component"
import { toast, ToastContainer } from "react-toastify"

const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)
const StaffAttendance = props => {
  document.title =
    "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard"
  // todo on search filter by role for all staff after getting filteredstaff by role merge with staffa ttendeance for specefic fields if exist
  // after making changes on the datatable we can make several updates with following function
  // const { data, error } = await supabase
  //   .from('food')
  //   .upsert([{id: 1, qty: 11}, {id: 2, qty: 9}, {id: 3, qty: 6}])

  const breadcrumbItems = [
    { title: "Smart school", link: "#" },
    { title: "Attendance", link: "#" },
  ]
  const navigate = useNavigate()
  const [data, setdata] = useState([])
  const [dataToUpdate, setdataToUpdate] = useState([])
  const [Role, setRole] = useState("")
  const [AttendanceDate, setAttendanceDate] = useState("")
  const [GlobalAttendanceDate, setGlobalAttendanceDate] = useState("")

  async function handleSearch() {
    if (!isEmpty(AttendanceDate)) {
      const { data: staff } = await supabase
        .from("Staff")
        .select("*")
        .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
        .ilike("role", `%${Role}%`)
      const { data: attendance } = await supabase
        .from("StaffAttendance")
        .select("*")
        .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
        .ilike("attendanceDate", `%${AttendanceDate}%`)

      const intersectionStaffId = _.intersectionBy(
        staff,
        attendance,
        "staffID",
      ).map(el => el.staffID)

      const data = staff.map(el => {
        if (intersectionStaffId.includes(el.staffID)) {
          const Att = attendance.find(att => att.staffID === el.staffID)
          return { ...el, ...Att, source: "manual" }
        } else {
          return { ...el, source: "manual" }
        }
      })
      setdataToUpdate(attendance)
      setdata(data)
    } else {
      toast.error("AttendanceDate required !", { autoClose: 2000 })
    }
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

  async function handleSave() {
    let dataToProcess = data
    if (!isEmpty(GlobalAttendanceDate)) {
      dataToProcess = data.map(el => ({
        ...el,
        attendance: GlobalAttendanceDate,
      }))
    }

    const datatoSave = dataToProcess
      .filter(
        el =>
          !dataToUpdate.find(
            row => row.id === el.id && row.staffID === el.staffID,
          ),
      )
      .map(el => ({
        staffID: el.staffID,
        attendance: el.attendance,
        attendanceDate: AttendanceDate,
        source: el.source,
        note: el.note,
      }))
    const dataToUpdateAtt = dataToProcess
      .filter(el =>
        dataToUpdate.find(
          row => row.id === el.id && row.staffID === el.staffID,
        ),
      )
      .map(el => ({
        id: el.id,
        staffID: el.staffID,
        attendance: el.attendance,
        attendanceDate: AttendanceDate,
        source: el.source,
        note: el.note,
      }))
    const { error } = await supabase
      .from("StaffAttendance")
      .upsert(dataToUpdateAtt)
    const { error: error2 } = await supabase
      .from("StaffAttendance")
      .insert(datatoSave)

    if (error || error2) {
      toast.error("Attendance save Failed", { autoClose: 2000 })
    } else {
      toast.success("Attendance save success", { autoClose: 2000 })
      handleSearch()
    }
  }

  useEffect(() => {
    props.setBreadcrumbItems("Staff Attendance", breadcrumbItems)
  }, [])

  const handleClick = () => {
    navigate("/add-students")
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
      name: "#",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "50px",
      selector: row => row?.id ?? "None",
    },
    {
      name: "staffID",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.staffID ?? "None",
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
      name: "firstName",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.firstName,
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
          <label className="col-form-label">Role</label>&nbsp;
          <div className="col-md-2 me-2">
            <select
              onChange={val => setRole(val.target.value)}
              value={Role}
              className="form-control"
            >
              <option> Select </option>
              <option> Admin </option>
              <option> Teacher </option>
              <option> Super Admin </option>
              <option> Receptionist </option>
              <option> Librarian </option>
              <option> Accountant </option>
            </select>
          </div>
          <label
            htmlFor="example-date-input"
            className="col-md- col-form-label"
          >
            Attendance Date
          </label>
          &nbsp;
          <div className="col-md-3 me-1">
            <input
              onChange={val => setAttendanceDate(val.target.value)}
              value={AttendanceDate}
              className="form-control"
              type="date"
              id="example-date-input"
            />
          </div>
          <div>
            <button className="btn btn-primary" onClick={handleSearch}>
              Search
            </button>
            <button className="btn btn-primary ms-3" onClick={handleClickExcel}>
              Export Excel
            </button>
          </div>
          <div>
            <button
              className="btn btn-danger ms-2"
              onClick={() => {
                setRole("")
                setAttendanceDate("")
                setGlobalAttendanceDate("")
                setdata([])
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
              <CardTitle className="h4">Staff List </CardTitle>
              <Row>
                <Col md={2}>
                  <label>Set attendance for all staff as</label>
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
      <ToastContainer />
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(StaffAttendance)
