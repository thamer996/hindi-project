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
import TeacherLayout from "../../components/HorizontalLayoutTeacher/TeacherLayout";


const HumanResourceStaffAdmin = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "Reports", link: "#" },
    ]
    const navigate = useNavigate();

    useEffect(() => {
        props.setBreadcrumbItems('library', breadcrumbItems)
    })
    const handleClick = () => {
        navigate('/add-students');
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
                            <option> Today </option>
                            <option> This Week Last Week </option>
                          

                        </select>
                    </div>
                  
                    
                    <label className="col-form-label">Members Type</label>
                    <div className="col-md-2">
                        <select className="form-control">
                            <option> Select </option>
                            <option> Student </option>
                        
                            <option> Teacher </option>
                          
                            
                           
                           


                        </select>
                    </div>
                   



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
                            <CardTitle className="h4">Book Issue Report</CardTitle>
                            <div className="table-responsive">
                                <Table className="table mb-0">
                                    <thead>
                                        <tr>
                                            <th>Book Title</th>
                                            <th>book Number</th>
                                            <th>Issue Date</th>
                                            <th>Due Return Date</th>
                                            <th>Member ID</th>
                                            <th> Library Card Number</th>
                                            <th>Admission No.</th>
                                            <th>Issue By</th>
                                            <th>Members Type</th>
                                            

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <td>Human Body Systems Chapter -II</td>
                                        <td>8965</td>
                                        <td>	01/05/2024</td>
                                        <td>	01/31/2024</td>
                                        <td>	29</td>
                                        <td>321</td>
                                        <td>	18001</td>
                                        <td>superadmin@gmail.com</td>
                                        <td>Edward Thomas (18001)</td>
                                       
                                        <td>Student</td>
                                       
                                       
                                      
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

export default connect(null, { setBreadcrumbItems })(HumanResourceStaffAdmin);
