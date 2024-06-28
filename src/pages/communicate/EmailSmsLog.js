import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import {
  Table,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Container,
  Badge,
} from "reactstrap"
import { createClient } from "@supabase/supabase-js"
import { connect } from "react-redux"

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"
import HeaderTeacher from "../../components/HorizontalLayoutTeacher/HeaderTeacher"
import NvbarTeacher from "../../components/HorizontalLayoutTeacher/NvbarTeacher"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useFormik } from "formik"
import * as Yup from "yup"
import DataTable from "react-data-table-component"
import _, { isEmpty } from "lodash"
import datetime from "moment"
import * as XLSX from "xlsx"

const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)
const EmailSmsLog = props => {
  document.title =
    "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard"
  const [sms, setSms] = useState([])
  const [emails, setEmails] = useState([])
  const [show, setshow] = useState(false)
  const [type, settype] = useState("new")
  const [search, setSearch] = useState("")
  const breadcrumbItems = [
    { title: "Smart school", link: "#" },
    { title: "Communicate", link: "#" },
  ]
  const navigate = useNavigate()
  async function getEmails() {
    const { data, error } = await supabase
      .from("Email")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
    setEmails(data ?? [])
  }

  const handleClickExcel = () => {
    const array = [...emails, ...sms]

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

  async function getSms() {
    const { data, error } = await supabase
      .from("Sms")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
    setSms(data ?? [])
  }
  useEffect(() => {
    props.setBreadcrumbItems("Email/SMS Log", breadcrumbItems)
    getSms()
    getEmails()
  }, [])
  const handleClick = () => {
    navigate("/add-marks-grade-teacher")
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
  const handelEdit = row => {
    console.log("row content", row)
  }
  const handleSearch = async () => {
    try {
      const { data: smsData, error: smsError } = await supabase
        .from("Sms")
        .select("*")
        .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
        .or(`title.ilike.%${search}%`)

      if (smsData) {
        setSms(smsData)
      } else if (smsError) {
        console.error("Error fetching SMS data:", smsError.message)
      }

      const { data: emailData, error: emailError } = await supabase
        .from("Email")
        .select("*")
        .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
        .or(`title.ilike.%${search}%`)
      if (emailData) {
        setEmails(emailData)
      } else if (emailError) {
        console.error("Error fetching Email data:", emailError.message)
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error.message)
    }
  }

  const columns = [
    {
      name: "Title",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.title,
    },
    {
      name: "Description",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.sms || row?.email || "",
    },
    {
      name: "Date",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => datetime(row?.created_at).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      name: "Type",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => {
        if (!_.isEmpty(row.email)) {
          return <Badge color="primary">Email</Badge>
        } else if (!_.isEmpty(row.sms)) {
          return <Badge color="success">Sms</Badge>
        } else {
          return null
        }
      },
    },
  ]
  return (
    <React.Fragment>
      <Row>
        <div className="d-flex mb-2">
          <div></div>
          {/* Vos éléments de filtre ici */}

          <label className="col-form-label">Email & Sms </label>
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
            <button className="btn btn-primary ms-3" onClick={handleClickExcel}>
              Export Excel
            </button>
          </div>
          <div>
            <button
              className="btn btn-danger ms-2"
              onClick={() => {
                setSearch("")
                getEmails()
                getSms()
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
              <CardTitle className="h4">Email / SMS Log </CardTitle>
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
                  data={[...emails, ...sms]}
                />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(EmailSmsLog)
