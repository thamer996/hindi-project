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



const TeachersRatingAdmin = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "Human Resource", link: "#" },
    ]
    const navigate = useNavigate();

    useEffect(() => {
        props.setBreadcrumbItems('Teachers Rating', breadcrumbItems)
    })
    const handleClick = () => {
        navigate('/add-leave-type-admin');
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
                    <div className="d-flex mb-2">
                        <div></div>
                        {/* Vos éléments de filtre ici */}

                        <label className="col-form-label">Teachers Rating</label>
                    <div className="col-md-2">
                        <input type="text" className="form-control" placeholder="" />
                    </div>
                       
                       
                        <div>
                            <button className="btn btn-primary" >Search</button>
                        </div>
                        

                    </div>
                    <div className="d-flex justify-content-between  mb-2">
                    <div></div>
                    {/* Button */}
                  
                </div>
                </Row>
                <Row>
                    <Col lg={12}>
                        <Card>

                            <CardBody>
                                <CardTitle className="h4"> Teachers Rating List </CardTitle>


                                <div className="table-responsive">
                                    <Table className="table mb-0">
                                        <thead>
                                            <tr>
                                            <th>Staff ID</th>
                                                <th>Name</th>
                                                <th>Rating</th>
                                                <th>Comment</th>
                                                <th>Status</th>
                                                <th>Student Name</th>
                                               

                                                <th>Action</th>


                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                
                                            
                                                <td>9002</td>
                                                <td>Shivam Verma ( 9002 )</td>
                                                <td><i className="ti-star"style={{color:"gold"}}></i><i className="ti-star" color="gold"></i><i className="ti-star"></i></td>
                                                <td>Good</td>
                                                <td> <button style={{ backgroundColor: '#8AAE6E', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '10px' }}>Approved</button></td>
                                                <td>Emma Thomas ( 18012 )</td>
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

export default connect(null, { setBreadcrumbItems })(TeachersRatingAdmin);