import React, { useEffect, useState } from "react"

import { connect } from "react-redux"
import { Row, Col } from "reactstrap"

// Pages Components
import Miniwidget from "./Miniwidget"
import MonthlyEarnings from "./montly-earnings"
import MonthlyEarnings2 from "./montly-earnings2"
import Inbox from "./inbox"
import RecentActivity from "./recent-activity"
import WidgetUser from "./widget-user"
import YearlySales from "./yearly-sales"
import LatestTransactions from "./latest-transactions"
import LatestOrders from "./latest-orders"

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"
import { createClient } from "@supabase/supabase-js"
import _, { sumBy } from "lodash"

const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)

const Dashboard = props => {
  document.title = "Dashboard | Lexa - Responsive Bootstrap 5 Admin Dashboard"

  const breadcrumbItems = [
    { title: "Lexa", link: "#" },
    { title: "Dashboard", link: "#" },
  ]

  const [Student, setStudent] = useState([])
  const [data, setdata] = useState([])
  const [Staff, setStaff] = useState([])
  const [DueFeesData, setDueFeesData] = useState([])
  const [StudentAttendance, setStudentAttendance] = useState([])
  const [rating, setrating] = useState([])
  const [ExamResult, setExamResult] = useState([])

  async function getTeachersRating() {
    const { data, error } = await supabase
      .from("TeachersRating")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
    setrating(data ?? [])
  }

  async function getclass() {
    const { data, error } = await supabase
      .from("Class")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
    setdata(data ?? [])
  }

  async function getStudent() {
    const { data, error } = await supabase
      .from("Student")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
    // .eq("class", JSON.parse(localStorage.getItem("authUser")).class)
    setStudent(data ?? [])

    const { data: DueFeesData, error: DueFeeserror } = await supabase
      .from("DueFees")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)

    const { data: studentAttendance, error: errorAttendance } = await supabase
      .from("StudentAttendance")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
    // .eq("class", JSON.parse(localStorage.getItem("authUser")).class)

    const { data: ExamResult, error: errorExamResult } = await supabase
      .from("ExamResult")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
    // .eq("class", JSON.parse(localStorage.getItem("authUser")).class)

    setExamResult(_.sortBy(ExamResult, "percent").reverse() ?? [])

    setDueFeesData(DueFeesData ?? [])
    setStudentAttendance(studentAttendance ?? [])
  }

  async function getStaff() {
    const { data, error } = await supabase
      .from("Staff")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
      .ilike("role", `%Teacher%`)
    setStaff(data ?? [])
  }

  useEffect(() => {
    props.setBreadcrumbItems("Dashboard", breadcrumbItems)
    getTeachersRating()
    getStaff()
    getStudent()
    getclass()
  }, [])

  const reports = [
    {
      title: "Outcomes",
      iconClass: "buffer",
      total:
        `${sumBy(DueFeesData, function (o) {
          return Number(o?.amount)
        })} $` ?? "NA",

      badgecolor: "danger",
    },
    {
      title: "Students",
      iconClass: "cube-outline",
      total: Student?.length,
      badgecolor: "info",
    },
    {
      title: "Teachers",
      iconClass: "tag-text-outline",
      total: Staff?.length,
      badgecolor: "warning",
    },
    {
      title: "Classes",
      iconClass: "briefcase-check",
      total: data?.length,
      badgecolor: "info",
    },
  ]

  return (
    <React.Fragment>
      {/*mimi widgets */}

      <Row>
        <Col xl="3">
          {/* Monthly Earnings */}
          <MonthlyEarnings ExamResult={ExamResult} />
        </Col>

        <Col xl="4" lg="6">
          {/* inbox */}
          <Inbox Student={Student} />
        </Col>
        <Col xl="5">
          {/* latest orders */}
          <LatestOrders StudentAttendance={StudentAttendance} />
        </Col>
      </Row>

      <Row></Row>
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(Dashboard)
