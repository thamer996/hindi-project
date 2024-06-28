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

const StudentAdmissionAdmin = (props) => {
    document.title = "Form Elements | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "Student Details", link: "#" },
    ]

    useEffect(() => {
        props.setBreadcrumbItems('Student Admission', breadcrumbItems)
    })

    const [toggleSwitch, settoggleSwitch] = useState(true)
    const [toggleSwitchSize, settoggleSwitchSize] = useState(true)
    const [selectedOption, setSelectedOption] = useState('');
    const [showInputs, setShowInputs] = useState(false);

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
        setShowInputs(true); // Afficher les champs de saisie lorsque l'option est sélectionnée
    };


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
                                            <option>Male</option>
                                            <option>Female</option>

                                        </select> 
                                    </div>
                                </Row>

                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >


                                        Date Of Birth
                                    </label>
                                    <div className="col-md-10">
                                        <input
                                            className="form-control"
                                            type="text"

                                        />
                                    </div>
                                </Row>
                                <Row className="mb-3">
                                    <label className="col-md-2 col-form-label">Category</label>
                                    <div className="col-md-10">
                                        <select className="form-control">
                                            <option> Select </option>
                                            <option>General</option>
                                            <option>OBC</option>
                                            <option> Special </option>

                                        </select> 
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
                                        htmlFor="example-text-input"
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
                                            <option>O+</option>
                                            <option>A+</option>
                                            <option>B+</option>
                                            <option>AB+</option>

                                        </select> 
                                    </div>
                                </Row>
                                <Row className="mb-3">
                                    <label className="col-md-2 col-form-label">House</label>
                                    <div className="col-md-10">
                                        <select className="form-control">
                                            <option> Select </option>
                                            <option>Blue</option>
                                            <option>Red</option>
                                            <option>Green</option>
                                            <option>Yellow</option>

                                        </select> 
                                    </div>
                                </Row>
                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >


                                        Height
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


                                        Weight
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



                                        Measurement Date
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



                                        Medical History
                                    </label>
                                    <div className="col-md-10">
                                        <input
                                            className="form-control"
                                            type="text"

                                        />
                                    </div>
                                </Row>

                                <label>Transport Details</label>
                                <Row className="mb-3">
                                    <label className="col-md-2 col-form-label">Route List</label>
                                    <div className="col-md-10">
                                        <select className="form-control">
                                            <option> Select </option>
                                            <optgroup label="Brooklyn Central">
                                                <option>VH1001</option>

                                            </optgroup>
                                            <optgroup label="Brooklyn East">
                                                <option>VH4584</option>
                                                <option>VH1001</option>

                                            </optgroup>

                                        </select> 
                                    </div>
                                </Row>
                                <Row className="mb-3">
                                    <label className="col-md-2 col-form-label"> Pickup Point</label>
                                    <div className="col-md-10">
                                        <select className="form-control">
                                            <option> Select </option>


                                        </select> 
                                    </div>
                                </Row>
                                <Row className="mb-3">
                                    <label className="col-md-2 col-form-label">Fees Month
                                    </label>
                                    <div className="col-md-10">
                                        <select className="form-control">
                                            <option> Select </option>
                                            <option>April</option>
                                            <option>May</option>
                                            <option>June</option>
                                            <option>July</option>

                                        </select> 
                                    </div>
                                </Row>
                                <label>Hostel Details</label>
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
                                    <label className="col-md-2 col-form-label">Room No.</label>
                                    <div className="col-md-10">
                                        <select className="form-control">
                                            <option> Select </option>
                                            <option>B1 (One Bed)</option>
                                            <option>B3 (One Bed)</option>
                                            <option>B4 (One Bed)</option>

                                        </select> 
                                    </div>
                                </Row>
                                <label>Fees Details</label>
                                <label>Parent Guardian Detail</label>
                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >



                                        Father Name
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



                                        Father Phone
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



                                        Father Occupation
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



                                        Father Photo
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



                                        Mother Name
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



                                        Mother Phone
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




                                        Mother Occupation
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




                                        Mother Photo
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




                                        Mother Occupation
                                    </label>
                                    <div className="col-md-10">
                                        <input
                                            className="form-control"
                                            type="text"

                                        />
                                    </div>
                                </Row>
                                <label>If Guardian Is</label>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="exampleRadios"
                                        id="exampleRadios2"
                                        value="option2"
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="exampleRadios2"
                                    >
                                        Father
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="exampleRadios"
                                        id="exampleRadios2"
                                        value="option2"
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="exampleRadios2"
                                    >
                                        Mother
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="exampleRadios"
                                        id="exampleRadios2"
                                        value="option2"
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="exampleRadios2"
                                    >
                                        Other
                                    </label>
                                </div>
                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >




                                        Guardian Name
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




                                        Guardian Relation
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




                                        Guardian Email
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




                                        Guardian Photo
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




                                        Guardian Photo
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




                                        Guardian Occupation
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




                                        Guardian Address
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

export default connect(null, { setBreadcrumbItems })(StudentAdmissionAdmin);