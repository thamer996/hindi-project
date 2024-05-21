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


const AssignVheicleAdmin = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "Transport", link: "#" },
    ]
    const navigate = useNavigate();

    useEffect(() => {
        props.setBreadcrumbItems('Vehicle Route List', breadcrumbItems)
    })
    const handleClick = () => {
        navigate('/add-assign-vheicle-admin');
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
                    <label className="col-form-label">Vehicle Route</label>
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
                    <button className="btn btn-primary" onClick={handleClick}>Assign Vehicle On Route</button>
                </div>
                <Col lg={12}>
                    <Card>

                        <CardBody>
                            <CardTitle className="h4">Vehicle Route List</CardTitle>


                            <div className="table-responsive">
                                <Table className="table mb-0">
                                    <thead>
                                        <tr>
                                            <th>Route</th>
                                            <th>Vehicle</th>


                                            <th>Action</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Brooklyn Central</td>
                                            <td>
                                                VH1001</td>



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
                                            <td>Brooklyn East</td>
                                            <td><div>VH4584</div>

                                                <div>VH1001</div> </td>



                                            <td>


                                                <span style={editIconStyle} onClick={"bi bi-trash"}>
                                                    <i className="ti-marker-alt"></i>
                                                </span>
                                                <span style={actionIconStyle} onClick={"bi bi-trash"}>
                                                    <i className="ti-trash"></i>
                                                </span>

                                            </td>    </tr>
                                        <tr>

                                            <td>Brooklyn West</td>
                                            <td><div>
                                                VH4584</div>

                                                <div>
                                                   
                                                    VH5645</div> </td>




                                            <td>


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

export default connect(null, { setBreadcrumbItems })(AssignVheicleAdmin);