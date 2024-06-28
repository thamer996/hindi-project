import React, { useEffect, useState } from "react"

import { connect } from "react-redux"
import { Table, Row, Col, Card, CardBody, CardTitle } from "reactstrap"

// Pages Components
import Miniwidget from "./Miniwidget"
import MonthlyEarnings from "./montly-earnings"
import Inbox from "./inbox"
import RecentActivity from "./recent-activity"
import WidgetUser from "./widget-user"
import YearlySales from "./yearly-sales"
import LatestTransactions from "./latest-transactions"
import LatestOrders from "./latest-orders"
import ChartsAppex from "../../../pages/Charts/charts-appex"
//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../../store/actions"
import HeaderTeacher from "../../../components/HorizontalLayoutTeacher/HeaderTeacher"
import { createClient } from "@supabase/supabase-js"
import _ from "lodash"
import moment from "moment-timezone"

const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)

const Dashboard = props => {
  const [attendance, setattedance] = useState([])

  document.title = "Dashboard | Lexa - Responsive Bootstrap 5 Admin Dashboard"

  const getAttendance = async () => {
    try {
      const { data: studentDetail, error: errorr } = await supabase
        .from("Student")
        .select("*")
        .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
        .eq("id", localStorage.getItem("StudentId") ?? "na")
        .single()

      const { data, error } = await supabase
        .from("StudentAttendance")
        .select("*")
        .eq("brancheId", localStorage.getItem("BranchId") ?? 1)

      if (error) throw error

      if (data) {
        console.log("data get", data)
        const groupedData = data.filter(
          o => o.admissionNo === studentDetail?.admissionNo,
        )
        setattedance(groupedData ?? [])
      }
    } catch (error) {
      console.error("Error fetching approve leave data:", error)
    }
  }

  const [section, setSection] = useState([])
  const [Studentdetail, SetStudentDetail] = useState([])
  const [VisitorBook, setVisitorBook] = useState([])

  console.log("StudentId", localStorage.getItem("StudentId"))

  const getCountries = async () => {
    try {
      const { data, error } = await supabase
        .from("Student")
        .select("*")
        .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
        .eq("id", localStorage.getItem("StudentId") ?? "")
        .single()

      if (data) {
        const { data: Homeworkdata, error: errorHomework } = await supabase
          .from("Homework")
          .select("*")
          .eq("brancheId", localStorage.getItem("BranchId") ?? 1)

        if (errorHomework) throw errorHomework
        if (Homeworkdata) {
          const groupedData = Homeworkdata.filter(
            o => o.classRef === data?.class && o.sectionRef === data?.section,
          )

          setSection(groupedData ?? [])
        }
      }
    } catch (error) {
      console.error("Error fetching approve leave data:", error)
    }
  }

  async function getVisitorBook() {
    const { data, error } = await supabase
      .from("VisitorBook")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
    setVisitorBook(data ?? [])
  }

  const breadcrumbItems = [
    { title: "Lexa", link: "#" },
    { title: "Dashboard", link: "#" },
  ]

  useEffect(() => {
    props.setBreadcrumbItems("Dashboard", breadcrumbItems)
    getVisitorBook()
    getCountries()
    getAttendance()
  }, [])

  console.log("eeeeeeeeeeeeeeeeee section", VisitorBook)

  return (
    <React.Fragment>
      <Row>
        <Col md={6}>
          <Card>
            <div className="card-body">
              <h4 className="card-title mb-4">My Absences</h4>

              <div
                className="table-responsive"
                style={{ maxHeight: "400px", overflowY: "auto" }}
              >
                <Table className="align-middle table-centered table-vertical table-nowrap mb-1">
                  <tbody>
                    {_.sortBy(attendance, "attendance_date")
                      .reverse()
                      .filter(el => el.attendance === "Absent")
                      .slice(0, 5)
                      .map((order, key) => (
                        <tr key={key}>
                          <td>{order.attendance_date}</td>
                          <td>{order.attendance ?? "NA"}</td>
                          <td>{order.source ?? "NA"}</td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <div className="card-body">
              <h4 className="card-title mb-4">Attendes Stat</h4>

              <div
                className="table-responsive"
                style={{ maxHeight: "400px", overflowY: "auto" }}
              >
                <MonthlyEarnings
                  attendance={_.sortBy(attendance, "attendance_date").reverse()}
                />
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Card>
            <div className="card-body">
              <h4 className="card-title mb-4">My Homework</h4>

              <div
                className="table-responsive"
                style={{ maxHeight: "400px", overflowY: "auto" }}
              >
                <Table className="align-middle table-centered table-vertical table-nowrap mb-1">
                  <tbody>
                    {_.sortBy(section, "homeworkDate")
                      .reverse()
                      .slice(0, 5)
                      .map((order, key) => (
                        <tr key={key}>
                          <td>{order.subjectRef}</td>
                          <td>{order.homeworkDate ?? "NA"}</td>
                          <td>{order.evaluationDate ?? "NA"}</td>
                          <td>{order.submissionDate ?? "NA"}</td>
                          <td>{order.attachDocument ?? "NA"}</td>
                          <td>{order.status ?? "NA"}</td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <div className="card-body">
              <h4 className="card-title mb-4">Visitor List</h4>

              <div
                className="table-responsive"
                style={{ maxHeight: "400px", overflowY: "auto" }}
              >
                <Table className="align-middle table-centered table-vertical table-nowrap mb-1">
                  <tbody>
                    {_.sortBy(VisitorBook, "date")
                      .reverse()
                      .slice(0, 5)
                      .map((order, key) => (
                        <tr key={key}>
                          <td>{order.visitorName}</td>
                          <td>{order.note ?? "NA"}</td>
                          <td>{order.meetingWith ?? "NA"}</td>
                          <td>{order.inTime ?? "NA"}</td>
                          <td>{order.outTime ?? "NA"}</td>
                          <td>{order.date ?? moment().format("YYYY-MM-DD")}</td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(Dashboard)
