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


const AdmissionEnquiryAdmin = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "Front Office", link: "#" },
    ]
    const navigate = useNavigate();

    useEffect(() => {
        props.setBreadcrumbItems('Admission Enquiry', breadcrumbItems)
    })
    const handleClick = () => {
        navigate('/add-admission-enquiry-admin');
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
                <div className="col-md-6">
                    <Row>
                        <div className="col-md-6">
                            <label className="col-form-label">Class</label>
                            <select className="form-control">
                                <option>select</option>
                                <option> Class 1</option>
                                <option> Class 2</option>
                                <option> Class 3 </option>
                                <option> Class 4 </option>
                                <option> Class 5</option>


                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="col-form-label">Source</label>
                            <select className="form-control">
                                <option>Select</option>
                                <option> advertisement </option>
                    <option> Online Front site </option>
                    <option> Google Ads</option>
                    <option> Admission Compaign</option>
                    <option> Front Office</option>

                            </select>
                        </div>

                    </Row>
                    <Row>
                        <div className="col-md-6">
                            <label className="col-form-label">Enquiry To Date</label>
                            <input type="date" className="form-control" placeholder="" />

                        </div>
                        <div className="col-md-6">
                            <label className="col-form-label">Status</label>
                            <select className="form-control">
                                <option>Select</option>
                                <option>All</option>
                                <option>Active</option>
                                <option>Passive</option>
                                <option>Dead</option>
                                <option>Won</option>
                                <option>Lost</option>

                            </select>
                        </div>



                    </Row>
                </div>
                <div className="col-md-6">
                    <Row>
                        <div className="col-md-6">
                            <label className="col-form-label">Enquiry From Date</label>
                            <input type="date" className="form-control" placeholder="" />

                        </div>




                        <div className="col-md-12 mt-4">
                            <button className="btn btn-primary" onClick={handleClick}>Search</button>
                        </div>
                    </Row>
                </div>
            </Row>
            <div className="d-flex justify-content-between  mb-2">
                <div></div>
                {/* Button */}
                <button className="btn btn-primary" onClick={handleClick}>Add</button>
            </div>
            <Row className="mt-3">
                <Col lg={12}>
                    <Card>

                        <CardBody>
                            <CardTitle className="h4">Admission enquiry </CardTitle>


                            <div className="table-responsive">
                                <Table className="table mb-0">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Phone</th>
                                            <th>Source</th>
                                            <th>Enquiry Date</th>
                                            <th>Last Follow Up Date</th>
                                            <th>Next Follow Up Date</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Berlin</td>
                                            <td>980789876</td>
                                            <td>Admission Campaign</td>
                                            <td>03/26/2024</td>
                                            <td></td>
                                            <td>03/31/2024</td>
                                            <td>Active</td>
                                            <td>
                                                <span style={iconStyle} onClick={handleClickProfile}>
                                                    <i className="ti-mobile"></i>
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
                                            <td>Sinu Raina</td>
                                            <td>8987956567</td>
                                            <td>Online Front Site</td>
                                            <td>03/12/2024</td>
                                            <td></td>
                                            <td>03/16/2024</td>
                                            <td>Active</td>
                                            <td>
                                                <span style={iconStyle} onClick={handleClickProfile}>
                                                    <i className="ti-mobile"></i>
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
                                            <td>Philip</td>
                                            <td>5161601551</td>
                                            <td>Online Front Site</td>
                                            <td>03/26/2024</td>
                                            <td></td>
                                            <td>03/30/2024</td>
                                            <td>Active</td>
                                            <td>
                                                <span style={iconStyle} onClick={handleClickProfile}>
                                                    <i className="ti-mobile"></i>
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
                                            <td>Darwin</td>
                                            <td>654984160</td>
                                            <td>Advertisement</td>
                                            <td>03/20/2024</td>
                                            <td></td>
                                            <td>03/25/2024</td>
                                            <td>Active</td>
                                            <td>
                                                <span style={iconStyle} onClick={handleClickProfile}>
                                                    <i className="ti-mobile"></i>
                                                </span>
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

export default connect(null, { setBreadcrumbItems })(AdmissionEnquiryAdmin);
