import React , {useEffect} from "react"

import { connect } from "react-redux";
import { Row, Col, Card, CardBody, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import { setBreadcrumbItems } from "../../store/actions";
import {
  TabContent, TabPane, Nav, NavItem, NavLink, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import  { useState } from 'react';
import classnames from 'classnames';


const Homeworkstudent = () => {
  
    const [activeTab, setActiveTab] = useState('upcoming');
    const [modal, setModal] = useState(false);
    const [selectedHomework, setSelectedHomework] = useState(null);
  
    const toggleModal = () => setModal(!modal);
  
    const toggleTab = tab => {
      if (activeTab !== tab) setActiveTab(tab);
    }
  
    const homeworkData = [
      {
        class: "Class 3",
        section: "A",
        subject: "Computer (00220)",
        homeworkDate: "03/26/2024",
        submissionDate: "03/30/2024",
        evaluationDate: "03/30/2024",
        maxMarks: "40.00",
        status: "Submitted",
        action: "Action Button Placeholder"
      },
      {
        class: "Class 3",
        section: "A",
        subject: "Social Studies (212)",
        homeworkDate: "03/21/2024",
        submissionDate: "03/25/2024",
        maxMarks: "40.00",
        status: "Pending",
        action: "Action Button Placeholder"
      },
      {
        class: "Class 3",
        section: "A",
        subject: "Science (111)",
        homeworkDate: "03/16/2024",
        submissionDate: "03/20/2024",
        maxMarks: "30.00",
        status: "Pending"
      },
      {
        class: "Class 3",
        section: "A",
        subject: "Mathematics (110)",
        homeworkDate: "03/11/2024",
        submissionDate: "03/15/2024",
        maxMarks: "40.00",
        status: "Submitted"
      },
      {
        class: "Class 3",
        section: "A",
        subject: "Hindi (230)",
        homeworkDate: "03/05/2024",
        submissionDate: "03/09/2024",
        maxMarks: "40.00",
        status: "Submitted"
      },
      {
        class: "Class 3",
        section: "A",
        subject: "English (210)",
        homeworkDate: "03/01/2024",
        submissionDate: "03/05/2024",
        evaluationDate: "03/06/2024",
        maxMarks: "40.00",
        marksObtained: "35.00",
        note: "",
        status: "Evaluated"
      },
    ];
  
    const getColorForStatus = status => {
      switch (status.toLowerCase()) {
        case 'submitted':
          return 'success';
        case 'pending':
          return 'warning';
        case 'evaluated':
          return 'primary';
        default:
          return 'secondary';
      }
    }
  
    const renderHomeworkTable = () => {
      return (
        <Table striped>
          <thead>
            <tr>
              <th>Class</th>
              <th>Section</th>
              <th>Subject</th>
              <th>Homework Date</th>
              <th>Submission Date</th>
              <th>Evaluation Date</th>
              <th>Max Marks</th>
              <th>Marks Obtained</th>
              <th>Note</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {homeworkData.map((homework, index) => (
              <tr key={index}>
                <td>{homework.class}</td>
                <td>{homework.section}</td>
                <td>{homework.subject}</td>
                <td>{homework.homeworkDate}</td>
                <td>{homework.submissionDate}</td>
                <td>{homework.evaluationDate}</td>
                <td>{homework.maxMarks}</td>
                <td>{homework.marksObtained}</td>
                <td>{homework.note}</td>
                <td>
                  <span className={`badge bg-${getColorForStatus(homework.status)}`}>{homework.status}</span>
                </td>
                <td>
                  <Button color="primary" onClick={() => { toggleModal(); setSelectedHomework(homework); }}>Details</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      );
    }
    return (
      <React.Fragment>
       <div className="container mt-5">
       <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === 'upcoming' })}
            onClick={() => { toggleTab('upcoming'); }}
          >
            Upcoming Homework
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === 'closed' })}
            onClick={() => { toggleTab('closed'); }}
          >
            Closed Homework
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="upcoming">
          {renderHomeworkTable()}
        </TabPane>
        <TabPane tabId="closed">
          {renderHomeworkTable()}
        </TabPane>
      </TabContent>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Homework Details</ModalHeader>
        <ModalBody>
          {selectedHomework && (
            <div>
              <p><strong>Class:</strong> {selectedHomework.class}</p>
              <p><strong>Section:</strong> {selectedHomework.section}</p>
              <p><strong>Subject:</strong> {selectedHomework.subject}</p>
              <p><strong>Homework Date:</strong> {selectedHomework.homeworkDate}</p>
              <p><strong>Submission Date:</strong> {selectedHomework.submissionDate}</p>
              <p><strong>Evaluation Date:</strong> {selectedHomework.evaluationDate}</p>
              <p><strong>Max Marks:</strong> {selectedHomework.maxMarks}</p>
              <p><strong>Marks Obtained:</strong> {selectedHomework.marksObtained}</p>
              <p><strong>Note:</strong> {selectedHomework.note}</p>
              <p><strong>Status:</strong> {selectedHomework.status}</p>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
       </div>
       </React.Fragment>
         );
        }; 
    
export default connect(null, { setBreadcrumbItems })(Homeworkstudent)