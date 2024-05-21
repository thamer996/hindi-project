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


const AddStaffMemberAdmin = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "Students", link: "#" },
    ]
    const navigate = useNavigate();

    useEffect(() => {
        props.setBreadcrumbItems('All Students', breadcrumbItems)
    })
    const handleClick = () => {
        navigate('/add-students');
    };
    const handleClickProfile = () => {
        navigate('/student-profile');
    };
    const iconStyle = {
        cursor: 'pointer',
        display: 'inline-block',
        marginRight: '10px',
        fontSize: '24px',
        color: 'black' // Change color as needed
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
                    <label className="col-form-label">Staff Member List</label>
                    <div className="col-md-2">
                        <input type="text" className="form-control" placeholder="Enter Staff Name" />
                    </div>


                    <div>
                        <button className="btn btn-primary" onClick={handleClick}>Search</button>
                    </div>
                </div>
                <div className="d-flex justify-content-between  mb-2">
                    <div></div>
                    {/* Button */}

                </div>
                <Col lg={12}>
                    <Card>

                        <CardBody>
                            <CardTitle className="h4">Staff Member List
                            </CardTitle>


                            <div className="table-responsive">
                                <Table className="table mb-0">
                                    <thead>
                                        <tr>
                                            <th>Member ID</th>
                                            <th>Library Card No.</th>
                                            <th>Roll No.</th>
                                            <th>Staff Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>31</td>
                                            <td>453</td>
                                            <td>Joe Black (9000)</td>
                                            <td>superadmin@gmail.com</td>
                                            <td>01/01/1988</td>
                                            <td>6545645645</td>
                                            <td>
                                                <span style={iconStyle} onClick={handleClickProfile}>
                                                    <i className="ti-back-left"></i>
                                                </span>


                                            </td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>00156</td>
                                            <td>Shivam Verma (9002)</td>
                                            <td>manisha@gmail.com</td>
                                            <td>06/18/1982</td>
                                            <td>9552654564</td>

                                            <td>
                                                <span style={iconStyle} onClick={handleClickProfile}>
                                                    <i className="ti-back-left"></i>
                                                </span>

                                            </td>    </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>00146</td>
                                            <td>Brandon Heart (9006)</td>
                                            <td>brandon@gmail.com</td>
                                            <td>03/04/1988</td>
                                            <td>34564654</td>
                                            <td>
                                                <span style={iconStyle} onClick={handleClickProfile}>
                                                    <i className="ti-back-left"></i>
                                                </span>

                                            </td>    </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td>William Abbot (9003)</td>
                                            <td>william@gmail.com</td>
                                            <td>06/03/1962 </td>
                                            <td>56465465</td>
                                            <td>
                                                <span style={iconStyle} onClick={handleClickProfile}>
                                                    <i className="ti-plus"></i>
                                                </span>

                                            </td>    </tr>
                                        <tr>
                                            <td>30</td>
                                            <td>789</td>
                                            <td>Jason Sharlton (900002301)</td>
                                            <td>jason@gmail.com</td>
                                            <td>06/16/1980</td>
                                            <td>46546654564</td>
                                            <td>
                                                <span style={iconStyle} onClick={handleClickProfile}>
                                                    <i className="ti-back-left"></i>
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

export default connect(null, { setBreadcrumbItems })(AddStaffMemberAdmin);
