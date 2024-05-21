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


const VehiclsAdmin = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "Transport", link: "#" },
    ]
    const navigate = useNavigate();

    useEffect(() => {
        props.setBreadcrumbItems('Vehicle List', breadcrumbItems)
    })
    const handleClick = () => {
        navigate('/add-vheicles-admin');
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
                    <label className="col-form-label">Vehicle</label>
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
                    <button className="btn btn-primary" onClick={handleClick}>Add Vehicle</button>
                </div>
                <Col lg={12}>
                    <Card>

                        <CardBody>
                            <CardTitle className="h4">Vehicle List</CardTitle>


                            <div className="table-responsive">
                                <Table className="table mb-0">
                                    <thead>
                                        <tr>
                                            <th>Vehicle Number</th>
                                            <th>Vehicle Model</th>
                                            <th>Year Made</th>
                                            <th>Registration Number</th>
                                            <th>Chasis Number</th>
                                            <th>Max Seating Capacity</th>
                                            <th>Driver Name</th>
                                            <th>Driver Licence</th>
                                            <th>Driver Contact</th>
                                            
                                            <th>Action</th>
                                           
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>VH4584</td>
                                            <td>Ford CAB</td>
                                            <td>2015</td>
                                            <td>FFG-76575676787</td>
                                            <td>523422</td>
                                            <td>50</td>
                                            <td>Jasper</td>
                                            <td>258714545</td>
                                            <td>8521479630</td>
                                           
                                            
                                            <td>
                                               
                                            <span style={iconStyle} >
                                                    <i className="ti-eye"></i>
                                                </span>
                                                <span style={editIconStyle} onClick={"bi bi-trash"}>
                                                    <i className="ti-marker-alt"></i>
                                                </span>
                                                <span style={actionIconStyle} onClick={"bi bi-trash"}>
                                                    <i className="ti-trash"></i>
                                                </span>

                                            </td>
                                        </tr>
                                        <tr>
                                        <td>VH5645</td>
                                            <td>Volvo Bus</td>
                                            <td>2018</td>
                                            <td>BGBFDF787987956</td>
                                            <td>45433</td>
                                            <td>50</td>
                                            <td>Maximus</td>
                                            <td>545645666776</td>
                                            <td>885456456</td>
                                           
                                            
                                            <td>
                                               
                                            <span style={iconStyle} >
                                                    <i className="ti-eye"></i>
                                                </span>
                                                <span style={editIconStyle} onClick={"bi bi-trash"}>
                                                    <i className="ti-marker-alt"></i>
                                                </span>
                                                <span style={actionIconStyle} onClick={"bi bi-trash"}>
                                                    <i className="ti-trash"></i>
                                                </span>

                                            </td>    </tr>
                                        <tr>
                                        <td>VH1001</td>
                                            <td>Volvo Bus</td>
                                            <td>2017</td>
                                            <td>FVFF-08797865</td>
                                            <td>45453</td>
                                            <td>50</td>
                                            <td>Michel</td>
                                            <td>R534534</td>
                                            <td>8667777869</td>
                                           
                                            
                                            <td>
                                               
                                            <span style={iconStyle} >
                                                    <i className="ti-eye"></i>
                                                </span>
                                                <span style={editIconStyle} onClick={"bi bi-trash"}>
                                                    <i className="ti-marker-alt"></i>
                                                </span>
                                                <span style={actionIconStyle} onClick={"bi bi-trash"}>
                                                    <i className="ti-trash"></i>
                                                </span>

                                            </td>    </tr>
                                     
                                       
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

export default connect(null, { setBreadcrumbItems })(VehiclsAdmin);