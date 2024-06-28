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


const PrintAdmitCard = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "Examinations", link: "#" },
    ]
    const navigate = useNavigate();

    useEffect(() => {
        props.setBreadcrumbItems('Print Admit Card', breadcrumbItems)
    })
    const handleClick = () => {
        navigate('/add-students');
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
                <div className="col-md-6">
                    <Row>
                        <div className="col-md-6">
                            <label className="col-form-label">Exam Group</label>
                            <select className="form-control">
                                <option>select</option>
                                <option>Class 1 (Pass/Fail)</option>
                                <option>Class 1 (School Based Grading System)</option>
                                <option>Class 1 (College Based Grading System)</option>
                                <option>Class 1 (GPA Based Grading System)</option>
                                <option>Average Passing Exam</option>
                            </select> 
                        </div>
                        <div className="col-md-6">
                            <label className="col-form-label">Exam</label>
                            <select className="form-control">
                                <option>Select</option>
                                <option>Monthly Exam (septembre)</option>
                                <option>Practice Set(June)</option>
                                <option>Internal Examination</option>
                                <option>All Subject Practice Test</option>
                                <option>March Main Exam33</option>
                            </select> 
                        </div>
                    </Row>
                    <Row>
                        <div className="col-md-6">
                            <label className="col-form-label">Section</label>
                            <select className="form-control">
                                <option>Select</option>
                                <option>A</option>
                                <option>B</option>
                                <option>C</option>
                                <option>D</option>
                                
                            </select> 
                        </div>
                        <div className="col-md-6">
                            <label className="col-form-label">Admit Card Template</label>
                            <select className="form-control">
                                <option>Select</option>
                                <option>Sample Admit Card</option>
                               
                            </select> 
                        </div>
                    </Row>
                </div>
                <div className="col-md-6">
                    <Row>
                    <div className="col-md-6">
                            <label className="col-form-label">Session</label>
                            <select className="form-control">
                                <option>Select</option>
                                <option>2016-17</option>
                                <option>2017-18</option>
                                <option>2019-20</option>
                                <option>2020-21</option>
                                <option>2022-22</option>
                            </select> 
                        </div>
                        <div className="col-md-6">
                            <label className="col-form-label">Class</label>
                            <select className="form-control">
                                <option>Select</option>
                                <option>class 1</option>
                                <option>class 2</option>
                                <option>class 3</option>
                                <option>class 4</option>
                                <option>class 5</option>
                            </select> 
                        </div>
                        <div className="col-md-12 mt-4">
                            <button className="btn btn-primary" >Search</button>
                        </div>
                    </Row>
                </div>
            </Row>
            <div className="d-flex justify-content-between  mb-2">
          <div></div>
          {/* Button */}
          <button className="btn btn-primary" onClick={handleClick}>Generate</button>
        </div>

            <Row className="mt-3">
                <Col lg={12}>
                    <Card>
                        <CardBody>
                            <CardTitle className="h4">Student List</CardTitle>
                            <div className="table-responsive">
                                <Table className="table mb-0">
                                    <thead>
                                        <tr>
                                            <th>Admission No.</th>
                                            <th>Student Name</th>
                                            <th>Father Name</th>
                                            <th>Date of Birth</th>
                                            <th>Gender</th>
                                            <th>Category</th>
                                            <th>Mobile Number</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                           <td>A00123</td> 
                                           <td>John Doe</td>
                                           <td>Michael Doe</td>
                                           <td>1995-08-15</td>
                                           <td>Male</td>
                                           <td>General</td>
                                           <td>+1 (123) 456-7890</td>
                                        </tr>
                                        <tr>
                                        <td>B00567</td> 
                                           <td>Alice Smith</td>
                                           <td>Robert Smith</td>
                                           <td>1998-03-21</td>
                                           <td>Female</td>
                                           <td>SC</td>
                                           <td>+1 (987) 654-3210</td>
                                        </tr>
                                        <tr>{/* Vos données ici */}</tr>
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

export default connect(null, { setBreadcrumbItems })(PrintAdmitCard);
