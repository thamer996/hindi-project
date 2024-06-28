import React, { useEffect, useState } from "react"

import { connect } from "react-redux"
import {
  Row,
  Col,
  Card,
  CardBody,
  Table,
  Input,
  Button,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  CardTitle,
} from "reactstrap"
import _, { isEmpty } from "lodash"
import { setBreadcrumbItems } from "../../store/actions"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useFormik } from "formik"
import * as Yup from "yup"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)
const Fees = () => {
  const [attendance, setattedance] = useState([])
  const [Studentdetail, SetStudentDetail] = useState([])
  async function getStudentDetail() {
     const authUser = JSON.parse(localStorage.getItem("authUser") ?? "{}")
    const refUser = localStorage.getItem("StudentId") ?? ""
    const { data, error } = await supabase
      .from("Student")
      .select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
      .eq("id", refUser)
      .single()
    SetStudentDetail(data ?? [])
  }
  console.log("student", Studentdetail)
  const getAttendance = async studentDetail => {
    try {
      const { data, error } = await supabase
        .from("StudentAttendance")
        .select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)

      if (error) throw error

      if (data) {
        console.log("data get", data)
        const groupedData = data.filter(
          o => o.admissionNo === studentDetail?.admissionNo,
        )
        console.log("Grouped data:", groupedData)
        setattedance(groupedData ?? [])
      }
    } catch (error) {
      console.error("Error fetching approve leave data:", error)
    }
  }
  console.log("leaveData", attendance)

  const [searchTerm, setSearchTerm] = useState("")
  const filteredData = attendance.filter(item =>
    Object.values(item).some(value =>
      value && value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  )
  console.log("filteredData", filteredData)

  useEffect(() => {
    if (Studentdetail && Object.keys(Studentdetail).length > 0) {
      getAttendance(Studentdetail)
    }
  }, [Studentdetail])
  useEffect(() => {
    getStudentDetail()
  }, [])
  return (
    <React.Fragment>
      <div className="container mt-5">
        <Row>
          <Card>
            <CardBody>
              <CardTitle className="h4">Attendance List</CardTitle>
              <div className="d-flex mb-2">
                <label className="col-form-label">Search attendance</label>
                <div className="col-md-2 ms-2">
                  <Input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <Row>
                <Col lg={12}>
                  <div className="table-responsive">
                    <Table hover responsive >
                      <thead>
                        <tr>
                          <th>Attendance Day</th>
                          <th>Name</th>
                          <th>RollNumber</th>
                          <th>AdmissionNo</th>
                          <th>Attendance</th>
                          <th>Note</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredData.map((item, index) => (
                          <tr key={index}    className={`
                          ${item.attendance === 'Present' ? 'table-success' : ''}
                          ${item.attendance === 'HalfDay' ? 'table-info' : ''}
                          ${item.attendance === 'Late' ? 'table-warning' : ''}
                          ${item.attendance === 'Absent' ? 'table-danger' : ''}
                        `}>
                            <td>{item.attendance_date}</td>
                            <td>{item.name}</td>
                            <td>{item.rollNumber}</td>
                            <td>{item.admissionNo}</td>
                            <td>{item.attendance}</td>
                            <td>{item.note}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Row>
      </div>
    </React.Fragment>
  )
}
export default connect(null, { setBreadcrumbItems })(Fees)
