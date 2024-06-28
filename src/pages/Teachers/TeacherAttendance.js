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


const TeacherAttendance = (props) => {
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
          <label
                  htmlFor="example-date-input"
                  className="col-md- col-form-label"
                >
                  Date
                    </label>
                <div className="col-md-3">
                  <input
                    className="form-control"
                    type="date"
                    id="example-date-input"
                  />
                </div>

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
              <CardTitle className="h4"> Teacher Attendance </CardTitle>


              <div className="table-responsive">
              <Table className="table mb-0">
  <thead>
    <tr>
      
      <th>Full Name</th>
      <th>Class</th>
      <th>Contact</th>
      <th>Attendance </th>
      <th>Date </th>
      
    </tr>
  </thead>
  <tbody>
  <tr>
  <td>John Doe</td>
  <td>Grade 10</td>
    <td>9889898787</td>
    
    <td style={{ color: 'green' }}>Present</td>
    
  
    <td>
              30 May 2022
            </td>
</tr>
    <tr>
    <td>Jane Smith</td>
    <td>Grade 9</td>
      <td>9889898787</td>
      
      <td style={{ color: 'red' }}>Absent</td>
      
      
     
      <td>
              30 May 2022
            </td>   </tr>
    <tr>
    <td>Alice Johnson</td>
    <td>Grade 11</td>
      <td>9889898787</td>
      
      <td style={{ color: 'green' }}>Present</td>
      
     
      
      <td>
              30 May 2022
            </td>   </tr>
    <tr>
    <td>Bob Williams</td>
    <td>Grade 12</td>
      <td>9889898787</td>
      
      <td style={{ color: 'green' }}>Present</td>
      
      
      <td>
              30 May 2022
            </td>   </tr>
    <tr>
    <td>Sarah Brown</td>
    <td>Grade 10</td>
      <td>9889898787</td>
      
      <td style={{ color: 'red' }}>Absent</td>
      
      
    
      <td>
              30 May 2022
            </td>    </tr>
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

export default connect(null, { setBreadcrumbItems })(TeacherAttendance);
