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


const HomeworkReport = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "Reports", link: "#" },
    ]
    const navigate = useNavigate();

    useEffect(() => {
        props.setBreadcrumbItems('Homework ', breadcrumbItems)
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
                            <option> English(210) </option>
                            <option> Hindi(230) </option>


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
                            <CardTitle className="h4">Homework Report</CardTitle>
                            <div className="table-responsive">
                                <Table className="table mb-0">
                                    <thead>
                                        <tr>
                                            <th>Class</th>
                                            <th>Section</th>
                                            <th>Subject Group</th>
                                            <th>Subject</th>
                                            <th>Homework Date</th>
                                            <th>Submission Date</th>
                                            <th>Student Count</th>
                                            <th>Homework Submited</th>
                                            <th>Pending Student</th>
                                            

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Class 1</td>
                                            <td>A</td>
                                            <td>Class 1st Subject Group</td>
                                            <td>English (210)</td>
                                            <td>	03/01/2024</td>
                                            <td>03/08/2024</td>
                                            <td>5</td>
                                            <td>0</td>
                                            <td>5</td>
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

export default connect(null, { setBreadcrumbItems })(HomeworkReport);
