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


const SideBarMenuSetting = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "settings", link: "#" },
    ]
    const navigate = useNavigate();

    useEffect(() => {
        props.setBreadcrumbItems('SideBar Menu', breadcrumbItems)
    })
    const handleClick = () => {
        navigate('/add-role');
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
                   


                    <div>
                        
                    </div>
                </div>
                <div className="d-flex justify-content-between  mb-2">
                    <div></div>
                    {/* Button */}
                  
                </div>
                <Col lg={6}>
                    <Card>

                        <CardBody>
                            <CardTitle className="h4">Menu List </CardTitle>


                            <div className="table-responsive">
                                <Table className="table mb-0">
                                    <thead>
                                        <tr>
                                            <th>Menu Factor Authentication</th>
                                            
                                           
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                           
                                        </tr>
                                      
                                    </tbody>
                                </Table>

                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg={6}>
                    <Card>

                        <CardBody>
                            <CardTitle className="h4">Selected Sidebar Menus </CardTitle>


                            <div className="table-responsive">
                                <Table className="table mb-0">
                                    <thead>
                                        <tr>
                                            <th>Classes</th>
                                            <th>HR</th>
                                            <th>Services</th>
                                            <th>Administration</th>
                                            <th>Front Office</th>
                                            <th>Fees</th>
                                            <th>Inventory</th>
                                            <th>Download center</th>
                                            <th>Lesson Plan</th>
                                            <th>Communicate</th>
                                            
                                           
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                           
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

export default connect(null, { setBreadcrumbItems })(SideBarMenuSetting);