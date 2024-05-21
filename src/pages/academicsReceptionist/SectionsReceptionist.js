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



const SectionsReceptionist = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "Section", link: "#" },
    ]
    const navigate = useNavigate();

    useEffect(() => {
        props.setBreadcrumbItems('Section', breadcrumbItems)
    })
    const handleClick = () => {
        navigate('/add-section-admin');
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

                    <label className="col-form-label">Section</label>
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
                            <CardTitle className="h4">Section List </CardTitle>






                            <div className="table-responsive">
                                <Table className="table mb-0">
                                    <thead>
                                        <tr>

                                            <th>Section</th>


                                         



                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>

                                            <td>A </td>





                                        




                                        </tr>
                                        <tr>

                                            <td>B</td>





                                         





                                        </tr>
                                        <tr>

                                            <td>C</td>










                                        </tr>
                                        <tr>

                                            <td>D</td>





                                           





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

export default connect(null, { setBreadcrumbItems })(SectionsReceptionist);