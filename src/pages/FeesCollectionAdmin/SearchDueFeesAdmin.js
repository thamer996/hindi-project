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


const SearchDueFeesAdmin = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "fees collection", link: "#" },
    ]
    const navigate = useNavigate();

    useEffect(() => {
        props.setBreadcrumbItems('Search Due Fees', breadcrumbItems)
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

                    <label className="col-form-label">Fees</label>
                    <select className="form-control">
                        <option>select</option>
                        
                        <optgroup label="Class 1 General">
                            <option>
                                <input type="checkbox" className="mr-1" /> Admission Fees(admission-fees)
                            </option>
                            <option>
                                <input type="checkbox" className="mr-1" /> April Month Fees(april-month-fees)
                            </option>
                        </optgroup>


                    </select> 
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
                            <CardTitle className="h4">Student List
                            </CardTitle>


                            <div className="table-responsive">
                                <Table className="table mb-0">
                                    <thead>
                                        <tr>
                                            <th>Class</th>
                                            <th>Admission No</th>
                                            <th>Student Name</th>
                                            <th>Fees Group</th>
                                          
                                            <th>Amount($)</th>
                                            <th>Paid($)</th>
                                            <th>Discount($)</th>
                                           
                                            <th>Fine($)</th>
                                            <th>Balance($)</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                        <td>Class 1-A</td>
                                            <td>326260</td>
                                            <td>Arpit Patel</td>
                                            <td>Class 1 General (Admission Fees : admission-fees)</td>
                                          
                                            <td>2,000.00</td>
                                            <td>0.00</td>
                                            <td>0.00</td>
                                           
                                            <td>0.00</td>
                                            <td>2,000.00</td>
                                           
                                            <td>
                                                <span style={iconStyle} >
                                                <button style={{backgroundColor: "gray",color: "white", border: "none",padding: "3px 6px", fontSize: "10px"}}>$ Add Fees</button>
                                                </span>
                                                
                                            </td>

                                        </tr>
                                        
                                        <tr>
                                        <td>Class 1-A</td>
                                            <td>5242512</td>
                                            <td>Rohit Soni</td>
                                            <td>Class 1 General (Admission Fees : admission-fees)</td>
                                          
                                            <td>2,000.00</td>
                                            <td>0.00</td>
                                            <td>0.00</td>
                                           
                                            <td>0.00</td>
                                            <td>2,000.00</td>
                                           
                                            <td>
                                                <span style={iconStyle} >
                                                <button style={{backgroundColor: "gray",color: "white", border: "none",padding: "3px 6px", fontSize: "10px"}}>$ Add Fees</button>
                                                </span>
                                                
                                            </td>
                                        </tr>
                                        <tr>
                                        <td>Class 1-A</td>
                                            <td>90957</td>
                                            <td>Shalini sharma</td>
                                            <td>Class 1 General (Admission Fees : admission-fees)</td>
                                          
                                            <td>2,000.00</td>
                                            <td>0.00</td>
                                            <td>0.00</td>
                                           
                                            <td>0.00</td>
                                            <td>2,000.00</td>
                                           
                                            <td>
                                                <span style={iconStyle} >
                                                <button style={{backgroundColor: "gray",color: "white", border: "none",padding: "3px 6px", fontSize: "10px"}}>$ Add Fees</button>
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

export default connect(null, { setBreadcrumbItems })(SearchDueFeesAdmin);