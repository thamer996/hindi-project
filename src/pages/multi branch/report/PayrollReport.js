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


const PayrollReport = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "Multi Branch", link: "#" },
    ]
    const navigate = useNavigate();

    useEffect(() => {
        props.setBreadcrumbItems('Payroll Report', breadcrumbItems)
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
                            <CardTitle className="h4">Payroll Report</CardTitle>


                            <div className="table-responsive">
                                <Table className="table mb-0">
                                    <thead>
                                        <tr>
                                            <th>Branch</th>
                                            <th>Name</th>
                                            <th>Role</th>
                                            <th>Designation</th>
                                            <th>Month-Year</th>
                                            <th>Payslip</th>
                                            <th>Basic Salary($)</th>
                                            <th>Earning($)</th>
                                            <th>Deduction($)</th>
                                            <th>Gross Salary($)</th>
                                            <th>Tax($)</th>
                                            <th>Net Salary($)</th>
                                           


                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Home Branch</td>
                                            <td>Joe Black (9000)</td>
                                            <td>Super Admin
                                            </td>
                                            <td>Technical Head</td>
                                            <td>December - 2024</td>
                                            <td>234</td>
                                            <td>45,000.00</td>
                                            <td>0.00</td>
                                            <td>3,500.00</td>
                                            <td>41,500.00</td>
                                            <td>10.00</td>
                                            <td>41,490.00</td>


                                            
                                        </tr>
                                        <tr>
                                        <td>Home Branch</td>
                                            <td>Joe Black (9000)</td>
                                            <td>Super Admin
                                            </td>
                                            <td>Technical Head</td>
                                            <td>January - 2024</td>
                                            <td>242</td>
                                            <td>45,000.00</td>
                                            <td>0.00</td>
                                            <td>2,500.00</td>
                                            <td>42,500.00</td>
                                            <td>10.00</td>
                                            <td>42,490.00</td>   </tr>
                                        <tr>

                                        <td>Home Branch</td>
                                            <td>Joe Black (9000)</td>
                                            <td>Super Admin
                                            </td>
                                            <td>Technical Head</td>
                                            <td>February - 2024</td>
                                            <td>250</td>
                                            <td>45,000.00</td>
                                            <td>0.00</td>
                                            <td>2,500.00</td>
                                            <td>42,500.00</td>
                                            <td>10.00</td>
                                            <td>42,490.00</td>   </tr>

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

export default connect(null, { setBreadcrumbItems })(PayrollReport);