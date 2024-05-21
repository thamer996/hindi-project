import React, { useEffect, useState } from "react"

import {
  Card,
  CardBody,
  Col,
  Row,
  CardTitle,
  FormGroup,
  Form,
  Table
} from "reactstrap"

import { connect } from "react-redux";

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions";
import HeaderTeacher from "../../components/HorizontalLayoutTeacher/HeaderTeacher";
import NvbarTeacher from "../../components/HorizontalLayoutTeacher/NvbarTeacher";

const AddTeacherHomework = (props) => {
  document.title = "Form Elements | Lexa - Responsive Bootstrap 5 Admin Dashboard";

  
  const breadcrumbItems = [
    { title: "Smart school", link: "#" },
    { title: "Homework", link: "#" },
  ]

  useEffect(() => {
    props.setBreadcrumbItems('Daily Assignment', breadcrumbItems)
  })

  const [toggleSwitch, settoggleSwitch] = useState(true)
  const [toggleSwitchSize, settoggleSwitchSize] = useState(true)

  return (
    <React.Fragment>
            
    <Row>
        <div className="d-flex mb-2">
            <div></div>
            {/* Vos éléments de filtre ici */}
          
            <label className="col-form-label">Class</label>
            <div className="col-md-2">
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
            <label className="col-form-label">Section</label>
            <div className="col-md-2">
                <select className="form-control">
                    <option> Select </option>
                    <option> A </option>
                    <option> B </option>
                    <option>C </option>
                    <option> D </option>
                   
                </select>
            </div>
           
            <label className="col-form-label">Subject Group</label>
            <div className="col-md-2">
                <select className="form-control">
                    <option> Select </option>
                    <option> Class 1st Subject Group </option>
                    
                   
                </select>
            </div>
            
            <label className="col-form-label">Subject</label>
            <div className="col-md-2">
                <select className="form-control">
                    <option> Select </option>
                    <option> English(210) </option>
                    <option> Hindi(230) </option>
                    
                   
                </select>
            </div>
           
           

          
            <label className="col-form-label">Date</label>
                    <div className="col-md-2">
                        <input type="date" className="form-control" placeholder="" />
                    </div>
                        <div>
                            <button className="btn btn-primary" >Search</button>
                        </div>
                    </div>
           
            
       
       
    </Row>
    <Row>
        <Col lg={12}>
            <Card>

                <CardBody>
                    <CardTitle className="h4">Daily Assignment List</CardTitle>


                    <div className="table-responsive">
                        <Table className="table mb-0">
                            <thead>
                                <tr>
                                <th>Student Name</th>
                                    <th>Class</th>
                                    <th>Section</th>
                                    <th>Subject</th>
                                    <th>Title</th>
                                    <th>Submission Date </th>
                                    <th>Evaluation Date </th>
                                    <th>Evaluated by </th>
                                    <th>Action </th>



                                </tr>
                            </thead>
                            <tbody>
                               
                               
                            </tbody>
                        </Table>

                    </div>
                </CardBody>
            </Card>
        </Col>
    </Row>

</React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(AddTeacherHomework);