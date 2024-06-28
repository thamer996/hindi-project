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
import _ from "lodash"

const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)

const Dashboard = props => {
  document.title = "Dashboard | Lexa - Responsive Bootstrap 5 Admin Dashboard"
  const [booksBymember, setbooksBymember] = useState([])

  const breadcrumbItems = [
    { title: "Lexa", link: "#" },
    { title: "Dashboard", link: "#" },
  ]

  const [Student, setStudent] = useState([])
  const [Staff, setStaff] = useState([])

  const [clas, setClas] = useState([])
  const [sections, setSections] = useState([])

  const [Books, setBooks] = useState("")
  const [Book, setBook] = useState("")
  const [Sect, setSect] = useState("")

  const [show, setshow] = useState(false)
  const [type, settype] = useState("new")
  const [search, setSearch] = useState("")
  const [ExamResult, setExamResult] = useState([])
  const [currentRow, setcurrentRow] = useState({})

  async function getCountries() {
    const { data: dataStaff } = await supabase
      .from("Staff")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
    const { data: dataStudent } = await supabase
      .from("Student")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
    const { data: libraryMemberdata, error: libraryMembererror } =
      await supabase
        .from("LibraryMember")
        .select("*")
        .eq("brancheId", localStorage.getItem("BranchId") ?? 1)

    const { data: LibraryBooksData } = await supabase
      .from("LibraryBooks")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)

    const staff = dataStaff?.map(el => ({
      ...el,
      libraryCardNo:
        libraryMemberdata?.find(elm => elm.ref === String(el.id))
          ?.libraryCardNo ?? "NA",
      libraryBooksData: LibraryBooksData.filter(
        elmx => elmx.memberRef === String(el.id),
      ),
    }))

    const student = dataStudent?.map(el => ({
      ...el,
      libraryCardNo:
        libraryMemberdata?.find(elm => elm.ref === String(el.id))
          ?.libraryCardNo ?? "NA",
      libraryBooksData: LibraryBooksData.filter(
        elmx => elmx.memberRef === String(el.id),
      ),
      role: "Student",
    }))

    const { data: ExamResult, error: errorExamResult } = await supabase
      .from("ExamResult")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)

    setExamResult(_.sortBy(ExamResult, "percent").reverse() ?? [])

    setStudent(student)
    setStaff(staff)
  }

  async function getBooks() {
    const { data, error } = await supabase
      .from("Books")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
    setBooks(data ?? [])
  }

  useEffect(() => {
    props.setBreadcrumbItems("Dashboard", breadcrumbItems)
    getCountries()
    getBooks()
  }, [])

  console.log("Student", Student)
  return (
    <React.Fragment>
      {/*mimi widgets */}

      <Row>
        <Col xl="3">
          <MonthlyEarnings ExamResult={ExamResult} />
        </Col>

        <Col xl="4" lg="6">
          {/* inbox */}
          <Inbox Staff={Staff} />
        </Col>
        <Col xl="5">
          {/* latest orders */}
          <LatestOrders Staff={Student} />
        </Col>
      </Row>
      <Row></Row>

      <Row></Row>
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(Dashboard)
