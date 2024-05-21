import React from "react";
import { connect } from "react-redux";

import { setBreadcrumbItems } from "../../store/actions";
import { Row, Col, Card, CardBody,CardTitle,CardSubtitle, Table, Button, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const Teacherreview = () => {
  const teachers = [
    {
      name: 'Jason Sharlton (900002301) Class Teacher',
      subject: [
          'English theory (210)',
          'Science practical (111)',
          'Social Studies theory (212)',
          'Science practical (111)',
          'Social Studies theory (212)',
          'Hindi theory (230)',
          'Social Studies theory (212)',
          'Social Studies theory (212)',
          'Mathematics practical (110)',
          'English theory (210)',
          'Mathematics practical (110)'
      ],
      time: [
          'Monday (10:00 AM To 10:35 AM)',
          'Monday (11:10 AM To 11:45 AM)',
          'Tuesday (10:35 AM To 11:10 AM)',
          'Tuesday (11:45 AM To 12:20 PM)',
          'Wednesday (10:35 AM To 11:10 AM)',
          'Wednesday (11:45 AM To 12:20 PM)',
          'Thursday (10:35 AM To 11:10 AM)',
          'Friday (10:35 AM To 11:10 AM)',
          'Friday (11:45 AM To 12:20 PM)',
          'Saturday (10:00 AM To 10:35 AM)',
          'Saturday (11:10 AM To 11:45 AM)'
      ],
      duration: [
          120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120
      ],
      email: 'jason@gmail.com',
      phone: '46546654564',
      myRating: 4,
      comment: 'rese'
  },
  {
      name: 'Shivam Verma (9002) Class Teacher',
      subject: [
          'Social Studies theory (212)',
          'Mathematics practical (110)',
          'English theory (210)',
          'Mathematics practical (110)',
          'English theory (210)',
          'Mathematics practical (110)',
          'English theory (210)',
          'Science practical (111)',
          'Mathematics practical (110)',
          'English theory (210)',
          'Science practical (111)',
          'Social Studies theory (212)',
          'Hindi theory (230)'
      ],
      time: [
          'Monday (10:35 AM To 11:10 AM)',
          'Monday (11:45 AM To 12:20 PM)',
          'Tuesday (10:00 AM To 10:35 AM)',
          'Tuesday (11:10 AM To 11:45 AM)',
          'Wednesday (10:00 AM To 10:35 AM)',
          'Wednesday (11:10 AM To 11:45 AM)',
          'Thursday (10:00 AM To 10:35 AM)',
          'Thursday (11:10 AM To 11:45 AM)',
          'Thursday (11:45 AM To 12:20 PM)',
          'Friday (10:00 AM To 10:35 AM)',
          'Friday (11:10 AM To 11:45 AM)',
          'Saturday (10:35 AM To 11:10 AM)',
          'Saturday (11:45 AM To 12:20 PM)'
      ],
      duration: [
          120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120
      ],
      email: 'manisha@gmail.com',
      phone: '9552654564',
      myRating: 5,
      comment: 'Very'
  }
  ];

  const renderStarRating = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<span key={i}>*</span>);
    }
    return stars;
  };

  return (
    <React.Fragment>
      <div className="container mt-5">
        <div>
          <Table>
            <thead>
              <tr>
                <th>Teacher Name</th>
                <th>Subject</th>
                <th>Time</th>
                <th>Email</th>
                <th>Phone</th>
                <th>My Rating</th>
                <th>Comment</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher, index) => (
                <tr key={index}>
                  <td>{teacher.name}</td>
                  <td>{teacher.subject.join(', ')}</td>
                  <td>{teacher.time.join(', ')}</td>
                  <td>{teacher.email}</td>
                  <td>{teacher.phone}</td>
                  <td>{renderStarRating(teacher.myRating)}</td>
                  <td>{teacher.comment}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </React.Fragment>
  );
}; 

export default connect(null, { setBreadcrumbItems })(Teacherreview);