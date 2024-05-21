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


const AllTeachers = (props) => {
  document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


  const breadcrumbItems = [
    { title: "Smart school", link: "#" },
    { title: "Teachers", link: "#" },
  ]
  const navigate = useNavigate();

  useEffect(() => {
    props.setBreadcrumbItems('All Teachers', breadcrumbItems)
  })
  const handleClick = () => {
    navigate('/addteacher');
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
                <label className="col-form-label">Subject</label>
                <div className="col-md-2">
                  <select className="form-control">
                  <option> Select </option>
                    <option> Math </option>
                    <option> Physics </option>
                    <option> Sience</option>
                    <option> English</option>
                   
                    
                  </select>
                </div>
       

               
                <div>
          <button className="btn btn-primary" >Search</button>
          </div>
        </div>
        <div className="d-flex justify-content-between  mb-2">
          <div></div>
          {/* Button */}
          <button className="btn btn-primary" onClick={handleClick}>Add Teacher</button>
        </div>
        <Col lg={12}>
          <Card>

            <CardBody>
              <CardTitle className="h4">All Teachers </CardTitle>


              <div className="table-responsive">
                <Table className="table mb-0">
                <thead>
        <tr>
          <th>Full Name</th>
          <th>Class</th>
          <th>Subject</th>
          <th>Contact</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>John Doe</td>
          <td>Grade 10</td>
          <td>Math</td>
          <td>123-456-7890</td>
          <td>johndoe@example.com</td>
          
          <td>
                
                <span style={editIconStyle} onClick={"bi bi-trash"}>
                    <i className="ti-marker-alt"></i>
                </span>
                <span style={actionIconStyle} onClick={"bi bi-trash"}>
                    <i className="ti-trash"></i>
                </span>
                
            </td>
        </tr>
        <tr>
          <td>Jane Smith</td>
          <td>Grade 9</td>
          <td>Science</td>
          <td>987-654-3210</td>
          <td>janesmith@example.com</td>
         
          <td>
                
                <span style={editIconStyle} onClick={"bi bi-trash"}>
                    <i className="ti-marker-alt"></i>
                </span>
                <span style={actionIconStyle} onClick={"bi bi-trash"}>
                    <i className="ti-trash"></i>
                </span>
                
            </td>
        </tr>
        <tr>
          <td>Alice Johnson</td>
          <td>Grade 11</td>
          <td>English</td>
          <td>555-555-5555</td>
          <td>alicejohnson@example.com</td>
          
          <td>
                
                <span style={editIconStyle} onClick={"bi bi-trash"}>
                    <i className="ti-marker-alt"></i>
                </span>
                <span style={actionIconStyle} onClick={"bi bi-trash"}>
                    <i className="ti-trash"></i>
                </span>
                
            </td>
        </tr>
        <tr>
          <td>Bob Williams</td>
          <td>Grade 12</td>
          <td>Math</td>
          <td>111-222-3333</td>
          <td>bobwilliams@example.com</td>
          
          <td>
                
                <span style={editIconStyle} onClick={"bi bi-trash"}>
                    <i className="ti-marker-alt"></i>
                </span>
                <span style={actionIconStyle} onClick={"bi bi-trash"}>
                    <i className="ti-trash"></i>
                </span>
                
            </td>
        </tr>
        <tr>
          <td>Sarah Brown</td>
          <td>Grade 10</td>
          <td>Math</td>
          <td>777-888-9999</td>
          <td>sarahbrown@example.com</td>
          
          <td>
                
                <span style={editIconStyle} onClick={"bi bi-trash"}>
                    <i className="ti-marker-alt"></i>
                </span>
                <span style={actionIconStyle} onClick={"bi bi-trash"}>
                    <i className="ti-trash"></i>
                </span>
                
            </td>
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

export default connect(null, { setBreadcrumbItems })(AllTeachers);
