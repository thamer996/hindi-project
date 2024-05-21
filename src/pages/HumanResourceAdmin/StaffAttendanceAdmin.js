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
import HeaderTeacher from "../../components/HorizontalLayoutTeacher/HeaderTeacher";
import NvbarTeacher from "../../components/HorizontalLayoutTeacher/NvbarTeacher";
import TeacherLayout from "../../components/HorizontalLayoutTeacher/TeacherLayout";


const StaffAttendanceAdmin = (props) => {
  document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


  const breadcrumbItems = [
    { title: "Smart school", link: "#" },
    { title: "Attendance", link: "#" },
  ]
  const navigate = useNavigate();

  useEffect(() => {
    props.setBreadcrumbItems('Staff Attendance', breadcrumbItems)
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
        <div className="d-flex mb-2">
          <div></div>
          {/* Vos éléments de filtre ici */}
         
          <label className="col-form-label">Role</label>
          <div className="col-md-2">
            <select className="form-control">
              <option> Select </option>
              <option> Admin </option>
              <option> Teacher </option>
              <option> Super Admin </option>
              <option> Receptionist </option>
              <option> Librarian </option>
              <option> Accountant </option>


            </select>
          </div>
          <label
            htmlFor="example-date-input"
            className="col-md- col-form-label"
          >
            Attendance Date
          </label>
          <div className="col-md-3">
            <input
              className="form-control"
              type="date"
              id="example-date-input"
            />
          </div>


          <div>
            <button className="btn btn-primary" >Search</button>
          </div>
        </div>
      </Row>
      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <CardTitle className="h4">Staff List </CardTitle>
              <label>Set attendance for all staff as</label>


              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="exampleRadios"
                  id="exampleRadios1"
                  value="option1"
                  defaultChecked
                />
                <label
                  className="form-check-label"
                  htmlFor="exampleRadios1"
                >
                  Present
                </label>
              </div>
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="exampleRadios"
                  id="exampleRadios1"
                  value="option1"
                  defaultChecked
                />
                <label
                  className="form-check-label"
                  htmlFor="exampleRadios1"
                >
                  Late
                </label>
              </div>
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="exampleRadios"
                  id="exampleRadios1"
                  value="option1"
                  defaultChecked
                />
                <label
                  className="form-check-label"
                  htmlFor="exampleRadios1"
                >
                  Absent
                </label>
              </div>
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="exampleRadios"
                  id="exampleRadios1"
                  value="option1"
                  defaultChecked
                />
                <label
                  className="form-check-label"
                  htmlFor="exampleRadios1"
                >
                  Half Day
                </label>
              </div>
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="exampleRadios"
                  id="exampleRadios1"
                  value="option1"
                  defaultChecked
                />
                <label
                  className="form-check-label"
                  htmlFor="exampleRadios1"
                >
                  Holiday
                </label>
              </div>
              <button className="btn btn-primary" >Save Attendance</button>




              <div className="table-responsive">
                <Table className="table mb-0">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Admission No</th>
                    
                      <th>
                        Roll Number</th>
                        <th>Name</th>
                      <th>Attendance</th>
                      <th>Source</th>
                      <th>Note</th>


                    </tr>
                  </thead>
                  <tbody>
                    <tr>

                      <td>1</td>
                      <td>
                      9002</td>
                      <td>	Shivam Verma</td>
                      <td> 	Teacher</td>
                      <td> <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="exampleRadios"
                          id="exampleRadios1"
                          value="option1"
                          defaultChecked
                        />
                        <label
                          className="form-check-label"
                          htmlFor="exampleRadios1"
                        >
                          Present
                        </label>
                      </div>
                        <div className="form-check mb-3">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="exampleRadios"
                            id="exampleRadios1"
                            value="option1"
                            
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleRadios1"
                          >
                            Late
                          </label>
                        </div>
                        <div className="form-check mb-3">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="exampleRadios"
                            id="exampleRadios1"
                            value="option1"
                          
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleRadios1"
                          >
                            Absent
                          </label>
                        </div>
                        <div className="form-check mb-3">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="exampleRadios"
                            id="exampleRadios1"
                            value="option1"
                           
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleRadios1"
                          >
                            Half Day
                          </label>
                        </div>
                        <div className="form-check mb-3">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="exampleRadios"
                            id="exampleRadios1"
                            value="option1"
                          
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleRadios1"
                          >
                            Holiday
                          </label>
                        </div></td>
                      <td>N/A</td>
                      <td><input type="text" className="form-control" placeholder=""></input></td>






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

export default connect(null, { setBreadcrumbItems })(StaffAttendanceAdmin);