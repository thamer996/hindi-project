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


const FeesMasterAdmin = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "fees collection", link: "#" },
    ]
    const navigate = useNavigate();

    useEffect(() => {
        props.setBreadcrumbItems('Fees Master List : 2023-24', breadcrumbItems)
    })
    const handleClick = () => {
        navigate('/add-fees-master-admin');
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
                    <label className="col-form-label">Fees Group</label>
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
                    <button className="btn btn-primary" onClick={handleClick}>Add Fees Master : 2023-24</button>
                </div>
                <Col lg={12}>
                    <Card>

                        <CardBody>
                            <CardTitle className="h4">Fees Master List : 2023-24</CardTitle>


                            <div className="table-responsive">
                                <Table className="table mb-0">
                                    <thead>
                                        <tr>
                                            <th>Fees Group</th>
                                            <th>Fees Code</th>
                                           
                                            <th>Amount</th>
                                            <th></th>
                                            
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Class 1 General</td>
                                            <td>
                                                <div>
                                                Admission Fees(admission-fees)
                                                </div>
                                                <div>
                                                April Month Fees(apr-month-fees)
                                                </div>
                                                <div>
                                                May Month Fees(may-month-fees)
                                                </div>
                                                <div>
                                                June Month Fees(jun-month-fees)
                                                </div>
                                                <div>
                                                uly Month Fees(jul-month-fees)
                                                </div>
                                            </td>
                                            <td>
                                                <div>$2,000.00</div>
                                                <div>$350.00</div>
                                                <div>$350.00</div>
                                                <div>$350.00</div>
                                                <div>$350.00</div>
                                            </td>
                                            <td>  <span style={editIconStyle} onClick={"bi bi-trash"}>
                                                    <i className="ti-marker-alt"></i>
                                                </span>
                                                <span style={actionIconStyle} onClick={"bi bi-trash"}>
                                                    <i className="ti-trash"></i>
                                                </span></td>
                                           
                                            
                                            <td>
                                            <span style={editIconStyle} onClick={"bi bi-trash"}>
                                                    <i className="ti-tag"></i>
                                                </span>
                                                <span style={actionIconStyle} onClick={"bi bi-trash"}>
                                                    <i className="ti-trash"></i>
                                                </span>

                                            </td>
                                        </tr>
                                        <tr>
                                        <td>Class 1 Lump Sum</td>
                                            <td>
                                                <div>
                                                Caution Money Fees(caution-money-fees)
                                                </div>
                                                <div>
                                                Exam Fees(exam-fees)
                                                </div>
                                                <div>
                                                Lumpsum fees(lumpsum-fees)
                                                </div>
                                               
                                            </td>
                                            <td>
                                                <div>$3,000.00</div>
                                                <div>$250.00</div>
                                                <div>$100.00</div>
                                                
                                            </td>
                                            <td>  <span style={editIconStyle} onClick={"bi bi-trash"}>
                                                    <i className="ti-marker-alt"></i>
                                                </span>
                                                <span style={actionIconStyle} onClick={"bi bi-trash"}>
                                                    <i className="ti-trash"></i>
                                                </span></td>
                                           
                                            
                                            <td>
                                            <span style={editIconStyle} onClick={"bi bi-trash"}>
                                                    <i className="ti-tag"></i>
                                                </span>
                                                <span style={actionIconStyle} onClick={"bi bi-trash"}>
                                                    <i className="ti-trash"></i>
                                                </span>

                                            </td>
                                           </tr>
                                            <tr>
                                            <td>Class 1- I Installment</td>
                                            <td>
                                                <div>
                                                Admission Fees(admission-fees)
                                                </div>
                                                <div>
                                                1st Installment Fees( 1-installment-fees)
                                                </div>
                                                <div>
                                                Bus-fees(Bus-fees)
                                                </div>
                                               
                                            </td>
                                            <td>
                                                <div>$1,000.00</div>
                                                <div>$2,500.00</div>
                                                <div>$500.00</div>
                                                
                                            </td>
                                            <td>  <span style={editIconStyle} onClick={"bi bi-trash"}>
                                                    <i className="ti-marker-alt"></i>
                                                </span>
                                                <span style={actionIconStyle} onClick={"bi bi-trash"}>
                                                    <i className="ti-trash"></i>
                                                </span></td>
                                           
                                            
                                            <td>
                                            <span style={editIconStyle} onClick={"bi bi-trash"}>
                                                    <i className="ti-tag"></i>
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

export default connect(null, { setBreadcrumbItems })(FeesMasterAdmin);