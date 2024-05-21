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
    CardText,
    CardImg,
} from "reactstrap"

import { connect } from "react-redux";

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions";
import HeaderTeacher from "../../components/HorizontalLayoutTeacher/HeaderTeacher";
import NvbarTeacher from "../../components/HorizontalLayoutTeacher/NvbarTeacher";



const UploadShareContentAdmin = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "Download Center", link: "#" },
    ]
    const navigate = useNavigate();

    useEffect(() => {
        props.setBreadcrumbItems('Upload /Share Content', breadcrumbItems)
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
                        <label className="col-form-label">Content List</label>
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

                    <button className="btn btn-primary" >Upload</button>
                </div>
                    <Col lg={8}>
                        <Card>

                        <CardBody>
                            <CardTitle className="h4">Content List </CardTitle>


                            <div className="table-responsive">
                                <Table className="table mb-0">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Document</th>
                                            <th>Content Type</th>
                                            <th>Size</th>
                                            <th>Upload By</th>
                                            <th>Created On</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td> <div className="form-check mb-3">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value=""
                                                    id="defaultCheck1"
                                                />

                                            </div></td>
                                            <td>
                                                Class 4 Maths Multiples and Factors (Complete Chapter)</td>
                                            <td>Study Material</td>
                                            <td>N/A</td>
                                            <td>Joe Black (9000)</td>
                                            <td>03/04/2024 06:05:40</td>

                                        </tr>
                                        <tr>
                                            <td> <div className="form-check mb-3">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value=""
                                                    id="defaultCheck1"
                                                />

                                            </div></td>
                                            <td>
                                                Fees Structure</td>
                                            <td>Other Downloads</td>
                                            <td>171.42 KB</td>
                                            <td>Joe Black (9000)</td>
                                            <td>03/04/2024 05:57:39</td>
                                        </tr>
                                        <tr>
                                            <td> <div className="form-check mb-3">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value=""
                                                    id="defaultCheck1"
                                                />

                                            </div></td>
                                            <td>

                                                FEES STRUCTURE</td>
                                            <td>Other Downloads</td>
                                            <td>171.42 KB</td>
                                            <td>Joe Black (9000)</td>
                                            <td>02/03/2024 05:25:26</td>

                                        </tr>

                                    </tbody>
                                </Table>

                            </div>
                        </CardBody>
                        </Card>
                    </Col>
                    <Col lg={4}>
                    <Card>
                        <CardImg top className="img-fluid" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnZcytDZWOESuOKe1R9VE90nk3AkSG8qCY2Zto-FSMClBDeG-Nv5Hnuul2pSqzS9O3Nks&usqp=CAU" alt="Lexa" />
                        <CardBody>
                            
                            <CardText>
                            Total Documents: 55 <br/>
                            Size 5.59 : MB
                            </CardText>
                           
                        </CardBody>
                    </Card>
                </Col>
                </Row>
           
        </React.Fragment>
    )
}

export default connect(null, { setBreadcrumbItems })(UploadShareContentAdmin);