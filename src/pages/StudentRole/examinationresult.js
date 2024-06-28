import React, { useEffect } from "react"

import { connect } from "react-redux"
import {
  Row,
  Col,
  Card,
  CardBody,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  CardTitle,
  Badge,
} from "reactstrap"

import { setBreadcrumbItems } from "../../store/actions"
import { useState } from "react"
import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap"
import DataTable from "react-data-table-component"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useFormik } from "formik"
import * as Yup from "yup"
import _ from "lodash"
import { createClient } from "@supabase/supabase-js"
const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)
const Examinationresult = props => {

  const [section, setSection] = useState([])
  const [X, setX] = useState([])
  const [show, setshow] = useState(false)
  const toggleModal = () => setshow(!show)
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
  const getCountries = async Studentdetail => {
    try {
      const { data, error } = await supabase.from("ExamResult").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)

      if (error) throw error
      console.log("data", data)
      if (data) {
        console.log("data get", data)
        const groupedData = data.filter(
          o => o.admissionNo === Studentdetail?.admissionNo,
        )
        console.log("grouped data ", groupedData)
        setSection(_.sortBy(groupedData, "percent").reverse() ?? [])
      }
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }
  console.log("section", section)



  const breadcrumbItems = [
    { title: "Smart school", link: "#" },
    { title: "Academics", link: "#" },
  ]
  const handelEdit = async row => {
    console.log("row", row)

    setX(row.subjectList)
    setshow(true)
  }
  console.log("X", X)

  const iconStyle = {
    cursor: "pointer",
    display: "inline-block",
    marginRight: "10px",
    fontSize: "24px",
    color: "blue",
  }

  const actionIconStyle = {
    ...iconStyle,
    color: "red",
  }
  const editIconStyle = {
    ...iconStyle,
    color: "black",
  }
  const columns = [
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
    // {
    //   name: "subjectList",
    //   sortable: true,
    //   reorder: true,
    //   center: true,
    //   minWidth: "230px",
    //   selector: row => row?.subjectList ?? "None",
    // },
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
      selector: row => row?.percent + "%" ?? "None",
    },
    {
      name: "Rank",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: (row, index) => index + 1 ?? "None",
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
  useEffect(() => {
    if (Studentdetail && Object.keys(Studentdetail).length > 0) {
      getCountries(Studentdetail)
    }
  }, [Studentdetail])

  useEffect(() => {
    props.setBreadcrumbItems("Examinationresult", breadcrumbItems)

    getStudentDetail()
  }, [])
  return (
    <React.Fragment>
      <div className="container mt-5">
        <div>
          <Modal isOpen={show} toggle={toggleModal}>
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
                    
                            <Col>        <h3>
                        
                              <Badge>{subject}:</Badge>
                            </h3></Col>
                    <Col> <h3><Badge className="text-dark" color="light">
                              {value}
                            </Badge></h3></Col>
                           
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
        </div>
        <div>
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
        </div>
      </div>
    </React.Fragment>
  )
}
export default connect(null, { setBreadcrumbItems })(Examinationresult)
