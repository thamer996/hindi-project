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

const AddCustomSetting = (props) => {
    document.title = "Form Elements | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "Add Custom", link: "#" },
    ]

    useEffect(() => {
        props.setBreadcrumbItems('Add Add Custom', breadcrumbItems)
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
                                <label className="col-md-2 col-form-label">Field Belongs To </label>
                                <div className="col-md-10">
                                    <select className="form-control">
                                        <option> Select </option>
                                     



                                    </select>
                                </div>
                                </Row>
                                <Row className="mb-3">
                                <label className="col-md-2 col-form-label">Field Type</label>
                                <div className="col-md-10">
                                    <select className="form-control">
                                        <option> Select </option>
                                     



                                    </select>
                                </div>
                                </Row>

                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >


                                        Field Name
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


                                        Grid (Bootstrap Column eg. 6) - Max is 12
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


                                        Field Values (Separate By Comma)
                                    </label>
                                    <div className="col-md-10">
                                        <input
                                            className="form-control"
                                            type="text"

                                        />
                                    </div>
                                </Row>
                                <label>Validation</label>
                            <div className="form-check mb-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="defaultCheck1"
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="defaultCheck1"
                                >
                                    Required
                                </label>
                            </div>
                            <label>Visibility</label>
                            <div className="form-check mb-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="defaultCheck1"
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="defaultCheck1"
                                >
                                    On Table
                                </label>
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

export default connect(null, { setBreadcrumbItems })(AddCustomSetting);