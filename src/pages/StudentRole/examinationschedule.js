import React , {useEffect} from "react"

import { connect } from "react-redux";
import { Row, Col, Card, CardBody, Table, Button, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import { setBreadcrumbItems } from "../../store/actions";

const Examinationschedule = () => {
    const data = [
        {
          Subject: "English (210)",
          "Max Marks": "100.00",
          "Min Marks": "35.00",
          "Marks Obtained": "88.00",
          Result: "Pass",
          Note: "Very Good",
        },
        {
          Subject: "Science (111)",
          "Max Marks": "100.00",
          "Min Marks": "35.00",
          "Marks Obtained": "78.00",
          Result: "Pass",
          Note: "",
        },
        {
          Subject: "Hindi (230)",
          "Max Marks": "100.00",
          "Min Marks": "35.00",
          "Marks Obtained": "89.00",
          Result: "Pass",
          Note: "",
        },
        {
          Subject: "Mathematics (110)",
          "Max Marks": "100.00",
          "Min Marks": "35.00",
          "Marks Obtained": "89.00",
          Result: "Pass",
          Note: "",
        },
      ];
      const data2 = [
        {
          Subject: "English (210)",
          "Max Marks": "100.00",
          "Min Marks": "35.00",
          "Marks Obtained": "98.00",
          Grade: "A++",
          Note: "",
        },
        {
          Subject: "Hindi (230)",
          "Max Marks": "100.00",
          "Min Marks": "35.00",
          "Marks Obtained": "89.00",
          Grade: "A+",
          Note: "",
        },
        {
          Subject: "Science (111)",
          "Max Marks": "100.00",
          "Min Marks": "35.00",
          "Marks Obtained": "87.00",
          Grade: "A+",
          Note: "",
        },
        {
          Subject: "Mathematics (110)",
          "Max Marks": "100.00",
          "Min Marks": "35.00",
          "Marks Obtained": "90.00",
          Grade: "A+",
          Note: "",
        },
      ];
      const data3 = [
        {
          Subject: "English (210)",
          "Max Marks": "100.00",
          "Min Marks": "35.00",
          "Marks Obtained": "89.00",
          Grade: "A+",
          Note: "",
        },
        {
          Subject: "Hindi (230)",
          "Max Marks": "100.00",
          "Min Marks": "35.00",
          "Marks Obtained": "90.00",
          Grade: "A+",
          Note: "",
        },
        {
          Subject: "Science (111)",
          "Max Marks": "100.00",
          "Min Marks": "35.00",
          "Marks Obtained": "89.00",
          Grade: "A+",
          Note: "",
        },
        {
          Subject: "Mathematics (110)",
          "Max Marks": "100.00",
          "Min Marks": "35.00",
          "Marks Obtained": "99.00",
          Grade: "A++",
          Note: "",
        },
      ];
    return (
        <React.Fragment>
         <div className="container mt-5">
         <div>
      <h2>Monthly Test April(2023-24)</h2>
      <Table striped>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Max Marks</th>
            <th>Min Marks</th>
            <th>Marks Obtained</th>
            <th>Result</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.Subject}</td>
              <td>{item["Max Marks"]}</td>
              <td>{item["Min Marks"]}</td>
              <td>{item["Marks Obtained"]}</td>
              <td>{item.Result}</td>
              <td>{item.Note}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <p>
        Percentage: 86.00, Rank: 3, Result: Pass Division: First, Grand Total:
        400, Total Obtain Marks: 344
      </p>
    </div>
    <div>
      <h2>Practice SET(A001) School Based Grading System</h2>
      <Table striped>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Max Marks</th>
            <th>Min Marks</th>
            <th>Marks Obtained</th>
            <th>Grade</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {data2.map((item, index) => (
            <tr key={index}>
              <td>{item.Subject}</td>
              <td>{item["Max Marks"]}</td>
              <td>{item["Min Marks"]}</td>
              <td>{item["Marks Obtained"]}</td>
              <td>{item.Grade}</td>
              <td>{item.Note}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <p>
        Percentage: 91.00, Rank: 1, Result: Pass Division: First, Grand Total:
        400, Total Obtain Marks: 364
      </p>
    </div>
    <div>
      <h2>All Subject Practice Test</h2>
      <Table striped>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Max Marks</th>
            <th>Min Marks</th>
            <th>Marks Obtained</th>
            <th>Grade</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {data3.map((item, index) => (
            <tr key={index}>
              <td>{item.Subject}</td>
              <td>{item["Max Marks"]}</td>
              <td>{item["Min Marks"]}</td>
              <td>{item["Marks Obtained"]}</td>
              <td>{item.Grade}</td>
              <td>{item.Note}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <p>
        Percentage: 91.75, Rank: 1, Result: Pass Division: First, Grand Total:
        400, Total Obtain Marks: 367
      </p>
    </div>
         </div>
       </React.Fragment>
         );
        }; 
export default connect(null, { setBreadcrumbItems })(Examinationschedule);