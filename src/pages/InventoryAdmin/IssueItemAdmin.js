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


const IssueItemAdmin = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "Inventory", link: "#" },
    ]
    const navigate = useNavigate();

    useEffect(() => {
        props.setBreadcrumbItems('Issue Item', breadcrumbItems)
    })
    const handleClick = () => {
        navigate('/add-issue-item-admin');
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
                    <label className="col-form-label">Issue Item</label>
                    <div className="col-md-2">
                        <input type="text" className="form-control" placeholder="" />
                    </div>


                    <div>
                        <button className="btn btn-primary">Search</button>
                    </div>
                </div>
                <div className="d-flex justify-content-between  mb-2">
                    <div></div>
                    {/* Button */}
                    <button className="btn btn-primary" onClick={handleClick}>Add Issue Item</button>
                   
                </div>
                <Col lg={12}>
                    <Card>

                        <CardBody>
                            <CardTitle className="h4">Issue Item List </CardTitle>


                            <div className="table-responsive">
                                <Table className="table mb-0">
                                    <thead>
                                        <tr>
                                            <th>Item</th>
                                            <th>Note</th>
                                            <th>Item Category</th>
                                            <th>Issue-Return</th>
                                            <th>Issue To </th>
                                            <th>Issued By</th>
                                            <th>Quantity</th>
                                            <th>Status</th>
                                           
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Cricket Bat</td>
                                            <td></td>
                                            <td>Sports</td>
                                            <td>03/25/2024 - 03/31/2024</td>
                                            <td>Maria Ford (9005)</td>
                                            <td>Shivam Verma (9002)</td>
                                            <td>5</td>
                                            
                                            <td><button className="btn btn-success" style={{ backgroundColor: '#FF0000', borderColor: '#FF0000' }}>Click To return</button></td>
                                           
                                            <td>
                                            <span style={actionIconStyle} onClick={"bi bi-trash"}>
                                                    <i className="ti-trash"></i>
                                                </span>
                                                
                                            </td>
                                        </tr>
                                        <tr>
                                        <td>Class Board</td>
                                        <td></td>
                                            <td>Books Stationery</td>
                                            <td>03/20/2024 - 03/26/2024</td>
                                            <td>Brandon Heart (9006)</td>
                                            <td>William Abbot (9003)</td>
                                            <td>2</td>
                                            
                                            <td><button className="btn btn-success" style={{ backgroundColor: '#FF0000', borderColor: '#FF0000' }}>Click To return</button></td>
                                           
                                            <td>
                                            <span style={actionIconStyle} onClick={"bi bi-trash"}>
                                                    <i className="ti-trash"></i>
                                                </span>
                                                
                                            </td>
                                        </tr>
                                        <tr>
                                        <td>Lab Equipment</td>
                                        <td></td>
                                            <td>Chemistry Lab Apparatus</td>
                                            <td>03/15/2024 - 03/21/2024</td>
                                            <td>Jason Sharlton (900002301)</td>
                                            <td>Joe Black (9000)</td>
                                            <td>3</td>
                                            
                                            <td><button className="btn btn-success" style={{ backgroundColor: '#FF0000', borderColor: '#FF0000' }}>Click To return</button></td>
                                           
                                            <td>
                                            <span style={actionIconStyle} onClick={"bi bi-trash"}>
                                                    <i className="ti-trash"></i>
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

export default connect(null, { setBreadcrumbItems })(IssueItemAdmin);