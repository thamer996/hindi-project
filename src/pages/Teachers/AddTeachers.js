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

const AddTeachers = (props) => {
  document.title = "Form Elements | Lexa - Responsive Bootstrap 5 Admin Dashboard";

  
  const breadcrumbItems = [
    { title: "Smart school", link: "#" },
    { title: "Add teacher", link: "#" },
  ]

  useEffect(() => {
    props.setBreadcrumbItems('Add Teacher', breadcrumbItems)
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
                 FullName
                    </label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    type="text"
                   
                  />
                </div>
              </Row>
              <Row className="mb-3">
                <label className="col-md-2 col-form-label">Gender</label>
                <div className="col-md-10">
                  <select className="form-control">
                  <option> Select </option>
                    <option> Male </option>
                    <option> Female </option>
                    
                  </select> 
                </div>
              </Row>
              <Row className="mb-3">
                <label
                  htmlFor="example-date-input"
                  className="col-md-2 col-form-label"
                >
                  Date Of birth
                    </label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    type="date"
                    id="example-date-input"
                  />
                </div>
              </Row>
              <Row className="mb-3">
                <label className="col-md-2 col-form-label">Class</label>
                <div className="col-md-10">
                  <select className="form-control">
                   
                    <option> Grade 1 </option>
                    <option> Grade 2 </option>
                    <option> Grade 3 </option>
                    <option> Grade 4 </option>
                    <option> Grade 5 </option>
                    <option> Grade 6 </option>
                  </select> 
                </div>
              </Row>
              <Row className="mb-3">
                <label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label"
                >
                 Subject
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
              <Row className="mb-3">
                <label
                  htmlFor="example-search-input"
                  className="col-md-2 col-form-label"
                >
                  Contact
                    </label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    type="search"
                    
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

export default connect(null, { setBreadcrumbItems })(AddTeachers);