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



const HouseRankReport = (props) => {
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
                   
                  
                  
                    
                    <label className="col-form-label">House Wise Rank</label>
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
                            <CardTitle className="h4">House Wise Rank Report</CardTitle>






                            <div className="table-responsive">
                                <Table className="table mb-0">
                                    <thead>
                                        <tr>
                                            <th>Rank</th>
                                            <th>House</th>

                                            <th>
                                                Student</th>
                                          
                                            <th>Total Points</th>

                                            <th>Action</th>



                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>

                                            <td>1</td>
                                            <td>
                                            Yellow</td>
                                            <td>2</td>
                                            <td>50</td>
                                           

                                            <td>  <span style={iconStyle} >
                                                <i className="ti-eye"></i>
                                            </span>
                                            </td>





                                        </tr>
                                        <tr>

                                        <td>2</td>
                                            <td>
                                            Blue</td>
                                            <td>16</td>
                                            <td>35</td>

                                            <td>  <span style={iconStyle} >
                                                <i className="ti-eye"></i>
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

export default connect(null, { setBreadcrumbItems })(HouseRankReport);