import React , {useEffect} from "react"

import { connect } from "react-redux";
import { Row, Col, Card, CardBody, Table, Button, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import { setBreadcrumbItems } from "../../store/actions";
const Noticeboard = () => {
    const notices = [
        "Online Classes Preparation",
        "Holi Celebration Notification",
        "Parents Teacher Meeting",
        "Exam Preparation Notification!",
        "Notice for new Book collection",
        "PTM!!!!!!!!!!!!!!!!",
        "Fees Reminder",
        "ADMISSION NOTICE FOR NURSERY 2024-2025",
        "Pre Board Exam Schedule",
        "Student Health Check-up",
        "Republic Day Celebration",
        "Parents Teacher Meeting",
        "Online Classes Preparation",
        "Fees Reminder",
        "Happy New Year!!!!!!!!!!!!!!!!!!",
        "Parents Teacher Meeting",
        "Half Yearly Examination Preparation",
        "Online Classes Preparation",
        "Fees Reminder",
        "Fees Reminder",
        "Online Classes Preparation",
        "Notice for new Book collection",
        "Parents Teacher Meeting",
        "Diwali Celebration's Holiday",
        "Student Health Check-up",
        "FEES REMINDER",
        "PTM.!!!!!!!!!!!!!!!!!",
        "Student Health Check-up",
        "Fees Reminder...",
        "Gandhi Jayanti Programmed",
        "Notice for new Book collection",
        "Parents Teacher Meeting",
        "NOTICE FOR PARIKSHA PE CHARCHA",
        "Quarterly Examination Preparation",
        "Teacher Day Celebration",
        "Fees Reminder",
        "Raksha Bandhan Holiday",
        "PARENTS TEACHER MEETING",
        "Fees Reminder",
        "Independence Day Celebration!!!!!!",
        "Online Classes Preparation",
        "Student Health Check-up",
        "Online Classes Preparation",
        "PTM",
        "Fees Reminder",
        "New Syllabus Instructions",
        "Fees Reminder",
        "Online Classes Preparation",
        "World Environment Day Program.....!!!!!!!!!!!!",
        "Student Health Check-up",
        "!!! Notice for new Book collection",
        "Parent Techer meeting",
        "Fees Reminder",
        "Student Health Check -up",
        "Summer Vacation Notice !!!!!!!!!!!!!!!",
        "NOTICE FOR PARIKSHA PE CHARCHA",
        "URGENT NOTICE",
        "New Syllabus Instructions",
        "Fees Reminder",
        "New Academic Session(2023-24)",
        "Student Health Check -up",
        "Exam Preparation Notification!",
        "Student Health Check-up",
        "PTM Meeting",
        "Fees Reminder",
        "Student Health Check-up",
        "Pre Board Exam Schedule",
        "Parent Teacher meeting",
        "Pre-Board Exam Schedule",
        "Fees Reminder",
        "National Teachers' Day",
        "Student Health Checkup",
      ];
    return (
      <React.Fragment>
       <div className="container mt-5">
       <div>
      {notices.map((notice, index) => (
        <div key={index}>
          <span>{notice}</span>
          <hr />
        </div>
      ))}
    </div>
       </div>
       </React.Fragment>
         );
        }; 
export default connect(null, { setBreadcrumbItems })(Noticeboard);