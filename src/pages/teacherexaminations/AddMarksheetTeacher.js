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
import HeaderTeacher from "../../components/HorizontalLayoutTeacher/HeaderTeacher";
import NvbarTeacher from "../../components/HorizontalLayoutTeacher/NvbarTeacher";

const AddMarksheetTeacher = (props) => {
    document.title = "Form Elements | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "Add Marksheet", link: "#" },
    ]

    useEffect(() => {
        props.setBreadcrumbItems('Add Marksheet', breadcrumbItems)
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
                                <label
                                    htmlFor="example-text-input"
                                    className="col-md-2 col-form-label"
                                >
                                    Template
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
                                    Exam Name
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
                                    Exam Center 
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
                                    Body Text
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
                                    Footer Text
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
                                   Printing Date
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
                                    Header image
                                </label>
                                <div className="col-md-10">
                                    <input
                                        className="form-control"
                                        type="file"

                                    />
                                </div>
                            </Row>
                            <Row className="mb-3">
                                <label
                                    htmlFor="example-text-input"
                                    className="col-md-2 col-form-label"
                                >
                                    Left Logo
                                </label>
                                <div className="col-md-10">
                                    <input
                                        className="form-control"
                                        type="file"

                                    />
                                </div>
                            </Row>
                            <Row className="mb-3">
                                <label
                                    htmlFor="example-text-input"
                                    className="col-md-2 col-form-label"
                                >
                                    Right Logo
                                </label>
                                <div className="col-md-10">
                                    <input
                                        className="form-control"
                                        type="file"

                                    />
                                </div>
                            </Row>
                            <Row className="mb-3">
                                <label
                                    htmlFor="example-text-input"
                                    className="col-md-2 col-form-label"
                                >
                                    Left Sign
                                </label>
                                <div className="col-md-10">
                                    <input
                                        className="form-control"
                                        type="file"

                                    />
                                </div>
                            </Row>
                            <Row className="mb-3">
                                <label
                                    htmlFor="example-text-input"
                                    className="col-md-2 col-form-label"
                                >
                                    Middle Sign
                                </label>
                                <div className="col-md-10">
                                    <input
                                        className="form-control"
                                        type="file"

                                    />
                                </div>
                                </Row>
                                <Row className="mb-3">
                                <label
                                    htmlFor="example-text-input"
                                    className="col-md-2 col-form-label"
                                >
                                    Right Sign
                                </label>
                                <div className="col-md-10">
                                    <input
                                        className="form-control"
                                        type="file"

                                    />
                                </div>
                                </Row>
                            <Row className="mb-3">
                                <label
                                    htmlFor="example-text-input"
                                    className="col-md-2 col-form-label"
                                >
                                    Background Image
                                </label>
                                <div className="col-md-10">
                                    <input
                                        className="form-control"
                                        type="file"

                                    />
                                </div>
                            </Row>
                            <div
                                className="form-check form-switch form-switch-lg mb-3"
                            >
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="customSwitchsizelg"
                                    defaultChecked
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="customSwitchsizelg"
                                >
                                    Name
                                </label>
                            </div>
                            <div
                                className="form-check form-switch form-switch-lg mb-3"
                            >
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="customSwitchsizelg"
                                    defaultChecked
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="customSwitchsizelg"
                                >
                                    Father Name
                                </label>
                            </div>
                            <div
                                className="form-check form-switch form-switch-lg mb-3"
                            >
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="customSwitchsizelg"
                                    defaultChecked
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="customSwitchsizelg"
                                >
                                    Mother Name
                                </label>
                            </div>
                            <div
                                className="form-check form-switch form-switch-lg mb-3"
                            >
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="customSwitchsizelg"
                                    defaultChecked
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="customSwitchsizelg"
                                >
                                    Exam Session
                                </label>
                            </div>

                            <div
                                className="form-check form-switch form-switch-lg mb-3"
                            >
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="customSwitchsizelg"
                                    defaultChecked
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="customSwitchsizelg"
                                >
                                    Admission No
                                </label>
                            </div>
                            <div
                                className="form-check form-switch form-switch-lg mb-3"
                            >
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="customSwitchsizelg"
                                    defaultChecked
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="customSwitchsizelg"
                                >
                                    Division
                                </label>
                            </div>
                            <div
                                className="form-check form-switch form-switch-lg mb-3"
                            >
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="customSwitchsizelg"
                                    defaultChecked
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="customSwitchsizelg"
                                >
                                    Rank
                                </label>
                            </div>
                            <div
                                className="form-check form-switch form-switch-lg mb-3"
                            >
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="customSwitchsizelg"
                                    defaultChecked
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="customSwitchsizelg"
                                >
                                    Roll Number
                                </label>
                            </div>
                            <div
                                className="form-check form-switch form-switch-lg mb-3"
                            >
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="customSwitchsizelg"
                                    defaultChecked
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="customSwitchsizelg"
                                >
                                    Photo
                                </label>
                            </div>
                            <div
                                className="form-check form-switch form-switch-lg mb-3"
                            >
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="customSwitchsizelg"
                                    defaultChecked
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="customSwitchsizelg"
                                >
                                    Class
                                </label>
                            </div>
                            <div
                                className="form-check form-switch form-switch-lg mb-3"
                            >
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="customSwitchsizelg"
                                    defaultChecked
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="customSwitchsizelg"
                                >
                                   Section
                                </label>
                            </div>
                            <div
                                className="form-check form-switch form-switch-lg mb-3"
                            >
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="customSwitchsizelg"
                                    defaultChecked
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="customSwitchsizelg"
                                >
                                    Date of Birth
                                </label>
                            </div>
                            <div
                                className="form-check form-switch form-switch-lg mb-3"
                            >
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="customSwitchsizelg"
                                    defaultChecked
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="customSwitchsizelg"
                                >
                                    Remark
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

export default connect(null, { setBreadcrumbItems })(AddMarksheetTeacher);