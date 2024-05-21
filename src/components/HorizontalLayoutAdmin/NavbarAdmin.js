import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"
import { Row, Col, Collapse } from "reactstrap"
import { Link } from "react-router-dom"
import withRouter from "../Common/withRouter"
import classname from "classnames"

//i18n
import { withTranslation } from "react-i18next"

import { connect } from "react-redux"

const NavbarAdmin = props => {
  const [ui, setui] = useState(false)
  const [email, setemail] = useState(false)
  const [student, setstudent] = useState(false)
  const [students, setstudents] = useState(false)
  const [classes, setclasses] = useState(false)
  const [hr, sethr] = useState(false)
  const [services, setservices] = useState(false)
  const [administration, setadministration] = useState(false)
  const [frontoffice, setfrontoffice] = useState(false)
  const [fees, setfees] = useState(false)
  const [inventory, setinventory] = useState(false)
  const [download, setdownload] = useState(false)
  const [lesson, setlesson] = useState(false)
  const [communicate, setcommunicate] = useState(false)
  const [behaviour, setbehaviour] = useState(false)
  const [report, setreport] = useState(false)
  const [reports, setreports] = useState(false)
  const [examination, setexamination] = useState(false)
  const [hostel, sethostel] = useState(false)
  const [transport, settransport] = useState(false)
  const [library, setlibrary] = useState(false)
  const [adminreport, setadminreport] = useState(false)
  const [multibranch, setmultibranch] = useState(false)
  const [multibranchreport, setmultibranchreport] = useState(false)
  const [multibranchsetting, setmultibranchsetting] = useState(false)
  const [form, setform] = useState(false)
  const [table, settable] = useState(false)
  const [chart, setchart] = useState(false)
  const [icon, seticon] = useState(false)
  const [map, setmap] = useState(false)
  const [extra, setextra] = useState(false)
  const [moreItem, setMoreItem] = useState(false);
  const [newElement, setNewElement] = useState(false);
  const [attendance, setattendance] = useState(false);
  const [generalsetting, setgeneralsetting] = useState(false);


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
                  <Link className="nav-link" to="/admin-dashboard">
                    <i className="ti-dashboard">
                    </i>{props.t("Dashboard")} {props.menuOpen}
                  </Link>
                </li>
                {/*Classes */}

                <li className="nav-item dropdown">
                  <Link
                    to="/#"
                    onClick={e => {
                      e.preventDefault()
                      setclasses(!classes)
                    }}
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
                          setform(!form)
                        }}
                      >
                        {props.t("Academics")} {props.menuOpen}
                      </Link>
                      <div
                        className={classname("dropdown-menu dropdown-menu-left", { show: form })}
                      >
                         <Link to="/class-time-table-admin" className="dropdown-item">
                          {props.t("Class Time Table")} {props.menuOpen}
                        </Link>
                        <Link to="/teachers-time-table-admin" className="dropdown-item">
                          {props.t("Teachers Time Table")} {props.menuOpen}
                        </Link>
                        <Link to="/academics-assignteacher-admin" className="dropdown-item">
                          {props.t("Assign Class Teacher")} {props.menuOpen}
                        </Link>
                       
                        <Link to="/promote-student-admin" className="dropdown-item">
                          {props.t("Promote Students")} {props.menuOpen}
                        </Link>
                        <Link to="/subject-group-admin" className="dropdown-item">
                          {props.t("Subject Group")} {props.menuOpen}
                        </Link>
                        <Link to="/subjects-admin" className="dropdown-item">
                          {props.t("Subjects")} {props.menuOpen}
                        </Link>
                        <Link to="/class-admin" className="dropdown-item">
                          {props.t("Class")} {props.menuOpen}
                        </Link>
                        <Link to="/academic-sections-admin" className="dropdown-item">
                          {props.t("Sections")} {props.menuOpen}
                        </Link>
                       


                      </div>
                    </li>
                   
                    {/*Attendance */}
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
                        <Link to="/attendance-admin" className="dropdown-item">
                          {props.t("Student Attendance")} {props.menuOpen}
                        </Link>
                        <Link to="/approve-leave-admin" className="dropdown-item">
                          {props.t("Approve Leave")} {props.menuOpen}
                        </Link>
                        <Link to="/attendance-by-date-admin" className="dropdown-item">
                          {props.t("Attendance By Date")} {props.menuOpen}
                        </Link>


                      </div>
                    </li>
                    {/*Behaviour */}
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
                        className={classname("dropdown-menu dropdown-menu-left",
                          { show: behaviour }
                        )}
                      >

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

                            <Link to="/behaviour-Rank-admin" className="dropdown-item">
                              {props.t("Student Behaviour Rank Report")} {props.menuOpen}
                            </Link>
                            <Link to="/class-Rank-admin" className="dropdown-item">
                              {props.t("Class Wise Rank Report")} {props.menuOpen}
                            </Link>
                            <Link to="/class-section-Rank-admin" className="dropdown-item">
                              {props.t("Class Section Wise Rank Report")} {props.menuOpen}
                            </Link>
                            <Link to="/House-Rank-admin" className="dropdown-item">
                              {props.t("House Wise Rank Report")} {props.menuOpen}
                            </Link>
                            <Link to="/wise-incident-admin" className="dropdown-item">
                              {props.t("Incident Wise Report")} {props.menuOpen}
                            </Link>
                          </div>
                        </li>
                        <Link to="/setting-admin" className="dropdown-item">
                          {props.t("Setting")} {props.menuOpen}
                        </Link>

                      </div>
                    </li>
                    {/*Homework */}
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

                        <li className="nav-item dropdown">
                          <Link
                            to="/#"
                            className="nav-link dropdown-toggle arrow-none"
                            onClick={e => {
                              e.preventDefault()
                              setMoreItem(!moreItem)
                            }}
                          >
                           {props.t("Add Homework")}  {props.menuOpen}
                          </Link>
                          <div className={classname("dropdown-menu dropdown-menu-left", { show: moreItem })}>
                            <Link to="/upcoming-homework-admin" className="dropdown-item">{props.t("Upcoming Homework")} {props.menuOpen}</Link>
                            <Link to="/closed-homework-admin" className="dropdown-item">{props.t("Closed Homework")} {props.menuOpen}</Link>

                          </div>
                        </li>
                       
                      </div>
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
                    {props.t("Examinations")} {props.menuOpen}
                  </Link>
                  <div
                    className={classname("dropdown-menu dropdown-menu-left",
                      { show: examination }
                    )}
                  >
                    <Link to="/exam-group-admin" className="dropdown-item">
                      {props.t("Exam Group")} {props.menuOpen}
                    </Link>
                    <Link to="/exam-result-admin" className="dropdown-item">
                      {props.t("Exam Result")} {props.menuOpen}
                    </Link>
                    <Link to="/design-admit-card-admin" className="dropdown-item">
                      {props.t("Design Admit Card")} {props.menuOpen}
                    </Link>
                    {/* <Link to="/print-admit-card-admin" className="dropdown-item">
                      {props.t("Print Admit Card")} {props.menuOpen}
                    </Link> */}
                    <Link to="/design-marksheet-admin" className="dropdown-item">
                      {props.t("Design Marksheet")} {props.menuOpen}
                    </Link>
                    <Link to="/print-marksheet-admin" className="dropdown-item">
                      {props.t("Print Marksheet")} {props.menuOpen}
                    </Link>
                    <Link to="/marks-grade-admin" className="dropdown-item">
                      {props.t("Marks Grade")} {props.menuOpen}
                    </Link>





                  </div>
                </li>



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
                    <li className="nav-item dropdown">
                      <Link
                        to="/#"
                        className="nav-link dropdown-toggle arrow-none"
                        onClick={e => {
                          e.preventDefault()
                          setstudents(!students)
                        }}
                      >
                        {props.t("Student Information")} {props.menuOpen}
                      </Link>
                      <div className={classname("dropdown-menu dropdown-menu-left", { show: students })}>
                        <Link to="/student-details-admin" className="dropdown-item">{props.t("Student Details")} {props.menuOpen}</Link>
                        <Link to="/student-admission-admin" className="dropdown-item">{props.t("Student Admission")} {props.menuOpen}</Link>
                        <Link to="/student-disabled-admin" className="dropdown-item">{props.t("Disabled Students")} {props.menuOpen}</Link>
                        <Link to="/multi-student-admin" className="dropdown-item">{props.t("Multi Class Student")} {props.menuOpen}</Link>
                        <Link to="/bulk-delete-admin" className="dropdown-item">{props.t("Bulk Delete")} {props.menuOpen}</Link>
                        <Link to="/student-categories-admin" className="dropdown-item">{props.t("Student Categories")} {props.menuOpen}</Link>
                        <Link to="/student-house-admin" className="dropdown-item">{props.t("Student House")} {props.menuOpen}</Link>
                        <Link to="/disable-reason-admin" className="dropdown-item">{props.t("Disable Reason")} {props.menuOpen}</Link>





                      </div>
                    </li>
                    <Link to="/staff-directory-admin" className="dropdown-item">
                      {props.t("Staff Directory")} {props.menuOpen}
                    </Link>
                    <Link to="/staff-attendance-admin" className="dropdown-item">
                      {props.t("Staff Attendance")} {props.menuOpen}
                    </Link>
                    <Link to="/payroll-admin" className="dropdown-item">
                      {props.t("Payroll")} {props.menuOpen}
                    </Link>
                    <Link to="/approve-request-admin" className="dropdown-item">
                      {props.t("Approve Leave Request")} {props.menuOpen}
                    </Link>
                    <Link to="/apply-leave-admin" className="dropdown-item">
                      {props.t("Apply Leave")} {props.menuOpen}
                    </Link>
                    <Link to="/leave-type-admin" className="dropdown-item">
                      {props.t("Leave Type")} {props.menuOpen}
                    </Link> 
                    <Link to="/teacher-rating-admin" className="dropdown-item">
                      {props.t("Teachers Rating")} {props.menuOpen}
                    </Link>
                    <Link to="/departments-admin" className="dropdown-item">
                      {props.t("Department")} {props.menuOpen}
                    </Link>
                    <Link to="/designation-admin" className="dropdown-item">
                      {props.t("Designation")} {props.menuOpen}
                    </Link>
                  





                  </div>
                </li>
                {/*Campus Services */}
                <li className="nav-item dropdown">
                  <Link
                    to="/#"
                    onClick={e => {
                      e.preventDefault()
                      setservices(!services)
                    }}
                    className="nav-link dropdown-toggle arrow-none"
                  >
                    <i className="ti-settings"></i>{props.t("Services")} {props.menuOpen}
                  </Link>
                  <div
                    className={classname("dropdown-menu dropdown-menu-left",
                      { show: services }
                    )}
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
                        {props.t("Hostle")} {props.menuOpen}
                      </Link>
                      <div
                        className={classname("dropdown-menu dropdown-menu-left",
                          { show: hostel }
                        )}
                      >
                        <Link to="/hostel-room-admin" className="dropdown-item">
                          {props.t("Hostel Rooms")} {props.menuOpen}
                        </Link>
                        <Link to="/room-type-admin" className="dropdown-item">
                          {props.t("Room Type")} {props.menuOpen}
                        </Link>
                        <Link to="/hostel-admin" className="dropdown-item">
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
                        className={classname("dropdown-menu dropdown-menu-left",
                          { show: transport }
                        )}
                      >

                        <Link to="/routes-admin" className="dropdown-item">
                          {props.t("Routes")} {props.menuOpen}
                        </Link>
                        <Link to="/vheicles-admin" className="dropdown-item">
                          {props.t("Vehicles")} {props.menuOpen}
                        </Link>
                        <Link to="/assign-vheicle-admin" className="dropdown-item">
                          {props.t("Assign Vehicle")} {props.menuOpen}
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
                        {props.t("Library")} {props.menuOpen}
                      </Link>
                      <div
                        className={classname("dropdown-menu dropdown-menu-left",
                          { show: library }
                        )}
                      >
                        <Link to="/books-admin" className="dropdown-item">
                          {props.t("Book List")} {props.menuOpen}
                        </Link>
                        <Link to="/issue-return-admin" className="dropdown-item">
                          {props.t("Issue-Return")} {props.menuOpen}
                        </Link>
                        <Link to="/add-student-admin" className="dropdown-item">
                          {props.t("Add Student")} {props.menuOpen}
                        </Link>
                        <Link to="/add-staff-admin" className="dropdown-item">
                          {props.t("Add Staff Member")} {props.menuOpen}
                        </Link>

                      </div>
                    </li>



                  </div>
                </li>
                {/*Administration */}
                <li className="nav-item dropdown">
                  <Link
                    to="/#"
                    onClick={e => {
                      e.preventDefault()
                      setadministration(!administration)
                    }}
                    className="nav-link dropdown-toggle arrow-none"
                  >
                    <i className="ti-panel"></i>{props.t("Administration")} {props.menuOpen}
                  </Link>
                  <div
                    className={classname("dropdown-menu dropdown-menu-left",
                      { show: administration }
                    )}
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
                    className={classname("dropdown-menu dropdown-menu-left",
                      { show: adminreport }
                    )}
                  >
                    <Link to="/student-report-admin" className="dropdown-item">
                      {props.t("Student Information")} {props.menuOpen}
                    </Link>
                    <Link to="/attendance-report-admin" className="dropdown-item">
                      {props.t("Attendance")} {props.menuOpen}
                    </Link>
                    <Link to="/examination-report-admin" className="dropdown-item">
                      {props.t("Examinations")} {props.menuOpen}
                    </Link>
                    <Link to="/lesson-syllabus-report-admin" className="dropdown-item">
                      {props.t("Lesson Plan")} {props.menuOpen}
                    </Link>
                    <Link to="/staff-report-admin" className="dropdown-item">
                      {props.t("Human Resource")} {props.menuOpen}
                    </Link>
                    <Link to="/homework-report-admin" className="dropdown-item">
                      {props.t("Homework")} {props.menuOpen}
                    </Link>
                    <Link to="/book-issuereturn-report-admin" className="dropdown-item">
                      {props.t("Library")} {props.menuOpen}
                    </Link>
                    <Link to="/inventory-report-admin" className="dropdown-item">
                      {props.t("Inventory")} {props.menuOpen}
                    </Link>
                    <Link to="/transport-report-admin" className="dropdown-item">
                      {props.t("Transport")} {props.menuOpen}
                    </Link>
                    <Link to="/hostel-report-admin" className="dropdown-item">
                      {props.t("Hostel")} {props.menuOpen}
                    </Link>
                   
                  
                  </div>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    to="/#"
                    onClick={e => {
                      e.preventDefault()
                      setmultibranch(!multibranch)
                    }}
                    className="nav-link dropdown-toggle arrow-none"
                  >
                    {props.t("Multi Branch")} {props.menuOpen}
                  </Link>
                  <div
                    className={classname("dropdown-menu dropdown-menu-left",
                      { show: multibranch }
                    )}
                  >
                    <Link to="/multibranch-overview-admin" className="dropdown-item">
                      {props.t("Overview")} {props.menuOpen}
                    </Link>
                    <li className="nav-item dropdown">
                  <Link
                    to="/#"
                    onClick={e => {
                      e.preventDefault()
                      setmultibranchreport(!multibranchreport)
                    }}
                    className="nav-link dropdown-toggle arrow-none"
                  >
                    {props.t("Report")} {props.menuOpen}
                  </Link>
                  <div
                    className={classname("dropdown-menu dropdown-menu-left",
                      { show: multibranchreport }
                    )}
                  >
                    <Link to="/daily-collection-report-admin" className="dropdown-item">
                      {props.t("Daily Collection Report")} {props.menuOpen}
                    </Link>
                    <Link to="/payroll-report-admin" className="dropdown-item">
                      {props.t("Payroll Report")} {props.menuOpen}
                    </Link>
                    <Link to="/income-report-admin" className="dropdown-item">
                      {props.t("Income Report")} {props.menuOpen}
                    </Link>
                    <Link to="/expense-report-admin" className="dropdown-item">
                      {props.t("Expense Report")} {props.menuOpen}
                    </Link>
                    <Link to="/user-log-report-admin" className="dropdown-item">
                      {props.t("User Log Report")} {props.menuOpen}
                    </Link>
                    
                    

                  </div>
                </li> 
                <Link to="/multibranch-setting-admin" className="dropdown-item">
                      {props.t("Setting")} {props.menuOpen}
                    </Link> 
                    

                  </div>
                </li>
                
       
                  <Link
                    to="/#"
              
                    className="nav-link dropdown-toggle arrow-none"
                  >
                    {props.t("Download Center")} {props.menuOpen}
                  </Link>
          
                   
                   
                   
                  </div>
                </li>

               
                {/*Front office */}
                <li className="nav-item dropdown">
                  <Link
                    to="/#"
                    onClick={e => {
                      e.preventDefault()
                      setfrontoffice(!frontoffice)
                    }}
                    className="nav-link dropdown-toggle arrow-none"
                  >
                    <i className="ti-email"></i>{props.t("Front Office")} {props.menuOpen}
                  </Link>
                  <div
                    className={classname("dropdown-menu dropdown-menu-left",
                      { show: frontoffice }
                    )}
                  >
                    <Link to="/admission-enquiry-admin" className="dropdown-item">
                      {props.t("Admission Enquiry")} {props.menuOpen}
                    </Link>
                    <Link to="/visitor-book-admin" className="dropdown-item">
                      {props.t("Visitor Book")} {props.menuOpen}
                    </Link>
                    <Link to="/phone-call-admin" className="dropdown-item">
                      {props.t("Phone Call Log")} {props.menuOpen}
                    </Link>
                    <Link to="/postal-dispatch-admin" className="dropdown-item">
                      {props.t("Postal Dispatch")} {props.menuOpen}
                    </Link>
                    <Link to="/postal-recieve-admin" className="dropdown-item">
                      {props.t("Postal Receive")} {props.menuOpen}
                    </Link>
                    <Link to="/complain-admin" className="dropdown-item">
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
                        <Link to="/purpose-admin" className="dropdown-item">
                          {props.t("Purpose")} {props.menuOpen}
                        </Link>
                        <Link to="/complaint-type-admin" className="dropdown-item">
                          {props.t("Complaint Type")} {props.menuOpen}
                        </Link>
                        <Link to="/source-admin" className="dropdown-item">
                          {props.t("Source")} {props.menuOpen}
                        </Link>
                        <Link to="/reference-admin" className="dropdown-item">
                          {props.t("Reference")} {props.menuOpen}
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>
                {/*fees collections */}
                <li className="nav-item dropdown">
                  <Link
                    to="/#"
                    onClick={e => {
                      e.preventDefault()
                      setfees(!fees)
                    }}
                    className="nav-link dropdown-toggle arrow-none"
                  >
                    <i className="ti-crown"></i>{props.t("Fees ")} {props.menuOpen}
                  </Link>
                  <div
                    className={classname("dropdown-menu dropdown-menu-left",
                      { show: fees }
                    )}
                  >
                    {/* <Link to="/collect-fees-admin" className="dropdown-item">
                      {props.t("Collect Fees")} {props.menuOpen}
                    </Link>

                    <Link to="/search-fees-payments-admin" className="dropdown-item">
                      {props.t("Search Fees Payments")} {props.menuOpen}
                    </Link>
                    <Link to="/search-due-fees-admin" className="dropdown-item">
                      {props.t("Search Due Fees")} {props.menuOpen}
                    </Link> */}
                    <Link to="/fees-master-admin" className="dropdown-item">
                      {props.t("Fees Master")} {props.menuOpen}
                    </Link>
                    <Link to="/fees-group-admin" className="dropdown-item">
                      {props.t("Fees Group")} {props.menuOpen}
                    </Link>
                    <Link to="/fees-type-admin" className="dropdown-item">
                      {props.t("Fees Type")} {props.menuOpen}
                    </Link>
                    <Link to="/fees-discount-admin" className="dropdown-item">
                      {props.t("Fees Discount")} {props.menuOpen}
                    </Link>
                    <Link to="/fees-carryforward-admin" className="dropdown-item">
                      {props.t("Fees Carry Forward")} {props.menuOpen}
                    </Link>
                    <Link to="/fees-reminder-admin" className="dropdown-item">
                      {props.t("Fees Reminder")} {props.menuOpen}
                    </Link>


                  </div>
                </li>
                {/*Inventory */}

                <li className="nav-item dropdown">
                  <Link
                    to="/#"
                    onClick={e => {
                      e.preventDefault()
                      setinventory(!inventory)
                    }}
                    className="nav-link dropdown-toggle arrow-none"
                  >
                    <i className="ti-briefcase"></i>{props.t("Inventory")} {props.menuOpen}
                  </Link>
                  <div
                    className={classname("dropdown-menu dropdown-menu-left",
                      { show: inventory }
                    )}
                  >
                    <Link to="/issue-item-admin" className="dropdown-item">
                      {props.t("Issue Item")} {props.menuOpen}
                    </Link>
                    <Link to="/item-stock-admin" className="dropdown-item">
                      {props.t("Item Stock")} {props.menuOpen}
                    </Link>
                    <Link to="/item-admin" className="dropdown-item">
                      {props.t("Item")} {props.menuOpen}
                    </Link>
                    <Link to="/item-category-admin" className="dropdown-item">
                      {props.t("Item Category")} {props.menuOpen}
                    </Link>
                    <Link to="/item-store-admin" className="dropdown-item">
                      {props.t("Item Store")} {props.menuOpen}
                    </Link>

                    <Link to="/item-supplier-admin" className="dropdown-item">
                      {props.t("Item Supplier")} {props.menuOpen}
                    </Link>





                  </div>
                </li>
               
                 {/*Lesson Plan */}
                 <li className="nav-item dropdown">
                  <Link
                    to="/#"
                    onClick={e => {
                      e.preventDefault()
                      setlesson(!lesson)
                    }}
                    className="nav-link dropdown-toggle arrow-none"
                  >
                    <i className="ti-view-list-alt"></i>{props.t("Lesson Plan")} {props.menuOpen}
                  </Link>
                  <div
                    className={classname("dropdown-menu dropdown-menu-left",
                      { show: lesson }
                    )}
                  >
                    <Link to="/manage-lesson-plan-admin" className="dropdown-item">
                      {props.t("Manage Lesson Plan")} {props.menuOpen}
                    </Link>
                    {/* <Link to="/manage-syllabus-admin" className="dropdown-item">
                      {props.t("Manage Syllabus Status")} {props.menuOpen}
                    </Link> */}
                    <Link to="/lesson-admin" className="dropdown-item">
                      {props.t("Lesson")} {props.menuOpen}
                    </Link>
                    <Link to="/topic-admin" className="dropdown-item">
                      {props.t("Topic")} {props.menuOpen}
                    </Link>





                  </div>
                </li>
                <li className="nav-item dropdown">
                      <Link
                        to="/#"
                        onClick={e => {
                          e.preventDefault()
                          setmultibranchsetting(!multibranchsetting)
                        }}
                        className="nav-link dropdown-toggle arrow-none"
                      >
                        <i className="ti-settings"></i>{props.t("Settings")} {props.menuOpen}
                      </Link>
                      <div
                        className={classname("dropdown-menu dropdown-menu-left",
                          { show: multibranchsetting }
                        )}
                      >
                     
                          <Link
                            to="/generalsettings-admin"
                            className="nav-link dropdown-toggle arrow-none"
                          >
                           {props.t("General Setting")} {props.menuOpen}
                          </Link>
                      
                      
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
                            className={classname("dropdown-menu dropdown-menu-left",
                              { show: generalsetting }
                            )}
                          >
                           
                           
                       
                        
                        {/* <Link to="/systemfield-admin" className="dropdown-item">
                          {props.t("System Fields")} {props.menuOpen}
                        </Link>
                        <Link to="/student-profile-admin" className="dropdown-item">
                          {props.t("Student Profile Update")} {props.menuOpen}
                        </Link> */}
                       
                       
                        <Link to="/users-admin" className="dropdown-item">
                          {props.t("Users")} {props.menuOpen}
                        </Link>
                          



                          </div>
                        </li>
                        <Link to="/settings-session-admin-admin" className="dropdown-item">
                          {props.t("Session Setting")} {props.menuOpen}
                        </Link>
                        <Link to="/notification-admin" className="dropdown-item">
                          {props.t("Notification Setting")} {props.menuOpen}
                        </Link>
                        {/* <Link to="/sms-admin" className="dropdown-item">
                          {props.t("SMS Setting")} {props.menuOpen}
                        </Link>
                        <Link to="/email-admin" className="dropdown-item">
                          {props.t("Email Setting")} {props.menuOpen}
                        </Link>
                        <Link to="/payment-admin" className="dropdown-item">
                          {props.t("Payment Methods")} {props.menuOpen}
                        </Link>
                        <Link to="/print-admin" className="dropdown-item">
                          {props.t("Print Header Footer")} {propsmenuOpen}
                        </Link>
                        <Link to="/backup-admin" className="dropdown-item">
                          {props.t("Backup Restore")} {props.menuOpen}
                        </Link> */}
                       
                       
                     



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
                    {/* <Link to="/notice-board-admin" className="dropdown-item">
                      {props.t("Notice Board")} {props.menuOpen}
                    </Link> */}
                    <Link to="/send-email-admin" className="dropdown-item">
                      {props.t("Send Email")} {props.menuOpen}
                    </Link>
                    <Link to="/send-sms-admin" className="dropdown-item">
                      {props.t("Send SMS")} {props.menuOpen}
                    </Link>
                    <Link to="/email-smslog-admin" className="dropdown-item">
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

NavbarAdmin.propTypes = {
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
  connect(mapStatetoProps, {})(withTranslation()(NavbarAdmin))
)
