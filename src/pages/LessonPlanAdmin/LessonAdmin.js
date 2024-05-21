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



const LessonAdmin = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "Lesson Plan", link: "#" },
    ]
    const navigate = useNavigate();

    useEffect(() => {
        props.setBreadcrumbItems('Lesson', breadcrumbItems)
    })
    const handleClick = () => {
        navigate('/add-lesson-admin');
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
                        <label className="col-form-label">Lesson</label>
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
                    <button className="btn btn-primary" onClick={handleClick}>Add Lesson</button>
                </div>
                    <Col lg={12}>
                        <Card>

                        <CardBody>
                            <CardTitle className="h4">Lesson List </CardTitle>


                            <div className="table-responsive">
                                <Table className="table mb-0">
                                    <thead>
                                        <tr>
                                            <th>Class</th>
                                            <th>Section</th>
                                            <th>Subject Group</th>
                                            <th>Subject</th>
                                            <th>Lesson</th>
                                            <th>Action</th>
                                           
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Class 1</td>
                                            <td>A</td>
                                            <td>Class 1st Subject Group</td>
                                            <td>English(210)</td>
                                           
                                            <td>
                                                <div>Identify the learning objectives</div>
                                                <div>Little Turtle</div>
                                                <div>Three Little Pigs</div>
                                                <div>A Happy Child</div>
                                                <div>Lesson - 1</div>
                                                <div>The Bubble, the Straw, and the</div>
                                                <div>Shoe.</div>
                                                <div>Clap clap</div>
                                            </td>
                                            
                                            
                                           
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
                                        <td>Class 1</td>
                                            <td>A</td>
                                            <td>Class 1st Subject Group</td>
                                            <td>Science (111)</td>
                                           
                                            <td>
                                                <div>Measurement</div>
                                                <div>Food Where Does It Come From</div>
                                                <div>Components of Food</div>
                                                <div>Sorting Materials Into Groups</div>
                                                
                                            </td>
                                            
                                            
                                           
                                            <td>
                                               
                                                <span style={editIconStyle} onClick={"bi bi-trash"}>
                                                    <i className="ti-marker-alt"></i>
                                                </span>
                                                <span style={actionIconStyle} onClick={"bi bi-trash"}>
                                                    <i className="ti-trash"></i>
                                                </span>

                                            </td>    </tr>
                                       
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

export default connect(null, { setBreadcrumbItems })(LessonAdmin);