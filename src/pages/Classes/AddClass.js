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

const AddClass = (props) => {
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
                <label className="col-md-2 col-form-label">Class</label>
                <div className="col-md-10">
                  <select className="form-control">
                  <option> Select </option>
                    <option> 1 </option>
                    <option> 2 </option>
                    <option> 3</option>
                    <option> 4 </option>
                    <option> 5 </option>
                    <option> 6 </option>
                    
                  </select> 
                </div>
              </Row>
              
              <Row className="mb-3">
                <label className="col-md-2 col-form-label">Section</label>
                <div className="col-md-10">
                  <select className="form-control">
                  <option> Select </option>
                    <option> A </option>
                    <option> B </option>
                    <option> C </option>
                    
                  </select> 
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

export default connect(null, { setBreadcrumbItems })(AddClass);