import React , {useEffect} from "react"

import { connect } from "react-redux";
import { Container, Row, Col, Card, CardBody, Table } from 'reactstrap';

import { setBreadcrumbItems } from "../../store/actions";
const ClassTimetable = () => {
    const timetableData = [
        { day: 'Monday', time: '10:00 AM - 10:35 AM', subject: 'English (210)', teacher: 'Jason Sharlton (900002301)', room: 'Room No.: 120' },
        { day: 'Monday', time: '10:35 AM - 11:10 AM', subject: 'Social Studies (212)', teacher: 'Shivam Verma (9002)', room: 'Room No.: 120' },
        { day: 'Monday', time: '11:10 AM - 11:45 AM', subject: 'Science (111)', teacher: 'Jason Sharlton (900002301)', room: 'Room No.: 120' },
        { day: 'Monday', time: '11:45 AM - 12:20 PM', subject: 'Mathematics (110)', teacher: 'Shivam Verma (9002)', room: 'Room No.: 120' },
        { day: 'Tuesday', time: '10:00 AM - 10:35 AM', subject: 'English (210)', teacher: 'Shivam Verma (9002)', room: 'Room No.: 120' },
        { day: 'Tuesday', time: '10:35 AM - 11:10 AM', subject: 'Social Studies (212)', teacher: 'Jason Sharlton (900002301)', room: 'Room No.: 120' },
        { day: 'Tuesday', time: '11:10 AM - 11:45 AM', subject: 'Mathematics (110)', teacher: 'Shivam Verma (9002)', room: 'Room No.: 120' },
        { day: 'Tuesday', time: '11:45 AM - 12:20 PM', subject: 'Science (111)', teacher: 'Jason Sharlton (900002301)', room: 'Room No.: 120' },
        { day: 'Wednesday', time: '10:00 AM - 10:35 AM', subject: 'English (210)', teacher: 'Shivam Verma (9002)', room: 'Room No.: 120' },
        { day: 'Wednesday', time: '10:35 AM - 11:10 AM', subject: 'Social Studies (212)', teacher: 'Jason Sharlton (900002301)', room: 'Room No.: 120' },
        { day: 'Wednesday', time: '11:10 AM - 11:45 AM', subject: 'Mathematics (110)', teacher: 'Shivam Verma (9002)', room: 'Room No.: 120' },
        { day: 'Wednesday', time: '11:45 AM - 12:20 PM', subject: 'Hindi (230)', teacher: 'Jason Sharlton (900002301)', room: 'Room No.: 120' },
        { day: 'Thursday', time: '10:00 AM - 10:35 AM', subject: 'English (210)', teacher: 'Shivam Verma (9002)', room: 'Room No.: 120' },
        { day: 'Thursday', time: '10:35 AM - 11:10 AM', subject: 'Social Studies (212)', teacher: 'Jason Sharlton (900002301)', room: 'Room No.: 120' },
        { day: 'Thursday', time: '11:10 AM - 11:45 AM', subject: 'Science (111)', teacher: 'Shivam Verma (9002)', room: 'Room No.: 120' },
        { day: 'Thursday', time: '11:45 AM - 12:20 PM', subject: 'Mathematics (110)', teacher: 'Jason Sharlton (900002301)', room: 'Room No.: 120' },
        { day: 'Friday', time: '10:00 AM - 10:35 AM', subject: 'English (210)', teacher: 'Shivam Verma (9002)', room: 'Room No.: 120' },
        { day: 'Friday', time: '10:35 AM - 11:10 AM', subject: 'Social Studies (212)', teacher: 'Jason Sharlton (900002301)', room: 'Room No.: 120' },
        { day: 'Friday', time: '11:10 AM - 11:45 AM', subject: 'Science (111)', teacher: 'Shivam Verma (9002)', room: 'Room No.: 120' },
        { day: 'Friday', time: '11:45 AM - 12:20 PM', subject: 'Mathematics (110)', teacher: 'Jason Sharlton (900002301)', room: 'Room No.: 120' },
        { day: 'Saturday', time: '10:00 AM - 10:35 AM', subject: 'English (210)', teacher: 'Shivam Verma (9002)', room: 'Room No.: 120' },
        { day: 'Saturday', time: '10:35 AM - 11:10 AM', subject: 'Social Studies (212)', teacher: 'Jason Sharlton (900002301)', room: 'Room No.: 120' },
        { day: 'Saturday', time: '11:10 AM - 11:45 AM', subject: 'Science (111)', teacher: 'Shivam Verma (9002)', room: 'Room No.: 120' },
        { day: 'Saturday', time: '11:45 AM - 12:20 PM', subject: 'Mathematics (110)', teacher: 'Jason Sharlton (900002301)', room: 'Room No.: 120' },
        { day: 'Sunday', time: '10:00 AM - 10:35 AM', subject: 'English (210)', teacher: 'Shivam Verma (9002)', room: 'Room No.: 120' },
        { day: 'Sunday', time: '10:35 AM - 11:10 AM', subject: 'Social Studies (212)', teacher: 'Jason Sharlton (900002301)', room: 'Room No.: 120' },
        { day: 'Sunday', time: '11:10 AM - 11:45 AM', subject: 'Science (111)', teacher: 'Shivam Verma (9002)', room: 'Room No.: 120' },
        { day: 'Sunday', time: '11:45 AM - 12:20 PM', subject: 'Mathematics (110)', teacher: 'Jason Sharlton (900002301)', room: 'Room No.: 120' },
       
      ];
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return (
      <React.Fragment>
       <div className="container mt-5">
       
       <div className="timetable">
      <Row>
        <Card>
          <CardBody>
            <Table bordered>
              <thead>
                <tr>
                  <th>Time</th>
                  {days.map(day => (
                    <th key={day}>{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timetableData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.time}</td>
                    {days.map((day, idx) => (
                      <td key={idx}>
                        {item.day === day ? (
                          <div>
                            <strong>{item.subject}</strong><br />
                            {item.teacher}<br />
                            {item.room}
                          </div>
                        ) : <strong style={{ color: 'red' }}>Not Scheduled</strong>}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                </tr>
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Row>
    </div>
       </div>
       </React.Fragment>
         );
        }; 
    
export default connect(null, { setBreadcrumbItems })(ClassTimetable);