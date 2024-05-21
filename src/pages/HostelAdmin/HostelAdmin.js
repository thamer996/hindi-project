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




const HostelAdmin = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "Hostel", link: "#" },
    ]
    const navigate = useNavigate();

    useEffect(() => {
        props.setBreadcrumbItems('Hostel', breadcrumbItems)
    })
    const handleClick = () => {
        navigate('/add-hostel-admin');
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
                    <label className="col-form-label">Hostel</label>
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
                    <button className="btn btn-primary" onClick={handleClick}>Add Hostel</button>


                </div>
                <Col lg={12}>
                    <Card>

                        <CardBody>
                            <CardTitle className="h4">Hostel List</CardTitle>


                            <div className="table-responsive">
                                <Table className="table mb-0">
                                    <thead>
                                        <tr>

                                            <th>Hostel Name</th>
                                            <th>Type</th>
                                            <th>Address</th>
                                            <th>Intake</th>
                                           


                                            <th>Action</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>

                                            
                                            <td>Boys Hostel 101</td>
                                            <td>Boys</td>
                                            <td>School Campus</td>
                                            <td>200</td>







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

                                        
                                        <td>Boys Hostel 102</td>
                                            <td>Boys</td>
                                            <td>School Campus</td>
                                            <td>200</td>







                                            <td>

                                                <span style={editIconStyle} onClick={"bi bi-trash"}>
                                                    <i className="ti-marker-alt"></i>
                                                </span>
                                                <span style={actionIconStyle} onClick={"bi bi-trash"}>
                                                    <i className="ti-trash"></i>
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

export default connect(null, { setBreadcrumbItems })(HostelAdmin);