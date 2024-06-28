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


const UpcomingHomeworkSuperAdmin = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "Homework", link: "#" },
    ]
    const navigate = useNavigate();

    useEffect(() => {
        props.setBreadcrumbItems('Upcoming Homework', breadcrumbItems)
    })
    const handleClick = () => {
        navigate('/add-upcoming-super-admin');
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
                            <option>C </option>
                            <option> D </option>

                        </select> 
                    </div>

                    <label className="col-form-label">Subject Group</label>
                    <div className="col-md-2">
                        <select className="form-control">
                            <option> Select </option>
                            <option> Class 1st Subject Group </option>


                        </select> 
                    </div>

                    <label className="col-form-label">Subject</label>
                    <div className="col-md-2">
                        <select className="form-control">
                            <option> Select </option>
                            <option> English(210) </option>
                            <option> Hindi(230) </option>


                        </select> 
                    </div>




                   
                    <div>
                        <button className="btn btn-primary" >Search</button>
                    </div>
                </div>
                <div className="d-flex justify-content-between  mb-2">
          <div></div>
          {/* Button */}
          <button className="btn btn-primary" onClick={handleClick}>Add </button>
        </div>




            </Row>
            <Row>
                <Col lg={12}>
                    <Card>

                        <CardBody>
                            <CardTitle className="h4">Homework List</CardTitle>


                            <div className="table-responsive">
                                <Table className="table mb-0">
                                    <thead>
                                        <tr>

                                            <th>Class</th>
                                            <th>Section</th>
                                            <th>Subject Group</th>
                                            <th>Subject </th>
                                            <th>Homework Date </th>
                                            <th>Submission Date </th>
                                            <th>Evaluation Date </th>
                                            <th>Created by </th>
                                            <th>Action </th>



                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Class 1</td>
                                            <td>A</td>
                                            <td>Class 1st Subject Group</td>
                                            <td>	English (210)</td>

                                            <td >04/03/2024</td>


                                            <td>
                                            04/05/2024
                                            </td>
                                            <td ></td>
                                            <td >	Jason Sharlton (900002301)</td>
                                            <td>
                                            <span style={iconStyle} >
                                                    <i className="ti-eye"></i>
                                                </span>

                                                <span style={editIconStyle} onClick={"bi bi-trash"}>
                                                    <i className="ti-marker-alt"></i>
                                                </span>
                                                <span style={actionIconStyle} onClick={"bi bi-trash"}>
                                                    <i className="ti-trash"></i>
                                                </span>

                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Class 1</td>
                                            <td>A</td>
                                            <td>Class 1st Subject Group</td>
                                            <td>	English (210)</td>

                                            <td >04/03/2024</td>


                                            <td>
                                            04/05/2024
                                            </td>
                                            <td ></td>
                                            <td >	Jason Sharlton (900002301)</td>
                                            <td>
                                            <span style={iconStyle} >
                                                    <i className="ti-eye"></i>
                                                </span>

                                                <span style={editIconStyle} onClick={"bi bi-trash"}>
                                                    <i className="ti-marker-alt"></i>
                                                </span>
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

export default connect(null, { setBreadcrumbItems })(UpcomingHomeworkSuperAdmin);