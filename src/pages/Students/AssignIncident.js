import React, { useEffect } from "react"
import { useNavigate } from 'react-router-dom';


import {
  Table,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
} from "reactstrap"

import { connect } from "react-redux";

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions";


const AssignIncident = (props) => {
  document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


  const breadcrumbItems = [
    { title: "Smart school", link: "#" },
    { title: "Students", link: "#" },
  ]
  const navigate = useNavigate();

  useEffect(() => {
    props.setBreadcrumbItems('All Students', breadcrumbItems)
  })
  const handleClick = () => {
    navigate('/add-students');
  };
  const handleClickProfile = () => {
    navigate('/student-profile');
  };
  const iconStyle = {
    cursor: 'pointer',
    display: 'inline-block',
    marginRight: '10px',
    fontSize: '24px',
    color: 'blue' // Change color as needed
};

const actionIconStyle = {
    ...iconStyle, // Inherit styles from iconStyle
    color: 'red' // Example: Change color for delete icon
};
const editIconStyle = {
  ...iconStyle,
  color: 'black' // Color for edit icon (black)
};

  return (
    <React.Fragment>


      <Row>
        <div className="d-flex   mb-2">
          <div></div>
          {/* Button */}
         

                <label className="col-form-label">Class</label>
                <div className="col-md-2">
                  <select className="form-control">
                  <option> Select </option>
                    <option> Grade 1 </option>
                    <option> Grade 2 </option>
                    <option> Grade 3 </option>
                    <option> Grade 4 </option>
                    <option> Grade 5 </option>
                    <option> Grade 6 </option>
                    
                  </select> 
                </div>
                <div>
          <button className="btn btn-primary" >Search</button>
          </div>
        </div>
        <Col lg={12}>
          <Card>

            <CardBody>
              <CardTitle className="h4"> Students Attendance </CardTitle>


              <div className="table-responsive">
              <Table className="table mb-0">
  <thead>
    <tr>
      <th>Student Name</th>
      <th>Admission No</th>
      <th>Class</th>
      <th>Gender</th>
      <th>Phone</th>
      <th>Total Points</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>John Doe</td>
      <td>AD12345</td>
      <td>Grade 10</td>
      <td>Male</td>
      <td>123-456-7890</td>
      <td>95</td>
    </tr>
    <tr>
      <td>Jane Smith</td>
      <td>AD54321</td>
      <td>Grade 9</td>
      <td>Female</td>
      <td>987-654-3210</td>
      <td>88</td>
    </tr>
    <tr>
      <td>Alice Johnson</td>
      <td>AD67890</td>
      <td>Grade 11</td>
      <td>Female</td>
      <td>456-789-0123</td>
      <td>92</td>
    </tr>
    <tr>
      <td>Bob Williams</td>
      <td>AD24680</td>
      <td>Grade 12</td>
      <td>Male</td>
      <td>789-012-3456</td>
      <td>97</td>
    </tr>
    <tr>
      <td>Sarah Brown</td>
      <td>AD13579</td>
      <td>Grade 10</td>
      <td>Female</td>
      <td>321-654-9870</td>
      <td>85</td>
    </tr>
  </tbody>
</Table>


              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(AssignIncident);
