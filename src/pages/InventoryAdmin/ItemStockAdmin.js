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


const ItemStockAdmin = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "Inventory", link: "#" },
    ]
    const navigate = useNavigate();

    useEffect(() => {
        props.setBreadcrumbItems('Item Stock', breadcrumbItems)
    })
    const handleClick = () => {
        navigate('/add-item-stock-admin');
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
                    <label className="col-form-label">Item Stock</label>
                    <div className="col-md-2">
                        <input type="text" className="form-control" placeholder="" />
                    </div>


                    <div>
                        <button className="btn btn-primary">Search</button>
                    </div>
                </div>
                <div className="d-flex justify-content-between  mb-2">
                    <div></div>
                    {/* Button */}
                    <button className="btn btn-primary" onClick={handleClick}>Add Item Stock</button>
                   
                </div>
                <Col lg={12}>
                    <Card>

                        <CardBody>
                            <CardTitle className="h4">Item Stock List </CardTitle>


                            <div className="table-responsive">
                                <Table className="table mb-0">
                                    <thead>
                                        <tr>
                                            <th>Item</th>
                                            <th>Category</th>
                                            <th>Supplier</th>
                                            <th>Store</th>
                                            <th>Quantity</th>
                                            <th>Purchase Price</th>
                                            <th>Date</th>
                                            
                                           
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Lab Equipment</td>
                                            <td>Chemistry Lab Apparatus</td>
                                            <td>David</td>
                                            <td>Science Store (SC2)</td>
                                            <td>10</td>
                                            <td>150.00</td>
                                            <td>03/30/2024</td>
                                            
                                            
                                           
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
                                        <td>Football</td>
                                            <td>Sports</td>
                                            <td>Jhon smith Supplier</td>
                                            <td>Sports Store (sp55)</td>
                                            <td>5</td>
                                            <td>100.00</td>
                                            <td>03/26/2024	</td>
                                            
                                            
                                           
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
                                        <td>Benches</td>
                                        <td>Furniture</td>
                                            <td>David</td>
                                            <td>Furniture Store (FS342)</td>
                                            <td>5</td>
                                            <td>120.00	</td>
                                            <td>03/20/2024	</td>
                                            
                                            
                                           
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

export default connect(null, { setBreadcrumbItems })(ItemStockAdmin);