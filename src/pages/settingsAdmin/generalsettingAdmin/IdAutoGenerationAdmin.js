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
import { Editor } from "react-draft-wysiwyg"

const IdAutoGenerationAdmin = (props) => {
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












                            <label>Student Admission No. Auto Generation</label>
                            <label>Auto Admission No.</label>

                            <div className="form-check mb-3">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    value=""
                                    id="defaultCheck1"
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="defaultCheck1"
                                >
                                    Disabled
                                </label>
                            </div>
                            <div className="form-check mb-3">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    value=""
                                    id="defaultCheck1"
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="defaultCheck1"
                                >
                                    Enabled
                                </label>
                            </div>


                            <Row className="mb-3">
                                <label
                                    htmlFor="example-text-input"
                                    className="col-md-2 col-form-label"
                                >
                                    Admission No. Prefix
                                </label>
                                <div className="col-md-10">
                                    <input
                                        className="form-control"
                                        type="text"

                                    />
                                </div>
                            </Row>
                            <Row className="mb-3">
                                <label className="col-md-2 col-form-label">Admission No. Digit</label>
                                <div className="col-md-10">
                                    <select className="form-control">
                                        <option> Select </option>
                                        <option> 1</option>
                                        <option> 2 </option>
                                        <option> 3 </option>
                                        <option> 4 </option>



                                    </select>
                                </div>
                            </Row>
                            <Row className="mb-3">
                                <label
                                    htmlFor="example-text-input"
                                    className="col-md-2 col-form-label"
                                >
                                    Admission Start From
                                </label>
                                <div className="col-md-10">
                                    <input
                                        className="form-control"
                                        type="text"

                                    />
                                </div>
                            </Row>
                            <label>Staff ID Auto Generation</label>
                            <label>Auto Staff ID</label>
                            <div className="form-check mb-3">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    value=""
                                    id="defaultCheck1"
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="defaultCheck1"
                                >
                                    Disabled
                                </label>
                            </div>
                            <div className="form-check mb-3">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    value=""
                                    id="defaultCheck1"
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="defaultCheck1"
                                >
                                    Enabled
                                </label>
                            </div>
                            
                            <Row className="mb-3">
                                <label
                                    htmlFor="example-text-input"
                                    className="col-md-2 col-form-label"
                                >
                                    Staff ID Prefix 
                                </label>
                                <div className="col-md-10">
                                    <input
                                        className="form-control"
                                        type="text"

                                    />
                                </div>
                            </Row>
                            <Row className="mb-3">
                                <label className="col-md-2 col-form-label">Staff No. Digit </label>
                                <div className="col-md-10">
                                    <select className="form-control">
                                        <option> Select </option>
                                        <option> 1</option>
                                        <option> 2 </option>
                                        <option> 3 </option>
                                        <option> 4 </option>



                                    </select>
                                </div>
                            </Row>
                              
                            <Row className="mb-3">
                                <label
                                    htmlFor="example-text-input"
                                    className="col-md-2 col-form-label"
                                >
                                    Staff ID Start From 
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

export default connect(null, { setBreadcrumbItems })(IdAutoGenerationAdmin);