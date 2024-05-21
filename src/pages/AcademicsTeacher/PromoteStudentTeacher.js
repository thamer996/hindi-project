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



const PromoteStudentTeacher = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "Section", link: "#" },
    ]
    const navigate = useNavigate();

    useEffect(() => {
        props.setBreadcrumbItems('Section', breadcrumbItems)
    })
    const handleClick = () => {
        navigate('/add-section-admin');
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
                                <option>Class 1</option>
                                <option>Class 2</option>
                                <option>Class 3</option>
                                <option>Class 4</option>
                                <option>Class 5</option>
                               


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
                <h5>Promote Students In Next Session</h5>
                <div className="d-flex mb-2">
                    <div></div>
                    {/* Vos éléments de filtre ici */}
                   
                    <label className="col-form-label">Promote In Session</label>
                        <div className="col-md-2">
                            <select className="form-control">
                                <option> Select </option>
                                <option>2016-17</option>
                                <option>2017-18</option>
                                <option>2018-19</option>
                                
                               


                            </select>
                        </div>
                        <label className="col-form-label">Class</label>
                        <div className="col-md-2">
                            <select className="form-control">
                                <option> Select </option>
                                <option>Class 1</option>
                                <option>Class 2</option>
                                <option>Class 3</option>
                                <option>Class 4</option>
                                <option>Class 5</option>
                               


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
            </Row>
            <Row>
                <Col lg={12}>
                    <Card>
                        <CardBody>
                            <CardTitle className="h4">Student List </CardTitle>






                            <div className="table-responsive">
                                <Table className="table mb-0">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Admission No</th>
                                            <th>Student Name</th>
                                            <th>Father Name</th>
                                            <th>Date Of Birth</th>
                                            <th>Current Result</th>
                                            <th>Next Session Status</th>






                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                             <td> <div className="form-check mb-3">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    name="exampleRadios"
                                                    id="exampleRadios1"
                                                    value="option1"
                                                    defaultChecked

                                                />
                                               </div></td>
                                            <td>326260</td>
                                            <td>Arpit Patel</td>
                                            <td>Arun Patel</td>
                                            <td>07/16/2010</td>
                                            <td> <div className="form-check mb-3">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="exampleRadios"
                                                    id="exampleRadios1"
                                                    value="option1"
                                                    defaultChecked

                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="exampleRadios1"
                                                >
                                                    Pass
                                                </label></div>
                                                <div className="form-check mb-3">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="exampleRadios"
                                                    id="exampleRadios1"
                                                    value="option1"
                                                    defaultChecked

                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="exampleRadios1"
                                                >
                                                    Fail
                                                </label></div></td>
                                                <td> <div className="form-check mb-3">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="exampleRadios"
                                                    id="exampleRadios1"
                                                    value="option1"
                                                    defaultChecked

                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="exampleRadios1"
                                                >
                                                    Continue
                                                </label></div>
                                                <div className="form-check mb-3">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="exampleRadios"
                                                    id="exampleRadios1"
                                                    value="option1"
                                                    defaultChecked

                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="exampleRadios1"
                                                >
                                                    Leave
                                                </label></div></td>
                                           





                                          




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

export default connect(null, { setBreadcrumbItems })(PromoteStudentTeacher);