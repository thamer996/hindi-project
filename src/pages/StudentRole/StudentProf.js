import React , {useEffect} from "react"

import { connect } from "react-redux";
import {
  Table,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Container,Img
} from "reactstrap"

import user3 from "../../assets/images/users/user-3.jpg"
import { setBreadcrumbItems } from "../../store/actions";

const StudentProfile = () => {
  return (
    <React.Fragment>
     <div className="container mt-5">
     <Row>
        <Col sm={4}>
          <Card className="text-center">
            <CardBody>
      <img src={user3} alt="User Profile" className="img-fluid rounded-circle" style={{ width: '200px', height: '200px' }} />
              <CardTitle>Edward Thomas</CardTitle>
              <Table borderless>
                <tbody>
                  <tr><td>Admission No:</td><td>18001</td></tr>
                  <tr><td>Roll Number:</td><td>101</td></tr>
                  <tr><td>Class:</td><td>Class 3 (2023-24)</td></tr>
                  <tr><td>Section:</td><td>A</td></tr>
                  <tr><td>RTE:</td><td>No</td></tr>
                  <tr><td>Gender:</td><td>Male</td></tr>
                  <tr><td>Barcode:</td><td></td></tr>
                  <tr><td>QR Code:</td><td></td></tr>
                  <tr><td>Behaviour Score:</td><td>6</td></tr>
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
                  <tr><td>Admission Date:</td><td>03/18/2021</td></tr>
                  <tr><td>Date of Birth:</td><td>03/11/2014</td></tr>
                  <tr><td>Category:</td><td>General</td></tr>
                  <tr><td>Mobile Number:</td><td>8233366611</td></tr>
                  <tr><td>Caste:</td><td>Thomas</td></tr>
                  <tr><td>Religion:</td><td>Christen</td></tr>
                  <tr><td>Email:</td><td>thomas@gmail.com</td></tr>
                  <tr><td>Medical History:</td><td>Ear Infections.</td></tr>
                  <tr><td>Note:</td><td>Referred by Mr. Smith</td></tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
          <Card className="mt-3">
            <CardBody>
              <CardTitle>Address Details</CardTitle>
              <Table borderless>
                <tbody>
                  <tr><td>Current Address:</td><td>56 Main Street, Suite 3, Brooklyn, NY 11210-0000</td></tr>
                  <tr><td>Permanent Address:</td><td>56 Main Street, Suite 3, Brooklyn, NY 11210-0000</td></tr>
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
                  <tr><td>Father Name:</td><td>Olivier Thomas</td></tr>
                  <tr><td>Father Phone:</td><td>98654646</td></tr>
                  <tr><td>Father Occupation:</td><td>Lawyer</td></tr>
                  <tr><td>Mother Name:</td><td>Caroline Thomas</td></tr>
                  <tr><td>Mother Phone:</td><td>6598656</td></tr>
                  <tr><td>Mother Occupation:</td><td>Teacher</td></tr>
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
                  <tr><td>Pick-up Point:</td><td>Brooklyn East</td></tr>
                  <tr><td>Route:</td><td>Brooklyn North</td></tr>
                  <tr><td>Vehicle Number:</td><td>VH5645</td></tr>
                  <tr><td>Driver Name:</td><td>Maximus</td></tr>
                  <tr><td>Driver Contact:</td><td>885456456</td></tr>
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
                  <tr><td>Hostel:</td><td>Boys Hostel 101</td></tr>
                  <tr><td>Room No.:</td><td>B1</td></tr>
                  <tr><td>Room Type:</td><td>One Bed</td></tr>
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
                  <tr><td>Blood Group:</td><td>O+</td></tr>
                  <tr><td>House:</td><td>Green</td></tr>
                  <tr><td>Height:</td><td>4'2"</td></tr>
                  <tr><td>Weight:</td><td>34 kg</td></tr>
                  <tr><td>Measurement Date:</td><td>03/18/2021</td></tr>
                  <tr><td>Previous School Details:</td><td>Brooklyn Public School</td></tr>
                  <tr><td>National Identification Number:</td><td>46464746</td></tr>
                  <tr><td>Local Identification Number:</td><td>446464</td></tr>
                  <tr><td>Bank Account Number:</td><td>68654</td></tr>
                  <tr><td>Bank Name:</td><td>UBS Bank</td></tr>
                  <tr><td>IFSC Code:</td><td>UBS5644</td></tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
    </React.Fragment>
  );
};

export default connect(null, { setBreadcrumbItems })(StudentProfile);