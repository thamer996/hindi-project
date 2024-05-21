import React, { useEffect } from "react"
import { Row, Col, Card, Input } from "reactstrap"
import { connect } from "react-redux";

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions";

//Import Email Sidebar

import { Editor } from "react-draft-wysiwyg"

import HeaderTeacher from "../../components/HorizontalLayoutTeacher/HeaderTeacher";
import NvbarTeacher from "../../components/HorizontalLayoutTeacher/NvbarTeacher";
import EmailSideBarAdminSms from "./EmailSideBarAdminSms";



const SendSmsAdmin = (props) => {

    document.title = "Email Compose | Lexa - Responsive Bootstrap 5 Admin Dashboard";

    const breadcrumbItems = [
        { title: "Lexa", link: "#" },
        { title: "Send SMS", link: "#" },

    ]

    useEffect(() => {
        props.setBreadcrumbItems('Send SMS', breadcrumbItems)
    })

    return (
        <React.Fragment>

           
                <Row className="mt-5">
                    <Col xs="12">
                        {/* Render Email SideBar */}
                        <EmailSideBarAdminSms />

                        <div className="email-rightbar mb-3">
                            <Card>
                                <div className="card-body">

                                    <div>
                                        <div className="mb-3">

                                            <select className="form-select">
                                                <option value="">Select SMS Template</option>
                                                <option value="template1">Sports Day Events</option>
                                                <option value="template2">National Republic Day</option>

                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <Input type="text" className="form-control" placeholder="Title" />
                                        </div>
                                        <label>Send Through</label>
                                        <div className="form-check mb-3">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value=""
                                                id="defaultCheck1"
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="defaultCheck1"
                                            >
                                                SMS
                                            </label>
                                        </div>
                                        <div className="form-check mb-3">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value=""
                                                id="defaultCheck1"
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="defaultCheck1"
                                            >
                                                Mobile App
                                            </label>
                                        </div>
                                        <div className="mb-3">
                                            <Input type="file" className="form-control" placeholder="Attachment " />
                                        </div>
                                        <div className="mb-3">
                                            <Input type="text" className="form-control" placeholder="template ID" />
                                        </div>

                                        <div className="mb-3">
                                            <textarea
                                                className="form-control"
                                                rows="4"
                                                placeholder="Saisissez votre message SMS ici..."
                                            ></textarea>
                                        </div>

                                        <div className="btn-toolbar form-group mb-0">
                                            <div className="">
                                                <button type="button" className="btn btn-success waves-effect waves-light me-1"><i className="far fa-save"></i></button>
                                                <button type="button" className="btn btn-success waves-effect waves-light me-1"><i className="far fa-trash-alt"></i></button>
                                                <button className="btn btn-primary waves-effect waves-light">
                                                    <span>Send</span> <i className="fab fa-telegram-plane ms-2"></i>
                                                </button>
                                            </div>
                                        </div>

                                    </div>

                                </div>

                            </Card>
                        </div>
                    </Col>
                </Row>
          

        </React.Fragment>
    )
}

export default connect(null, { setBreadcrumbItems })(SendSmsAdmin);