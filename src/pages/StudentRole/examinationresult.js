import React , {useEffect} from "react"

import { connect } from "react-redux";
import { Row, Col, Card, CardBody, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import { setBreadcrumbItems } from "../../store/actions";
import { useState } from "react";
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from "reactstrap";

const Examinationresult = () => {
    const [modal, setModal] = useState(false);
    const [selectedExam, setSelectedExam] = useState(null);
  
    const toggleModal = () => setModal(!modal);
  
    const exams = [
        { id: 1, name: "Monthly Test April(2023-24)", description: "You are allowed to submit only once, make sure that you have correctly attempted all the questions before submission." },
        { id: 2, name: "Practice SET(A001) School Based Grading System", description: "There will be no negative marking in case of wrong attempts." },
        { id: 3, name: "All Subject Practice Test", description: "All Subject Practice Test" },
        { id: 4, name: "Monthly Test (April) GPA Grading System", description: "" },
        { id: 5, name: "Monthly Test (April) Average Passing", description: "" },
        { id: 6, name: "Chapter Wise Class Test-(MAY)", description: "Keep In Mind Some Important Points Before Attempting Any Sample Paper." },
        { id: 7, name: "Practical Examination", description: "A midterm exam, is an exam given near the middle of an academic grading term, or near the middle of any given quarter or semester." },
        { id: 8, name: "Internal Examination", description: "The internal grade awarded to the students in each course in a semester shall be published on the notice board at least one week before the commencement of end semester examination." },
        { id: 9, name: "Monthly Test", description: "Monthly Test" },
        { id: 10, name: "Weekly Exam", description: "" },
        { id: 11, name: "Monthly Test (JUNE -2023)", description: "" },
        { id: 12, name: "June -Test (All subject)", description: "" },
        { id: 13, name: "Practice Set(JUNE)", description: "" },
        { id: 14, name: "Monthly Exam", description: "A mid-term is a test that a student takes halfway through a school term." },
        { id: 15, name: "Monthly Exam Average passing(June- 2023)", description: "" },
        { id: 16, name: "Chapter Wise Class Test(JULY)", description: "Chapter Wise Class Test" },
        { id: 17, name: "Weekly Test(July-2023)", description: "" },
        { id: 18, name: "Monthly Test(2023- August)", description: "Periodic Test (10 Marks) -written Test, restricted to three in each subject in an Academic Year. Average of the best two tests to be taken for final marks submission" },
        { id: 19, name: "August -Test(2023)", description: "" },
        { id: 20, name: "Quarterly Examination(September-2023)", description: "Quarterly exams will be a cumulative exam that includes material from the entire 1st marking period. Quarterly exams will take place during a regularly scheduled period." },
        { id: 21, name: "Monthly Exam", description: "Monthly Exam" },
        { id: 22, name: "Monthly Exam (september)", description: "" },
        { id: 23, name: "Online Examination (October)", description: "All questions are compulsory." },
        { id: 24, name: "All Subject-Examination", description: "All Subject-Examination" },
        { id: 25, name: "Chapter Wise Class Test( January-2024)", description: "" },
        { id: 26, name: "Monthly Test (February -2024)", description: "These are the best model question papers issued by CBSE that will certainly help students." },
        { id: 27, name: "Practice SET(A001) (2024-March)", description: "There will be no negative marking in case of wrong attempts." }
    ];
  
    const handleViewExam = (exam) => {
      setSelectedExam(exam);
      toggleModal();
    };
  
    const fakeSearch = () => {
      // Fake search function, doesn't perform actual search
      console.log("Searching...");
    };
    return (
      <React.Fragment>
       <div className="container mt-5">
       <div>
      <Input type="text" placeholder="Search..." onChange={fakeSearch} />
      <Table striped>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Exam</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{exam.name}</td>
              <td>{exam.description}</td>
              <td>
                <Button color="primary" onClick={() => handleViewExam(exam)}>View</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>View Exam</ModalHeader>
        <ModalBody>
          {selectedExam && (
            <div>
              <h5>{selectedExam.name}</h5>
              <p>{selectedExam.description}</p>
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
export default connect(null, { setBreadcrumbItems })(Examinationresult);