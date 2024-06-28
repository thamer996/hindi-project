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
import { setBreadcrumbItems } from "../../../store/actions";


const UserLogReport = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "Multi Branch", link: "#" },
    ]
    const navigate = useNavigate();

    useEffect(() => {
        props.setBreadcrumbItems('User Log Report', breadcrumbItems)
    })
    const handleClick = () => {
        navigate('/setup-add-complaint-type');
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
                    <label className="col-form-label">Search Type</label>
                    <div className="col-md-2">
                        <select className="form-control">
                            <option> Select </option>
                            <option>Today</option>
                            <option>This Week</option>
                            <option>Last Week</option>
                            <option>This Month</option>


                        </select> 
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
                            <CardTitle className="h4">User Log Report</CardTitle>


                            <div className="table-responsive">
                                <Table className="table mb-0">
                                    <thead>
                                        <tr>
                                            <th>Branch</th>
                                            <th>Users</th>
                                            <th>Role</th>
                                            <th>Class</th>
                                            <th>Ip Adress</th>
                                           
                                            <th>Login Date Time</th>
                                            <th>User Agent</th>
                                           
                                           


                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Home Branch</td>
                                            <td>superadmin@gmail.com</td>
                                            <td>Super Admin
                                            </td>
                                            <td></td>
                                            <td>152.58.40.211</td>
                                            <td>03/02/2024 14:21:07</td>
                                            <td>Chrome 122.0.0.0, Windows 10</td>
                                          


                                            
                                        </tr>
                                        <tr>
                                        <td>Home Branch</td>
                                            <td>superadmin@gmail.com</td>
                                            <td>Super Admin
                                            </td>
                                            <td></td>
                                            <td>152.58.40.211</td>
                                            <td>03/02/2024 14:24:52</td>
                                            <td>Chrome 122.0.0.0, Windows 10</td>   </tr>
                                        <tr>

                                        <td>Home Branch</td>
                                            <td>superadmin@gmail.com</td>
                                            <td>Super Admin
                                            </td>
                                            <td></td>
                                            <td>152.58.40.211</td>
                                            <td>03/02/2024 14:25:27</td>
                                            <td>Chrome 122.0.0.0, Windows 10</td>   </tr>

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

export default connect(null, { setBreadcrumbItems })(UserLogReport);