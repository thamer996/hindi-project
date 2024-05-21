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



const SubjectGroupReceptionist = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "Academics", link: "#" },
    ]
    const navigate = useNavigate();

    useEffect(() => {
        props.setBreadcrumbItems('Subject Group', breadcrumbItems)
    })
    const handleClick = () => {
        navigate('/add-subject-group-admin');
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

                    <label className="col-form-label">Subject Group</label>
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
                    

                </div>
            </Row>
            <Row>
                <Col lg={12}>
                    <Card>
                        <CardBody>
                            <CardTitle className="h4">Subject Group List </CardTitle>






                            <div className="table-responsive">
                                <Table className="table mb-0">
                                    <thead>
                                        <tr>
                                            <th>
                                                Name</th>
                                            <th>	Class (Section)</th>

                                            <th>
                                                Subject</th>
                                         



                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>

                                            <td>Class 4th Subject Group</td>
                                            <td>
                                                <div>1.Class 4(A)</div>
                                                <div>2.Class 4(B)</div>
                                                <div>3.Class 4(C)</div>
                                                <div>4.Class 4(D)</div>
                                            </td>
                                            <td> <div>
                                                English</div>
                                                <div>Hindi</div>
                                                <div>Mathematics</div>
                                                <div>Science</div>
                                                <div> Social Studies</div>
                                                <div> French</div>
                                                <div> Drawing</div>
                                                <div> Computer</div>
                                                <div> Elective 1</div>
                                                <div> Elective 2</div></td>



                                           





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

export default connect(null, { setBreadcrumbItems })(SubjectGroupReceptionist);