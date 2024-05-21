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

const AddHostelRoomAdmin = (props) => {
    document.title = "Form Elements | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "Add Hostel Room", link: "#" },
    ]

    useEffect(() => {
        props.setBreadcrumbItems('Add Hostel Room', breadcrumbItems)
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
                                    htmlFor="example-search-input"
                                    className="col-md-2 col-form-label"
                                >
                                    Room Number / Name
                                </label>
                                <div className="col-md-10">
                                    <input
                                        className="form-control"
                                        type="text"

                                    />
                                </div>
                            </Row>
                            <Row className="mb-3">
                                <label className="col-md-2 col-form-label">Hostel</label>
                                <div className="col-md-10">
                                    <select className="form-control">
                                        <option> Select </option>
                                        <option>Boys Hostel 101</option>
                                        <option>Boys Hostel 102</option>
                                        <option>Girls Hostel 103</option>
                                        <option>Girls Hostel 104</option>




                                    </select>
                                </div>
                            </Row>
                            <Row className="mb-3">
                                <label className="col-md-2 col-form-label">Room Type</label>
                                <div className="col-md-10">
                                    <select className="form-control">
                                        <option> Select </option>
                                        <option>One Bed</option>
                                        <option>One Bed AC</option>
                                        <option>Two Bed</option>
                                        <option>Two Bed AC</option>




                                    </select>
                                </div>
                            </Row>
                            <Row className="mb-3">
                                <label
                                    htmlFor="example-search-input"
                                    className="col-md-2 col-form-label"
                                >
                                    Number Of Bed
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
                                    Cost Per Bed
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
                                    Description
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

export default connect(null, { setBreadcrumbItems })(AddHostelRoomAdmin);