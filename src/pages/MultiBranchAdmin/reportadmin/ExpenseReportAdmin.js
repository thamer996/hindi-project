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


const ExpenseReportAdmin = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "Multi Branch", link: "#" },
    ]
    const navigate = useNavigate();

    useEffect(() => {
        props.setBreadcrumbItems('Expense Report', breadcrumbItems)
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
                            <CardTitle className="h4">Expense Report</CardTitle>


                            <div className="table-responsive">
                                <Table className="table mb-0">
                                    <thead>
                                        <tr>
                                            <th>Branch</th>
                                            <th>Name</th>
                                            <th>Invoice No</th>
                                            <th>Expense Head</th>
                                            <th>Date</th>
                                           
                                            <th>Amount($)</th>
                                           
                                           


                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Home Branch</td>
                                            <td>MPPKVVCL</td>
                                            <td>2152
                                            </td>
                                            <td>Electricity Bill</td>
                                            <td>01/04/2024</td>
                                            <td>$130.00</td>
                                          


                                            
                                        </tr>
                                        <tr>
                                        <td>Home Branch</td>
                                            <td>BSNL Telephone Bill</td>
                                            <td>6265
                                            </td>
                                            <td>Book Sale</td>
                                            <td>01/05/2024</td>
                                            <td>$120.00</td>   </tr>
                                        <tr>

                                        <td>Home Branch</td>
                                            <td>School Event</td>
                                            <td>6265
                                            </td>
                                            <td>	Miscellaneous</td>
                                            <td>01/10/2024</td>
                                            <td>$150.00</td>   </tr>

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

export default connect(null, { setBreadcrumbItems })(ExpenseReportAdmin);