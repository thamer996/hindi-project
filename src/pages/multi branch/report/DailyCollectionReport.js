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


const DailyCollectionReport = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "Multi Branch", link: "#" },
    ]
    const navigate = useNavigate();

    useEffect(() => {
        props.setBreadcrumbItems('Daily Collection Report', breadcrumbItems)
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
                    <label className="col-form-label">Date From</label>
                    <div className="col-md-2">
                        <input type="date" className="form-control" placeholder="Date" />
                    </div>
                    <label className="col-form-label">Date To</label>
                    <div className="col-md-2">
                        <input type="date" className="form-control" placeholder="Date" />
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
                            <CardTitle className="h4">Daily Collection Report</CardTitle>


                            <div className="table-responsive">
                                <Table className="table mb-0">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Total Transactions</th>
                                            <th>Amount($)</th>


                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>03/24/2024</td>
                                            <td>0</td>
                                            <td>$0.00
                                            </td>


                                            <td>

                                                <span style={iconStyle} onClick={handleClickProfile}>
                                                    <i className="ti-eye"></i>
                                                </span>


                                            </td>
                                        </tr>
                                        <tr>
                                        <td>03/25/2024</td>
                                            <td>0</td>
                                            <td>$0.00
                                            </td>


                                            <td>

                                                <span style={iconStyle} onClick={handleClickProfile}>
                                                    <i className="ti-eye"></i>
                                                </span>


                                            </td>   </tr>
                                        <tr>

                                        <td>03/26/2024</td>
                                            <td>1</td>
                                            <td>$2,150.00
                                            </td>


                                            <td>

                                                <span style={iconStyle} onClick={handleClickProfile}>
                                                    <i className="ti-eye"></i>
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

export default connect(null, { setBreadcrumbItems })(DailyCollectionReport);