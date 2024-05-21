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


const AllStudents = (props) => {
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
          {/* Button */}
          <label className="col-form-label">Gender</label>
                <div className="col-md-2">
                  <select className="form-control">
                  <option> Select </option>
                    <option> Male </option>
                    <option> Female </option>
                    
                  </select>
                </div>

               
                <div>
          <button className="btn btn-primary" >Search</button>
          </div>
        </div>
        <div className="d-flex justify-content-between  mb-2">
          <div></div>
          {/* Button */}
          <button className="btn btn-primary" onClick={handleClick}>Add Students</button>
        </div>
        <Col lg={12}>
          <Card>  

            <CardBody>
              <CardTitle className="h4">All Students </CardTitle>


              <div className="table-responsive">
              <Table className="table mb-0">
  <thead>
    <tr>
      <th>Admission No</th>
      <th>Student Name</th>
      <th>Roll No.</th>
      <th>Class</th>
      <th>Father Name </th>
      <th>Date of Birth</th>
      <th>Gender</th>
      <th>Category</th>
      <th>Mobile Number</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
  <tr>
    <td>1001</td>
    <td>John Doe</td>
    <td>123-456-7890</td>
    <td>Grade 10</td>
    <td>Michael Doe </td>
    <td>2006-05-12</td>
    <td>Male</td>
    <td>General</td>
    <td>9876543210</td>
    <td>
                <span style={iconStyle} onClick={handleClickProfile}>
                    <i className="ti-eye"></i>
                </span>
                <span style={editIconStyle} onClick={"bi bi-trash"}>
                    <i className="ti-marker-alt"></i>
                </span>
                <span style={actionIconStyle} onClick={"bi bi-trash"}>
                    <i className="ti-trash"></i>
                </span>
                
            </td>
</tr>
    <tr>
      <td>1002</td>
      <td>Jane Smith</td>
      <td>987-654-3210</td>
      <td>Grade 9</td>
      <td>John Smith </td>
      <td>2007-08-25</td>
      <td>Female</td>
      <td>General</td>
      <td>1234567890</td>
      <td>
                <span style={iconStyle} onClick={handleClickProfile}>
                    <i className="ti-eye"></i>
                </span>
                <span style={editIconStyle} onClick={"bi bi-trash"}>
                    <i className="ti-marker-alt"></i>
                </span>
                <span style={actionIconStyle} onClick={"bi bi-trash"}>
                    <i className="ti-trash"></i>
                </span>
                
            </td>    </tr>
    <tr>
      <td>1003</td>
      <td>Alice Johnson</td>
      <td>555-555-5555</td>
      <td>Grade 11</td>
      <td>David Johnson </td>
      <td>2005-10-30</td>
      <td>Female</td>
      <td>General</td>
      <td>5555555555</td>
      <td>
                <span style={iconStyle} onClick={handleClickProfile}>
                    <i className="ti-eye"></i>
                </span>
                <span style={editIconStyle} onClick={"bi bi-trash"}>
                    <i className="ti-marker-alt"></i>
                </span>
                <span style={actionIconStyle} onClick={"bi bi-trash"}>
                    <i className="ti-trash"></i>
                </span>
                
            </td>    </tr>
    <tr>
      <td>1004</td>
      <td>Bob Williams</td>
      <td>111-222-3333</td>
      <td>Grade 12</td>
      <td>James Williams </td>
      <td>2004-03-18</td>
      <td>Male</td>
      <td>General</td>
      <td>3332221111</td>
      <td>
                <span style={iconStyle} onClick={handleClickProfile}>
                    <i className="ti-eye"></i>
                </span>
                <span style={editIconStyle} onClick={"bi bi-trash"}>
                    <i className="ti-marker-alt"></i>
                </span>
                <span style={actionIconStyle} onClick={"bi bi-trash"}>
                    <i className="ti-trash"></i>
                </span>
                
            </td>    </tr>
    <tr>
      <td>1005</td>
      <td>Sarah Brown</td>
      <td>777-888-9999</td>
      <td>Grade 10</td>
      <td>William Brown </td>
      <td>2006-12-08</td>
      <td>Female</td>
      <td>General</td>
      <td>9998887777</td>
      <td>
                <span style={iconStyle} onClick={handleClickProfile}>
                    <i className="ti-eye"></i>
                </span>
                <span style={editIconStyle} onClick={"bi bi-trash"}>
                    <i className="ti-marker-alt"></i>
                </span>
                <span style={actionIconStyle} onClick={"bi bi-trash"}>
                    <i className="ti-trash"></i>
                </span>
                
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

export default connect(null, { setBreadcrumbItems })(AllStudents);
