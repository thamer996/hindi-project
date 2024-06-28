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

const AddFeesMaster = (props) => {
    document.title = "Form Elements | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "Add fees Master", link: "#" },
    ]

    useEffect(() => {
        props.setBreadcrumbItems('Add Fees Master : 2023-24', breadcrumbItems)
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
                                <label className="col-md-2 col-form-label">Fees Group</label>
                                <div className="col-md-10">
                                    <select className="form-control">
                                        <option>Select</option>
                                        <option>Class 1 General</option>
                                        <option>Class 1 Lump Sum</option>
                                        <option> Class 1- I Installment</option>
                                       
                                    </select> 
                                </div>
                            </Row>
                            <Row className="mb-3">
                                <label className="col-md-2 col-form-label">Fees Type</label>
                                <div className="col-md-10">
                                    <select className="form-control">
                                        <option>Select</option>
                                        <option>Admission Fees</option>
                                        <option>1st Installment Fees</option>
                                        <option> 2nd Installment Fees</option>
                                        <option>3rd Installment Fees</option>
                                       
                                        <option>3th Installment Fees</option>

                                    </select> 
                                </div>
                            </Row>


                            <Row className="mb-3">
                                <label
                                    htmlFor="example-text-input"
                                    className="col-md-2 col-form-label"
                                >
                                    Due Date
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
                                    htmlFor="example-text-input"
                                    className="col-md-2 col-form-label"
                                >
                                    Amount ($)
                                </label>
                                <div className="col-md-10">
                                    <input
                                        className="form-control"
                                        type="text"

                                    />
                                </div>
                            </Row>
                            <label className="col-md-2 col-form-label">Fine Type</label>
                            <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        id="exampleRadios1"
                        value="option1"
                        defaultChecked
                      />
                      <label
                        className="form-check-label"
                        htmlFor="exampleRadios1"
                      >
                        None
                          </label>
                    </div>

                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        id="exampleRadios1"
                        value="option1"
                        defaultChecked
                      />
                      <label
                        className="form-check-label"
                        htmlFor="exampleRadios1"
                      >
                        Percentage
                          </label>
                    </div>
                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        id="exampleRadios1"
                        value="option1"
                        defaultChecked
                      />
                      <label
                        className="form-check-label"
                        htmlFor="exampleRadios1"
                      >
                        Fix Amount
                          </label>
                    </div>

                            <Row className="mb-3">
                                <label
                                    htmlFor="example-text-input"
                                    className="col-md-2 col-form-label"
                                >
                                    Percentage (%)
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
                                    Fix Amount ($)
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

export default connect(null, { setBreadcrumbItems })(AddFeesMaster);