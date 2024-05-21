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



const AssignClassTeacherAdmin = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "Academics", link: "#" },
    ]
    const navigate = useNavigate();

    useEffect(() => {
        props.setBreadcrumbItems('Assign Class Teacher', breadcrumbItems)
    })
    const handleClick = () => {
        navigate('/add-assignteacher-admin');
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
                    
                    <label className="col-form-label">Assign Teacher</label>
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
                    <button className="btn btn-primary" onClick={handleClick} >Add Class Teacher</button>
                    
                </div>
            </Row>
            <Row>
                <Col lg={12}>
                    <Card>
                        <CardBody>
                            <CardTitle className="h4">Class Teacher List </CardTitle>






                            <div className="table-responsive">
                                <Table className="table mb-0">
                                    <thead>
                                        <tr>
                                            <th>Class</th>
                                            <th>Section</th>

                                            <th>
                                              Class Teacher</th>
                                              <th>
                                              Actions</th>
                                          
                                          


                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>

                                            <td>Class 2</td>
                                            <td>
                                            A</td>
                                            <td>Shivam Verma (9002)</td>
                                           
                                           
                                            
                                            <td>  <span style={editIconStyle} onClick={"bi bi-trash"}>
                                                <i className="ti-marker-alt"></i>
                                            </span>
                                                <span style={actionIconStyle} onClick={"bi bi-trash"}>
                                                    <i className="ti-trash"></i>
                                                </span></td>





                                        </tr>
                                        <tr>

                                        <td>Class 3</td>
                                            <td>
                                            B</td>
                                            <td>Albert Thomas (52201)</td>
                                           
                                            
                                            <td>  <span style={editIconStyle} onClick={"bi bi-trash"}>
                                                <i className="ti-marker-alt"></i>
                                            </span>
                                                <span style={actionIconStyle} onClick={"bi bi-trash"}>
                                                    <i className="ti-trash"></i>
                                                </span></td>





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

export default connect(null, { setBreadcrumbItems })(AssignClassTeacherAdmin);