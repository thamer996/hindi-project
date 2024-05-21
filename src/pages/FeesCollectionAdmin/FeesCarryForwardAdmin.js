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


const FeesCarryForwardAdmin = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "fees collection", link: "#" },
    ]
    const navigate = useNavigate();

    useEffect(() => {
        props.setBreadcrumbItems('Previous Session Balance Fees', breadcrumbItems)
    })
    const handleClick = () => {
        navigate('/add-visitor-book');
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

                    
                    <label className="col-form-label">Class</label>
                    <select className="form-control">
                        <option>select</option>
                        <option> Class 1</option>
                        <option> Class 2</option>
                        <option> Class 3 </option>
                        <option> Class 4 </option>
                        <option> Class 5</option>


                    </select>
                    <label className="col-form-label">Section</label>
                    <select className="form-control">
                        <option>select</option>
                        <option>A</option>
                        <option>B</option>
                        <option>C</option>
                        <option>D</option>



                    </select>


                    <div>
                        <button className="btn btn-primary">Search</button>
                    </div>
                </div>
                <div className="d-flex justify-content-between  mb-2">
                    <div></div>
                    {/* Button */}

                </div>
                <Col lg={12}>
                    <Card>

                        <CardBody>
                            <CardTitle className="h4">Previous Session Balance Fees
                            </CardTitle>


                            <div className="table-responsive">
                                <Table className="table mb-0">
                                    <thead>
                                        <tr>
                                            <th>Student Name</th>
                                            <th>Admission No</th>
                                            <th>Admission Date</th>
                                            <th>Roll Bumber</th>
                                          
                                            
                                           
                                            <th>Father Name</th>
                                            <th>Balance($)</th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                        <td>Arpit Patel</td>
                                            <td>326260</td>
                                            <td>04/01/2023</td>
                                            <td>20230</td>
                                          
                                            <td>Arun Patel</td>
                                           
                                           
                                            <td>
                                                <span style={iconStyle} onClick={handleClickProfile}>
                                                <input type="text" placeholder="0.00" style={{ fontSize: "18px" }}/>
                                                </span>
                                                
                                            </td>

                                        </tr>
                                        
                                        <tr>
                                        <td>Rohit Soni</td>
                                            <td>5242512</td>
                                            <td>04/03/2023</td>
                                            <td>56465462</td>
                                          
                                            <td>S K Soni</td>
                                           
                                           
                                            <td>
                                                <span style={iconStyle} onClick={handleClickProfile}>
                                                <input type="text" placeholder="0.00" style={{ fontSize: "18px" }}/>
                                                </span>
                                                
                                            </td>

                                       
                                        </tr>
                                        <tr>
                                        <td>Shalini sharma</td>
                                            <td>90957</td>
                                            <td>11/10/2023</td>
                                            <td>20032</td>
                                          
                                            <td>Arjun sharma</td>
                                           
                                           
                                            <td>
                                                <span style={iconStyle} onClick={handleClickProfile}>
                                                <input type="text" placeholder="0.00" style={{ fontSize: "18px" }}/>
                                                </span>
                                                
                                            </td>
                                        </tr>

                                    </tbody>
                                    <button className="btn btn-primary" onClick={handleClick}>Save</button>
                                </Table>

                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

        </React.Fragment>
    )
}

export default connect(null, { setBreadcrumbItems })(FeesCarryForwardAdmin);