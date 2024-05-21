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



const MarksGradeAdmin = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "Examinations", link: "#" },
    ]
    const navigate = useNavigate();

    useEffect(() => {
        props.setBreadcrumbItems('Marks Grade', breadcrumbItems)
    })
    const handleClick = () => {
        navigate('/add-marks-grade-admin');
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
                    <button className="btn btn-primary" onClick={handleClick}>Add Marks Grade</button>
                    {/* Button */}

                </div>
                    <Col lg={12}>
                    <Card>

<CardBody>
    <CardTitle className="h4">Grade List</CardTitle>


    <div className="table-responsive">
        <Table className="table mb-0">
            <thead>
                <tr>
                    <th>Exam Type</th>
                    <th>Grade Name</th>
                    <th>Percent Form/Upto</th>
                    <th>Grade Point</th>

                    <th>Action</th>

                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>General Purpose (Pass/Fail)</td>
                    <td>
                        <div>
                            <div>B-</div>
                            <div>B</div>
                            <div>B+</div>
                            <div>B++</div>
                            <div>A</div>
                            <div>A+</div>
                            <div>A++</div>
                        </div></td>
                    <td><div>
                            <div>0.00 To 40.00</div>
                            <div>40.00 To 50.00</div>
                            <div>50.00 To 60.00</div>
                            <div>60.00 To 70.00</div>
                            <div>70.00 To 80.00</div>
                            <div>80.00 To 90.00</div>
                            <div>90.00 To 100.00</div>
                        </div></td>
                    <td><div>
                            <div>0.0</div>
                            <div>0.0</div>
                            <div>0.0</div>
                            <div>0.0</div>
                            <div>0.0</div>
                            <div>0.0</div>
                            <div>0.0</div>
                        </div></td>
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
                <td>School Based Grading System</td>
                    <td>
                        <div>
                            <div>B-</div>
                            <div>B</div>
                            <div>B+</div>
                            <div>B++</div>
                            <div>A</div>
                            <div>A+</div>
                            <div>A++</div>
                        </div></td>
                    <td><div>
                            <div>0.00 To 40.00</div>
                            <div>40.00 To 50.00</div>
                            <div>50.00 To 60.00</div>
                            <div>60.00 To 70.00</div>
                            <div>70.00 To 80.00</div>
                            <div>80.00 To 90.00</div>
                            <div>90.00 To 100.00</div>
                        </div></td>
                    <td><div>
                            <div>0.0</div>
                            <div>0.0</div>
                            <div>0.0</div>
                            <div>0.0</div>
                            <div>0.0</div>
                            <div>0.0</div>
                            <div>0.0</div>
                        </div></td>
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
                <td>College Based Grading System</td>
                    <td>
                        <div>
                            <div>B-</div>
                            <div>B</div>
                            <div>B+</div>
                            <div>B++</div>
                            <div>A</div>
                            <div>A+</div>
                            <div>A++</div>
                        </div></td>
                    <td><div>
                            <div>0.00 To 40.00</div>
                            <div>40.00 To 50.00</div>
                            <div>50.00 To 60.00</div>
                            <div>60.00 To 70.00</div>
                            <div>70.00 To 80.00</div>
                            <div>80.00 To 90.00</div>
                            <div>90.00 To 100.00</div>
                        </div></td>
                    <td><div>
                            <div>0.0</div>
                            <div>0.0</div>
                            <div>0.0</div>
                            <div>0.0</div>
                            <div>0.0</div>
                            <div>0.0</div>
                            <div>0.0</div>
                        </div></td>
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
                <td>GPA Grading System</td>
                    <td>
                        <div>
                            <div>A+</div>
                            <div>A</div>
                            <div>B+</div>
                            <div>B</div>
                            <div>C+</div>
                            <div>C</div>
                            <div>D</div>
                        </div></td>
                    <td><div>
                            <div>90.00 To 100.00</div>
                            <div>80.00 To 90.00</div>
                            <div>70.00 To 80.00</div>
                            <div>60.00 To 70.00</div>
                            <div>50.00 To 60.00</div>
                            <div>40.00 To 50.00</div>
                            <div>0.00 To 40.00</div>
                        </div></td>
                    <td><div>
                            <div>4.5</div>
                            <div>4.0</div>
                            <div>3.5</div>
                            <div>3.0</div>
                            <div>2.5</div>
                            <div>2.0</div>
                            <div>1.0</div>
                        </div></td>
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

export default connect(null, { setBreadcrumbItems })(MarksGradeAdmin);