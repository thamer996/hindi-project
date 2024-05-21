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



const EmailSmsLogLibrarian = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "Communicate", link: "#" },
    ]
    const navigate = useNavigate();

    useEffect(() => {
        props.setBreadcrumbItems('Email/SMS Log', breadcrumbItems)
    })
    const handleClick = () => {
        navigate('/add-marks-grade-teacher');
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

                        <label className="col-form-label">Email / SMS Log </label>
                        <div className="col-md-4">
                            <input type="text" className="form-control" placeholder=""></input>
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
                                <CardTitle className="h4">Email / SMS Log</CardTitle>


                                <div className="table-responsive">
                                    <Table className="table mb-0">
                                        <thead>
                                            <tr>
                                                <th>Title</th>
                                                <th>Description</th>
                                                <th>
                                                    Date</th>
                                                <th>Email</th>
                                                <th>SMS</th>
                                                <th>Group</th>
                                                <th>Individual</th>
                                                <th>Class</th>


                                                <th>Action</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>

                                                <td>Sports Day Events</td>
                                                <td>
                                                    Games that are played on school sports days can be wide and varied. They can include straightforward sprints and longer races for all age groups as well as egg and spoon races. </td>
                                                <td> 04/02/2024 04:55 pm</td>
                                                <td> <div className="form-check mb-3">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value=""
                                                        id="defaultCheck1"
                                                        checked
                                                    />

                                                </div></td>
                                                <td></td>
                                                <td></td>
                                                <td><div className="form-check mb-3">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value=""
                                                        id="defaultCheck1"
                                                        checked
                                                    />

                                                </div></td>
                                                <td></td>


                                            </tr>
                                            <tr>

                                                <td>Holi Celebration Notice</td>
                                                <td>
                                                The colors and special Holi food items will be organized by the school itself. No student is allowed to bring his/her own eatables and any kind of Holi color. Students are only allowed to enter by showing their ID-Cards. </td>
                                                <td> 04/02/2024 04:55 pm</td>
                                                <td> <div className="form-check mb-3">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value=""
                                                        id="defaultCheck1"
                                                        checked
                                                    />

                                                </div></td>
                                                <td></td>
                                                <td><div className="form-check mb-3">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value=""
                                                        id="defaultCheck1"
                                                        checked
                                                    />

                                                </div></td>
                                                <td></td>
                                                <td></td>


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

export default connect(null, { setBreadcrumbItems })(EmailSmsLogLibrarian);