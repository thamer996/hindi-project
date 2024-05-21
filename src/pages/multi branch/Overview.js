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


const Overview = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "Multi Branch", link: "#" },
    ]
    const navigate = useNavigate();

    useEffect(() => {
        props.setBreadcrumbItems('Overview', breadcrumbItems)
    })
    const handleClick = () => {
        navigate('/add-book');
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
                    


                    
                </div>
                <div className="d-flex justify-content-between  mb-2">
                    <div></div>
                    {/* Button */}
                    
                </div>
                <Col lg={12}>
                    <Card>

                        <CardBody>
                            <CardTitle className="h4">Fees Details </CardTitle>


                            <div className="table-responsive">
                                <Table className="table mb-0">
                                    <thead>
                                        <tr>
                                            <th>Branch</th>
                                            <th>Current Session</th>
                                            <th>Total Students</th>
                                            <th>Total Fees</th>
                                            <th>Total Paid Fees</th>
                                            <th>Total Balance Fees</th>
                                          
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Home Branch</td>
                                            <td>2023-24</td>
                                            <td>62</td>
                                            <td>$8,63,250.00</td>
                                            <td>$81,870.00</td>
                                            <td>$7,81,380.00</td>
                                           
                                        </tr>
                                        <tr>
                                        <td>Mount Carmel School 1</td>
                                            <td>2023-24</td>
                                            <td>42</td>
                                            <td>$14,990.00</td>
                                            <td>$8,825.00</td>
                                            <td>$6,165.00</td>
                                              </tr>
                                        <tr>
                                        <td>Mount Carmel School 2</td>
                                            <td>2023-24</td>
                                            <td>4</td>
                                            <td>$9,400.00</td>
                                            <td>$8,250.00</td>
                                            <td>$1,150.00</td>
                                               </tr>
                                        <tr>
                                        <td>Mount Carmel School 3</td>
                                            <td>2023-24</td>
                                            <td>14</td>
                                            <td>$15,000.00</td>
                                            <td>$850.00</td>
                                            <td>$14,150.00</td>
                                                   </tr>
                                       
                                    </tbody>
                                </Table>

                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg={12}>
                    <Card>

                        <CardBody>
                            <CardTitle className="h4">Transport Fees Details </CardTitle>


                            <div className="table-responsive">
                                <Table className="table mb-0">
                                    <thead>
                                        <tr>
                                            <th>Branch</th>
                                            <th>Current Session</th>
                                            <th>Total Fees</th>
                                            <th>Total Paid Fees</th>
                                            <th>Total Balance Fees</th>
                                           
                                          
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Home Branch</td>
                                            <td>2023-24</td>
                                            <td>$7,090.00	</td>
                                            <td>$565.00</td>
                                            <td>$6,525.00</td>
                                            
                                           
                                        </tr>
                                        <tr>
                                        <td>Mount Carmel School 1</td>
                                            <td>2023-24</td>
                                            <td>$3,650.00</td>
                                            <td>$450.00</td>
                                            <td>$3,200.00</td>
                                           
                                              </tr>
                                        <tr>
                                        <td>Mount Carmel School 2</td>
                                            <td>2023-24</td>
                                          
                                            <td>$7,250.00</td>
                                            <td>$400.00</td>
                                            <td>$6,850.00</td>
                                               </tr>
                                        <tr>
                                        <td>Mount Carmel School 3</td>
                                            <td>2023-24</td>
                                          
                                            <td>$6,300.00</td>
                                            <td>$650.00</td>
                                            <td>$5,650.00</td>
                                                   </tr>
                                       
                                    </tbody>
                                </Table>

                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg={12}>
                    <Card>

                        <CardBody>
                            <CardTitle className="h4">Student Admission </CardTitle>


                            <div className="table-responsive">
                                <Table className="table mb-0">
                                    <thead>
                                        <tr>
                                            <th>Branch</th>
                                            <th>Current Session</th>
                                            <th>Offline Admission</th>
                                            <th>Online Admission</th>
                                           
                                           
                                          
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Home Branch</td>
                                            <td>2023-24</td>
                                            <td>17</td>
                                            <td>13</td>
                                           
                                            
                                           
                                        </tr>
                                        <tr>
                                        <td>Mount Carmel School 1</td>
                                            <td>2023-24</td>
                                            <td>7</td>
                                            <td>4</td>
                                           
                                           
                                              </tr>
                                        <tr>
                                        <td>Mount Carmel School 2</td>
                                            <td>2023-24</td>
                                            <td>4</td>
                                            <td>3</td>
                                           
                                           
                                               </tr>
                                        <tr>
                                        <td>Mount Carmel School 3</td>
                                            <td>2023-24</td>
                                            <td>9</td>
                                            <td>3</td>
                                          
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

export default connect(null, { setBreadcrumbItems })(Overview);