import React, { useState } from "react"
import { Link } from "react-router-dom"
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    Card
} from "reactstrap"

// Import Editor
import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

//Import images
import avatar2 from "../../assets/images/users/user-2.jpg"
import avatar3 from "../../assets/images/users/user-3.jpg"
import avatar4 from "../../assets/images/users/user-4.jpg"
import avatar6 from "../../assets/images/users/user-6.jpg"

const EmailSideBarBoard = () => {
    const [modal, setmodal] = useState(false)

    return (
        <React.Fragment>
            <Card className="email-leftbar">


                <h5 className="mt-4">Message To</h5>

                <div className="mt-3">
                    <Link to="#" className="d-flex">

                        <div className="flex-shrink-0 me-3">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="customSwitchsizelg"
                                defaultChecked
                            />
                        </div>
                        <div className="flex-grow-1 chat-user-box">
                            <p className="user-title m-0">Students</p>

                        </div>
                    </Link>

                    <Link to="#" className="d-flex">
                        <div className="flex-shrink-0 me-3">
                        <input
                        type="checkbox"
                        className="form-check-input"
                        id="customSwitchsizelg"
                       
                      />
                        </div>
                        <div className="flex-grow-1 chat-user-box">
                            <p className="user-title m-0">Gardians</p>

                        </div>
                    </Link>

                    <Link to="#" className="d-flex">
                        <div className="flex-shrink-0 me-3">
                        <input
                        type="checkbox"
                        className="form-check-input"
                        id="customSwitchsizelg"
                       
                      />
                        </div>
                        <div className="flex-grow-1 chat-user-box" body>
                            <p className="user-title m-0">Admin</p>

                        </div>
                    </Link>

                    <Link to="#" className="d-flex">
                        <div className="flex-shrink-0 me-3">
                        <input
                        type="checkbox"
                        className="form-check-input"
                        id="customSwitchsizelg"
                        
                      />
                        </div>
                        <div className="flex-grow-1 chat-user-box">
                            <p className="user-title m-0">Teacher</p>

                        </div>
                    </Link>
                    <Link to="#" className="d-flex">
                        <div className="flex-shrink-0 me-3">
                        <input
                        type="checkbox"
                        className="form-check-input"
                        id="customSwitchsizelg"
                        
                      />
                        </div>
                        <div className="flex-grow-1 chat-user-box">
                            <p className="user-title m-0">Accountant</p>

                        </div>
                    </Link>
                    <Link to="#" className="d-flex">
                        <div className="flex-shrink-0 me-3">
                        <input
                        type="checkbox"
                        className="form-check-input"
                        id="customSwitchsizelg"
                       
                      />
                        </div>
                        <div className="flex-grow-1 chat-user-box">
                            <p className="user-title m-0">Librarian</p>

                        </div>
                    </Link>
                    <Link to="#" className="d-flex">
                        <div className="flex-shrink-0 me-3">
                        <input
                        type="checkbox"
                        className="form-check-input"
                        id="customSwitchsizelg"
                        
                      />
                        </div>
                        <div className="flex-grow-1 chat-user-box">
                            <p className="user-title m-0">Receptionist</p>

                        </div>
                    </Link>
                    <Link to="#" className="d-flex">
                        <div className="flex-shrink-0 me-3">
                        <input
                        type="checkbox"
                        className="form-check-input"
                        id="customSwitchsizelg"
                        
                      />
                        </div>
                        <div className="flex-grow-1 chat-user-box">
                            <p className="user-title m-0">Super Admin</p>

                        </div>
                    </Link>
                </div>
            </Card>

            <Modal
                isOpen={modal}
                role="dialog"
                autoFocus={true}
                centered={true}
                className="exampleModal"
                tabIndex="-1"
                toggle={() => {
                    setmodal(!modal)
                }}
            >
                <div className="modal-content">
                    <ModalHeader
                        toggle={() => {
                            setmodal(!modal)
                        }}
                    >
                        New Message
                    </ModalHeader>
                    <ModalBody>
                        <form>
                            <div className="mb-3">
                                <Input type="email" className="form-control" placeholder="To" />
                            </div>

                            <div className="mb-3">
                                <Input
                                    type="text"
                                    className="form-control"
                                    placeholder="Subject"
                                />
                            </div>
                            <Editor
                                toolbarClassName="toolbarClassName"
                                wrapperClassName="wrapperClassName"
                                editorClassName="editorClassName"
                            />
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            type="button"
                            color="secondary"
                            onClick={() => {
                                setmodal(!modal)
                            }}
                        >
                            Close
                        </Button>
                        <Button type="button" color="primary">
                            Send <i className="fab fa-telegram-plane ms-1"></i>
                        </Button>
                    </ModalFooter>
                </div>
            </Modal>
        </React.Fragment>
    )
}

export default EmailSideBarBoard
