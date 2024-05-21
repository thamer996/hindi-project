import React, { useEffect, useState } from "react"
import { Link, useNavigate } from 'react-router-dom';


import {
    Table,
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    CardImg,
} from "reactstrap"

import { connect } from "react-redux";

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../../store/actions";



const LogoAdmin = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "settings", link: "#" },
    ]
    const navigate = useNavigate();

    useEffect(() => {
        props.setBreadcrumbItems('General Settings', breadcrumbItems)
    })
    const handleClick = () => {
        navigate('/add-video-tutorial');
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



                    <div className="col-md-2">

                    </div>



                    <div>

                    </div>
                </div>
                <div className="d-flex justify-content-between  mb-2">
                    <div></div>
                    {/* Button */}


                </div>
                <Col lg={3}>
                    <Card className="position-relative"
                    >
                        <CardImg top className="img-fluid" style={{ height: '200px', overflow: 'hidden' }} src="https://static.toiimg.com/thumb/msid-103307436,width-1280,height-720,resizemode-4/103307436.jpg" alt="image 1" />

                        <CardBody>
                        <CardTitle className="h4">Admin Penal</CardTitle>

                            <Link
                                to="#"
                                className="btn btn-primary waves-effect waves-light"
                            >
                                Update
                            </Link>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg={3}>
                    <Card className="position-relative"
                    >
                        <CardImg top className="img-fluid" style={{ height: '200px', overflow: 'hidden' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAVFDEW7TjqHpKieFSMsnEhysn2Ec3A973TCJ_5Sywag&s" alt="image 2" />

                        <CardBody>
                        <CardTitle className="h4">User Penal</CardTitle>
                            <Link
                                to="#"
                                className="btn btn-primary waves-effect waves-light"
                            >
                                Update
                            </Link>


                        </CardBody>
                    </Card>
                </Col>

              
            </Row>

        </React.Fragment>
    )
}

export default connect(null, { setBreadcrumbItems })(LogoAdmin);