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


const ExamGroupTeacher = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "Examinations", link: "#" },
    ]
    const navigate = useNavigate();

    useEffect(() => {
        props.setBreadcrumbItems('Exam Group', breadcrumbItems)
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
                    <div className="d-flex mb-2">
                        <div></div>
                        {/* Vos éléments de filtre ici */}



                        <label className="col-form-label">Exam Group</label>
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
                        <button className="btn btn-primary" onClick={handleClick} >Add Exam Group</button>
                    </div>
                </Row>
                <Row>
                    <Col lg={12}>
                        <Card>

                            <CardBody>
                                <CardTitle className="h4"> Exam Group List </CardTitle>


                                <div className="table-responsive">
                                    <Table className="table mb-0">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>No Of Exams</th>
                                                <th>Exam Type</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Class 1(Pass / Fail)</td>
                                                <td>23</td>
                                                <td>General Purpose (Pass/Fail)</td>
                                                <td>

                                                    <span style={editIconStyle} onClick={"bi bi-trash"}>
                                                        <i className="ti-marker-alt"></i>
                                                    </span>
                                                    <span style={actionIconStyle} onClick={"bi bi-trash"}>
                                                        <i className="ti-trash"></i>
                                                    </span>

                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Respect others/property.</td>
                                                <td>10</td>
                                                <td>	Respect others/property</td>

                                                <td>
                                                    <span style={editIconStyle} onClick={"bi bi-trash"}>
                                                        <i className="ti-marker-alt"></i>
                                                    </span>
                                                    <span style={actionIconStyle} onClick={"bi bi-trash"}>
                                                        <i className="ti-trash"></i>
                                                    </span>

                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Class 1(College Based Grading System)</td>
                                                <td>29</td>
                                                <td>College Based Grading System</td>
                                                <td>
                                                   
                                                    <span style={editIconStyle} onClick={"bi bi-trash"}>
                                                        <i className="ti-marker-alt"></i>
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

export default connect(null, { setBreadcrumbItems })(ExamGroupTeacher);