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


const UersSettingAdmin = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "settings", link: "#" },
    ]
    const navigate = useNavigate();

    useEffect(() => {
        props.setBreadcrumbItems('Users', breadcrumbItems)
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
                    <label className="col-form-label">Users</label>
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

                </div>
                <Col lg={12}>
                    <Card>

                        <CardBody>
                            <CardTitle className="h4">Users List </CardTitle>


                            <div className="table-responsive">
                                <Table className="table mb-0">
                                    <thead>
                                        <tr>
                                            <th>Admission No</th>
                                            <th>Student Name</th>
                                            <th>User Name</th>
                                            <th>Class</th>
                                            <th>Father Name</th>
                                            <th>Mobile Number</th>
                                            <th>Action</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>18001</td>
                                            <td>Edward Thomas</td>
                                            <td>std1</td>
                                            <td>Class 3(A)</td>
                                            <td>Olivier Thomas</td>
                                            <td>8233366611</td>
                                            <td> <div
                                                className="form-check form-switch form-switch-lg mb-3"
                                            >
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    id="customSwitchsizelg"
                                                    defaultChecked
                                                />
                                                
                                            </div></td>


                                        </tr>
                                        <tr>
                                            <td>18002</td>
                                            <td>Robin Peterson</td>
                                            <td>std2</td>
                                            <td>Class 3(A)</td>
                                            <td>Lucas Peterson</td>
                                            <td>69898565464</td>
                                            <td> <div
                                                className="form-check form-switch form-switch-lg mb-3"
                                            >
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    id="customSwitchsizelg"
                                                    defaultChecked
                                                />
                                                
                                            </div></td>


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

export default connect(null, { setBreadcrumbItems })(UersSettingAdmin);