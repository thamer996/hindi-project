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


const Attendance = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "Reports", link: "#" },
    ]
    const navigate = useNavigate();

    useEffect(() => {
        props.setBreadcrumbItems('Student Attendance Report', breadcrumbItems)
    })
    const handleClick = () => {
        navigate('/add-lesson');
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
                    <label className="col-form-label">Month</label>
                    <div className="col-md-2">
                        <select className="form-control">
                            <option> Select </option>
                            <option> January </option>
                            <option> February </option>
                            <option> March </option>
                            <option> April </option>
                            <option> May </option>
                            <option> June </option>
                            <option> July </option>
                            <option>  August</option>
                            <option> September </option>
                            <option> October </option>
                            <option> November </option>
                            <option> December </option>



                        </select>
                    </div>
                    <label className="col-form-label">Year</label>
                    <div className="col-md-2">
                        <select className="form-control">
                            <option> Select </option>
                            <option>2023</option>
                            <option>2024</option>
                          



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
                            <CardTitle className="h4">Student Attendance Report </CardTitle>


                            <div className="table-responsive">
                                <Table className="table mb-0">
                                    <thead>
                                        <tr>
                                            <th>Student/Date</th>
                                            <th>(%)</th>
                                            <th>P</th>
                                            <th>L</th>
                                            <th>A</th>
                                            <th>H</th>
                                            <th>F</th>
                                            <th>01 Sun</th>
                                            <th>02 Mon</th>
                                            <th>03 Tue</th>
                                            <th>04 Wed</th>
                                            <th>05 Thu</th>
                                            <th>06 Fri</th>
                                            <th>07 Sat</th>
                                            <th>08 Sun</th>
                                            <th>09 Mon</th>
                                            <th>10 Tue</th>
                                            <th>11 Wed</th>
                                            <th>12 Thu</th>
                                            <th>13 Fri</th>
                                            <th>14 Sat</th>
                                            <th>15 Sun</th>
                                            
                                           
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Arpit Patel</td>
                                            <td>-</td>
                                            <td>0</td>
                                            <td>0</td>
                                           
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            
                                            
                                           
                                            <td>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Suresh Patel</td>
                                            <td>-</td>
                                            <td>0</td>
                                            <td>0</td>
                                           
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            
                                            
                                           
                                            <td>
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

export default connect(null, { setBreadcrumbItems })(Attendance);