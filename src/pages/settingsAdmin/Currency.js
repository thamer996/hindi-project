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
import flag from "../../assets/images/flags/germany.jpg"


const Currency = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "settings", link: "#" },
    ]
    const navigate = useNavigate();

    useEffect(() => {
        props.setBreadcrumbItems('Currency', breadcrumbItems)
    })
    const handleClick = () => {
        navigate('/add-role');
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




                </div>
                <div className="d-flex justify-content-between  mb-2">
                    <div></div>
                    {/* Button */}
                 
                </div>
                <Col lg={12}>
                    <Card>

                        <CardBody>
                            <CardTitle className="h4">Currencies </CardTitle>


                            <div className="table-responsive">
                                <Table className="table mb-0">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Currency</th>
                                            <th>Short Code</th>
                                            <th>Currency Symbol</th>
                                            <th>Conversion Rate</th>
                                            <th>Base Currency</th>
                                            <th>Active</th>
                                            <th>Enabled</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1.</td>
                                           
                                            <td>	AED</td>
                                            <td>	AED</td>
                                            <td> <input
                                                className="form-control"
                                                type="text"
                                                placeholder="AEDf"

                                            /></td>
                                              <td> <input
                                                className="form-control"
                                                type="text"
                                                placeholder="1"

                                            /></td>

                                            <td> </td>
                                            <td> </td>
                                          
                                           
                                            <td>
                                                <div className="form-check form-switch mb-3" >
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        id="customSwitch2"
                                                        defaultChecked
                                                      
                                                    />
                                                   
                                                </div>
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

export default connect(null, { setBreadcrumbItems })(Currency);