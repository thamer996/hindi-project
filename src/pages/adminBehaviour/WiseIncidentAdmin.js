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



const WiseIncidentAdmin = (props) => {
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
                   
                  
                  
                    
                    <label className="col-form-label">Session</label>
                    <div className="col-md-2">
                        <select className="form-control">
                            <option> Select </option>
                            <option>Current Session Points</option>
                            <option> All Session Points</option>


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
            </Row>
            <Row>
                <Col lg={12}>
                    <Card>
                        <CardBody>
                            <CardTitle className="h4">Incident Wise Report</CardTitle>






                            <div className="table-responsive">
                                <Table className="table mb-0">
                                    <thead>
                                        <tr>
                                            <th>Incident</th>
                                           

                                            <th>
                                                Students</th>
                                          
                                           



                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>

                                            <td>Improper behaviour</td>
                                            <td>
                                            6</td>
                                           





                                        </tr>
                                        <tr>

                                        <td>Cheating and plagiarism</td>
                                            <td>
                                            23</td>
                                          





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

export default connect(null, { setBreadcrumbItems })(WiseIncidentAdmin);