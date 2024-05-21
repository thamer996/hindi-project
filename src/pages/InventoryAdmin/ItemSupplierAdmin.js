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


const ItemSupplierAdmin = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "Inventory", link: "#" },
    ]
    const navigate = useNavigate();

    useEffect(() => {
        props.setBreadcrumbItems('Item Supplier', breadcrumbItems)
    })
    const handleClick = () => {
        navigate('/add-item-supplier-admin');
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
                    <label className="col-form-label">Item Supplier</label>
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
                    <button className="btn btn-primary" onClick={handleClick}>Add Item Supplier</button>
                   
                </div>
                <Col lg={12}>
                    <Card>

                        <CardBody>
                            <CardTitle className="h4">Item Supplier List </CardTitle>


                            <div className="table-responsive">
                                <Table className="table mb-0">
                                    <thead>
                                        <tr>
                                            <th>Item Supplier</th>
                                            <th>Contact Person</th>
                                            <th>Address</th>
                                            
                                         
                                           
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div>Camlin Stationers</div>
                                                <div><i style={{ marginRight: '5px' }} className="ti-mobile"></i>8458436583</div>
                                                <div><i  style={{ marginRight: '5px' }}className="ti-email"></i>camlin@gmail.com</div>
                                            </td>
                                            <td> <div><i style={{ marginRight: '5px' }} className="ti-user"></i>Bruce Stark</div>
                                                <div><i style={{ marginRight: '5px' }} className="ti-mobile"></i>847487932</div>
                                                <div><i  style={{ marginRight: '5px' }}className="ti-email"></i>bruce@gmail.com</div></td>
                                            <td><i style={{ marginRight: '5px' }} className="ti-home"></i>22 Cristal Way. CA</td>
                                           
                                           
                                            
                                            
                                           
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
                                        <td>
                                                <div>Jhonson Uniform Dress</div>
                                                <div><i style={{ marginRight: '5px' }} className="ti-mobile"></i> 8796787856</div>
                                                <div><i  style={{ marginRight: '5px' }}className="ti-email"></i>Jhon@gmail.com</div>
                                            </td>
                                            <td> <div><i style={{ marginRight: '5px' }} className="ti-user"></i>David</div>
                                                <div><i style={{ marginRight: '5px' }} className="ti-mobile"></i>87686785678</div>
                                                <div><i  style={{ marginRight: '5px' }}className="ti-email"></i>david@gmail.com</div></td>
                                            <td><i style={{ marginRight: '5px' }} className="ti-home"></i>22 Cristal Way. CA</td>
                                           
                                           
                                            
                                            
                                           
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
                                        <td>
                                                <div>David</div>
                                                <div><i style={{ marginRight: '5px' }} className="ti-mobile"></i>678678678</div>
                                                <div><i  style={{ marginRight: '5px' }}className="ti-email"></i>da@gmail.com</div>
                                            </td>
                                            <td> <div><i style={{ marginRight: '5px' }} className="ti-user"></i>Peter</div>
                                                <div><i style={{ marginRight: '5px' }} className="ti-mobile"></i>685676578</div>
                                                <div><i  style={{ marginRight: '5px' }}className="ti-email"></i>per@gmail.com</div></td>
                                            <td><i style={{ marginRight: '5px' }} className="ti-home"></i>22 Cristal Way. CA</td>
                                           
                                           
                                            
                                            
                                           
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

export default connect(null, { setBreadcrumbItems })(ItemSupplierAdmin);