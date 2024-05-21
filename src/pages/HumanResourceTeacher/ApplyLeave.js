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



const ApplyLeave = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "Human Resource", link: "#" },
    ]
    const navigate = useNavigate();

    useEffect(() => {
        props.setBreadcrumbItems('Apply Leave', breadcrumbItems)
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
                        <label className="col-form-label">Leaves</label>
                        <div className="col-md-2">
                            <input type="text" className="form-control" placeholder="" />
                        </div>
                        <div>
                            <button className="btn btn-primary" >Search</button>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between  mb-2">
                        <div></div>
                        {/* Button */}
                        <button className="btn btn-primary" onClick={handleClick}>Add Leave</button>


                    </div>
                    <Col lg={12}>
                        <Card>

                            <CardBody>
                                <CardTitle className="h4">Leaves</CardTitle>


                                <div className="table-responsive">
                                    <Table className="table mb-0">
                                        <thead>
                                            <tr>
                                                <th>Staff </th>
                                                <th>Leave Type</th>
                                                <th>
                                                    Leave Date</th>
                                                <th>Days</th>
                                                <th>Apply Date</th>
                                                <th>Status</th>


                                                <th>Action</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>

                                                <td> Jason Sharlton</td>
                                                <td>
                                                    Medical Leave</td>
                                                <td> 	03/25/2024 - 03/28/2024</td>
                                                <td> 4 </td>
                                                <td>03/25/2024</td>
                                                <td> <button style={{ backgroundColor: 'orange', border: 'none', padding: '5px 10px', borderRadius: '5px', color: 'white' }}>pending ...</button></td>






                                                <td>

                                                    <span style={iconStyle} >
                                                        <i className="ti-eye"></i>
                                                    </span>
                                                    <span style={actionIconStyle} onClick={"bi bi-trash"}>
                                                        <i className="ti-trash"></i>
                                                    </span>




                                                </td>
                                            </tr>
                                            <tr>

                                                <td> Jason Sharlton</td>
                                                <td>
                                                Casual Leave</td>
                                                <td> 	01/19/2024 - 01/22/2024</td>
                                                <td> 4 </td>
                                                <td>	01/18/2024</td>
                                                <td> <button style={{ backgroundColor: 'orange', border: 'none', padding: '5px 10px', borderRadius: '5px', color: 'white' }}>pending ...</button></td>






                                                <td>

                                                    <span style={iconStyle} >
                                                        <i className="ti-eye"></i>
                                                    </span>
                                                    <span style={actionIconStyle} onClick={"bi bi-trash"}>
                                                        <i className="ti-trash"></i>
                                                    </span>




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

export default connect(null, { setBreadcrumbItems })(ApplyLeave);