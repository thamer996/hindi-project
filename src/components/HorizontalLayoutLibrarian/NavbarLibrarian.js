import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"
import { Row, Col, Collapse } from "reactstrap"
import { Link } from "react-router-dom"
import withRouter from "../Common/withRouter"
import classname from "classnames"

//i18n
import { withTranslation } from "react-i18next"

import { connect } from "react-redux"

const NavbarLibrarian = props => {
  const [ui, setui] = useState(false)
  const [email, setemail] = useState(false)
  const [student, setstudent] = useState(false)
  const [behaviour, setbehaviour] = useState(false)
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
                  <Link className="nav-link" to="/Librarian-dashboard">
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
                    <i className="ti-user"></i>{props.t("Behaviour")} {props.menuOpen}
                  </Link>
                  <div
                    className={classname("dropdown-menu dropdown-menu-left",
                      { show: behaviour }
                    )}
                  >
                    <Link to="/behaviour-assign-librarian" className="dropdown-item">
                      {props.t("Assign Incident")} {props.menuOpen}
                    </Link>
                    <Link to="/behaviour-incidents-librarian" className="dropdown-item">
                      {props.t("Incidents")} {props.menuOpen}
                    </Link>
                    <Link to="/behaviour-incident-report-librarian" className="dropdown-item">
                      {props.t("Reports")} {props.menuOpen}
                    </Link>
                    <Link to="/behaviour-setting-librarian" className="dropdown-item">
                      {props.t("Setting")} {props.menuOpen}
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
                    <Link to="/humanresource-staff-librarian" className="dropdown-item">
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
                    <Link to="/communicate-notice-board-librarian" className="dropdown-item">
                      {props.t("Notice Board")} {props.menuOpen}
                    </Link>
                    <Link to="/communicate-send-email-librarian" className="dropdown-item">
                      {props.t("Send Email")} {props.menuOpen}
                    </Link>
                    <Link to="/communicate-send-sms-librarian" className="dropdown-item">
                      {props.t("Send SMS")} {props.menuOpen}
                    </Link>
                    <Link to="/email-log-sms-librarian" className="dropdown-item">
                      {props.t("Email /SMS Log")} {props.menuOpen}
                    </Link>


                  </div>
                </li>
               
                <li className="nav-item dropdown">
                      <Link
                        to="/#"
                        onClick={e => {
                          e.preventDefault()
                          setlibrary(!library)
                        }}
                        className="nav-link dropdown-toggle arrow-none"
                      >
                        <i className="ti-book"></i>{props.t("Library")} {props.menuOpen}
                      </Link>
                      <div
                        className={classname("dropdown-menu dropdown-menu-left",
                          { show: library }
                        )}
                      >
                        <Link to="/list-books-librarian" className="dropdown-item">
                          {props.t("Book List")} {props.menuOpen}
                        </Link>
                        <Link to="/issue-return-books-librarian" className="dropdown-item">
                          {props.t("Issue-Return")} {props.menuOpen}
                        </Link>
                        <Link to="/students-librarian" className="dropdown-item">
                          {props.t("Add Student")} {props.menuOpen}
                        </Link>
                        <Link to="/add-staff-librarian" className="dropdown-item">
                          {props.t("Add Staff Member")} {props.menuOpen}
                        </Link>

                


                  </div>
                </li>
                <li className="nav-item dropdown">
                          <Link
                            to="/#"
                            onClick={e => {
                              e.preventDefault()
                              setreport(!report)
                            }}
                            className="nav-link dropdown-toggle arrow-none"
                          >
                            <i className="ti-stats-up"></i> {props.t("Reports")} {props.menuOpen}
                          </Link>
                          <div
                            className={classname("dropdown-menu dropdown-menu-left",
                              { show: report }
                            )}
                          >

                            <Link to="/book-issue-report-librarian" className="dropdown-item">
                              {props.t("Library")} {props.menuOpen}
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

NavbarLibrarian.propTypes = {
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
  connect(mapStatetoProps, {})(withTranslation()(NavbarLibrarian))
)
