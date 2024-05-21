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



const ContentShareListTeacher = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "Download Center", link: "#" },
    ]
    const navigate = useNavigate();

    useEffect(() => {
        props.setBreadcrumbItems('Content Share List', breadcrumbItems)
    })
    const handleClick = () => {
        navigate('/add-lesson-teacher');
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
                        <label className="col-form-label">Content Share List</label>
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
                   
                   
                </div>
                    <Col lg={12}>
                        <Card>

                        <CardBody>
                            <CardTitle className="h4">Content Share List </CardTitle>


                            <div className="table-responsive">
                                <Table className="table mb-0">
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Send To</th>
                                            <th>Share Date</th>
                                            <th>Valid Upto</th>
                                            <th>Shared By</th>
                                            <th>Description</th>
                                            
                                         
                                           
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Study Material</td>
                                            <td>Group</td>
                                            <td>02/11/2023</td>
                                            <td>02/23/2023</td>
                                            <td>Jason Sharlton (900002301)</td>
                                            <td>tudy materials can also be called learning materials that teachers use in the classroom to elaborate on the particular topic to accomplish learning objectives.</td>
                                           
                                           
                                            
                                            
                                           
                                            <td>
                                            <span style={iconStyle} >
                                                    <i className="ti-eye"></i>
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

export default connect(null, { setBreadcrumbItems })(ContentShareListTeacher);