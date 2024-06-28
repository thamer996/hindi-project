import React, { useEffect, useState } from "react"

import { connect } from "react-redux"
import {
  Table,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Container,
  Img,
} from "reactstrap"
import DataTable from "react-data-table-component"
import { createClient } from "@supabase/supabase-js"
import user3 from "../../assets/images/users/user-3.jpg"
import { setBreadcrumbItems } from "../../store/actions"

//Import Action to copy breadcrumb items from local state to redux state
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useFormik } from "formik"
import * as Yup from "yup"

const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)
const StudentProfile = () => {
  const [Studentdetail, SetStudentDetail] = useState([])
  async function getStudentDetail() {
    const authUser = JSON.parse(localStorage.getItem("authUser") ?? "{}")
    const refUser = localStorage.getItem("StudentId")
    const { data, error } = await supabase
      .from("Student")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
      .eq("id", refUser ?? "")
      .single()
    SetStudentDetail(data ?? [])
  }
  useEffect(() => {
    getStudentDetail()
  }, [])
  console.log("student", Studentdetail)

  return (
    <React.Fragment>
      <div className="container mt-5">
        <Row>
          <Col sm={4}>
            <Card className="text-center">
              <CardBody>
                <img
                  src={`https://ypduxejepwdmssduohpi.supabase.co/storage/v1/object/public/uploads/${Studentdetail?.studentPhoto}`}
                  alt="User Profile"
                  className="img-fluid rounded-circle"
                  style={{ width: "200px", height: "200px" }}
                />
                <CardTitle>
                  {Studentdetail?.firstName}
                  {Studentdetail?.lastName}
                </CardTitle>
                <Table borderless>
                  <tbody>
                    <tr>
                      <td>Admission No:</td>
                      <td> {Studentdetail?.admissionNo}</td>
                    </tr>
                    <tr>
                      <td>Roll Number:</td>
                      <td> {Studentdetail?.rollNumber}</td>
                    </tr>
                    <tr>
                      <td>Class:</td>
                      <td> {Studentdetail?.class} </td>
                    </tr>
                    <tr>
                      <td>Section:</td>
                      <td>{Studentdetail?.section}</td>
                    </tr>

                    <tr>
                      <td>Gender:</td>
                      <td>{Studentdetail?.gender}</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>

          {/* Right Section */}
          <Col sm={8}>
            <Card>
              <CardBody>
                <CardTitle>Details</CardTitle>
                <Table borderless>
                  <tbody>
                    <tr>
                      <td>Admission Date:</td>
                      <td>{Studentdetail?.admissionDate}</td>
                    </tr>
                    <tr>
                      <td>Date of Birth:</td>
                      <td>{Studentdetail?.dateOfBirth}</td>
                    </tr>
                    <tr>
                      <td>Category:</td>
                      <td>{Studentdetail?.category}</td>
                    </tr>
                    <tr>
                      <td>Mobile Number:</td>
                      <td>{Studentdetail?.mobileNumber}</td>
                    </tr>
                    <tr>
                      <td>Caste:</td>
                      <td>{Studentdetail?.caste}</td>
                    </tr>
                    <tr>
                      <td>Religion:</td>
                      <td>{Studentdetail?.religion}</td>
                    </tr>
                    <tr>
                      <td>Email:</td>
                      <td>{Studentdetail?.studentEmail}</td>
                    </tr>
                    <tr>
                      <td>Medical History:</td>
                      <td>{Studentdetail?.medicalHistory}</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
            <Card className="mt-3">
              <CardBody>
                <CardTitle>Address Details</CardTitle>
                <Table borderless>
                  <tbody>
                    <tr>
                      <td>Current Address:</td>
                      <td>{Studentdetail?.guardianAddress}</td>
                    </tr>
                    <tr>
                      <td>Permanent Address:</td>
                      <td>{Studentdetail?.guardianAddress}</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>

            {/* Parent/Guardian Details */}
            <Card className="mt-3">
              <CardBody>
                <CardTitle>Parent/Guardian Details</CardTitle>
                <Table borderless>
                  <tbody>
                    <tr>
                      <td>Father Name:</td>
                      <td>{Studentdetail?.fatherName}</td>
                    </tr>
                    <tr>
                      <td>Father Phone:</td>
                      <td>{Studentdetail?.fatherPhone}</td>
                    </tr>
                    <tr>
                      <td>Father Occupation:</td>
                      <td>{Studentdetail?.fatherOccupation}</td>
                    </tr>
                    <tr>
                      <td>Mother Name:</td>
                      <td>{Studentdetail?.motherName}</td>
                    </tr>
                    <tr>
                      <td>Mother Phone:</td>
                      <td>{Studentdetail?.motherPhone}</td>
                    </tr>
                    <tr>
                      <td>Mother Occupation:</td>
                      <td>{Studentdetail?.motherOccupation}</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>

            {/* Transport Details */}
            <Card className="mt-3">
              <CardBody>
                <CardTitle>Transport Details</CardTitle>
                <Table borderless>
                  <tbody>
                    <tr>
                      <td>Pick-up Point:</td>
                      <td>{Studentdetail?.pickupPoint}</td>
                    </tr>
                    <tr>
                      <td>Route:</td>
                      <td>{Studentdetail?.routeList}</td>
                    </tr>
                    <tr>
                      <td>Vehicle Number:</td>
                      <td>None</td>
                    </tr>
                    <tr>
                      <td>Driver Name:</td>
                      <td>None</td>
                    </tr>
                    <tr>
                      <td>Driver Contact:</td>
                      <td>None</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>

            {/* Hostel Details */}
            <Card className="mt-3">
              <CardBody>
                <CardTitle>Hostel Details</CardTitle>
                <Table borderless>
                  <tbody>
                    <tr>
                      <td>Hostel:</td>
                      <td>{Studentdetail?.hostel}</td>
                    </tr>
                    <tr>
                      <td>Room No.(Type):</td>
                      <td>{Studentdetail?.roomNo}</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>

            {/* Miscellaneous Details */}
            <Card className="mt-3">
              <CardBody>
                <CardTitle>Miscellaneous Details</CardTitle>
                <Table borderless>
                  <tbody>
                    <tr>
                      <td>Blood Group:</td>
                      <td>{Studentdetail?.bloodGroup}</td>
                    </tr>
                    <tr>
                      <td>House:</td>
                      <td>{Studentdetail?.house}</td>
                    </tr>
                    <tr>
                      <td>Height:</td>
                      <td>{Studentdetail?.height}"</td>
                    </tr>
                    <tr>
                      <td>Weight:</td>
                      <td>{Studentdetail?.weight}Kg</td>
                    </tr>
                    <tr>
                      <td>Measurement Date:</td>
                      <td>{Studentdetail?.measurementDate}</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(StudentProfile)
