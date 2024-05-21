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


const StudentHouse = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "Student Details", link: "#" },
    ]
    const navigate = useNavigate();

    useEffect(() => {
        props.setBreadcrumbItems('Student House', breadcrumbItems)
    })
    const handleClick = () => {
        navigate('/add-school-house');
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

                        <label className="col-form-label">Student House</label>
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
                    <button className="btn btn-primary" onClick={handleClick} >Add School House</button>
                </div>
                </Row>
                <Row>
                    <Col lg={12}>
                        <Card>

                            <CardBody>
                                <CardTitle className="h4"> Student House List </CardTitle>


                                <div className="table-responsive">
                                    <Table className="table mb-0">
                                        <thead>
                                            <tr>
                                                
                                                <th>Name</th>
                                                <th>Description</th>
                                                <th>House ID</th>
                                               

                                                <th>Action</th>


                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                
                                                <td>
                                                Blue</td>
                                                <td></td>
                                                <td>1</td>
                                                <td>
                                                    <span style={editIconStyle} onClick={"bi bi-trash"}>
                                                        <i className="ti-marker-alt"></i>
                                                    </span>
                                                    <span style={actionIconStyle} onClick={"bi bi-trash"}>
                                                    <i className="ti-trash"></i>
                                                </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                
                                                <td>
                                               Red</td>
                                               <td></td>
                                                <td>2</td>
                                                <td>
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

export default connect(null, { setBreadcrumbItems })(StudentHouse);