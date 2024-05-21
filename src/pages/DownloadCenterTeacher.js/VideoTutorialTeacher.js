import React, { useEffect, useState } from "react"
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
import "../../pages/downloadcenter/VideoTutorial.css"



const UploadShareContentTeacher = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "Download Center", link: "#" },
    ]
    const navigate = useNavigate();

    useEffect(() => {
        props.setBreadcrumbItems('Video Tutorial', breadcrumbItems)
    })
    const handleClick = () => {
        navigate('/add-video-tutorial-teacher');
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
    const [isHovered, setIsHovered] = useState(false);


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
                    <label className="col-form-label">Search By Title</label>
                    <div className="col-md-2">
                        <input type="text" className="form-control" placeholder="Search By Title" />
                    </div>



                    <div>
                        <button className="btn btn-primary">Search</button>
                    </div>
                </div>
                <div className="d-flex justify-content-between  mb-2">
                    <div></div>
                    {/* Button */}
                    <button className="btn btn-primary" onClick={handleClick}>Add Video Tutorial</button>

                </div>
                <Col lg={3}>
                <Card className="position-relative" 
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)} >
                    <CardImg top className="img-fluid" style={{height: '200px', overflow: 'hidden'}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ81FteKzjfyLvKbGx5u48rClY7mtLNwfcelSHF2OoWpA&s" alt="image 1" />
                    {isHovered && (
                            <div className="overlay">
                                <i className="ti-eye icon"></i>
                                <i className="ti-marker-alt icon"></i>
                                <i className="ti-trash icon"></i>
                                
                            </div>
                        )}
                    <CardBody>
                        <CardTitle className="h4">Time and Calendar</CardTitle>
                       
                    </CardBody>
                </Card>
            </Col>
            <Col lg={3}>
            <Card className="position-relative" 
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}>
                    <CardImg top className="img-fluid" style={{height: '200px', overflow: 'hidden'}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9qcfMzgUSi4WVHQGEPiUq05QsU66l_lamjHBcIAjDxQ&s" alt="image 2" />
                    {isHovered && (
                            <div className="overlay">
                                <i className="ti-eye icon"></i>
                                <i className="ti-marker-alt icon"></i>
                                <i className="ti-trash icon"></i>
                                
                            </div>
                        )}
                    <CardBody>
                        <CardTitle className="h4">Mathematics</CardTitle>
                       
                    </CardBody>
                </Card>
            </Col>
            <Col lg={3}>
            <Card className="position-relative" 
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}>
                    <CardImg top className="img-fluid" style={{height: '200px', overflow: 'hidden'}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsgz-GR3DKd72YBoRVRNsxmen98zu5b-OGQFxcmjl99A&s" alt="image 3" />
                    {isHovered && (
                            <div className="overlay">
                                <i className="ti-eye icon"></i>
                                <i className="ti-marker-alt icon"></i>
                                <i className="ti-trash icon"></i>
                                
                            </div>
                        )}
                    <CardBody>
                        <CardTitle className="h4">Parts of the Body</CardTitle>
                       
                    </CardBody>
                </Card>
            </Col>
            <Col lg={3}>
            <Card className="position-relative" 
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}>
                    <CardImg top className="img-fluid" style={{height: '200px', overflow: 'hidden'}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwXZ-WIePJXwiml1SHGgVuSIkKi7SFSuOAjbseuaBPfQ&s" alt="image4" />
                    {isHovered && (
                            <div className="overlay">
                                <i className="ti-eye icon"></i>
                                <i className="ti-marker-alt icon"></i>
                                <i className="ti-trash icon"></i>
                                
                            </div>
                        )}
                    <CardBody>
                        <CardTitle className="h4">Photosynthesis</CardTitle>
                       
                    </CardBody>
                </Card>
            </Col>
            </Row>
                  
               
           
        </React.Fragment>
    )
}

export default connect(null, { setBreadcrumbItems })(UploadShareContentTeacher);