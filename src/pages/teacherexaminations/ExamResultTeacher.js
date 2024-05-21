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


const ExamResultTeacher = (props) => {
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
        navigate('/add-exam-group-teacher');
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
                                <option>Exam Group</option>
                                <option> Class 1 (Pass/Fail)</option>
                                <option> Class 1 (School Based Grading System)</option>
                                <option> Class 1 (College Based Grading System) </option>
                                <option> Class 1 (GPA Based Grading System) </option>
                                <option> Average Passing Exam</option>


                            </select>
                        </div>
                        {/* Button */}

                        <label className="col-form-label">Exam</label>
                        <div className="col-md-2">
                            <select className="form-control">
                                <option> Select </option>
                                <option> Monthly Exam (septembre) </option>
                                <option> Practice Set(June) </option>
                                <option> Internal Examination</option>
                                <option> All Subject Practice Test</option>
                                <option> March Main Exam33</option>


                            </select>
                        </div>
                        <label className="col-form-label">Session</label>
                        <div className="col-md-2">
                            <select className="form-control">
                                <option> Select </option>
                                <option>2016-17</option>
                                <option> 2017-18 </option>
                                <option> 2019-20</option>
                                <option> 2020-21</option>
                                <option> 2022-22</option>


                            </select>
                        </div>
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
                        <div>
                            <button className="btn btn-primary" >Search</button>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between  mb-2">
                        <div></div>
                        {/* Button */}
                       
                    </div>
                </Row>
                <Row>
                    <Col lg={12}>
                        <Card>

                            <CardBody>
                                <CardTitle className="h4">Exam Result</CardTitle>


                                <div className="table-responsive">
                                    <Table className="table mb-0">
                                        <thead>
                                            <tr>
                                                <th>Admission No.</th>
                                                <th>Roll Number</th>
                                                <th>Student Name</th>
                                                <th>English(35.00/100.00-210)</th>
                                                <th>Hindi(35.00/100.00-230)</th>
                                                <th>Mathematics(35.00/100.00-110)</th>
                                                <th>Science(35.00/100.00-111)</th>
                                                <th>Grand Total</th>
                                                <th>Percent(%)</th>
                                                <th>Rank</th>
                                                <th>Result</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>202401</td>
                                                <td>001</td>
                                                <td>John Doe</td>
                                                <td>25.50/100.00</td>
                                                <td> 28.00/100.00</td>
                                                <td>60.00/100.00</td>
                                                <td>45.00/100.00</td>
                                                <td>158.50</td>
                                                <td>45.29</td>
                                                <td>3</td>
                                                <td>Pass</td>


                                            </tr>
                                            <tr>
                                                <td>202402</td>
                                                <td>002</td>
                                                <td>Jane Smith</td>
                                                <td>30.00/100.00</td>
                                                <td> 32.50/100.00</td>
                                                <td>85.00/100.00</td>
                                                <td>55.00/100.00</td>
                                                <td>202.50</td>
                                                <td>57.86</td>
                                                <td>1</td>
                                                <td>Pass</td>
                                            </tr>
                                            <tr>
                                                <td>202403</td>
                                                <td>003</td>
                                                <td>Alex Johnson</td>
                                                <td>28.00/100.00</td>
                                                <td> 30.00/100.00</td>
                                                <td>75.00/100.00</td>
                                                <td>50.00/100.00</td>
                                                <td>183.00</td>
                                                <td>52.29</td>
                                                <td>2</td>
                                                <td>Pass</td>
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

export default connect(null, { setBreadcrumbItems })(ExamResultTeacher);