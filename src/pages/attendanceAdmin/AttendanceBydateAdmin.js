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
import HeaderTeacher from "../../components/HorizontalLayoutTeacher/HeaderTeacher";
import NvbarTeacher from "../../components/HorizontalLayoutTeacher/NvbarTeacher";
import TeacherLayout from "../../components/HorizontalLayoutTeacher/TeacherLayout";


const AttendanceBydateAdmin = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "Attendance", link: "#" },
    ]
    const navigate = useNavigate();

    useEffect(() => {
        props.setBreadcrumbItems('Attendance By Date', breadcrumbItems)
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
                    <label className="col-form-label">Date</label>
                    <div className="col-md-2">
                        <input type="date" className="form-control" placeholder="" />
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
                            <CardTitle className="h4">Attendance List </CardTitle>






                            <div className="table-responsive">
                                <Table className="table mb-0">
                                    <thead>
                                        <tr>
                                            



                                        </tr>
                                    </thead>
                                    <tbody>
                                       
                                        
                                       

                                       



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

export default connect(null, { setBreadcrumbItems })(AttendanceBydateAdmin);