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


const ExaminationRankReportSuper = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "Reports", link: "#" },
    ]
    const navigate = useNavigate();

    useEffect(() => {
        props.setBreadcrumbItems('Examinations', breadcrumbItems)
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
                        <label className="col-form-label">Exam Group</label>
                    <div className="col-md-2">
                        <select className="form-control">
                            <option> Select </option>
                            <option>Class 1(Pass/Fail)</option>
                            <option>Class 1(School Based Grading System)</option>
                            <option>Class 1(College Based Grading System)</option>
                           


                        </select>
                    </div>
                    <label className="col-form-label">Exam</label>
                    <div className="col-md-2">
                        <select className="form-control">
                            <option> Select </option>
                            <option>Monthly Test</option>
                            
                           
                           


                        </select>
                    </div>
                    <label className="col-form-label">Session</label>
                    <div className="col-md-2">
                        <select className="form-control">
                            <option> Select </option>
                            <option>2016-17</option>
                            <option>2017-16</option>
                            
                           
                           


                        </select>
                    </div>
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
                            <CardTitle className="h4">Examination Report</CardTitle>
                            <div className="table-responsive">
                                <Table className="table mb-0">
                                    <thead>
                                        <tr>
                                            <th>Rank</th>
                                            <th>Admission No.</th>
                                            <th>Roll Number</th>
                                            <th>Student Name</th>
                                            <th>English(35.00/100.00-210)</th>
                                            <th>Hindi(35.00/100.00-230)</th>
                                            <th>Mathematics(35.00/100.00-110)</th>
                                            <th>Science(35.00/100.00-111)</th>
                                            <th>Grand Total</th>
                                            <th>Percent(%)</th>
                                            <th>Result</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                       
                                      
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

export default connect(null, { setBreadcrumbItems })(ExaminationRankReportSuper);
