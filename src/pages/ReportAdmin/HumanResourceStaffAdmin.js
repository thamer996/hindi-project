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
import TeacherLayout from "../../components/HorizontalLayoutTeacher/TeacherLayout";


const HumanResourceStaffAdmin = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "Reports", link: "#" },
    ]
    const navigate = useNavigate();

    useEffect(() => {
        props.setBreadcrumbItems('Human Resource', breadcrumbItems)
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
                      
                  
                   
                        <label className="col-form-label">Search Type By(Date of Joining)</label>
                    <div className="col-md-2">
                        <select className="form-control">
                            <option> Select </option>
                            <option> Today </option>
                            <option> This Week Last Week </option>
                          

                        </select>
                    </div>
                    <label className="col-form-label">Status</label>
                    <div className="col-md-2">
                        <select className="form-control">
                            <option> Select </option>
                            <option> Active </option>
                            <option> Disabled </option>
                           

                        </select>
                    </div>
                    <label className="col-form-label">Role</label>
                    <div className="col-md-2">
                        <select className="form-control">
                            <option> Select </option>
                            <option> Admin </option>
                            <option> Teacher </option>
                            <option> Accountant </option>
                          
                            
                           
                           


                        </select>
                    </div>
                    <label className="col-form-label">Designation</label>
                    <div className="col-md-2">
                        <select className="form-control">
                            <option> Select </option>
                            <option> Faculty </option>
                        
                            <option> Accountant </option>
                          
                            
                           
                           


                        </select>
                    </div>
                   



                    <div>
                        <button className="btn btn-primary">Search</button>
                    </div>
                </div>
                <div className="d-flex justify-content-between  mb-2">
                    <div></div>
                    {/* Button */}
                   

                </div>

           
                <Col lg={12}>
                    <Card>
                        <CardBody>
                            <CardTitle className="h4">Human Resource Report</CardTitle>
                            <div className="table-responsive">
                                <Table className="table mb-0">
                                    <thead>
                                        <tr>
                                            <th>Staff ID</th>
                                            <th>Role</th>
                                            <th>Designation</th>
                                            <th>Department</th>
                                            <th>Name</th>
                                            <th> Father Name</th>
                                            <th>Mother Name</th>
                                            <th>Email</th>
                                            <th>Gender</th>
                                            <th>Date Of Birth</th>
                                            <th>Date Of Joining</th>
                                            <th>Phone</th>
                                            <th>Emergency Contact Number</th>
                                            <th>Marital Status</th>
                                            <th>Current Address</th>
                                            <th>Permanent Address</th>
                                            

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <td>9000</td>
                                        <td>Super Admin</td>
                                        <td>Technical Head</td>
                                        <td>Admin</td>
                                        <td>Joe Black</td>
                                        <td>Will Black</td>
                                        <td>Mini Black</td>
                                        <td>superadmin@gmail.com</td>
                                        <td>Male</td>
                                        <td>01/01/1988	</td>
                                        <td>03/11/2010</td>
                                        <td>6545645645</td>
                                        <td>54654644</td>
                                        <td>Married</td>
                                        <td>9837 Temple Apartment</td>
                                        <td>9837 Temple Apartment</td>
                                       
                                      
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

export default connect(null, { setBreadcrumbItems })(HumanResourceStaffAdmin);
