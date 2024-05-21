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


const StudentInformationReportSuper = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "Reports", link: "#" },
    ]
    const navigate = useNavigate();

    useEffect(() => {
        props.setBreadcrumbItems('Student Informations', breadcrumbItems)
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
                    <div className="col-md-6">
                        <Row>
                            <div className="col-md-6">
                                <label className="col-form-label">Class</label>
                                <select className="form-control">
                                    <option>select</option>
                                    <option>Class 1</option>
                                    <option>Class 2</option>
                                    <option>Class 3</option>
                                    <option>Class 4</option>

                                </select>
                            </div>
                            <div className="col-md-6">
                                <label className="col-form-label">Section</label>
                                <select className="form-control">
                                    <option>Select</option>
                                    <option>A</option>
                                    <option>B</option>
                                    <option>C</option>
                                    <option>D</option>

                                </select>
                            </div>

                        </Row>
                        <Row>
                            <div className="col-md-6">
                                <label className="col-form-label">RTE</label>
                                <select className="form-control">
                                    <option>Select</option>
                                    <option>Yes</option>
                                    <option>No</option>


                                </select>
                            </div>
                             <div className="col-md-6 mt-4">
                                <button className="btn btn-primary" >Search</button>
                            </div>

                        </Row>
                    </div>
                    <div className="col-md-6">
                        <Row>
                            <div className="col-md-6">
                                <label className="col-form-label">Category</label>
                                <select className="form-control">
                                    <option>Select</option>
                                    <option>General</option>
                                    <option>OBC</option>
                                    <option>Special</option>
                                    <option>2020-21</option>
                                    <option>2022-22</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label className="col-form-label">Gender</label>
                                <select className="form-control">
                                    <option>Select</option>
                                    <option>Male</option>
                                    <option>Female</option>

                                </select>
                            </div>
                           

                        </Row>
                    </div>
                </Row>
                <div className="d-flex justify-content-between  mb-2">
                    <div></div>
                    {/* Button */}

                </div>

                <Row className="mt-3">
                    <Col lg={12}>
                        <Card>
                            <CardBody>
                                <CardTitle className="h4">Student Report</CardTitle>
                                <div className="table-responsive">
                                    <Table className="table mb-0">
                                        <thead>
                                            <tr>
                                                <th>Section</th>
                                                <th>Admission No.</th>
                                                <th>Student Name</th>
                                                <th>Father Name</th>
                                                <th>Date of Birth</th>
                                                <th>Gender</th>
                                                <th>Category</th>
                                                <th>Mobile Number</th>
                                                <th>Local Identification Number</th>
                                                <th>National Identification Number</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>A</td>
                                                <td>	90775</td>
                                                <td>
                                                    Suresh Patel</td>
                                                <td>Lokesh</td>
                                                <td>07/19/2014</td>
                                                <td>Male</td>
                                                <td>General</td>
                                                <td>9080678678</td>
                                                <td>No</td>
                                            </tr>
                                            <tr>
                                            <td>A</td>
                                                <td>	90977</td>
                                                <td>
                                                Silvana Martin</td>
                                                <td>john Martin</td>
                                                <td>06/17/2009</td>
                                                <td>Male</td>
                                                <td>General</td>
                                                <td>908906787</td>
                                                <td>No</td>
                                            </tr>
                                            <tr>{/* Vos données ici */}</tr>
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

export default connect(null, { setBreadcrumbItems })(StudentInformationReportSuper);
