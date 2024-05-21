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


const PeriodAttendanceReportAdmin = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "Reports", link: "#" },
    ]
    const navigate = useNavigate();

    useEffect(() => {
        props.setBreadcrumbItems('Attendance', breadcrumbItems)
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
                    <label className="col-form-label">Month</label>
                    <div className="col-md-2">
                        <select className="form-control">
                            <option> Select </option>
                            <option>May</option>
                            <option>June</option>
                            <option>July</option>
                           


                        </select>
                    </div>
                    <label className="col-form-label">Subject</label>
                    <div className="col-md-2">
                        <select className="form-control">
                            <option> Select </option>
                            <option>English(210)</option>
                            <option>Hindi(230)</option>
                           
                           


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
                            <CardTitle className="h4">Student Period Attendance</CardTitle>
                            <div className="table-responsive">
                                <Table className="table mb-0">
                                    <thead>
                                        <tr>
                                            <th>Student</th>
                                            <th>01</th>
                                            <th>02</th>
                                            <th>03</th>
                                            <th>04</th>
                                            <th>05</th>
                                            <th>06</th>
                                            <th>07</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Arpit Patel (326260)</td>
                                            <td>	<div>English (210)</div>
                                                <div>10:30 AM - 11:05 AM</div>
                                                <div><button style={{ backgroundColor: 'pink', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', fontSize: '10px', cursor: 'pointer' }}>
                                                    N/A
                                                </button></div>
                                            </td>
                                            <td>	<div>English (210)</div>
                                                <div>10:00 AM - 10:45 AM</div>
                                                <div><button style={{ backgroundColor: 'pink', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', fontSize: '10px', cursor: 'pointer' }}>
                                                    N/A
                                                </button></div>
                                            </td>
                                            <td>	<div>English (210)</div>
                                                <div>10:00 AM - 10:45 AM</div>
                                                <div><button style={{ backgroundColor: 'pink', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', fontSize: '10px', cursor: 'pointer' }}>
                                                    N/A
                                                </button></div>
                                            </td>
                                            <td>	<div>English (210)</div>
                                                <div>10:00 AM - 10:45 AM</div>
                                                <div><button style={{ backgroundColor: 'pink', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', fontSize: '10px', cursor: 'pointer' }}>
                                                    N/A
                                                </button></div>
                                            </td>
                                            <td>	<div>English (210)</div>
                                                <div>10:00 AM - 10:45 AM</div>
                                                <div><button style={{ backgroundColor: 'pink', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', fontSize: '10px', cursor: 'pointer' }}>
                                                    N/A
                                                </button></div>
                                            </td>
                                            <td>	<div>English (210)</div>
                                                <div>10:00 AM - 10:45 AM</div>
                                                <div><button style={{ backgroundColor: 'pink', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', fontSize: '10px', cursor: 'pointer' }}>
                                                    N/A
                                                </button></div>
                                            </td>
                                            <td>	
                                               
                                                <button style={{ backgroundColor: 'pink', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', fontSize: '10px', cursor: 'pointer' }}>
                                                    N/A
                                                </button>
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

export default connect(null, { setBreadcrumbItems })(PeriodAttendanceReportAdmin);
