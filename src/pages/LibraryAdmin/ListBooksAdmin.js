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


const ListBooksAdmin = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "Library", link: "#" },
    ]
    const navigate = useNavigate();

    useEffect(() => {
        props.setBreadcrumbItems('Book List', breadcrumbItems)
    })
    const handleClick = () => {
        navigate('/add-book-admin');
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
                    <label className="col-form-label">Book</label>
                    <div className="col-md-2">
                        <input type="text" className="form-control" placeholder="Enter Book title" />
                    </div>


                    <div>
                        <button className="btn btn-primary" >Search</button>
                    </div>
                </div>
                <div className="d-flex justify-content-between  mb-2">
                    <div></div>
                    {/* Button */}
                    <button className="btn btn-primary" onClick={handleClick}>Add Book</button>
                </div>
                <Col lg={12}>
                    <Card>

                        <CardBody>
                            <CardTitle className="h4">Book List </CardTitle>


                            <div className="table-responsive">
                                <Table className="table mb-0">
                                    <thead>
                                        <tr>
                                            <th>Book Title</th>
                                            <th>Description</th>
                                            <th>Book Number</th>
                                            <th>ISBN Number</th>
                                            <th>Publisher </th>
                                            <th>Author</th>
                                            <th>Subject</th>
                                            <th>Rack Number</th>
                                            <th>Qty</th>
                                            <th>Available</th>
                                            <th>Book Price</th>
                                            <th>Post Date</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Carbon and its Compounds</td>
                                            <td>No Description</td>
                                            <td>3411</td>
                                            <td>RTT565</td>
                                            <td>Y.D. Publisher</td>
                                            <td>H.S.Singh</td>
                                            <td>EVS-2</td>
                                            <td>3422</td>
                                            <td>50</td>
                                            <td>43</td>
                                            <td>$60.00</td>
                                            <td>03/26/2024</td>
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
                                            <td>Arithmetic progressions Chapter 3</td>
                                            <td>No Description</td>
                                            <td>6855</td>
                                            <td>FERT343</td>
                                            <td>D.K Publisher </td>
                                            <td>H.M.Rao</td>
                                            <td>NCERT Mathematics</td>
                                            <td>3234</td>
                                            <td>80</td>
                                            <td>74</td>
                                            <td>$86.00</td>
                                            <td>03/20/2024</td>
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
                                            <td>Mapping Your Way</td>
                                            <td>No Description</td>
                                            <td>3421</td>
                                            <td>QWRR343</td>
                                            <td>H.K Publisher</td>
                                            <td>V.D.Rao</td>
                                            <td>NCERT English</td>
                                            <td>4211</td>
                                            <td>100</td>
                                            <td>99</td>
                                            <td>$100.00</td>
                                            <td>03/10/2024</td>
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
                                            <td>Coal and Mine Chapter 10</td>
                                            <td>Coal mining is the process of extracting coal from the ground. Coal is valued for its energy.</td>
                                            <td>6654</td>
                                            <td>DFER674</td>
                                            <td>R.T.Publisher</td>
                                            <td>Vinay Singh</td>
                                            <td>Social Studies</td>
                                            <td>2324</td>
                                            <td>80</td>
                                            <td>75</td>
                                            <td>$85.00</td>
                                            <td>03/05/2024</td>
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
                                            <td>CBSE Class 8 Vigyan Book</td>
                                            <td>No Description</td>
                                            <td>4522</td>
                                            <td>SDS3422</td>
                                            <td>Sk.Publisher</td>
                                            <td>R.Sharma</td>
                                            <td>Science</td>
                                            <td>3422</td>
                                            <td>100</td>
                                            <td>95</td>
                                            <td>$120.00</td>
                                            <td>03/01/2024</td>
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

export default connect(null, { setBreadcrumbItems })(ListBooksAdmin);