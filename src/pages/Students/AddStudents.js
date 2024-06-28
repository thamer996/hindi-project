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

const AddStudents = (props) => {
  document.title = "Form Elements | Lexa - Responsive Bootstrap 5 Admin Dashboard";

  
  const breadcrumbItems = [
    { title: "Smart school", link: "#" },
    { title: "Add student", link: "#" },
  ]

  useEffect(() => {
    props.setBreadcrumbItems('Add Students', breadcrumbItems)
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
                 Admission No
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
                 Roll Number
                    </label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    type="text"
                   
                  />
                </div>
              </Row>
              <Row className="mb-3">
                <label className="col-md-2 col-form-label">Class</label>
                <div className="col-md-10">
                  <select className="form-control">
                  <option> Select </option>
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
                <label className="col-md-2 col-form-label">Section</label>
                <div className="col-md-10">
                  <select className="form-control">
                   
                    <option> Select  </option>
                    <option> Section B   </option>
                    <option> Section C   </option>
                    
                  </select> 
                </div>
              </Row>
              <Row className="mb-3">
                <label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label"
                >
                 First Name
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
                 Last Name
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
                Date of Birth
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
                <label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label"
                >
                 Religion
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
                 Caste
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
                 Mobile Number
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
                  htmlFor="example-date-input"
                  className="col-md-2 col-form-label"
                >
                  Email
                    </label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    type="texte"
                    id="example-date-input"
                  />
                </div>
              </Row>
             
              <Row className="mb-3">
                <label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label"
                >
                 Admission Date
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
                  Student Photo
                    </label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    type="file"
                    
                  />
                </div>
              </Row>
             <Row className="mb-3">
  <label className="col-md-2 col-form-label">Blood Group</label>
  <div className="col-md-10">
    <select className="form-control">
      <option> Select </option>
      <option> A+ </option>
      <option> A- </option>
      <option> B+ </option>
      <option> B- </option>
      <option> AB+ </option>
      <option> AB- </option>
      <option> O+ </option>
      <option> O- </option>
    </select> 
  </div>
</Row>

              <Row className="mb-3">
                <label
                  htmlFor="example-search-input"
                  className="col-md-2 col-form-label"
                >
                 Height
                    </label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    type="search"
                    
                  />
                </div>
              </Row>
              <Row className="mb-3">
                <label
                  htmlFor="example-search-input"
                  className="col-md-2 col-form-label"
                >
                 Weight
                    </label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    type="search"
                    
                  />
                </div>
              </Row>
              <Row className="mb-3">
                <label
                  htmlFor="example-search-input"
                  className="col-md-2 col-form-label"
                >
                  Father Name
                    </label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    type="search"
                    
                  />
                </div>
              </Row>
              <Row className="mb-3">
                <label
                  htmlFor="example-search-input"
                  className="col-md-2 col-form-label"
                >
                  Father Phone
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

export default connect(null, { setBreadcrumbItems })(AddStudents);