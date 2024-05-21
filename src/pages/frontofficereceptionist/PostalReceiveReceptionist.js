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


const PostalRecieveReceptionist = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "front office", link: "#" },
    ]
    const navigate = useNavigate();

    useEffect(() => {
        props.setBreadcrumbItems('Postal Receive List', breadcrumbItems)
    })
    const handleClick = () => {
        navigate('/add-Postal-receive-receptionist');
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
                    <label className="col-form-label">Postal Receive</label>
                    <div className="col-md-2">
                        <input type="text" className="form-control" placeholder="Enter From Title" />
                    </div>


                    <div>
                        <button className="btn btn-primary" >Search</button>
                    </div>
                </div>
                <div className="d-flex justify-content-between  mb-2">
                    <div></div>
                    {/* Button */}
                    <button className="btn btn-primary" onClick={handleClick}>Add Postal Receive</button>
                </div>
                <Col lg={12}>
                    <Card>

                        <CardBody>
                            <CardTitle className="h4">Postal Receive List </CardTitle>


                            <div className="table-responsive">
                                <Table className="table mb-0">
                                    <thead>
                                        <tr>
                                            <th>From Title</th>
                                            <th>Reference No</th>
                                            <th>To Title</th>
                                            <th>Date</th>
                                            
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Blind Literature Program</td>
                                            <td>9878</td>
                                            <td>Government School, Delhi</td>
                                            <td>03/25/2024</td>
                                           
                                            
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
                                        <td>Auditor General Rule-Book</td>
                                            <td>8483</td>
                                            <td>Smart School</td>
                                            <td>03/20/2024</td>
                                            
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
                                         
                                        <td>Health Checkup</td>
                                            <td>5152</td>
                                            <td>government school</td>
                                            <td>03/15/2024	</td>
                                           
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

export default connect(null, { setBreadcrumbItems })(PostalRecieveReceptionist);