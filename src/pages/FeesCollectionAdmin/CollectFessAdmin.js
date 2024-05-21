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


const CollectFeesAdmin = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "fees collection", link: "#" },
    ]
    const navigate = useNavigate();

    useEffect(() => {
        props.setBreadcrumbItems('Student List', breadcrumbItems)
    })
    const handleClick = () => {
        navigate('/add-phone-call-log');
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
                            <label className="col-form-label">Class</label>
                            <select className="form-control">
                                <option>select</option>
                                <option> Class 1</option>
                                <option> Class 2</option>
                                <option> Class 3 </option>
                                <option> Class 4 </option>
                                <option> Class 5</option>


                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="col-form-label">Section</label>
                            <select className="form-control">
                            <option>select</option>
                                <option>A</option>
                                <option>B </option>
                    <option> C </option>
                    <option> D</option>
                   

                            </select>
                        </div>

                    </Row>
                    <Row>
                        <div className="col-md-12">
                            <label className="col-form-label">Search By Keyword</label>
                            <input type="text" className="form-control" placeholder="Search By Student Name, Roll Number, Enroll Number, National Id, Local Id Ects" />

                        </div>
                       



                    </Row>
                </div>
                <div className="col-md-6">
                    <Row>
                    <div className="col-md-12 mt-4">
                            <button className="btn btn-primary" >Search</button>
                        </div>




                        <div className="col-md-12 mt-5">
                            <button className="btn btn-primary" >Search</button>
                        </div>
                    </Row>
                </div>
            </Row>
                <div className="d-flex justify-content-between  mb-2">
                    <div></div>
                    {/* Button */}

                </div>
                <Row className="mt-3">
                <Col lg={12}>
                    <Card>

                        <CardBody>
                            <CardTitle className="h4">Student List
                            </CardTitle>


                            <div className="table-responsive">
                                <Table className="table mb-0">
                                    <thead>
                                        <tr>
                                            <th>Class</th>
                                            <th>Section</th>
                                            <th>Admission No</th>
                                            <th>Student Name</th>
                                            <th>Father Name </th>
                                            <th>Date of Birth</th>
                                            <th>Mobile No.</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            
                                        </tr>
                                        <tr>
                                               </tr>
                                        <tr>

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

export default connect(null, { setBreadcrumbItems })(CollectFeesAdmin);