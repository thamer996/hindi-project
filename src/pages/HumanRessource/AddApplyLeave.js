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

const AddApplyLeave = (props) => {
    document.title = "Form Elements | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "Apply Leave", link: "#" },
    ]

    useEffect(() => {
        props.setBreadcrumbItems('Apply Leave', breadcrumbItems)
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
                                <label className="col-md-2 col-form-label">

                                    Available Leave</label>
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

export default connect(null, { setBreadcrumbItems })(AddApplyLeave);