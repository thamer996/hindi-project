import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"
import { Row, Col, Collapse } from "reactstrap"
import { Link } from "react-router-dom"
import withRouter from "../Common/withRouter"
import classname from "classnames"

//i18n
import { withTranslation } from "react-i18next"

import { connect } from "react-redux"

const Navbar = props => {
  const [ui, setui] = useState(false)
  const [email, setemail] = useState(false)
  const [student, setstudent] = useState(false)
  const [classe, setclasse] = useState(false)
  const [form, setform] = useState(false)
  const [attendance, setattendance] = useState(false)
  const [behaviour, setbehaviour] = useState(false)
  const [homework, sethomework] = useState(false)
  const [examination, setexamination] = useState(false)
  const [hr, sethr] = useState(false)
  const [services, setservices] = useState(false)
  const [administration, setadministration] = useState(false)
  const [frontoffice, setfrontoffice] = useState(false)
  const [fees, setfees] = useState(false)
  const [inventory, setinventory] = useState(false)
  const [download, setdownload] = useState(false)
  const [lesson, setlesson] = useState(false)
  const [communicate, setcommunicate] = useState(false)
  const [hostel, sethostel] = useState(false)
  const [transport, settransport] = useState(false)
  const [library, setlibrary] = useState(false)
  const [adminreport, setadminreport] = useState(false)
  const [multibranch, setmultibranch] = useState(false)
  const [multibranchreport, setmultibranchreport] = useState(false)
  const [multibranchsetting, setmultibranchsetting] = useState(false)
  const [generalsetting, setgeneralsetting] = useState(false)
  const [studentinformation, setstudentinformation] = useState(false)
  const [reports, setreports] = useState(false)

  const [table, settable] = useState(false)
  const [chart, setchart] = useState(false)
  const [icon, seticon] = useState(false)
  const [map, setmap] = useState(false)
  const [extra, setextra] = useState(false)
  const [moreItem, setMoreItem] = useState(false)
  const [newElement, setNewElement] = useState(false)

  useEffect(() => {
    const pathName = process.env.PUBLIC_URL + props.router.location.pathname

    var matchingMenuItem = null
    var ul = document.getElementById("navigation")
    var items = ul.getElementsByTagName("a")
    removeActivation(items)
    for (var i = 0; i < items.length; ++i) {
      if (pathName === items[i].pathname) {
        matchingMenuItem = items[i]
        break
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem)
    }
  })

  const removeActivation = items => {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i]
      const parent = items[i].parentElement
      if (item && item.classList.contains("active")) {
        item.classList.remove("active")
      }
      if (parent) {
        if (parent.classList.contains("active")) {
          parent.classList.remove("active")
        }
      }
    }
  }

  function activateParentDropdown(item) {
    item.classList.add("active")
    const parent = item.parentElement
    if (parent) {
      parent.classList.add("active") // li
      const parent2 = parent.parentElement
      parent2.classList.add("active") // li
      const parent3 = parent2.parentElement
      if (parent3) {
        parent3.classList.add("active") // li
        const parent4 = parent3.parentElement
        if (parent4) {
          parent4.classList.add("active") // li
          const parent5 = parent4.parentElement
          if (parent5) {
            parent5.classList.add("active") // li
            const parent6 = parent5.parentElement
            if (parent6) {
              parent6.classList.add("active") // li
            }
          }
        }
      }
    }
    return false
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
                  <Link className="nav-link" to="/dashboard">
                    <i className="ti-dashboard"></i>
                    {props.t("Dashboard")} {props.menuOpen}
                  </Link>
                </li>
                <li
                  className="nav-item dropdown"
                  onMouseLeave={e => {
                    e.preventDefault()
                    setclasse(!classe)
                  }}
                >
                  <Link
                    // to="/#"
                    onMouseEnter={e => {
                      e.preventDefault()
                      setclasse(!classe)
                    }}
                    className="nav-link dropdown-toggle arrow-none"
                  >
                    <i className="ti-ruler-alt-2"></i>
                    {props.t("Classes")} {props.menuOpen}
                  </Link>
                  <div
                    className={classname("dropdown-menu dropdown-menu-left", {
                      show: classe,
                    })}
                  >
                    <li className="nav-item dropdown">
                      <Link
                        to="/#"
                        className="nav-link dropdown-toggle arrow-none"
                        onClick={e => {
                          e.preventDefault()
                          setform(!form)
                        }}
                      >
                        {props.t("Academics")}
                        {props.menuOpen}
                      </Link>
                      <div
                        className={classname(
                          "dropdown-menu dropdown-menu-left",
                          { show: form },
                        )}
                      >
                        <Link
                          to="/academics-assign-class-teacher"
                          className="dropdown-item"
                        >
                          {props.t("Assign Class Teacher")} {props.menuOpen}
                        </Link>

                        <Link to="/promote-students" className="dropdown-item">
                          {props.t("Promote Students")} {props.menuOpen}
                        </Link>
                        <Link
                          to="/academic-subject-group"
                          className="dropdown-item"
                        >
                          {props.t("Subject Group")} {props.menuOpen}
                        </Link>
                        <Link to="/subjects" className="dropdown-item">
                          {props.t("Subjects")} {props.menuOpen}
                        </Link>
                        <Link to="/class-academic" className="dropdown-item">
                          {props.t("Class")} {props.menuOpen}
                        </Link>
                        <Link to="/sections" className="dropdown-item">
                          {props.t("Sections")} {props.menuOpen}
                        </Link>
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
                        className={classname(
                          "dropdown-menu dropdown-menu-left",
                          { show: attendance },
                        )}
                      >
                        <Link
                          to="/attendance-super-admin"
                          className="dropdown-item"
                        >
                          {props.t("Student Attendance")} {props.menuOpen}
                        </Link>
                        <Link
                          to="/approve-leave-super-admin"
                          className="dropdown-item"
                        >
                          {props.t("Approve Leave")} {props.menuOpen}
                        </Link>
                      </div>
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
                        {props.t("Behaviour")} {props.menuOpen}
                      </Link>
                      <div
                        className={classname(
                          "dropdown-menu dropdown-menu-left",
                          { show: behaviour },
                        )}
                      >
                        <Link
                          to="/behaviour-assign-incident-super-admin"
                          className="dropdown-item"
                        >
                          {props.t("Assign Incident")} {props.menuOpen}
                        </Link>
                        <Link
                          to="/behaviour-incidents-super-admin"
                          className="dropdown-item"
                        >
                          {props.t("Incidents")} {props.menuOpen}
                        </Link>
                        {/* 
                        <li className="nav-item dropdown">
                       
                          <Link
                            to="/#"
                            onClick={e => {
                              e.preventDefault()
                              setreports(!reports)
                            }}
                            className="nav-link dropdown-toggle arrow-none"
                          >
                            {props.t("Report")} {props.menuOpen}
                          </Link>
                          <div
                            className={classname("dropdown-menu dropdown-menu-left",
                              { show: reports }
                            )}
                          >

                            <Link to="/class-rank-super-admin" className="dropdown-item">
                              {props.t("Student Behaviour Rank Report")} {props.menuOpen}
                            </Link>
                            <Link to="/wise-incident-super-admin" className="dropdown-item">
                              {props.t("Class Wise Rank Report")} {props.menuOpen}
                            </Link>
                            <Link to="/class-section-sms-super-admin" className="dropdown-item">
                              {props.t("Class Section Wise Rank Report")} {props.menuOpen}
                            </Link>
                            <Link to="/house-smranks-super-admin" className="dropdown-item">
                              {props.t("House Wise Rank Report")} {props.menuOpen}
                            </Link>
                            <Link to="/wise-incident-super-admin" className="dropdown-item">
                              {props.t("Incident Wise Report")} {props.menuOpen}
                            </Link>
                          </div>
                        </li> */}
                        {/* <Link to="/settings-super-admin" className="dropdown-item">
                          {props.t("Setting")} {props.menuOpen}
                        </Link> */}
                      </div>
                    </li>
                    <li className="nav-item dropdown">
                      <Link
                        to="/closed-super-admin"
                        className="nav-link dropdown-toggle arrow-none"
                      >
                        {props.t("Homework")} {props.menuOpen}
                      </Link>
                      {/* <div className={classname("dropdown-menu dropdown-menu-left", { show: moreItem })}>

                        <li className="nav-item dropdown">
                          <Link
                            to="/#"
                            className="nav-link dropdown-toggle arrow-none"
                            onClick={e => {
                              e.preventDefault()
                              setMoreItem(!moreItem)
                            }}
                          >
                           {props.t("Homework")} {props.menuOpen}
                          </Link>
                          <div className={classname("dropdown-menu dropdown-menu-left", { show: moreItem })}>
                            <Link to="/closed-super-admin" className="dropdown-item">{props.t("Homeworks")} {props.menuOpen}</Link>

                          </div>
                        </li>
                       
                      </div> */}
                    </li>
                    {/*Examinations */}
                    <li className="nav-item dropdown">
                      <Link
                        to="/#"
                        onClick={e => {
                          e.preventDefault()
                          setexamination(!examination)
                        }}
                        className="nav-link dropdown-toggle arrow-none"
                      >
                        {props.t("Examination")} {props.menuOpen}
                      </Link>
                      <div
                        className={classname(
                          "dropdown-menu dropdown-menu-left",
                          { show: examination },
                        )}
                      >
                        <Link to="/exam-group" className="dropdown-item">
                          {props.t("Exam Group")} {props.menuOpen}
                        </Link>
                        <Link to="/exam-shedule" className="dropdown-item">
                          {props.t("Exam Schedule")} {props.menuOpen}
                        </Link>
                        <Link to="/exam-result" className="dropdown-item">
                          {props.t("Exam Result")} {props.menuOpen}
                        </Link>
                        {/* <Link to="/design-admit-card" className="dropdown-item">
                          {props.t("Design Admit Card")} {props.menuOpen}
                        </Link> */}
                        {/* <Link to="/print-admit-card" className="dropdown-item">
                          {props.t("Print Admit Card")} {props.menuOpen}
                        </Link> */}
                        {/* <Link to="/design-marksheet" className="dropdown-item">
                          {props.t("Design Marksheet")} {props.menuOpen}
                        </Link>
                        <Link to="/print-marksheet" className="dropdown-item">
                          {props.t("Print Marksheet")} {props.menuOpen}
                        </Link>
                        <Link to="/marks-grade" className="dropdown-item">
                          {props.t("Marks Grade")} {props.menuOpen}
                        </Link> */}
                        <Link to="/marks-division" className="dropdown-item">
                          {props.t("Marks Division")} {props.menuOpen}
                        </Link>
                      </div>
                    </li>
                  </div>
                </li>
                <li
                  className="nav-item dropdown"
                  onMouseLeave={e => {
                    e.preventDefault()
                    sethr(!hr)
                  }}
                >
                  <Link
                    // to="/#"
                    onMouseEnter={e => {
                      e.preventDefault()
                      sethr(!hr)
                    }}
                    className="nav-link dropdown-toggle arrow-none"
                  >
                    <i className="ti-user"></i>
                    {props.t("HR")} {props.menuOpen}
                  </Link>
                  <div
                    className={classname("dropdown-menu dropdown-menu-left", {
                      show: hr,
                    })}
                  >
                    <li className="nav-item dropdown">
                      <Link
                        to="/#"
                        onClick={e => {
                          e.preventDefault()
                          setstudentinformation(!studentinformation)
                        }}
                        className="nav-link dropdown-toggle arrow-none"
                      >
                        {props.t("Student Information")} {props.menuOpen}
                      </Link>
                      <div
                        className={classname(
                          "dropdown-menu dropdown-menu-left",
                          { show: studentinformation },
                        )}
                      >
                        <Link
                          to="/student-student-details"
                          className="dropdown-item"
                        >
                          {props.t("Student Details")} {props.menuOpen}
                        </Link>
                        {/* <Link to="/student-student-admission" className="dropdown-item">
                          {props.t("Student Admission")} {props.menuOpen}
                        </Link> */}
                        <Link
                          to="/student-disabled-student"
                          className="dropdown-item"
                        >
                          {props.t("Disabled Students")} {props.menuOpen}
                        </Link>
                        {/* <Link to="/student-multiclass-student" className="dropdown-item">
                          {props.t("Multi Class Student")} {props.menuOpen}
                        </Link> */}
                        {/* <Link to="/student-bulkdelete-student" className="dropdown-item">
                          {props.t("Bulk Delete")} {props.menuOpen}
                        </Link> */}
                        <Link
                          to="/student-categorie-student"
                          className="dropdown-item"
                        >
                          {props.t("Student Categories")} {props.menuOpen}
                        </Link>
                        <Link
                          to="/student-house-student"
                          className="dropdown-item"
                        >
                          {props.t("Student House")} {props.menuOpen}
                        </Link>
                        <Link
                          to="/student-disable-reason-student"
                          className="dropdown-item"
                        >
                          {props.t("Disable Reason")} {props.menuOpen}
                        </Link>
                      </div>
                    </li>

                    <Link to="/staff-directory" className="dropdown-item">
                      {props.t("Staff Directory")} {props.menuOpen}
                    </Link>
                    <Link to="/staff-attendance" className="dropdown-item">
                      {props.t("Staff Attendance")} {props.menuOpen}
                    </Link>
                    <Link to="/payroll" className="dropdown-item">
                      {props.t("Payroll")} {props.menuOpen}
                    </Link>
                    <Link
                      to="/hr-approve-leave-request"
                      className="dropdown-item"
                    >
                      {props.t("Approve Leave Request")} {props.menuOpen}
                    </Link>
                    <Link to="/apply-leave-super" className="dropdown-item">
                      {props.t("Apply Leave")} {props.menuOpen}
                    </Link>
                    <Link to="/leave-type" className="dropdown-item">
                      {props.t("Leave Type")} {props.menuOpen}
                    </Link>

                    <Link to="/teachers-rating-super" className="dropdown-item">
                      {props.t("Teachers Rating")} {props.menuOpen}
                    </Link>
                    <Link to="/department-super" className="dropdown-item">
                      {props.t("Department")} {props.menuOpen}
                    </Link>
                    <Link to="/designation-super" className="dropdown-item">
                      {props.t("Designation")} {props.menuOpen}
                    </Link>
                  </div>
                </li>
                {/*Campus Services */}
                <li
                  className="nav-item dropdown"
                  onMouseLeave={e => {
                    e.preventDefault()
                    setservices(!services)
                  }}
                >
                  <Link
                    // to="/#"
                    onMouseEnter={e => {
                      e.preventDefault()
                      setservices(!services)
                    }}
                    className="nav-link dropdown-toggle arrow-none"
                  >
                    <i className="ti-settings"></i>
                    {props.t("Services")} {props.menuOpen}
                  </Link>
                  <div
                    className={classname("dropdown-menu dropdown-menu-left", {
                      show: services,
                    })}
                  >
                    <li className="nav-item dropdown">
                      <Link
                        to="/#"
                        onClick={e => {
                          e.preventDefault()
                          sethostel(!hostel)
                        }}
                        className="nav-link dropdown-toggle arrow-none"
                      >
                        {props.t("Hostel")} {props.menuOpen}
                      </Link>
                      <div
                        className={classname(
                          "dropdown-menu dropdown-menu-left",
                          { show: hostel },
                        )}
                      >
                        <Link to="/hostel-room" className="dropdown-item">
                          {props.t("Hostel Rooms")} {props.menuOpen}
                        </Link>
                        <Link to="/room-type" className="dropdown-item">
                          {props.t("Room Type")} {props.menuOpen}
                        </Link>
                        <Link to="/hostles" className="dropdown-item">
                          {props.t("Hostel")} {props.menuOpen}
                        </Link>
                      </div>
                    </li>
                    <li className="nav-item dropdown">
                      <Link
                        to="/#"
                        onClick={e => {
                          e.preventDefault()
                          settransport(!transport)
                        }}
                        className="nav-link dropdown-toggle arrow-none"
                      >
                        {props.t("Transport")} {props.menuOpen}
                      </Link>
                      <div
                        className={classname(
                          "dropdown-menu dropdown-menu-left",
                          { show: transport },
                        )}
                      >
                        <Link
                          to="/transport-pickup-point"
                          className="dropdown-item"
                        >
                          {props.t("Pickup Point")} {props.menuOpen}
                        </Link>
                        <Link to="/routes" className="dropdown-item">
                          {props.t("Routes")} {props.menuOpen}
                        </Link>
                        <Link to="/vehicles" className="dropdown-item">
                          {props.t("Vehicles")} {props.menuOpen}
                        </Link>
                        <Link to="/assign-vehicle" className="dropdown-item">
                          {props.t("Assign Vehicle")} {props.menuOpen}
                        </Link>
                        <Link
                          to="/route-pickup-point"
                          className="dropdown-item"
                        >
                          {props.t("Route Pickup Point")} {props.menuOpen}
                        </Link>
                        {/* <Link to="/student-transport-fees" className="dropdown-item">
                          {props.t("Student Transport Fees")} {props.menuOpen}
                        </Link> */}
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
                        {props.t("Library")} {props.menuOpen}
                      </Link>
                      <div
                        className={classname(
                          "dropdown-menu dropdown-menu-left",
                          { show: library },
                        )}
                      >
                        <Link to="/books-list" className="dropdown-item">
                          {props.t("Book List")} {props.menuOpen}
                        </Link>
                        <Link to="/issue-return" className="dropdown-item">
                          {props.t("Issue-Return")} {props.menuOpen}
                        </Link>
                        <Link to="/add-student" className="dropdown-item">
                          {props.t("Add Student")} {props.menuOpen}
                        </Link>
                        <Link to="/add-staff" className="dropdown-item">
                          {props.t("Add Staff Member")} {props.menuOpen}
                        </Link>
                      </div>
                    </li>
                  </div>
                </li>

                {/*Administration Hub*/}
                <li
                  className="nav-item dropdown"
                  onMouseLeave={e => {
                    e.preventDefault()
                    setadministration(!administration)
                  }}
                >
                  <Link
                    // to="/#"
                    onMouseEnter={e => {
                      e.preventDefault()
                      setadministration(!administration)
                    }}
                    className="nav-link dropdown-toggle arrow-none"
                  >
                    <i className="ti-panel"></i>
                    {props.t("Administration")} {props.menuOpen}
                  </Link>
                  <div
                    className={classname("dropdown-menu dropdown-menu-left", {
                      show: administration,
                    })}
                  >
                    <li className="nav-item dropdown">
                      <Link
                        to="/#"
                        onClick={e => {
                          e.preventDefault()
                          setadminreport(!adminreport)
                        }}
                        className="nav-link dropdown-toggle arrow-none"
                      >
                        {props.t("Reports")} {props.menuOpen}
                      </Link>
                      <div
                        className={classname(
                          "dropdown-menu dropdown-menu-left",
                          { show: adminreport },
                        )}
                      >
                        <Link
                          to="/student-information-reports-super"
                          className="dropdown-item"
                        >
                          {props.t("Student Information")} {props.menuOpen}
                        </Link>
                        <Link
                          to="/reports-attendance-super"
                          className="dropdown-item"
                        >
                          {props.t("Attendance")} {props.menuOpen}
                        </Link>
                        <Link
                          to="/examinations-rank-report-super"
                          className="dropdown-item"
                        >
                          {props.t("Examinations")} {props.menuOpen}
                        </Link>
                        <Link
                          to="/lesson-syllabus-report-super"
                          className="dropdown-item"
                        >
                          {props.t("Lesson Plan")} {props.menuOpen}
                        </Link>
                        <Link
                          to="/human-resource-staff-super"
                          className="dropdown-item"
                        >
                          {props.t("Human Resource")} {props.menuOpen}
                        </Link>
                        <Link
                          to="/homework-report-super"
                          className="dropdown-item"
                        >
                          {props.t("Homework")} {props.menuOpen}
                        </Link>
                        <Link
                          to="/book-issue-report-super"
                          className="dropdown-item"
                        >
                          {props.t("Library")} {props.menuOpen}
                        </Link>
                        <Link
                          to="/inventory-report-super"
                          className="dropdown-item"
                        >
                          {props.t("Inventory")} {props.menuOpen}
                        </Link>
                        {/* <Link to="/transport-report-super" className="dropdown-item">
                          {props.t("Transport")} {props.menuOpen}
                        </Link>
                        <Link to="/hostel-report-super" className="dropdown-item">
                          {props.t("Hostel")} {props.menuOpen}
                        </Link> */}
                      </div>
                    </li>

                    <li className="nav-item dropdown">
                      <Link
                        to="/multi-branch-setting"
                  
                        className="nav-link dropdown-toggle arrow-none"
                      >
                        {props.t("Multi Branch")} {props.menuOpen}
                      </Link>
                   
                        </li>
                      



                    
                   

                    <Link
                      to="/video-tutorial"
                      className="nav-link dropdown-toggle arrow-none"
                    >
                      {props.t("Download center ")} {props.menuOpen}
                    </Link>
                  </div>
                </li>

                {/*Front office */}
                <li
                  className="nav-item dropdown"
                  onMouseLeave={e => {
                    e.preventDefault()
                    setfrontoffice(!frontoffice)
                  }}
                >
                  <Link
                    // to="/#"
                    onMouseEnter={e => {
                      e.preventDefault()
                      setfrontoffice(!frontoffice)
                    }}
                    className="nav-link dropdown-toggle arrow-none"
                  >
                    <i className="ti-email"></i>
                    {props.t("Front Office")} {props.menuOpen}
                  </Link>
                  <div
                    className={classname("dropdown-menu dropdown-menu-left", {
                      show: frontoffice,
                    })}
                  >
                    <Link to="/admission-enquiry" className="dropdown-item">
                      {props.t("Admission Enquiry")} {props.menuOpen}
                    </Link>
                    <Link to="/visitor-books" className="dropdown-item">
                      {props.t("Visitor Book")} {props.menuOpen}
                    </Link>
                    <Link to="/phone-call-log" className="dropdown-item">
                      {props.t("Phone Call Log")} {props.menuOpen}
                    </Link>
                    <Link to="/postal-dispatch" className="dropdown-item">
                      {props.t("Postal Dispatch")} {props.menuOpen}
                    </Link>
                    <Link to="/postal-receive" className="dropdown-item">
                      {props.t("Postal Receive")} {props.menuOpen}
                    </Link>
                    <Link to="/complaint" className="dropdown-item">
                      {props.t("Complain")} {props.menuOpen}
                    </Link>
                    <div className="dropdown-item dropdown">
                      <Link
                        to="/#"
                        onClick={e => e.preventDefault()}
                        className="dropdown-toggle"
                      >
                        {props.t("Setup Front Office")} {props.menuOpen}
                      </Link>
                      <div className="dropdown-menu">
                        <Link to="/setup-purpose" className="dropdown-item">
                          {props.t("Pupose")} {props.menuOpen}
                        </Link>
                        <Link
                          to="/setup-complaint-type"
                          className="dropdown-item"
                        >
                          {props.t("Complaint Type")} {props.menuOpen}
                        </Link>
                        <Link to="/setup-source" className="dropdown-item">
                          {props.t("Source")} {props.menuOpen}
                        </Link>
                        <Link to="/setup-reference" className="dropdown-item">
                          {props.t("Reference")} {props.menuOpen}
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>
                {/*fees collections */}
                <li
                  className="nav-item dropdown"
                  onMouseLeave={e => {
                    e.preventDefault()
                    setfees(!fees)
                  }}
                >
                  <Link
                    // to="/#"
                    onMouseEnter={e => {
                      e.preventDefault()
                      setfees(!fees)
                    }}
                    className="nav-link dropdown-toggle arrow-none"
                  >
                    <i className="ti-crown"></i>
                    {props.t("Fees ")} {props.menuOpen}
                  </Link>
                  <div
                    className={classname("dropdown-menu dropdown-menu-left", {
                      show: fees,
                    })}
                  >
                    <Link to="/search-due-fees" className="dropdown-item">
                      {props.t("Search Due Fees")} {props.menuOpen}
                    </Link>
                    <Link to="/fees-master" className="dropdown-item">
                      {props.t("Fees Master")} {props.menuOpen}
                    </Link>
                    <Link to="/fees-group" className="dropdown-item">
                      {props.t("Fees Group")} {props.menuOpen}
                    </Link>
                    <Link to="/fees-type" className="dropdown-item">
                      {props.t("Fees Type")} {props.menuOpen}
                    </Link>
                    <Link to="/fees-discount" className="dropdown-item">
                      {props.t("Fees Discount")} {props.menuOpen}
                    </Link>
                    <Link to="/fees-carry-forward" className="dropdown-item">
                      {props.t("Fees Carry Forward")} {props.menuOpen}
                    </Link>
                    <Link to="/fees-reminder" className="dropdown-item">
                      {props.t("Fees Reminder")} {props.menuOpen}
                    </Link>
                  </div>
                </li>

                {/*inventory */}
                <li
                  className="nav-item dropdown"
                  onMouseLeave={e => {
                    e.preventDefault()
                    setinventory(!inventory)
                  }}
                >
                  <Link
                    // to="/#"
                    onMouseEnter={e => {
                      e.preventDefault()
                      setinventory(!inventory)
                    }}
                    className="nav-link dropdown-toggle arrow-none"
                  >
                    <i className="ti-briefcase"></i>
                    {props.t("Inventory")} {props.menuOpen}
                  </Link>
                  <div
                    className={classname("dropdown-menu dropdown-menu-left", {
                      show: inventory,
                    })}
                  >
                    <Link to="/issue-item" className="dropdown-item">
                      {props.t("Issue Item")} {props.menuOpen}
                    </Link>
                    <Link to="/item-stock" className="dropdown-item">
                      {props.t("Item Stock")} {props.menuOpen}
                    </Link>
                    <Link to="/item" className="dropdown-item">
                      {props.t("Item")} {props.menuOpen}
                    </Link>
                    <Link to="/item-category" className="dropdown-item">
                      {props.t("Item Category")} {props.menuOpen}
                    </Link>
                    <Link to="/item-store" className="dropdown-item">
                      {props.t("Item Store")} {props.menuOpen}
                    </Link>

                    <Link to="/item-supplier" className="dropdown-item">
                      {props.t("Item Supplier")} {props.menuOpen}
                    </Link>
                  </div>
                </li>
                {/*download center */}

                {/*lesson plan */}
                <li
                  className="nav-item dropdown"
                  onMouseLeave={e => {
                    e.preventDefault()
                    setlesson(!lesson)
                  }}
                >
                  <Link
                    // to="/#"
                    onMouseEnter={e => {
                      e.preventDefault()
                      setlesson(!lesson)
                    }}
                    className="nav-link dropdown-toggle arrow-none"
                  >
                    <i className="ti-view-list-alt"></i>
                    {props.t("Lesson Plan")} {props.menuOpen}
                  </Link>
                  <div
                    className={classname("dropdown-menu dropdown-menu-left", {
                      show: lesson,
                    })}
                  >
                    {/* <Link to="/copy-old-lesson" className="dropdown-item">
                      {props.t("Copy Old Lessons")} {props.menuOpen}
                    </Link> */}
                    <Link to="/manage-lesson-plan" className="dropdown-item">
                      {props.t("Manage Lesson Plan")} {props.menuOpen}
                    </Link>
                    {/* <Link to="/manage-syllabus-status" className="dropdown-item">
                      {props.t("Manage Syllabus Status")} {props.menuOpen}
                    </Link> */}
                    <Link to="/lesson-plan-lesson" className="dropdown-item">
                      {props.t("Lesson")} {props.menuOpen}
                    </Link>
                    <Link to="/lesson-plan-topic" className="dropdown-item">
                      {props.t("Topic")} {props.menuOpen}
                    </Link>
                  </div>
                </li>
                <li
                  className="nav-item dropdown"
                  onMouseLeave={e => {
                    e.preventDefault()
                    setmultibranchsetting(!multibranchsetting)
                  }}
                >
                  <Link
                    // to="/#"
                    onMouseEnter={e => {
                      e.preventDefault()
                      setmultibranchsetting(!multibranchsetting)
                    }}
                    className="nav-link dropdown-toggle arrow-none"
                  >
                    <i className="ti-settings"></i>
                    {props.t("Settings")} {props.menuOpen}
                  </Link>
                  <div
                    className={classname("dropdown-menu dropdown-menu-left", {
                      show: multibranchsetting,
                    })}
                  >
                    <Link
                      to="/settings-general-setting"
                      className="nav-link dropdown-toggle arrow-none"
                    >
                      {props.t("General Setting")} {props.menuOpen}
                    </Link>

                    {/* <Link to="/general-settings-fees" className="dropdown-item">
                              {props.t("Fees")} {props.menuOpen}
                            </Link> */}
                    {/* <Link to="/general-settings-id-auto" className="dropdown-item">
                              {props.t("ID Auto Generation")} {props.menuOpen}
                            </Link> */}
                    {/* <Link to="/general-settings-attendance-type" className="dropdown-item">
                              {props.t("Attendance Type")} {props.menuOpen}
                            </Link> */}
                    {/* <Link to="/general-settings-maintenance" className="dropdown-item">
                              {props.t("Maintenance")} {props.menuOpen}
                            </Link>
                            <Link to="/general-settings-miscellaneous" className="dropdown-item">
                              {props.t("Miscellaneous")} {props.menuOpen}
                            </Link> */}

                    <li className="nav-item dropdown">
                      <Link
                        to="/#"
                        onClick={e => {
                          e.preventDefault()
                          setgeneralsetting(!generalsetting)
                        }}
                        className="nav-link dropdown-toggle arrow-none"
                      >
                        {props.t("System Setting")} {props.menuOpen}
                      </Link>
                      <div
                        className={classname(
                          "dropdown-menu dropdown-menu-left",
                          { show: generalsetting },
                        )}
                      >
                        {/*                 
                        <Link to="/custom-fields-settings" className="dropdown-item">
                          {props.t("Custom Fields")} {props.menuOpen}
                        </Link> */}
                        {/* <Link to="/captcha-settings" className="dropdown-item">
                          {props.t("Captcha Setting")} {props.menuOpen}
                        </Link> */}
                        {/* <Link to="/system-fields-settings" className="dropdown-item">
                          {props.t("System Fields")} {props.menuOpen}
                        </Link> */}
                        {/* <Link to="/student-profil-update-settings" className="dropdown-item">
                          {props.t("Student Profile Update")} {props.menuOpen}
                        </Link> */}
                        {/* <Link to="/file-types-settings" className="dropdown-item">
                          {props.t("File Types")} {props.menuOpen}
                        </Link> */}
                        {/* <Link to="/side-bar-menu-settings" className="dropdown-item">
                          {props.t("Sidebar Menu")} {props.menuOpen}
                        </Link> */}
                        <Link to="/roles-permissions" className="dropdown-item">
                          {props.t("Roles Permissions")} {props.menuOpen}
                        </Link>
                        <Link to="/settings-users" className="dropdown-item">
                          {props.t("Users")} {props.menuOpen}
                        </Link>
                      </div>
                    </li>
                    <Link to="/settings-session" className="dropdown-item">
                      {props.t("Session Setting")} {props.menuOpen}
                    </Link>
                    <Link to="/setting-notification" className="dropdown-item">
                      {props.t("Notification Setting")} {props.menuOpen}
                    </Link>
                    {/* <Link to="/setting-sms" className="dropdown-item">
                          {props.t("SMS Setting")} {props.menuOpen}
                        </Link> */}
                    {/* <Link to="/setting-email" className="dropdown-item">
                          {props.t("Email Setting")} {props.menuOpen}
                        </Link> */}
                    {/* <Link to="/payment-methods" className="dropdown-item">
                          {props.t("Payment Methods")} {props.menuOpen}
                        </Link>
                        <Link to="/print-setting-header" className="dropdown-item">
                          {props.t("Print Header Footer")} {props.menuOpen}
                        </Link> */}
                    <Link to="/backup-restore" className="dropdown-item">
                      {props.t("Backup Restore")} {props.menuOpen}
                    </Link>
                    {/* <Link to="/languages-setting" className="dropdown-item">
                          {props.t("Languages")} {props.menuOpen}
                        </Link>
                        <Link to="/currency-setting" className="dropdown-item">
                          {props.t("Currency")} {props.menuOpen}
                        </Link> */}
                  </div>
                </li>
                {/*Communicate */}
                <li
                  className="nav-item dropdown"
                  onMouseLeave={e => {
                    e.preventDefault()
                    setcommunicate(!communicate)
                  }}
                >
                  <Link
                    // to="/#"
                    onMouseEnter={e => {
                      e.preventDefault()
                      setcommunicate(!communicate)
                    }}
                    className="nav-link dropdown-toggle arrow-none"
                  >
                    <i className="ti-announcement"></i>
                    {props.t("Communicate")} {props.menuOpen}
                  </Link>
                  <div
                    className={classname("dropdown-menu dropdown-menu-left", {
                      show: communicate,
                    })}
                  >
                    {/* <Link to="/notice-board-super-admin" className="dropdown-item">
                      {props.t("Notice Board")} {props.menuOpen}
                    </Link> */}
                    <Link
                      to="/communicate-send-email"
                      className="dropdown-item"
                    >
                      {props.t("Send Email")} {props.menuOpen}
                    </Link>
                    <Link to="/send-sms-super-admin" className="dropdown-item">
                      {props.t("Send SMS")} {props.menuOpen}
                    </Link>
                    <Link
                      to="/email-sms-log-super-admin"
                      className="dropdown-item"
                    >
                      {props.t("Email / SMS Log")} {props.menuOpen}
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

Navbar.propTypes = {
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
  connect(mapStatetoProps, {})(withTranslation()(Navbar)),
)
