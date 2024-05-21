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
import { Editor } from "react-draft-wysiwyg"

import { connect } from "react-redux";

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions";
import image from "../../assets/images/users/clickatell-logo-vector-e1646922608318.png"

const PrintHeader = (props) => {
    document.title = "Form Elements | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "settings", link: "#" },
    ]

    useEffect(() => {
        props.setBreadcrumbItems('Print Header Footer', breadcrumbItems)
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


                                    Header Image (2230px X 300px)
                                </label>
                                <img src="https://eusic-2018.challenges.org/wp-content/uploads/sites/6/2015/11/header-image-5.jpg" />
                            </Row>
                            <div className="mb-3">
                                <form method="post">
                                    <Editor
                                        toolbarClassName="toolbarClassName"
                                        wrapperClassName="wrapperClassName"
                                        editorClassName="editorClassName"
                                    />
                                </form>
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

export default connect(null, { setBreadcrumbItems })(PrintHeader);