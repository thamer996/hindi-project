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



const StudentBehaviourRankSuperAdmin = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "Behaviour", link: "#" },
    ]
    const navigate = useNavigate();

    useEffect(() => {
        props.setBreadcrumbItems('Report', breadcrumbItems)
    })
    const handleClick = () => {
        navigate('/add-approve-leave-teacher');
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
                            <option> C </option>
                            <option> D </option>

                        </select> 
                    </div>
                    <label className="col-form-label">Session</label>
                    <div className="col-md-2">
                        <select className="form-control">
                            <option> Select </option>
                            <option>Current Session Points</option>
                            <option> All Session Points</option>


                        </select> 
                    </div>
                    <label className="col-form-label">Type</label>
                    <div className="col-md-2">
                        <select className="form-control">
                            <option> Select </option>
                            <option>Lesser Than Or Equal</option>
                            <option> Greater Than Or Equal</option>


                        </select> 
                    </div>
                    <label className="col-form-label">Point</label>
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
                            <CardTitle className="h4">Student Behaviour Rank List</CardTitle>






                            <div className="table-responsive">
                                <Table className="table mb-0">
                                    <thead>
                                        <tr>
                                            <th>Rank</th>
                                            <th>Admission No</th>

                                            <th>
                                                Student Name</th>
                                            <th>Class(Section)</th>
                                            <th>Gender</th>
                                            <th>Phone</th>
                                            <th>Total Points</th>

                                            <th>Action</th>



                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>

                                            <td>1</td>
                                            <td>
                                                90775</td>
                                            <td>Suresh Patel</td>
                                            <td>	Class 1 (A)</td>
                                            <td>	Male</td>
                                            <td>9080678678</td>
                                            <td> 	-10</td>


                                            <td>  <span style={iconStyle} >
                                                <i className="ti-eye"></i>
                                            </span>
                                            </td>





                                        </tr>
                                        <tr>

                                            <td>1</td>
                                            <td>
                                            5242512</td>
                                            <td>Rohit Soni</td>
                                            <td>	Class 1 (A)</td>
                                            <td>	Male</td>
                                            <td>	9542587541</td>
                                            <td> 	-10</td>


                                            <td>  <span style={iconStyle} >
                                                <i className="ti-eye"></i>
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

export default connect(null, { setBreadcrumbItems })(StudentBehaviourRankSuperAdmin);