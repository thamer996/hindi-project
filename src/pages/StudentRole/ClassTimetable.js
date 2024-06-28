import React, { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { connect } from "react-redux"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Table,
  Alert,
  Badge,
} from "reactstrap"
import { useFormik } from "formik"
import * as Yup from "yup"
import { ToastContainer, toast } from "react-toastify"
import _, { isEmpty } from "lodash"
//supabase connection :::

import { setBreadcrumbItems } from "../../store/actions"
const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)
const ClassTimetable = () => {
  const [Studentdetail, SetStudentDetail] = useState([])
  const [lessonplan, setLessonplan] = useState([])
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
  const getLessonplan = async studentDetail => {
    try {
      const { data, error } = await supabase.from("LessonPlan").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)

      if (error) throw error

      if (data) {
        console.log("data get", data)
        const groupedData = data.filter(o => o.class === studentDetail?.class)
        console.log("Grouped data:", groupedData)
        setLessonplan(groupedData ?? [])
      }
    } catch (error) {
      console.error("Error fetching approve leave data:", error)
    }
  }
  console.log("leaveData", lessonplan)
  const getDayOfWeek = dateStr => {
    const date = new Date(dateStr)
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ]
    return days[date.getUTCDay()]
  }

  const formatTime = (beginTime, endTime) => {
    const convertTo12Hour = timeStr => {
      const [hours, minutes] = timeStr.split(":")
      const period = +hours < 12 ? "AM" : "PM"
      const formattedHours = +hours % 12 || 12
      return `${formattedHours}:${minutes} ${period}`
    }

    return `${convertTo12Hour(beginTime)} - ${convertTo12Hour(endTime)}`
  }
  const timetableDataiheb = lessonplan.map(item => ({
    day: getDayOfWeek(item.date),
    time: formatTime(item.beginTime, item.endTime),
    subject: `${item.subject} (${item.id})`,
    teacher: `${item.teacherName} `,
    room: `Room No.: ${item.room}`,
  }))

  console.log("timetableDataiheb", timetableDataiheb)

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]
  useEffect(() => {
    getStudentDetail()
  }, [])
  useEffect(() => {
    if (Studentdetail && Object.keys(Studentdetail).length > 0) {
      getLessonplan(Studentdetail)
    }
  }, [Studentdetail])
  return (
    <React.Fragment>
      <div className="container mt-5">
        <div className="timetable">
          <Row>
            <Card>
              <CardBody>
                <Table bordered responsive>
                  <thead>
                    <tr>
                      <th>Time</th>
                      {days.map(day => (
                        <th key={day}>{day}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {timetableDataiheb.map((item, index) => (
                      <tr key={index}>
                        <td>{item.time}</td>
                        {days.map((day, idx) => (
                          <td key={idx}>
                            {item.day === day ? (
                              <div style={{ width: "100%" }}>
                                <Alert
                                  color="info"
                                  style={{ width: "100%", margin: 0 }}
                                >
                                  <Badge color="primary">
                                    {item.subject}
                                    <br />
                                  </Badge>
                                  {item.teacher}
                                  <br />
                                  {item.room}
                                </Alert>
                              </div>
                            ) : (
                              <Alert
                                color="secondary"
                                style={{
                                  width: "100%",
                                  height: "100px",
                                  margin: 0,
                                }}
                              ></Alert>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                    <tr></tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Row>
        </div>
      </div>
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(ClassTimetable)
