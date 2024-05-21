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
                        <CardImg top className="img-fluid" style={{ height: '200px', overflow: 'hidden' }} src="https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/58/1c/45/581c45aa-f7a0-30e9-ae18-4c98a65d6564/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/1200x630wa.png" alt="image 1" />

                        <CardBody>
                        <CardTitle className="h4">Print Logo</CardTitle>

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
                        <CardImg top className="img-fluid" style={{ height: '200px', overflow: 'hidden' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgS_O7iCUxGqukO-0MCYuSkP3daTJEJJ4u5EsRDsBLF9oLUP7A8Fzo2-O5r2-IwveVTS8&usqp=CAU" alt="image 2" />

                        <CardBody>
                        <CardTitle className="h4">Admin Logo</CardTitle>
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
                        <CardImg top className="img-fluid" style={{ height: '200px', overflow: 'hidden' }} src="https://www.dic-college.be/wp-content/uploads/logo-smartschool.png" alt="image4" />

                        <CardBody>
                        <CardTitle className="h4">Admin Small Logo</CardTitle>
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
                        <CardImg top className="img-fluid" style={{ height: '200px', overflow: 'hidden' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbHMuyc4bwDKnEciSOULoZu9QvjMfIqPNEAL8a4Y56wuE89mQGsi4zh6ewIpqWQcta9A0&usqp=CAU" alt="image4" />

                        <CardBody>
                        <CardTitle className="h4">App Logo</CardTitle>
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