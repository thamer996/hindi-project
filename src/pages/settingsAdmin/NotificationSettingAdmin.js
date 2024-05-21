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


const NotificationSettingAdmin = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "settings", link: "#" },
    ]
    const navigate = useNavigate();

    useEffect(() => {
        props.setBreadcrumbItems('Notification Setting', breadcrumbItems)
    })
    const handleClick = () => {
        navigate('/add-settings-session');
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



                    <div>

                    </div>
                </div>
                <div className="d-flex justify-content-between  mb-2">
                    <div></div>
                    {/* Button */}

                </div>
                <Col lg={12}>
                    <Card>

                        <CardBody>
                            <CardTitle className="h4">Notification Setting </CardTitle>


                            <div className="table-responsive">
                                <Table className="table mb-0">
                                    <thead>
                                        <tr>
                                            <th>Event</th>
                                            <th>Destination</th>
                                            <th>Recipient</th>
                                            <th>Template ID</th>
                                            <th>Sample Message</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Student Admission</td>
                                            <td>
                                               

                                                <div className="form-check mb-3">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value=""
                                                        id="defaultCheck1"
                                                    />
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor="defaultCheck1"
                                                    >
                                                        Email
                                                    </label>
                                                </div>
                                                <div className="form-check mb-3">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value=""
                                                        id="defaultCheck1"
                                                    />
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor="defaultCheck1"
                                                    >
                                                        SMS
                                                    </label>
                                                </div>
                                            </td>
                                            <td>
                                               

                                               <div className="form-check mb-3">
                                                   <input
                                                       className="form-check-input"
                                                       type="checkbox"
                                                       value=""
                                                       id="defaultCheck1"
                                                   />
                                                   <label
                                                       className="form-check-label"
                                                       htmlFor="defaultCheck1"
                                                   >
                                                       Student
                                                   </label>
                                               </div>
                                               <div className="form-check mb-3">
                                                   <input
                                                       className="form-check-input"
                                                       type="checkbox"
                                                       value=""
                                                       id="defaultCheck1"
                                                   />
                                                   <label
                                                       className="form-check-label"
                                                       htmlFor="defaultCheck1"
                                                   >
                                                       Guardian
                                                   </label>
                                               </div>
                                           </td>
                                           <td>
                                           <div> 
                                           Dear student_name your admission is confirm in Class: class Section: section for Session:
                                            current_session_name for more detail contact System Admin class section admission_no roll_no admission_date mobileno email dob guardian_name guardian_relation guardian_phone
                                            father_name father_phone blood_group
                                             mother_name gender guardian_email
                                             </div>
                                             <div>
                                             <span style={editIconStyle} onClick={"bi bi-trash"}>
                                                    <i className="ti-marker-alt"></i>
                                                </span>

                                             </div>
                                           </td>

                                            <td>


                                              
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

export default connect(null, { setBreadcrumbItems })(NotificationSettingAdmin);