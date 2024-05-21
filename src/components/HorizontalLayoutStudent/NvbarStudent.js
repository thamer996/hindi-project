import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Collapse } from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import withRouter from "../Common/withRouter";
import { withTranslation } from "react-i18next";

const NvbarTeacher = (props) => {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);
  const toggleDropdown1 = () => {
    setIsOpen1(!isOpen1);
    // Close other dropdowns
    setIsOpen2(false);
    setIsOpen3(false);
    setIsOpen4(false);
  };
  const toggleDropdown2 = () => {
    setIsOpen2(!isOpen2);
    // Close other dropdowns
    setIsOpen1(false);
    setIsOpen3(false);
    setIsOpen4(false);
  };
  const toggleDropdown3 = () => {
    setIsOpen3(!isOpen3);
    // Close other dropdowns
    setIsOpen1(false);
    setIsOpen2(false);
    setIsOpen4(false);
  };
  const toggleDropdown4 = () => {
    setIsOpen4(!isOpen4);
    // Close other dropdowns
    setIsOpen1(false);
    setIsOpen2(false);
    setIsOpen3(false);
  };

  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="topnav">
          <nav className="navbar navbar-light navbar-expand-lg topnav-menu" id="navigation">
            <ul className="navbar-nav ">
              <li className="nav-item dropdown">
                <NavLink to="/student-dashboard" className="nav-link dropdown-toggle arrow-none">
                  <i className="ti-dashboard"></i>
                  {props.t("Dashboard")}
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink to="/students-prof" activeClassName="active" className="nav-link dropdown-toggle arrow-none">
                  <i className="ti-user"></i>
                  {props.t("My Profile")}
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink to="/fees" activeClassName="active" className="nav-link dropdown-toggle arrow-none">
                  <i className="ti-crown"></i>
                  {props.t("Fees")}
                </NavLink>
              </li>
              {/* Examination, Homework, Syllabus Status, Teacher Review Dropdown */}
              <li className="nav-item dropdown">
                <span className="nav-link dropdown-toggle arrow-none" onClick={toggleDropdown1} style={{ cursor: "pointer" }}>
                  <i className="ti-map"></i> {props.t("Examinations and Reviews")}
                </span>
                <Collapse isOpen={isOpen1}>
                  <div className="dropdown-menu show">
                    <NavLink to="/homeworkstudent" className="dropdown-item">
                      {props.t("Homework")}
                    </NavLink>
                    <NavLink to="/examinationresult" className="dropdown-item">
                      {props.t("Examination Result")}
                    </NavLink>
                    <NavLink to="/classtimetable" className="dropdown-item">
                      {props.t("Class Time Table")}
                    </NavLink>
                    <NavLink to="/Treview" className="dropdown-item">
                      {props.t("Teachers Review")}
                    </NavLink>
                  </div>
                </Collapse>
              </li>

              {/* Apply Leave and Attendance Dropdown */}
              <li className="nav-item dropdown">
                <span className="nav-link dropdown-toggle arrow-none" onClick={toggleDropdown2} style={{ cursor: "pointer" }}>
                  <i className="ti-download"></i> {props.t("Apply Leave and Attendance")}
                </span>
                <Collapse isOpen={isOpen2}>
                  <div className="dropdown-menu show">
                    <NavLink to="/attendance" className="dropdown-item">
                      {props.t("Attendance")}
                    </NavLink>
                    <NavLink to="/applyleave" className="dropdown-item">
                      {props.t("Apply Leave")}
                    </NavLink>
                  </div>
                </Collapse>
              </li>

              {/* Hostels and Transportation Dropdown */}
              <li className="nav-item dropdown">
                <span className="nav-link dropdown-toggle arrow-none" onClick={toggleDropdown3} style={{ cursor: "pointer" }}>
                  <i className="ti-settings"></i> {props.t("Hostels and Transportation")}
                </span>
                <Collapse isOpen={isOpen3}>
                  <div className="dropdown-menu show">
                    <NavLink to="/hostels" className="dropdown-item">
                      {props.t("Hostels")}
                    </NavLink>
                    <NavLink to="/transportroutes" className="dropdown-item">
                      {props.t("Transport Routes")}
                    </NavLink>
                  </div>
                </Collapse>
              </li>

              {/* Visitor Book and Books Dropdown */}
              <li className="nav-item dropdown">
                <span className="nav-link dropdown-toggle arrow-none" onClick={toggleDropdown4} style={{ cursor: "pointer" }}>
                  <i className="ti-book"></i> {props.t("Visitor Book")}
                </span>
                <Collapse isOpen={isOpen4}>
                  <div className="dropdown-menu show">
                    <NavLink to="/visitorbook" className="dropdown-item">
                      {props.t("Visitor Book")}
                    </NavLink>
                    <NavLink to="/booklist" className="dropdown-item">
                      {props.t("Books Issued")}
                    </NavLink>
                  </div>
                </Collapse>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </React.Fragment>
  );
};

NvbarTeacher.propTypes = {
  t: PropTypes.any,
};

const mapStatetoProps = (state) => {
  const { leftMenu } = state.Layout;
  return { leftMenu };
};

export default withRouter(connect(mapStatetoProps, {})(withTranslation()(NvbarTeacher)));