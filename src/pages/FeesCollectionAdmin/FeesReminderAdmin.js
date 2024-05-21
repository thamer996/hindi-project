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


const FeesReminderAdmin = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "fees collection", link: "#" },
    ]
    const navigate = useNavigate();

    useEffect(() => {
        props.setBreadcrumbItems('Fees Reminder', breadcrumbItems)
    })
    const handleClick = () => {
        navigate('/add-visitor-book');
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
                <Col lg={12}>
                    <Card>

                        <CardBody>
                            <CardTitle className="h4">Fees Reminder
                            </CardTitle>


                            <div className="table-responsive">
                                <Table className="table mb-0">
                                    <thead>
                                        <tr>
                                            <th>
                                                Action</th>
                                            <th>Reminder Type</th>
                                            <th>Days</th>


                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td> <label>
                                                <input type="checkbox" />
                                                &nbsp; Active
                                            </label></td>
                                            <td>Before</td>
                                           

                                            <td>
                                                <span style={iconStyle} >
                                                    <input type="text" placeholder="2" style={{ fontSize: "18px" }} />
                                                </span>

                                            </td>

                                        </tr>
                                       

                                        <tr>
                                            
                                        <td>
                                        <label>
                                                <input type="checkbox" />
                                                &nbsp; Active
                                            </label></td>
                                            <td>After</td>
                                           

                                            <td>
                                                <span style={iconStyle} >
                                                    <input type="text" placeholder="2" style={{ fontSize: "18px" }} />
                                                </span>

                                            </td>

                                        </tr>
                                       
                                        <tr>
                                        <td> <label>
                                                <input type="checkbox" />
                                                &nbsp; Active
                                            </label></td>
                                            <td>Before</td>
                                           

                                            <td>
                                                <span style={iconStyle} >
                                                    <input type="text" placeholder="5" style={{ fontSize: "18px" }} />
                                                </span>

                                            </td>
                                           
                                        </tr>

                                    </tbody>
                                    <button className="btn btn-primary">Save</button>
                                </Table>

                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

        </React.Fragment>
    )
}

export default connect(null, { setBreadcrumbItems })(FeesReminderAdmin);