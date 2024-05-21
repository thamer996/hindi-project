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


const TransportReportSuper = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "Reports", link: "#" },
    ]
    const navigate = useNavigate();

    useEffect(() => {
        props.setBreadcrumbItems('Transport ', breadcrumbItems)
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
                            <option>Class 1</option>
                            <option>Class 2</option>
                            <option>Class 3</option>
                            <option>Class 4</option>


                        </select>
                    </div>
                    <label className="col-form-label">Section</label>
                    <div className="col-md-2">
                        <select className="form-control">
                            <option> Select </option>
                            <option>A</option>
                            <option>B</option>
                            <option>C</option>
                            <option>D</option>


                        </select>
                    </div>
                    <label className="col-form-label">Route List</label>
                    <div className="col-md-2">
                        <select className="form-control">
                            <option> Select </option>
                            <option> Brooklyn Central </option>
                            <option> Brooklyn East </option>
                            <option> Brooklyn North </option>


                        </select>
                    </div>

                    <label className="col-form-label">Pickup Point</label>
                    <div className="col-md-2">
                        <select className="form-control">
                            <option> Select </option>
                           
                            <option> Brooklyn East </option>
                            <option> Brooklyn North </option>


                        </select>
                    </div>
                    <label className="col-form-label">Vehicle</label>
                    <div className="col-md-2">
                        <select className="form-control">
                            <option> Select </option>
                           
                            <option> VH1001</option>
                           


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
                            <CardTitle className="h4">Student Transport Report</CardTitle>
                            <div className="table-responsive">
                                <Table className="table mb-0">
                                    <thead>
                                        <tr>
                                            <th>Class</th>
                                            <th>Admission No</th>
                                            <th>Student Name</th>
                                           
                                            <th>Mobile Number</th>
                                            <th>Father Name</th>
                                            <th>Route Title</th>
                                            <th>Vheicle Number</th>
                                            <th>Pickup Point</th>
                                            <th>Driver Name</th>
                                            <th>Driver Contact</th>
                                            <th>Fare($)</th>
                                            

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Class 1 - A</td>
                                            <td>90775</td>
                                            <td>Suresh Patel</td>
                                            <td>9080678678</td>
                                            <td>	Lokesh</td>
                                            <td>Brooklyn Central</td>
                                            <td>VH1001</td>
                                            <td>Brooklyn East</td>
                                            <td>Michel</td>
                                            <td>8667777869</td>
                                            <td>50.00</td>
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

export default connect(null, { setBreadcrumbItems })(TransportReportSuper);
