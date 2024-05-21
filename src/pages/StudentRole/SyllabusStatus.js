import React , {useEffect} from "react"

import { connect } from "react-redux";
import {
  Table,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Container
} from "reactstrap"

import { setBreadcrumbItems } from "../../store/actions";
import ReactApexChart from 'react-apexcharts';
const subjectsData = [
    { name: 'English (210)', percentage: 67 },
    { name: 'Hindi (230)', percentage: 50 },
    { name: 'Mathematics (110)', percentage: 43 },
    { name: 'Science (111)', percentage: 75 },
    { name: 'Social Studies (212)', percentage: 100 },
    { name: 'Drawing (200)', percentage: 0 },
    { name: 'Computer (00220)', percentage: 50 },
    { name: 'Elective 1 (101)', percentage: 50 },
    { name: 'Elective 2 (102)', percentage: 0 },
  ];
  
  const renderCharts = () => {
    return subjectsData.map((subject, index) => (
      <Col key={index} md={4} className="mb-4">
        <Card>
          <CardBody>
            <CardTitle>{subject.name}</CardTitle>
            <ReactApexChart
              options={{
                labels: ['Completed', 'Remaining'],
                colors: ['#36A2EB', '#FF6384'],
                legend: {
                  show: true,
                  position: 'right',
                },
              }}
              series={[subject.percentage, 100 - subject.percentage]}
              type="donut"
              height={100}
            />
          </CardBody>
        </Card>
      </Col>
    ));
  };
  const summaryData = [
    { 
      subject: 'English (210)',
      percentage: 67,
      lessons: [
        { title: 'Nina and the baby sparrows', status: '100% Complete', date: '04/15/2023' },
        { title: 'Chapter 1', status: 'Complete (04/15/2023)' },
        { title: 'The baby sparrow chapter 2', status: 'No Status' },
        { title: 'The Story of the Road', status: '50% Complete' },
        { title: 'A Little Fish Story', status: 'No Status' },
      ]
    },
    { 
      subject: 'Hindi (230)',
      percentage: 50,
      lessons: [
        { title: 'अक्ल बड़ी या भैंस', status: '100% Complete', date: '03/20/2023' },
        { title: 'कविता का सारांश', status: 'Complete (03/20/2023)' },
        { title: 'चाँद वाली अम्मा', status: '100% Complete', date: '12/12/2023' },
        { title: 'काव्यांशों की व्याख्या', status: 'Complete (12/12/2023)' },
        { title: 'बहादुर बित्तो', status: 'No Status' },
        { title: 'सबसे अच्छा पेड़', status: '0% Complete' },
        { title: 'काव्यांशों की व्याख्या', status: 'Incomplete' },
        { title: 'कविता का सारांश', status: 'Incomplete' },
      ]
    },
    { 
      subject: 'Mathematics (110)',
      percentage: 43,
      lessons: [
        { title: 'Fun With Numbers', status: '100% Complete', date: '04/20/2023' },
        { title: 'Form Number sequence from', status: 'Complete (04/20/2023)' },
        { title: 'Chapter 1', status: 'Complete (12/10/2023)' },
        { title: 'Counting in groups', status: 'No Status' },
        { title: 'Real Number', status: '50% Complete' },
        { title: 'Group objects into a group of 10s', status: 'Incomplete' },
        { title: 'Chapter 1', status: 'Complete (12/15/2023)' },
        { title: 'Long and Short', status: '0% Complete' },
        { title: 'Mental Arithmetic', status: 'Incomplete' },
        { title: 'Fractional Numbers', status: 'Incomplete' },
        { title: 'Measurement', status: 'Incomplete' },
        { title: 'Counting in groups', status: 'No Status' },
        { title: 'Fun With Numbers', status: 'No Status' },
      ]
    },
    { 
      subject: 'Science (111)',
      percentage: 75,
      lessons: [
        { title: 'Games We Play', status: 'No Status' },
        { title: 'Flying High', status: '50% Complete' },
        { title: 'Atomic Mass of Elements', status: 'Complete (04/15/2023)' },
        { title: 'Organic Compounds', status: 'Incomplete' },
        { title: 'Foods We Eat', status: '100% Complete', date: '04/20/2023' },
        { title: 'Chapter 1', status: 'Complete (04/20/2023)' },
        { title: 'Chapter 2', status: 'Complete (12/20/2023)' },
        { title: 'It’s Raining', status: 'No Status' },
      ]
    },
    { 
      subject: 'Social Studies (212)',
      percentage: 100,
      lessons: [
        { title: 'The Earth – An Introduction', status: '100% Complete' },
        { title: 'Chapter -1', status: 'Complete (04/20/2023)' },
        { title: 'The Environment – An Introduction', status: 'No Status' },
      ]
    },
    { 
      subject: 'Drawing (200)',
      percentage: 0,
      lessons: [
        { title: 'The Basic introduction of art', status: '0% Complete' },
        { title: 'Drawing Skills', status: 'Incomplete' },
      ]
    },
    { 
      subject: 'Computer (00220)',
      percentage: 50,
      lessons: [
        { title: 'Basics of Computers', status: '50% Complete' },
        { title: 'Chapter 1', status: 'Complete (04/26/2023)' },
        { title: 'Chapter 2', status: 'Incomplete' },
      ]
    },
    { 
      subject: 'Elective 1 (101)',
      percentage: 50,
      lessons: [
        { title: 'The Environment', status: '50% Complete' },
        { title: 'Chapter -1', status: 'Complete (04/20/2023)' },
        { title: 'Chapter 2', status: 'Incomplete' },
      ]
    },
    { 
      subject: 'Elective 2 (102)',
      percentage: 0,
      lessons: []
    },
  ];
  const renderSummary = () => {
    return summaryData.map((subject, index) => (
      <div key={index}>
        <h5>{subject.subject}</h5>
        <p>{subject.percentage}% Complete</p>
        <ul>
          {subject.lessons.map((lesson, idx) => (
            <li key={idx}>
              <span>{lesson.status}</span> {lesson.title} {lesson.date ? `(${lesson.date})` : ''}
            </li>
          ))}
        </ul>
      </div>
    ));
  };
const SyllabusStatus = () => {
    return (
      <React.Fragment>
       <div className="container mt-5">
       <Row>
        {renderCharts()}
      </Row>
      <Row>
        {renderSummary()}
      </Row>
        </div>
       </React.Fragment>
  );
};

export default connect(null, { setBreadcrumbItems })(SyllabusStatus);