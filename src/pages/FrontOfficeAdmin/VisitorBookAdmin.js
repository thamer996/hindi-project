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


const VisitorBookAdmin = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "front office", link: "#" },
    ]
    const navigate = useNavigate();

    useEffect(() => {
        props.setBreadcrumbItems('Visitor List', breadcrumbItems)
    })
    const handleClick = () => {
        navigate('/add-visitor-book-admin');
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
                    <label className="col-form-label">Visitor</label>
                    <div className="col-md-2">
                        <input type="text" className="form-control" placeholder="Enter Visitor Name" />
                    </div>


                    <div>
                        <button className="btn btn-primary" >Search</button>
                    </div>
                </div>
                <div className="d-flex justify-content-between  mb-2">
                    <div></div>
                    {/* Button */}
                    <button className="btn btn-primary" onClick={handleClick}>Add Visitor</button>
                </div>
                <Col lg={12}>
                    <Card>

                        <CardBody>
                            <CardTitle className="h4">Visitor List </CardTitle>


                            <div className="table-responsive">
                                <Table className="table mb-0">
                                    <thead>
                                        <tr>
                                            <th>Purpose</th>
                                            <th>Meeting With</th>
                                            <th>Visitor Name</th>
                                            <th>Phone</th>
                                            <th>ID Card </th>
                                            <th>Number Of Person</th>
                                            <th>Date</th>
                                            <th>In Time</th>
                                            <th>Out Time</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Student Meeting</td>
                                            <td>Staff (James Deckar - 9004)</td>
                                            <td>Winston</td>
                                            <td>4598401512</td>
                                            <td>5488</td>
                                            <td>5</td>
                                            <td>03/25/2024</td>
                                            <td>09:15 AM</td>
                                            <td>10:15 AM</td>
                                            <td>
                                                <span style={iconStyle} >
                                                    <i className="ti-eye"></i>
                                                </span>
                                                <span style={editIconStyle} onClick={"bi bi-trash"}>
                                                    <i className="ti-marker-alt"></i>
                                                </span>
                                                <span style={actionIconStyle} onClick={"bi bi-trash"}>
                                                    <i className="ti-trash"></i>
                                                </span>

                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Student Meeting</td>
                                            <td>Staff (William Abbot - 9003)</td>
                                            <td>Adam</td>
                                            <td>2165015123</td>
                                            <td>10222</td>
                                            <td>5</td>
                                            <td>02/29/2024</td>
                                            <td>09:15 AM</td>
                                            <td>10:15 AM</td>
                                            <td>
                                                <span style={iconStyle} >
                                                    <i className="ti-eye"></i>
                                                </span>
                                                <span style={editIconStyle} onClick={"bi bi-trash"}>
                                                    <i className="ti-marker-alt"></i>
                                                </span>
                                                <span style={actionIconStyle} onClick={"bi bi-trash"}>
                                                    <i className="ti-trash"></i>
                                                </span>

                                            </td>    </tr>
                                            <tr>
                                            <td>Student Meeting</td>
                                            <td>Student (Edward Thomas - 18001)</td>
                                            <td>Lewis</td>
                                            <td>51561511021</td>
                                            <td>5152</td>
                                            <td>2</td>
                                            <td>02/01/2024</td>
                                            <td>12:15 PM</td>
                                            <td>01:15 PM</td>
                                            <td>
                                                <span style={iconStyle} >
                                                    <i className="ti-eye"></i>
                                                </span>
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

export default connect(null, { setBreadcrumbItems })(VisitorBookAdmin);