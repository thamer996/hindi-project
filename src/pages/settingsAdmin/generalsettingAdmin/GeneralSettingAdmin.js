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
import { setBreadcrumbItems } from "../../../store/actions";

const GeneralSettingAdmin = (props) => {
    document.title = "Form Elements | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "General Setting", link: "#" },
    ]

    useEffect(() => {
        props.setBreadcrumbItems('General Setting', breadcrumbItems)
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












                            <label>General Setting</label>

                            <Row className="mb-3">
                                <label
                                    htmlFor="example-text-input"
                                    className="col-md-2 col-form-label"
                                >


                                    School Name
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
                                    htmlFor="example-text-input"
                                    className="col-md-2 col-form-label"
                                >


                                    School Code
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
                                    htmlFor="example-text-input"
                                    className="col-md-2 col-form-label"
                                >


                                    Address
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
                                    htmlFor="example-text-input"
                                    className="col-md-2 col-form-label"
                                >


                                    Phone
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
                                    htmlFor="example-text-input"
                                    className="col-md-2 col-form-label"
                                >


                                    Email
                                </label>
                                <div className="col-md-10">
                                    <input
                                        className="form-control"
                                        type="text"

                                    />
                                </div>
                            </Row>
                            <label>Academic Session</label>

                            <Row className="mb-3">
                                <label className="col-md-2 col-form-label">Session</label>
                                <div className="col-md-10">
                                    <select className="form-control">
                                        <option> Select </option>
                                        <option> 2024-25 </option>
                                        <option> 2025-26 </option>

                                    </select>
                                </div>
                            </Row>
                            <Row className="mb-3">
                                <label className="col-md-2 col-form-label">Session Start Month</label>
                                <div className="col-md-10">
                                    <select className="form-control">
                                        <option> Select </option>
                                        <option>January </option>
                                        <option> February </option>
                                        <option> March </option>

                                    </select>
                                </div>
                            </Row>
                            <label>Date Time</label>

                            <Row className="mb-3">
                                <label className="col-md-2 col-form-label">Date Format</label>
                                <div className="col-md-10">
                                    <select className="form-control">
                                        <option> Select </option>
                                        <option> mm/dd/yyyy </option>
                                        <option> mm-dd-yyyy</option>

                                    </select>
                                </div>
                            </Row>
                            <Row className="mb-3">
                                <label className="col-md-2 col-form-label">Time Zone</label>
                                <div className="col-md-10">
                                    <select className="form-control">
                                        <option>(GMT+05:30)Asia,Kolkata</option>
                                       

                                    </select>
                                </div>
                            </Row>
                            <Row className="mb-3">
                                <label className="col-md-2 col-form-label">Start Day Of Week</label>
                                <div className="col-md-10">
                                    <select className="form-control">
                                        <option>Monday</option>
                                        <option>Tuesday</option>
                                        <option>Wednesday</option>
                                       

                                    </select>
                                </div>
                            </Row>
                            <label>Currency</label>
                            <Row className="mb-3">
                                <label className="col-md-2 col-form-label">Currency Format</label>
                                <div className="col-md-10">
                                    <select className="form-control">
                                        <option>1,23,45,678,00</option>
                                       
                                       

                                    </select>
                                </div>
                            </Row>
                            <label>File Upload Path</label>
                            <Row className="mb-3">
                                <label
                                    htmlFor="example-text-input"
                                    className="col-md-2 col-form-label"
                                >


                                    Base URL
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
                                    htmlFor="example-text-input"
                                    className="col-md-2 col-form-label"
                                >


                                    File Upload Path
                                </label>
                                <div className="col-md-10">
                                    <input
                                        className="form-control"
                                        type="text"

                                    />
                                </div>
                            </Row>



























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

export default connect(null, { setBreadcrumbItems })(GeneralSettingAdmin);