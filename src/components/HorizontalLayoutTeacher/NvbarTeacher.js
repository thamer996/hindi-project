import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"
import { Row, Col, Collapse } from "reactstrap"
import { Link } from "react-router-dom"
import withRouter from "../Common/withRouter"
import classname from "classnames"

//i18n
import { withTranslation } from "react-i18next"

import { connect } from "react-redux"

const NvbarTeacher = props => {
  const [ui, setui] = useState(false)
  const [email, setemail] = useState(false)
  const [student, setstudent] = useState(false)
  const [classes, setclasses] = useState(false)
  const [attendance, setattendance] = useState(false)
  const [behaviour, setbehaviour] = useState(false)
  const [homework, sethomework] = useState(false)
  const [students, setstudents] = useState(false)
  const [examination, setexamination] = useState(false)
  const [hr, sethr] = useState(false)
  const [lesson, setlesson] = useState(false)
  const [download, setdownload] = useState(false)
  const [communicate, setcommunicate] = useState(false)
  const [report, setreport] = useState(false)
  const [form, setform] = useState(false)
  const [academics, setacademics] = useState(false)
  const [homework2, sethomework2] = useState(false)
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
                  <Link className="nav-link" to="/teacher-dashboard">
                    <i className="ti-dashboard">
                    </i>{props.t("Dashboard")} {props.menuOpen}
                  </Link>
                </li>

                <li className="nav-item dropdown">
                  <Link
                    // to="/#"
                    // onClick={e => {
                    //   e.preventDefault()
                    //   setclasses(!classes)
                    // }}
                    className="nav-link dropdown-toggle arrow-none"
                  >
                    <i className="ti-ruler-alt-2"></i>{props.t("Classes")} {props.menuOpen}
                  </Link>
                  <div
                    className={classname("dropdown-menu dropdown-menu-left",
                      { show: classes }
                    )}
                  >
                   
                   {/*Academics */}
                    
                   <li className="nav-item dropdown">
                      <Link
                        to="/#"
                        className="nav-link dropdown-toggle arrow-none"
                        onClick={e => {
                          e.preventDefault()
                          setacademics(!academics)
                        }}
                      >
                        {props.t("Academics")} {props.menuOpen}
                      </Link>
                      <div
                        className={classname("dropdown-menu dropdown-menu-left", { show: academics })}
                      >
                        {/* <Link to="/class-time-table-teacher" className="dropdown-item">
                          {props.t("Class Timetable")} {props.menuOpen}
                        </Link>
                        <Link to="/teachers-time-table-teacher" className="dropdown-item">
                          {props.t("Teachers Timetable")} {props.menuOpen}
                        </Link> */}
                        {/* <Link to="/assign-class-teacher-teach" className="dropdown-item">
                          {props.t("Assign Class Teacher")} {props.menuOpen}
                        </Link> */}
                       
                        <Link to="/promote-student-teacher" className="dropdown-item">
                          {props.t("Promote Students")} {props.menuOpen}
                        </Link>
                        <Link to="/subject-group-teacher" className="dropdown-item">
                          {props.t("Subject Group")} {props.menuOpen}
                        </Link>
                        <Link to="/subjects-teacher" className="dropdown-item">
                          {props.t("Subjects")} {props.menuOpen}
                        </Link>
                        {/* <Link to="/class-academic-teacher" className="dropdown-item">
                          {props.t("Class")} {props.menuOpen}
                        </Link>
                        <Link to="/sections-teacher" className="dropdown-item">
                          {props.t("Sections")} {props.menuOpen}
                        </Link> */}
                       


                      </div>
                    </li>
                    <li className="nav-item dropdown">
                  <Link
                    to="/#"
                    className="nav-link dropdown-toggle arrow-none"
                    onClick={e => {
                      e.preventDefault()
                      setattendance(!attendance)
                    }}
                  >
                     {props.t("Attendance")} {props.menuOpen}
                  </Link>
                  <div
                    className={classname("dropdown-menu dropdown-menu-left", { show: attendance })}
                  >
                    <Link to="/attendances" className="dropdown-item">
                      {props.t("Student Attendance")} {props.menuOpen}
                    </Link>
                    <Link to="/approve-leave-teacher" className="dropdown-item">
                      {props.t("Approve Leave")} {props.menuOpen}
                    </Link>
                    {/* <Link to="/period-attendance-teacher" className="dropdown-item">
                      {props.t("Period Attendance By Date")} {props.menuOpen}
                    </Link> */}


                  </div>
                </li>

                  </div>
                </li>
             
                <li className="nav-item dropdown">
                  <Link
                    // to="/#"
                    // onClick={e => {
                    //   e.preventDefault()
                    //   setbehaviour(!behaviour)
                    // }}
                    className="nav-link dropdown-toggle arrow-none"
                  >
                    <i className="ti-user"></i>{props.t("Behaviour")} {props.menuOpen}
                  </Link>
                  <div
                    className={classname("dropdown-menu dropdown-menu-left",
                      { show: behaviour }
                    )}
                  >
                    <Link to="/behaviour-assign" className="dropdown-item">
                      {props.t("Assign Incident")} {props.menuOpen}
                    </Link>
                    <Link to="/incidents" className="dropdown-item">
                      {props.t("Incidents")} {props.menuOpen}
                    </Link>
                    {/* <Link to="/reports" className="dropdown-item">
                      {props.t("Reports")} {props.menuOpen}
                    </Link> */}
                    {/* <Link to="/setting" className="dropdown-item">
                      {props.t("Setting")} {props.menuOpen}
                    </Link> */}




                  </div>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    // to="/#"
                    className="nav-link dropdown-toggle arrow-none"
                    // onClick={e => {
                    //   e.preventDefault()
                    //   sethomework(!homework)
                    // }}
                  >
                    <i className="ti-menu-alt"></i>{props.t("Homework")} {props.menuOpen}
                  </Link>
                  <div className={classname("dropdown-menu dropdown-menu-left", { show:homework})}>
                    {/* <Link to="/add-teacher-homework" className="dropdown-item">{props.t("Daily Assignment")} {props.menuOpen}</Link> */}

                    <li className="nav-item dropdown">
                      <Link
                        to="/closed-homework-teacher"
                        className="nav-link dropdown-toggle arrow-none"
                
                      >
                       {props.t("Add Homework")} {props.menuOpen}
                      </Link>
                     
                    </li>





                  </div>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    // to="/#"
                    className="nav-link dropdown-toggle arrow-none"
                    // onClick={e => {
                    //   e.preventDefault()
                    //   setstudents(!students)
                    // }}
                  >
                    <i className="ti-user"></i> {props.t("Students")} {props.menuOpen}
                  </Link>
                  <div className={classname("dropdown-menu dropdown-menu-left", { show:students})}>
                    <Link to="/students-details" className="dropdown-item">{props.t("Student Details")}{props.menuOpen}</Link>
                    {/* <Link to="/students-Admission" className="dropdown-item">{props.t("Student Admission")}{props.menuOpen}</Link> */}
                    <Link to="/disabled-students" className="dropdown-item">{props.t("Disabled Students")} {props.menuOpen}</Link>
                    {/* <Link to="/multiclass-student" className="dropdown-item">{props.t("Multi Class Student")} {props.menuOpen}</Link> */}
                    {/* <Link to="/bulk-delete" className="dropdown-item">{props.t("Bulk Delete")} {props.menuOpen}</Link> */}
                    <Link to="/student-categories" className="dropdown-item">{props.t("Student Categories")} {props.menuOpen}</Link>
                    <Link to="/student-house" className="dropdown-item">{props.t("Student House")} {props.menuOpen}</Link>
                    <Link to="/disable-reason" className="dropdown-item">{props.t("Disable Reason")} {props.menuOpen}</Link>





                  </div>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    // to="/#"
                    // onClick={e => {
                    //   e.preventDefault()
                    //   setexamination(!examination)
                    // }}
                    className="nav-link dropdown-toggle arrow-none"
                  >
                    <i className="ti-map"></i>{props.t("Examinations")} {props.menuOpen}
                  </Link>
                  <div
                    className={classname("dropdown-menu dropdown-menu-left",
                      { show: examination }
                    )}
                  >
                    <Link to="/exam-group-teacher" className="dropdown-item">
                      {props.t("Exam Group")} {props.menuOpen}
                    </Link>
                    <Link to="/exam-result-teacher" className="dropdown-item">
                      {props.t("Exam Result")} {props.menuOpen}
                    </Link>
                    {/* <Link to="/design-admit-card-teacher" className="dropdown-item">
                      {props.t("Design Admit Card")} {props.menuOpen}
                    </Link> */}
                    {/* <Link to="/print-admit-card-teacher" className="dropdown-item">
                      {props.t("Print Admit Card")} {props.menuOpen}
                    </Link> */}
                    {/* <Link to="/design-Marksheet-teacher" className="dropdown-item">
                      {props.t("Design Marksheet")} {props.menuOpen}
                    </Link> */}
                    {/* <Link to="/print-Marksheet-teacher" className="dropdown-item">
                      {props.t("Print Marksheet")} {props.menuOpen}
                    </Link> */}
                    <Link to="/marks-grade-teacher" className="dropdown-item">
                      {props.t("Marks Grade")} {props.menuOpen}
                    </Link>





                  </div>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    // to="/#"
                    // onClick={e => {
                    //   e.preventDefault()
                    //   sethr(!hr)
                    // }}
                    className="nav-link dropdown-toggle arrow-none"
                  >
                    <i className="ti-user"></i>{props.t("HR")} {props.menuOpen}
                  </Link>
                  <div
                    className={classname("dropdown-menu dropdown-menu-left",
                      { show: hr}
                    )}
                  >
                    {/* <Link to="/staff-directory-teacher" className="dropdown-item">
                      {props.t("Staff Directory")} {props.menuOpen}
                    </Link> */}
                    <Link to="/apply-leave-teacher" className="dropdown-item">
                      {props.t("Apply Leave")} {props.menuOpen}
                    </Link>





                  </div>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    // to="/#"
                    // onClick={e => {
                    //   e.preventDefault()
                    //   setlesson(!lesson)
                    // }}
                    className="nav-link dropdown-toggle arrow-none"
                  >
                    <i className="ti-view-list-alt"></i>{props.t("Lesson Plan")} {props.menuOpen}
                  </Link>
                  <div
                    className={classname("dropdown-menu dropdown-menu-left",
                      { show: lesson }
                    )}
                  >
                    <Link to="/manage-lesson-plan-teacher" className="dropdown-item">
                      {props.t("Manage Lesson Plan")} {props.menuOpen}
                    </Link>
                    
                    {/* <Link to="/manage-syllabus-teacher" className="dropdown-item">
                      {props.t("Manage Syllabus Status")} {props.menuOpen}
                    </Link> */}

                    <Link to="/lesson-teacher" className="dropdown-item">
                      {props.t("Lesson")} {props.menuOpen}
                    </Link>
                    <Link to="/topic-teacher" className="dropdown-item">
                      {props.t("Topic")} {props.menuOpen}
                    </Link>





                  </div>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    // to="/#"
                    // onClick={e => {
                    //   e.preventDefault()
                    //   setdownload(!download)
                    // }}
                    className="nav-link dropdown-toggle arrow-none"
                  >
                    <i className="ti-download"></i>{props.t("Download Center")} {props.menuOpen}
                  </Link>
                  <div
                    className={classname("dropdown-menu dropdown-menu-left",
                      { show: download }
                    )}
                  >
                    {/* <Link to="/content-sharelist-teacher" className="dropdown-item">
                      {props.t("Content Share List")} {props.menuOpen}
                    </Link>
                    <Link to="/upload-sharecontent-teacher" className="dropdown-item">
                      {props.t("Upload /Share Content")} {props.menuOpen}
                    </Link> */}
                    <Link to="/video-tutorial-teacher" className="dropdown-item">
                      {props.t("Video Tutorial")} {props.menuOpen}
                    </Link>





                  </div>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    // to="/#"
                    // onClick={e => {
                    //   e.preventDefault()
                    //   setcommunicate(!communicate)
                    // }}
                    className="nav-link dropdown-toggle arrow-none"
                  >
                    <i className="ti-announcement"></i>{props.t("Communicate")} {props.menuOpen}
                  </Link>
                  <div
                    className={classname("dropdown-menu dropdown-menu-left",
                      { show: communicate }
                    )}
                  >
                    {/* <Link to="/notice-board-teacher" className="dropdown-item">
                      {props.t("Notice Board")} {props.menuOpen}
                    </Link> */}
                    <Link to="/send-email" className="dropdown-item">
                      {props.t("Send Email")} {props.menuOpen}
                    </Link>
                    <Link to="/send-sms" className="dropdown-item">
                      {props.t("Send SMS")} {props.menuOpen}
                    </Link>
                    {/* <Link to="/send-sms-log" className="dropdown-item">
                      {props.t("Email /SMS Log")} {props.menuOpen}
                    </Link> */}





                  </div>
                </li>
                {/* <li className="nav-item dropdown">
                  <Link
                    to="/#"
                    onClick={e => {
                      e.preventDefault()
                      setreport(!report)
                    }}
                    className="nav-link dropdown-toggle arrow-none"
                  >
                    <i className="ti-stats-up"></i>{props.t("Reports")} {props.menuOpen}
                  </Link>
                  <div
                    className={classname("dropdown-menu dropdown-menu-left",
                      { show: report}
                    )}
                  >
                    <Link to="/student-information-report" className="dropdown-item">
                      {props.t("Student Information")} {props.menuOpen}
                    </Link>
                    <Link to="/period-attendance-report" className="dropdown-item">
                      {props.t("Attendance")} {props.menuOpen}
                    </Link>
                    <Link to="/examinations-report" className="dropdown-item">
                      {props.t("Examinations")} {props.menuOpen}
                    </Link>
                    <Link to="/lessonplan-syllabus-report" className="dropdown-item">
                      {props.t("Lesson Plan")} {props.menuOpen}
                    </Link>
                    <Link to="/homework-report" className="dropdown-item">
                      {props.t("Homework")} {props.menuOpen}
                    </Link>
                    <Link to="/transport-report" className="dropdown-item">
                      {props.t("Transport")} {props.menuOpen}
                    </Link>
                    <Link to="/hostel-report" className="dropdown-item">
                      {props.t("Hostel")} {props.menuOpen}
                    </Link>
                    <Link to="/alumini-report" className="dropdown-item">
                      {props.t("Alumni")} {props.menuOpen}
                    </Link>





                  </div>
                </li> */}


              </ul>
            </Collapse>
          </nav>
        </div>
      </div>
    </React.Fragment>
  )
}

NvbarTeacher.propTypes = {
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
  connect(mapStatetoProps, {})(withTranslation()(NvbarTeacher))
)




