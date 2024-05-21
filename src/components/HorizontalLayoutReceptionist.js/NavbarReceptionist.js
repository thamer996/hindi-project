import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"
import { Row, Col, Collapse } from "reactstrap"
import { Link } from "react-router-dom"
import withRouter from "../Common/withRouter"
import classname from "classnames"

//i18n
import { withTranslation } from "react-i18next"

import { connect } from "react-redux"

const NavbarReceptionist = props => {
  const [ui, setui] = useState(false)
  const [email, setemail] = useState(false)
  const [student, setstudent] = useState(false)
  const [behaviour, setbehaviour] = useState(false)
  const [academic, setacademic] = useState(false)
  const [hr, sethr] = useState(false)
  const [communicate, setcommunicate] = useState(false)
  const [library, setlibrary] = useState(false)
  const [report, setreport] = useState(false)
  const [form, setform] = useState(false)
  const [table, settable] = useState(false)
  const [chart, setchart] = useState(false)
  const [icon, seticon] = useState(false)
  const [map, setmap] = useState(false)
  const [extra, setextra] = useState(false)
  const [moreItem, setMoreItem] = useState(false);
  const [newElement, setNewElement] = useState(false);

  useEffect(() => {
    const pathName = process.env.PUBLIC_URL + props.router.location.pathname;

    var matchingMenuItem = null;
    var ul = document.getElementById("navigation");
    var items = ul.getElementsByTagName("a");
    removeActivation(items);
    for (var i = 0; i < items.length; ++i) {
      if (pathName === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
  });

  const removeActivation = (items) => {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i];
      const parent = items[i].parentElement;
      if (item && item.classList.contains("active")) {
        item.classList.remove("active");
      }
      if (parent) {
        if (parent.classList.contains("active")) {
          parent.classList.remove("active");
        }
      }
    }
  };

  function activateParentDropdown(item) {
    item.classList.add("active");
    const parent = item.parentElement;
    if (parent) {
      parent.classList.add("active"); // li
      const parent2 = parent.parentElement;
      parent2.classList.add("active"); // li
      const parent3 = parent2.parentElement;
      if (parent3) {
        parent3.classList.add("active"); // li
        const parent4 = parent3.parentElement;
        if (parent4) {
          parent4.classList.add("active"); // li
          const parent5 = parent4.parentElement;
          if (parent5) {
            parent5.classList.add("active"); // li
            const parent6 = parent5.parentElement;
            if (parent6) {
              parent6.classList.add("active"); // li
            }
          }
        }
      }
    }
    return false;
  }

  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="topnav">
          <nav
            className="navbar navbar-light navbar-expand-lg topnav-menu"
            id="navigation"
          >
            <Collapse
              isOpen={props.leftMenu}
              className="navbar-collapse"
              id="topnav-menu-content"
            >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/Receptionist-dashboard">
                    <i className="ti-dashboard">
                    </i>{props.t("Dashboard")} {props.menuOpen}
                  </Link>
                </li>

                <li className="nav-item dropdown">
                  <Link
                    to="/#"
                    onClick={e => {
                      e.preventDefault()
                      setbehaviour(!behaviour)
                    }}
                    className="nav-link dropdown-toggle arrow-none"
                  >
                    <i className="ti-comments"></i>{props.t("Front Office")} {props.menuOpen}
                  </Link>
                  <div
                    className={classname("dropdown-menu dropdown-menu-left",
                      { show: behaviour}
                    )}
                  >
                    <Link to="/admission-enquiry-receptionist" className="dropdown-item">
                      {props.t("Admission Enquiry")} {props.menuOpen}
                    </Link>
                    <Link to="/Visitor-book-receptionist" className="dropdown-item">
                      {props.t("Visitor Book")} {props.menuOpen}
                    </Link>
                    <Link to="/phone-call-log-receptionist" className="dropdown-item">
                      {props.t("Phone Call Log")} {props.menuOpen}
                    </Link>
                    <Link to="/Postal-dispatch-receptionist" className="dropdown-item">
                      {props.t("Postal Dispatch")} {props.menuOpen}
                    </Link>
                    <Link to="/Postal-receive-receptionist" className="dropdown-item">
                      {props.t("Postal Receive")} {props.menuOpen}
                    </Link>
                    <Link to="/complain-receptionist" className="dropdown-item">
                      {props.t("Complain")} {props.menuOpen}
                    </Link>
                    <Link to="/purpose-receptionist" className="dropdown-item">
                      {props.t("Setup Front Office")} {props.menuOpen}
                    </Link>





                  </div>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    to="/#"
                    onClick={e => {
                      e.preventDefault()
                      setstudent(!student)
                    }}
                    className="nav-link dropdown-toggle arrow-none"
                  >
                    <i className="ti-user"></i>{props.t("Students")} {props.menuOpen}
                  </Link>
                  <div
                    className={classname("dropdown-menu dropdown-menu-left",
                      { show: student }
                    )}
                  >
                    <Link to="/student-details-receptionist" className="dropdown-item">
                      {props.t("Students Details")} {props.menuOpen}
                    </Link>
                  

                  </div>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    to="/#"
                    onClick={e => {
                      e.preventDefault()
                      setacademic(!academic)
                    }}
                    className="nav-link dropdown-toggle arrow-none"
                  >
                    <i className="ti-receipt"></i>{props.t("Academics")} {props.menuOpen}
                  </Link>
                  <div
                    className={classname("dropdown-menu dropdown-menu-left",
                      { show: academic }
                    )}
                  >
                    <Link to="/class-time-table-receptionist" className="dropdown-item">
                      {props.t("Class Timetable")} {props.menuOpen}
                    </Link>
                    <Link to="/assign-class-teacher-receptionist" className="dropdown-item">
                      {props.t("Assign Class Teacher")} {props.menuOpen}
                    </Link>
                    <Link to="/subject-group-receptionist" className="dropdown-item">
                      {props.t("Subject Group")} {props.menuOpen}
                    </Link>
                    <Link to="/subjects-receptionist" className="dropdown-item">
                      {props.t("Subjects")} {props.menuOpen}
                    </Link>
                    <Link to="/class-receptionist" className="dropdown-item">
                      {props.t("Class")} {props.menuOpen}
                    </Link>
                    <Link to="/sections-receptionist" className="dropdown-item">
                      {props.t("Sections")} {props.menuOpen}
                    </Link>
                  

                  </div>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    to="/#"
                    onClick={e => {
                      e.preventDefault()
                      sethr(!hr)
                    }}
                    className="nav-link dropdown-toggle arrow-none"
                  >
                    <i className="ti-user"></i>{props.t("HR")} {props.menuOpen}
                  </Link>
                  <div
                    className={classname("dropdown-menu dropdown-menu-left",
                      { show: hr }
                    )}
                  >
                    <Link to="/staff-directory-receptionist" className="dropdown-item">
                      {props.t("Staff Directory")} {props.menuOpen}
                    </Link>
                  

                  </div>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    to="/#"
                    onClick={e => {
                      e.preventDefault()
                      setcommunicate(!communicate)
                    }}
                    className="nav-link dropdown-toggle arrow-none"
                  >
                    <i className="ti-announcement"></i>{props.t("Communicate")} {props.menuOpen}
                  </Link>
                  <div
                    className={classname("dropdown-menu dropdown-menu-left",
                      { show: communicate }
                    )}
                  >
                    <Link to="/notice-board-receptionist" className="dropdown-item">
                      {props.t("Notice Board")} {props.menuOpen}
                    </Link>
                    <Link to="/send-email-receptionist" className="dropdown-item">
                      {props.t("Send Email")} {props.menuOpen}
                    </Link>
                    <Link to="/send-sms-receptionist" className="dropdown-item">
                      {props.t("Send SMS")} {props.menuOpen}
                    </Link>
                    <Link to="/send-sms-log-receptionist" className="dropdown-item">
                      {props.t("Email /SMS Log")} {props.menuOpen}
                    </Link>


                  </div>
                </li>
               
             
              





              </ul>
            </Collapse>
          </nav>
        </div>
      </div>
    </React.Fragment>
  )
}

NavbarReceptionist.propTypes = {
  leftMenu: PropTypes.any,
  location: PropTypes.any,
  menuOpen: PropTypes.any,
  t: PropTypes.any,
}

const mapStatetoProps = state => {
  const { leftMenu } = state.Layout
  return { leftMenu }
}

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(NavbarReceptionist))
)
