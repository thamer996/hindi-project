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


const StudentsLibrarian = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "Library", link: "#" },
    ]
    const navigate = useNavigate();

    useEffect(() => {
        props.setBreadcrumbItems('Students Member', breadcrumbItems)
    })
    const handleClick = () => {
        navigate('/add-student-librarian');
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
                                <option> Grade 1 </option>
                                <option> Grade 2 </option>
                                <option> Grade 3 </option>
                                <option> Grade 4 </option>
                                <option> Grade 5 </option>
                                <option> Grade 6 </option>
                            </select>
                        </div>
                        <label className="col-form-label">Section</label>
                        <div className="col-md-2">
                            <select className="form-control">
                                <option> Select </option>
                                <option> A </option>
                                <option> B </option>
                                <option> c </option>
                                <option> D </option>

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
                            <CardTitle className="h4">Students Member List </CardTitle>


                            <div className="table-responsive">
                                <Table className="table mb-0">
                                    <thead>
                                        <tr>
                                            <th>Member ID</th>
                                            <th>Library Card No.</th>
                                            <th>Admission No</th>
                                            <th>Student Name</th>
                                            <th>Class </th>
                                            <th>Father Name</th>
                                            <th>Date Of Birth</th>
                                            <th>Gender</th>
                                            <th>Mobile Number</th>
                                            <th>Action</th>
                                          
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td>1001</td>
                                            <td>Hudson</td>
                                            <td>Class 1(A)</td>
                                            <td>Emrys</td>
                                            <td>02/06/2019</td>
                                            <td>Male</td>
                                            <td>16514840184</td>
                                            <td>
                                            <span style={editIconStyle} onClick={handleClick}>
                                                    <i className="ti-plus"></i>
                                                </span>
                                                </td>
                                          
                                         
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td>1020</td>
                                            <td>Marlie</td>
                                            <td>Class 1(A) </td>
                                            <td>Lester</td>
                                            <td>05/22/2019</td>
                                            <td>Female</td>
                                            <td>6595084801</td>
                                            <td>
                                            <span style={editIconStyle} onClick={handleClick}>
                                                    <i className="ti-plus"></i>
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

export default connect(null, { setBreadcrumbItems })(StudentsLibrarian);