import React , {useEffect} from "react"

import { connect } from "react-redux";
import { Row, Col, Card, CardBody, Table, Button, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import { setBreadcrumbItems } from "../../store/actions";

const lessonplan = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const timeIntervals = ['10:00 AM - 10:35 AM', '10:35 AM - 11:10 AM', '11:10 AM - 11:45 AM', '11:45 AM - 12:20 PM']; // Assuming time intervals

    const startDate = "04/01/2024";
    const endDate = "04/07/2024";

    const timetableData = [
        { day: 'Monday', time: '10:00 AM - 10:35 AM', subject: 'English (210)', teacher: 'Jason Sharlton (900002301)', room: 'Room No.: 120' },
        { day: 'Monday', time: '10:35 AM - 11:10 AM', subject: 'Social Studies (212)', teacher: 'Shivam Verma (9002)', room: 'Room No.: 120' },
        // Add all timetable data
    ];

    const getScheduleForDayAndInterval = (day, interval) => {
        const schedule = timetableData.find(item => item.day === day && item.time === interval);
        return schedule ? `${schedule.subject}\n${schedule.teacher}\n${schedule.room}` : <span style={{ color: 'red' }}>Not Scheduled</span>;
    };
    return (
      <React.Fragment>
       <div className="container mt-5">
       <Row>
                    <Col md="12">
                        <Card>
                            <CardBody>
                                <Table bordered>
                                    <thead>
                                        <tr>
                                            <th colSpan="8">{`${startDate} To ${endDate}`}</th>
                                        </tr>
                                        <tr>
                                            {days.map((day, index) => (
                                                <th key={index}>{day}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {timeIntervals.map((interval, intervalIndex) => (
                                            <tr key={intervalIndex}>
                                                {days.map((day, dayIndex) => (
                                                    <td key={dayIndex}>{getScheduleForDayAndInterval(day, interval)}</td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
       </div>
       
       </React.Fragment>
         );
        }; 
    
export default connect(null, { setBreadcrumbItems })(lessonplan)