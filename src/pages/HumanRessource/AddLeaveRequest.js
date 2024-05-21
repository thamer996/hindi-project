import React, { useEffect, useState } from "react"

import {
    Card,
    CardBody,
    Col,
    Row,
    CardTitle,
    FormGroup,
    Form
} from "reactstrap"

import { connect } from "react-redux";

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions";

const AddLeaveRequest = (props) => {
    document.title = "Form Elements | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "Add Leave Type", link: "#" },
    ]

    useEffect(() => {
        props.setBreadcrumbItems('Add Leave Type', breadcrumbItems)
    })

    const [toggleSwitch, settoggleSwitch] = useState(true)
    const [toggleSwitchSize, settoggleSwitchSize] = useState(true)

    return (
        <React.Fragment>

            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            {/*<CardTitle className="h4">Textual inputs</CardTitle>
            <p className="card-title-desc">
              Here are examples of <code>.form-control</code> applied to
                  each textual HTML5 <code>&lt;input&gt;</code>{" "}
              <code>type</code>.
</p>*/}




                            <Row className="mb-3">
                                <label className="col-md-2 col-form-label">Role</label>
                                <div className="col-md-10">
                                    <select className="form-control">
                                        <option> Select </option>
                                        <option>Admin</option>
                                        <option>Teacher</option>
                                        <option>Accountant</option>

                                    </select>
                                </div>
                            </Row>
                            <Row className="mb-3">
                                <label
                                    htmlFor="example-search-input"
                                    className="col-md-2 col-form-label"
                                >
                                    Apply Date
                                </label>
                                <div className="col-md-10">
                                    <input
                                        className="form-control"
                                        type="date"

                                    />
                                </div>
                            </Row>
                            <Row className="mb-3">
                                <label
                                    htmlFor="example-search-input"
                                    className="col-md-2 col-form-label"
                                >
                                    Leave From Date
                                </label>
                                <div className="col-md-10">
                                    <input
                                        className="form-control"
                                        type="date"

                                    />
                                </div>
                            </Row>
                            <Row className="mb-3">
                                <label
                                    htmlFor="example-search-input"
                                    className="col-md-2 col-form-label"
                                >
                                    Reason
                                </label>
                                <div className="col-md-10">
                                    <input
                                        className="form-control"
                                        type="text"

                                    />
                                </div>
                            </Row>
                            <Row className="mb-3">
                                <label
                                    htmlFor="example-search-input"
                                    className="col-md-2 col-form-label"
                                >
                                    Attach Document
                                </label>
                                <div className="col-md-10">
                                    <input
                                        className="form-control"
                                        type="file"

                                    />
                                </div>
                            </Row>
                            <Row className="mb-3">
                                <label className="col-md-2 col-form-label">Name</label>
                                <div className="col-md-10">
                                    <select className="form-control">
                                        <option> Select </option>


                                    </select>
                                </div>
                            </Row>
                            <Row className="mb-3">
                                <label className="col-md-2 col-form-label">

                                    Leave Type</label>
                                <div className="col-md-10">
                                    <select className="form-control">
                                        <option> Select </option>
                                        <option> Medical Leave</option>
                                        <option> Casual Leave</option>



                                    </select>
                                </div>
                            </Row>
                            <Row className="mb-3">
                                <label
                                    htmlFor="example-search-input"
                                    className="col-md-2 col-form-label"
                                >
                                    Leave To Date
                                </label>
                                <div className="col-md-10">
                                    <input
                                        className="form-control"
                                        type="date"

                                    />
                                </div>
                            </Row>
                            <Row className="mb-3">
                                <label
                                    htmlFor="example-search-input"
                                    className="col-md-2 col-form-label"
                                >
                                    Note
                                </label>
                                <div className="col-md-10">
                                    <input
                                        className="form-control"
                                        type="text"

                                    />
                                </div>
                            </Row>
                            <label>Status</label>
                            <label
                                htmlFor="example-date-input"
                                className="col-md- col-form-label"
                            >
                               Pending
                            </label>
                            <div className="col-md-3">
                                <input
                                    className="form-control"
                                    type="date"
                                    id="example-date-input"
                                />
                            </div>
                            <label
                                htmlFor="example-date-input"
                                className="col-md- col-form-label"
                            >
                               Approved
                            </label>
                            <div className="col-md-3">
                                <input
                                    className="form-control"
                                    type="date"
                                    id="example-date-input"
                                />
                            </div>
                            <label
                                htmlFor="example-date-input"
                                className="col-md- col-form-label"
                            >
                               Disapproved
                            </label>
                            <div className="col-md-3">
                                <input
                                    className="form-control"
                                    type="date"
                                    id="example-date-input"
                                />
                            </div>










                            <Row>

                            </Row>

                        </CardBody>
                        <div className="d-flex justify-content-center mt-3 mb-3"> {/* mt-3 adds margin top, mb-3 adds margin bottom */}
                            <button type="submit" className="btn btn-primary w-md">Submit</button>
                        </div>
                    </Card>
                </Col>
            </Row>

        </React.Fragment>
    )
}

export default connect(null, { setBreadcrumbItems })(AddLeaveRequest);