import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import {
  Table,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Label,
  Input,
  FormFeedback,
  Badge,
} from "reactstrap"

import { connect } from "react-redux"

import { useFormik } from "formik"
import * as Yup from "yup"
import { createClient } from "@supabase/supabase-js"
import { toast, ToastContainer } from "react-toastify"
import DataTable from "react-data-table-component"
import { v4 as uuidv4 } from "uuid"

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"
import { isNil } from "lodash"

const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)

const Users = props => {
  document.title =
    "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard"

  const breadcrumbItems = [
    { title: "Smart school", link: "#" },
    { title: "settings", link: "#" },
  ]
  const navigate = useNavigate()

  const [data, setdata] = useState([])
  const [keyword, setkeyword] = useState("")

  async function getStudents() {
    const { data, error } = await supabase.from("Student").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    setdata(data ?? [])
  }

  useEffect(() => {
    props.setBreadcrumbItems("Users", breadcrumbItems)
    getStudents()
  }, [])

  const handleSearch = async () => {
    const { data, error } = await supabase
      .from("Student")
      .select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
      .or(
        `firstName.ilike.%${keyword}%,rollNumber.ilike.%${keyword}%,lastName.ilike.%${keyword}%,
        category.ilike.%${keyword}%,rollNumber.ilike.%${keyword}%,mobileNumber.ilike.%${keyword}%`,
      )

    setdata(data)
  }

  const handleAddProfile = () => {
    navigate("/student-profile")
  }

  const handelUpdateUser = async row => {
    const { data, error } = await supabase
      .from("Student")
      .update([
        {
          isDisabled: !isNil(row.isDisabled) ? !row.isDisabled : true,
        },
      ])
      .eq("id", row.id)
      .select()

    getStudents()
  }

  const columns = [
    {
      name: "Admission No",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.admissionNo ?? "None",
    },
    {
      name: "Student Name",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.firstName ?? "None",
    },
    {
      name: "Roll No",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.rollNumber ?? "None",
    },
    {
      name: "Class",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.class,
    },
    {
      name: "Section",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.section,
    },
    {
      name: "Father Name",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.fatherName,
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
              <Badge
                onClick={() => {
                  handelUpdateUser(row)
                }}
                color={row?.isDisabled ? "success" : "danger"}
              >
                {row?.isDisabled ? "ACTIVE" : "UNACTIVE"}
              </Badge>
            </>
          </div>
        )
      },
    },
  ]

  console.log("eeeeeeeeeeeeeeeee", data)

  return (
    <React.Fragment>
      <Row>
        <div className="d-flex mb-2">
          {/* Vos éléments de filtre ici */}
          <label className="col-form-label">Search By Keyword :</label>&nbsp;
          <div className="col-md-4 me-2">
            <input
              type="text"
              value={keyword}
              onChange={val => {
                setkeyword(val.target.value)
              }}
              className="form-control"
              placeholder="Search By Student Name, Roll Number, Enroll Number.."
            />
          </div>
          <div>
            <button className="btn btn-primary" onClick={handleSearch}>
              Search
            </button>
          </div>
          <div>
            <button
              className="btn btn-danger ms-2"
              onClick={() => {
                setkeyword("")
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
              <CardTitle className="h4"> Students Details </CardTitle>

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

export default connect(null, { setBreadcrumbItems })(Users)
