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

const AddTopicAdmin = (props) => {
  document.title = "Form Elements | Lexa - Responsive Bootstrap 5 Admin Dashboard";

  
  const breadcrumbItems = [
    { title: "Smart school", link: "#" },
    { title: "Add Topic", link: "#" },
  ]

  useEffect(() => {
    props.setBreadcrumbItems('Add Topic', breadcrumbItems)
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
                                <label className="col-md-2 col-form-label">Class</label>
                                <div className="col-md-10">
                                    <select className="form-control">
                                        <option> Select </option>
                                        <option>Class 1</option>
                                        <option>Class 2</option>
                                        <option>Class 3</option>
                                        <option>Class 4</option>
                                        <option>Class 5</option>



                                    </select>
                                </div>
                            </Row>
                            <Row className="mb-3">
                                <label className="col-md-2 col-form-label">Section</label>
                                <div className="col-md-10">
                                    <select className="form-control">
                                        <option> Select </option>
                                        <option>A</option>
                                        <option>B</option>
                                        <option>C</option>
                                        <option>D</option>




                                    </select>
                                </div>
                            </Row>





                            <Row className="mb-3">
                                <label className="col-md-2 col-form-label">Subject Group</label>
                                <div className="col-md-10">
                                    <select className="form-control">
                                        <option> Select </option>
                                        <option>Class 1st Subject Group</option>




                                    </select>
                                </div>
                            </Row>
                            <Row className="mb-3">
                                <label className="col-md-2 col-form-label">Subject</label>
                                <div className="col-md-10">
                                    <select className="form-control">
                                        <option> Select </option>
                                        <option>English(210)</option>




                                    </select>
                                </div>
                            </Row>
                            <Row className="mb-3">
                                <label className="col-md-2 col-form-label">Lesson</label>
                                <div className="col-md-10">
                                    <select className="form-control">
                                        <option> Select </option>
                                        <option>Identify the learning objectives</option>




                                    </select>
                                </div>
                            </Row>
                            <Row className="mb-3">
                                <label
                                    htmlFor="example-text-input"
                                    className="col-md-2 col-form-label"
                                >


                                    Topic Name
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

export default connect(null, { setBreadcrumbItems })(AddTopicAdmin);