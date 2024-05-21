import React, { useEffect } from "react"
import { Link, useNavigate } from 'react-router-dom';


import {
    Table,
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    Container,
} from "reactstrap"

import { connect } from "react-redux";

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions";
import HeaderTeacher from "../../components/HorizontalLayoutTeacher/HeaderTeacher";
import NvbarTeacher from "../../components/HorizontalLayoutTeacher/NvbarTeacher";



const NoticeBoardLibrarian = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "Communicate", link: "#" },
    ]
    const navigate = useNavigate();

    useEffect(() => {
        props.setBreadcrumbItems('Notice Board', breadcrumbItems)
    })
    const handleClick = () => {
        navigate('/communicate-add-notice-board-librarian');
    };
    const handleClickProfile = () => {
        navigate('/student-profile');
    };
    const iconStyle = {
        cursor: 'pointer',
        display: 'inline-block',
        marginRight: '10px',
        fontSize: '24px',
        color: 'blue' // Change color as needed
    };

    const actionIconStyle = {
        ...iconStyle, // Inherit styles from iconStyle
        color: 'red' // Example: Change color for delete icon
    };
    const editIconStyle = {
        ...iconStyle,
        color: 'black' // Color for edit icon (black)
    };


    return (
        <React.Fragment>

                <Row>
                    <div className="d-flex   mb-2">
                        <div></div>

                        {/* Button */}
                     
                </div>
                <div className="d-flex justify-content-between  mb-2">
                    <div></div>
                    {/* Button */}
                    <button className="btn btn-primary" onClick={handleClick}>Post New Message</button>
                   
                   
                </div>
                    <Col lg={12}>
                    <Card>
            <CardBody>
              <CardTitle className="h4">Notice Board</CardTitle>

              <div className="table-responsive">
                <div className="table mb-0">
                  <div className="tbody">
                    <div className="tr">
                      <div className="td">
                        <span style={iconStyle}>
                          <i className="ti-email"></i>
                        </span>
                        <span>Online Classes Preparation</span>
                      </div>
                    </div>
                    <div className="tr">
                      <div className="td">
                        <span style={iconStyle}>
                          <i className="ti-email"></i>
                        </span>
                        <span>Holi Celebration Notification</span>
                      </div>
                    </div>
                    <div className="tr">
                      <div className="td">
                        <span style={iconStyle}>
                          <i className="ti-email"></i>
                        </span>
                        <span>Staff Meeting</span>
                      </div>
                    </div>
                   
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
                    </Col>
                </Row>
         
        </React.Fragment>
    )
}

export default connect(null, { setBreadcrumbItems })(NoticeBoardLibrarian);