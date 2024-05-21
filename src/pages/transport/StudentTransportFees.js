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


const StudentTransportFees = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "Transport", link: "#" },
    ]
    const navigate = useNavigate();

    useEffect(() => {
        props.setBreadcrumbItems('Student Transport Fees', breadcrumbItems)
    })
    const handleClick = () => {
        navigate('/add-route-pickup-point');
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
                    <div className="col-md-2">
                        <select className="form-control">
                            <option> Select </option>
                            <option>Class 1</option>
                            <option>Class 2</option>
                            <option>Class 3</option>
                            <option>Class 4</option>


                        </select>
                    </div>
                    <label className="col-form-label">Section</label>
                    <div className="col-md-2">
                        <select className="form-control">
                            <option> Select </option>
                            <option>A</option>
                            <option>B</option>
                            <option>C</option>
                            <option>D</option>


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
                            <CardTitle className="h4">Student Transport Fees</CardTitle>


                            <div className="table-responsive">
                                <Table className="table mb-0">
                                    <thead>
                                        <tr>
                                            <th>Admission No</th>
                                            <th>Student Name</th>
                                            <th>
                                                Class</th>
                                            <th>Father Name</th>
                                            <th>Date of Birth</th>
                                            <th>Route Title</th>
                                            <th>Vehicle Number</th>
                                            <th>Pickup Point</th>


                                            <th>Action</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            
                                            <td> 326260</td>
                                            <td>
                                                Arpit Patel</td>
                                            <td> 	Class 1(A)</td>
                                            <td> Arun Patel</td>
                                            <td> 	07/16/2010</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>




                                            <td>

                                                <span style={iconStyle} >
                                                    <i className="ti-tag"></i>
                                                </span>
                                               

                                            </td>
                                        </tr>
                                        <tr>
                                           
                                        <td> 5242512</td>
                                            <td>
                                            Rohit Soni</td>
                                            <td> 	Class 1(A)</td>
                                            <td>	S K Soni</td>
                                            <td> 		02/03/2000</td>
                                            <td>	Brooklyn Central</td>
                                            <td>	VH1001</td>
                                            <td>	Brooklyn East</td>
                                            




                                            <td>

                                                <span style={iconStyle} >
                                                    <i className="ti-tag"></i>
                                                </span>
                                               

                                            </td>
                                               </tr>
                                        <tr>

                                           
                                        <td> 90775</td>
                                            <td>
                                            Suresh Patel</td>
                                            <td> 	Class 1(A)</td>
                                            <td>		Lokesh</td>
                                            <td> 			07/19/2014</td>
                                            <td>	Brooklyn Central</td>
                                            <td>	VH1001</td>
                                            <td>	Brooklyn East</td>




                                            <td>

                                                <span style={iconStyle} >
                                                    <i className="ti-tag"></i>
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

export default connect(null, { setBreadcrumbItems })(StudentTransportFees);