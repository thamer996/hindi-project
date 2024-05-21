import React, { useEffect } from "react"
import { Link, useNavigate } from 'react-router-dom';


import {
    Table,
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    Container,
} from "reactstrap"

import { connect } from "react-redux";

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions";
import HeaderTeacher from "../../components/HorizontalLayoutTeacher/HeaderTeacher";
import NvbarTeacher from "../../components/HorizontalLayoutTeacher/NvbarTeacher";



const StaffDirectoryReceptionist = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "Human Resource", link: "#" },
    ]
    const navigate = useNavigate();

    useEffect(() => {
        props.setBreadcrumbItems('Staff Directory', breadcrumbItems)
    })
    const handleClick = () => {
        navigate('/add-marks-grade-teacher');
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
                        <label className="col-form-label">Role</label>
                        <div className="col-md-2">
                            <select className="form-control">
                                <option> Select </option>
                                <option>Admin</option>
                                <option>Teacher</option>
                                <option>Accountant</option>
                                <option>Librarian</option>
                                <option>Receptionist</option>
                                <option>Super Admin</option>


                            </select>
                        </div>
                        <div>
                            <button className="btn btn-primary" >Search</button>
                        </div>
                        <label className="col-form-label">Search By Keyword</label>
                        <div className="col-md-4">
                            <input type="text" className="form-control" placeholder="Search By Staff Id, Name, Role etc"></input>
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
                                <CardTitle className="h4">Staff Directory List</CardTitle>


                                <div className="table-responsive">
                                    <Table className="table mb-0">
                                        <thead>
                                            <tr>
                                                <th>Staff ID</th>
                                                <th>Name</th>
                                                <th>
                                                    Role</th>
                                                <th>Department</th>
                                                <th>Designation</th>
                                                <th>Mobile Number</th>
                                                <th>PAN Number</th>


                                                <th>Action</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>

                                                <td> 9000</td>
                                                <td>
                                                    Joe Black</td>
                                                <td> Super Admin</td>
                                                <td> Admin</td>
                                                <td>Technical Head</td>
                                                <td>6545645645</td>
                                                <td>ALWPG5809L</td>





                                                <td>

                                                    <span style={iconStyle} >
                                                        <i className="ti-eye"></i>
                                                    </span>
                                                   


                                                </td>
                                            </tr>
                                            <tr>
                                            <td> 9002</td>
                                            <td>
                                                Shivam Verma</td>
                                            <td>Teacher</td>
                                            <td>Academic</td>
                                            <td>Faculty</td>
                                            <td>9552654564</td>
                                            <td>RLWEG5809L</td>





                                            <td>

                                               

                                            </td>
                                            </tr>

                                            <tr>
                                            <td>9006</td>
                                            <td>

                                               	Librarian</td>
                                            <td>	Librarian</td>
                                            <td>	Library</td>
                                            <td>Librarian</td>
                                            <td>34564654</td>
                                            <td>ALWPG5825H</td>





                                            <td>

                                                


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

export default connect(null, { setBreadcrumbItems })(StaffDirectoryReceptionist);