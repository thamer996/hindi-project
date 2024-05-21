import React , {useEffect} from "react"

import { connect } from "react-redux";
import { Row, Col, Card, CardBody, Table, Button, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import { setBreadcrumbItems } from "../../store/actions";

const examresult = () => {
    return (
      <React.Fragment>
       <div className="container mt-5">
        <h5>Practice SET(A001) CBSE Exam(March-2024)</h5>
       <Table bordered>
      <thead>
        <tr>
          <th rowSpan="2">Subject</th>
          <th colSpan="3">Marks</th>
          <th>Total</th>
        </tr>
        <tr>
          <th>Theory (TH02)<br />(Max 100)</th>
          <th>Practical (PC03)<br />(Max 75)</th>
          <th>Assignment (AS05)<br />(Max 20)</th>
          <th>(Max 210)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>English</td>
          <td>99.00</td>
          <td>xx</td>
          <td>17.00</td>
          <td>116.00</td>
        </tr>
        <tr>
          <td>Mathematics</td>
          <td>88.00</td>
          <td>xx</td>
          <td>xx</td>
          <td>88.00</td>
        </tr>
        <tr>
          <td>Science</td>
          <td>99.00</td>
          <td>73.00</td>
          <td>20.00</td>
          <td>192.00</td>
        </tr>
        <tr>
          <td>Computer</td>
          <td>99.00</td>
          <td>74.00</td>
          <td>18.00</td>
          <td>191.00</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="5" style={{ textAlign: "right" }}>
            Total Marks : 587/610 &nbsp;&nbsp;&nbsp; Percentage (%) : 96.23
            &nbsp;&nbsp;&nbsp; Grade : A + &nbsp;&nbsp;&nbsp; Rank : 1
          </td>
        </tr>
      </tfoot>
    </Table>
<div className="mt-3">

</div>
<h5>Monthly Test (FEBRUARY-2024)</h5>
<Table bordered>
      <thead>
        <tr>
          <th rowSpan="2">Subject</th>
          <th colSpan="3">Marks</th>
          <th>Total</th>
        </tr>
        <tr>
          <th>Theory (TH02)<br />(Max 100)</th>
          <th>Practical (PC03)<br />(Max 75)</th>
          <th>Assignment (AS05)<br />(Max 20)</th>
          <th>(Max 210)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>English</td>
          <td>98.00</td>
          <td>xx</td>
          <td>20.00</td>
          <td>118.00</td>
        </tr>
        <tr>
          <td>Mathematics</td>
          <td>99.00</td>
          <td>xx</td>
          <td>xx</td>
          <td>99.00</td>
        </tr>
        <tr>
          <td>Science</td>
          <td>98.00</td>
          <td>69.00</td>
          <td>20.00</td>
          <td>187.00</td>
        </tr>
        <tr>
          <td>Computer</td>
          <td>85.00</td>
          <td>74.00</td>
          <td>15.00</td>
          <td>174.00</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="5" style={{ textAlign: "right" }}>
            Total Marks : 578/610 &nbsp;&nbsp;&nbsp; Percentage (%) : 94.75
            &nbsp;&nbsp;&nbsp; Grade : A + &nbsp;&nbsp;&nbsp; Rank : 1
          </td>
        </tr>
      </tfoot>
    </Table>
    <div className="mt-3">
        <h5>Chapter Wise Weekly Test(January-2024)</h5>
    <Table bordered>
      <thead>
        <tr>
          <th rowSpan="2">Subject</th>
          <th colSpan="3">Marks</th>
          <th>Total</th>
        </tr>
        <tr>
          <th>Theory (TH02)<br />(Max 100)</th>
          <th>Practical (PC03)<br />(Max 75)</th>
          <th>Assignment (AS05)<br />(Max 20)</th>
          <th>(Max 210)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>English</td>
          <td>99.00</td>
          <td>xx</td>
          <td>20.00</td>
          <td>119.00</td>
        </tr>
        <tr>
          <td>Mathematics</td>
          <td>86.00</td>
          <td>xx</td>
          <td>xx</td>
          <td>86.00</td>
        </tr>
        <tr>
          <td>Science</td>
          <td>88.00</td>
          <td>34.00</td>
          <td>20.00</td>
          <td>142.00</td>
        </tr>
        <tr>
          <td>Computer</td>
          <td>98.00</td>
          <td>23.00</td>
          <td>10.00</td>
          <td>131.00</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="5" style={{ textAlign: "right" }}>
            Total Marks : 478/610 &nbsp;&nbsp;&nbsp; Percentage (%) : 78.36
            &nbsp;&nbsp;&nbsp; Grade : B+ &nbsp;&nbsp;&nbsp; Rank : 1
          </td>
        </tr>
      </tfoot>
    </Table>
    <div className="mt-3">

    </div>
    <h5>Half Yearly Exam (December-2023)</h5>
    <Table bordered>
      <thead>
        <tr>
          <th rowSpan="2">Subject</th>
          <th colSpan="3">Marks</th>
          <th>Total</th>
        </tr>
        <tr>
          <th>Theory (TH02)<br />(Max 100)</th>
          <th>Practical (PC03)<br />(Max 75)</th>
          <th>Assignment (AS05)<br />(Max 20)</th>
          <th>(Max 210)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>English</td>
          <td>89.00</td>
          <td>67.00</td>
          <td>xx</td>
          <td>156.00</td>
        </tr>
        <tr>
          <td>Hindi</td>
          <td>98.00</td>
          <td>xx</td>
          <td>12.00</td>
          <td>110.00</td>
        </tr>
        <tr>
          <td>Mathematics</td>
          <td>96.00</td>
          <td>xx</td>
          <td>xx</td>
          <td>96.00</td>
        </tr>
        <tr>
          <td>Science</td>
          <td>95.00</td>
          <td>65.00</td>
          <td>20.00</td>
          <td>180.00</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="5" style={{ textAlign: "right" }}>
            Total Marks : 542/590 &nbsp;&nbsp;&nbsp; Percentage (%) : 91.86
            &nbsp;&nbsp;&nbsp; Grade : A+ &nbsp;&nbsp;&nbsp; Rank : 1
          </td>
        </tr>
      </tfoot>
    </Table>
</div>
       </div>
       </React.Fragment>
         );
        }; 
export default connect(null, { setBreadcrumbItems })(examresult);