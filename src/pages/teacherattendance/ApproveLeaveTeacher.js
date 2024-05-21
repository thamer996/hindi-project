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
import TeacherLayout from "../../components/HorizontalLayoutTeacher/TeacherLayout";


const ApproveLeaveTeacher = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "Attendance", link: "#" },
    ]
    const navigate = useNavigate();

    useEffect(() => {
        props.setBreadcrumbItems('Approve Leave', breadcrumbItems)
    })
    const handleClick = () => {
        navigate('/add-approve-leave-teacher');
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
                <div className="d-flex mb-2">
                    <div></div>
                    {/* Vos éléments de filtre ici */}
                    <label className="col-form-label">Class</label>
                    <div className="col-md-2">
                        <select className="form-control">
                            <option> Select </option>
                            <option> Grade 1 </option>
                            <option> Grade 2 </option>
                            <option> Grade 3 </option>
                            <option> Grade 4 </option>
                            <option> Grade 5 </option>
                            <option> Grade 6 </option>
                        </select>
                    </div>
                    <label className="col-form-label">Section</label>
                    <div className="col-md-2">
                        <select className="form-control">
                            <option> Select </option>
                            <option> A </option>
                            <option> B </option>
                            <option> C </option>
                            <option> D </option>

                        </select>
                    </div>



                    <div>
                        <button className="btn btn-primary" >Search</button>
                    </div>
                </div>
                <div className="d-flex justify-content-between  mb-2">
                    <div></div>
                    {/* Button */}
                    <button className="btn btn-primary" onClick={handleClick} >Add Leave</button>
                </div>
            </Row>
            <Row>
                <Col lg={12}>
                    <Card>
                        <CardBody>
                            <CardTitle className="h4">Approve Leave List </CardTitle>






                            <div className="table-responsive">
                                <Table className="table mb-0">
                                    <thead>
                                        <tr>
                                            <th>Student Name</th>
                                            <th>Class</th>

                                            <th>
                                                Section</th>
                                            <th>Apply Date</th>
                                            <th>From Date</th>
                                            <th>To Date</th>
                                            <th>Status</th>

                                            <th>Approve Disapprove By</th>
                                            <th>Action</th>


                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>

                                            <td>Edward Thomas (18001)</td>
                                            <td>
                                                Class 3</td>
                                            <td>A</td>
                                            <td> 03/04/2024</td>
                                            <td> 03/20/2024</td>
                                            <td> 03/24/2024</td>
                                            <td> Pending</td>
                                            <td> </td>
                                           
                                            
                                            <td>  <span style={editIconStyle} onClick={"bi bi-trash"}>
                                                <i className="ti-marker-alt"></i>
                                            </span>
                                                <span style={actionIconStyle} onClick={"bi bi-trash"}>
                                                    <i className="ti-trash"></i>
                                                </span></td>





                                        </tr>
                                        <tr>

                                            <td>Benjamin Gates (18013)</td>
                                            <td>
                                                Class 3</td>
                                            <td>A</td>
                                            <td>03/02/2024</td>
                                            <td>03/26/2024</td>
                                            <td> 	03/30/2024</td>
                                            <td> Pending</td>
                                            <td></td>
                                           
                                            
                                            <td>  <span style={editIconStyle} onClick={"bi bi-trash"}>
                                                <i className="ti-marker-alt"></i>
                                            </span>
                                                <span style={actionIconStyle} onClick={"bi bi-trash"}>
                                                    <i className="ti-trash"></i>
                                                </span></td>





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

export default connect(null, { setBreadcrumbItems })(ApproveLeaveTeacher);