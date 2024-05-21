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


const IssueReturnLibrarian = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "Students", link: "#" },
    ]
    const navigate = useNavigate();

    useEffect(() => {
        props.setBreadcrumbItems('Members', breadcrumbItems)
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
                    <label className="col-form-label">Member</label>
                    <div className="col-md-2">
                        <input type="text" className="form-control" placeholder="Enter Member Name" />
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
                            <CardTitle className="h4">Book List </CardTitle>


                            <div className="table-responsive">
                                <Table className="table mb-0">
                                    <thead>
                                        <tr>
                                            <th>Member ID</th>
                                            <th>Library Card No.</th>
                                            <th>Admission No</th>
                                            <th>Name</th>
                                            <th>Member Type </th>
                                            <th>Phone</th>
                                            <th>Action</th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>2</td>
                                            <td>00156</td>
                                            <td></td>
                                            <td>Shivam Verma (9002)</td>
                                            <td>Teacher</td>
                                            <td>9552654564</td>
                                           
                                            <td>
                                                <span style={iconStyle} >
                                                    <i className="ti-shift-right"></i>
                                                </span>
                                                

                                            </td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>00146</td>
                                            <td></td>
                                            <td>Brandon Heart (9006)</td>
                                            <td>Teacher</td>
                                            <td>34564654</td>
                                           
                                            <td>
                                                <span style={iconStyle}>
                                                    <i className="ti-shift-right"></i>
                                                </span>
                                               

                                            </td>    </tr>
                                        <tr>
                                            <td>4</td>
                                            <td>00147</td>
                                            <td></td>
                                            <td>Maria Ford (9005)</td>
                                            <td>Teacher</td>
                                            <td>8521479630</td>
                                            
                                            <td>
                                                <span style={iconStyle} >
                                                    <i className="ti-shift-right"></i>
                                                </span>
                                                
                                            </td>    </tr>
                                        <tr>
                                            <td>5</td>
                                            <td>001758</td>
                                            <td></td>
                                            <td>James Deckar (9004)</td>
                                            <td>Teacher</td>
                                            <td>79786546463</td>
                                           
                                            <td>
                                                <span style={iconStyle} >
                                                    <i className="ti-shift-right"></i>
                                                </span>
                                               

                                            </td>    </tr>
                                        <tr>
                                            <td>7</td>
                                            <td>00L3</td>
                                            <td>18002</td>
                                            <td>Robin Peterson</td>
                                            <td>Student</td>
                                            <td>946545445</td>
                                            
                                            <td>
                                                <span style={iconStyle} >
                                                    <i className="ti-shift-right"></i>
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

export default connect(null, { setBreadcrumbItems })(IssueReturnLibrarian);