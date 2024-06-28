import React, { useEffect } from "react"
import { Col, Row, Card, CardBody } from "reactstrap"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

import { connect } from "react-redux"

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"

//Import Images
import imgdark from "../../assets/images/logo-dark.png"

const StudentProfile = props => {
  document.title = "Invoice | Lexa - Responsive Bootstrap 5 Admin Dashboard"

  const breadcrumbItems = [
    { title: "Lexa", link: "#" },
    { title: "Pages", link: "#" },
    { title: "Invoice", link: "#" },
  ]
  const navigate = useNavigate()
  const handleClick = () => {
    navigate("/behavior")
  }

  useEffect(() => {
    props.setBreadcrumbItems("Profile", breadcrumbItems)
  })

  //Print the Invoice
  const printInvoice = () => {
    window.print()
  }

  return (
    <React.Fragment>
      <Row>
        <Col xs="12">
          <Card>
            <CardBody>
              <Row>
                <Col xs="12">
                  <hr />
                  <Row>
                    <Col xs="6">
                      <address>
                        <br />
                        <strong> Admission No</strong> :John Doe
                        <br />
                        <strong> Student Name:</strong>123-456-7890
                        <br />
                        <strong>Roll No:</strong>5656
                        <br />
                        <strong>Class:</strong>Grade 10
                        <br />
                        <strong>Father Name:</strong>Michael Doe <br />
                        <strong>Date of Birth: </strong>2006-05-12
                        <br />
                        <strong>Gender: </strong>Male <br />
                        <strong>Category:</strong> general <br />
                        <strong>Mobile Number:</strong>9876543210 <br />
                      </address>
                    </Col>
                    <Col xs="6" className="text-end">
                      <address>
                        <strong>Weight (Kg):</strong>70
                        <br />
                        <strong> Hight(cm):</strong>160
                        <br />
                        <strong> Blood Groop: </strong>A+
                        <br />
                      </address>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row>
                <Col xs="12">
                  <div>
                    <div className="p-2">
                      <h3 className="font-size-16">
                        <strong>Attendance Logs</strong>
                      </h3>
                    </div>
                    <div className="">
                      <div className="table-responsive">
                        <table className="table">
                          <thead>
                            <tr>
                              <td>
                                <strong>Item</strong>
                              </td>
                              <td className="text-center">
                                <strong>Date</strong>
                              </td>
                              <td className="text-center">
                                <strong>Arrive</strong>
                              </td>
                              <td className="text-end">
                                <strong>Quit</strong>
                              </td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td style={{ color: "green" }}>Present</td>
                              <td className="text-center"> October 7, 2016</td>
                              <td className="text-center">8.30</td>
                              <td className="text-end">5</td>
                            </tr>
                            <tr>
                              <td style={{ color: "red" }}>Absent</td>
                              <td className="text-center"> October 7, 2016</td>
                              <td className="text-center">-</td>
                              <td className="text-end">-</td>
                            </tr>
                            <tr>
                              <td style={{ color: "green" }}>Present</td>
                              <td className="text-center"> October 7, 2016</td>
                              <td className="text-center">8.30</td>
                              <td className="text-end">5</td>
                            </tr>
                            <tr>
                              <td style={{ color: "green" }}>Present</td>
                              <td className="text-center"> October 7, 2016</td>
                              <td className="text-center">8.30</td>
                              <td className="text-end">5</td>
                            </tr>
                            <tr>
                              <td style={{ color: "green" }}>Present</td>
                              <td className="text-center"> October 7, 2016</td>
                              <td className="text-center">8.30</td>
                              <td className="text-end">5</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="d-print-none">
                        <div className="float-end">
                          <Link
                            to="#"
                            onClick={printInvoice}
                            className="btn btn-success waves-effect waves-light me-2"
                          >
                            <i className="fa fa-print"></i>
                          </Link>{" "}
                          <Link
                            to="#"
                            className="btn btn-primary waves-effect waves-light"
                          >
                            Send
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(StudentProfile)
