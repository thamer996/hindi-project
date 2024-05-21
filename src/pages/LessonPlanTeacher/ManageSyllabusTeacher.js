import React, { useEffect } from "react"
import { Link, useNavigate } from 'react-router-dom';


import {
    Table,
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    Container,
} from "reactstrap"

import { connect } from "react-redux";

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions";
import HeaderTeacher from "../../components/HorizontalLayoutTeacher/HeaderTeacher";
import NvbarTeacher from "../../components/HorizontalLayoutTeacher/NvbarTeacher";



const ManageSyllabusTeacher = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "Lesson Plan", link: "#" },
    ]
    const navigate = useNavigate();

    useEffect(() => {
        props.setBreadcrumbItems('Manage Syllabus Status', breadcrumbItems)
    })
    const handleClick = () => {
        navigate('/add-leave-teacher');
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
                            <option>class 1</option>
                            <option> class 2 </option>
                            <option> class 3</option>
                            <option> class 4</option>
                            <option> class 5</option>


                        </select>
                    </div>
                    <label className="col-form-label">Section</label>
                    <div className="col-md-2">
                        <select className="form-control">
                            <option> Select </option>
                            <option>A</option>
                            <option> B </option>
                            <option> C</option>
                            <option>D</option>



                        </select>
                    </div>
                    <label className="col-form-label">Subject Group</label>
                    <div className="col-md-2">
                        <select className="form-control">
                            <option> Select </option>
                            <option> Class 1st Subject Group </option>



                        </select>
                    </div>
                    <label className="col-form-label">Subject</label>
                    <div className="col-md-2">
                        <select className="form-control">
                            <option> Select </option>
                            <option> English(210)</option>
                            <option> Hindi(230)</option>
                            <option> Science(111)</option>



                        </select>
                    </div>


                    <div>
                        <button className="btn btn-primary" >Search</button>
                    </div>
                </div>
                <div className="d-flex justify-content-between  mb-2">
                    <div></div>
                    {/* Button */}

                </div>
                    <Col lg={12}>
                        <Card>

                        <CardBody>
                            <CardTitle className="h4">Syllabus Status For: English (210)</CardTitle>


                            <div className="table-responsive">
                                <Table className="table mb-0">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Lesson Topic</th>
                                            <th>	Topic Completion Date</th>
                                            <th>Status</th>
                                            <th>Action</th>


                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>
                                                <div style={{ fontWeight: "bold" }}>Identify the learning objectives</div>
                                                <div>1.1  Who is the poet of poem merry-go-round</div>
                                            </td>
                                            <td></td>
                                            <td><button className="btn btn-success" style={{ backgroundColor: 'gray', borderColor: 'gray' }}>Incomplete</button></td>
                                            <td>  <div
                                                className="form-check form-switch form-switch-lg mb-3"
                                            >
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    id="customSwitchsizelg"
                                                    defaultChecked
                                                />
                                               
                                            </div></td>



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

export default connect(null, { setBreadcrumbItems })(ManageSyllabusTeacher);