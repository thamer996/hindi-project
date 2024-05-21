import React , {useEffect} from "react"

import { connect } from "react-redux";
import { Row, Col, Card, CardBody, Table, Button, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import { setBreadcrumbItems } from "../../store/actions";

const examschedule = () => {
    return (
      <React.Fragment>
       <div className="container mt-5">
        <h5>Practice SET(A001) CBSE Exam (March-2024)</h5>
        <Table bordered>
      <thead>
        <tr>
          <th>Subject</th>
          <th>Date</th>
          <th>Start Time</th>
          <th>Duration (minute)</th>
          <th>Room No.</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>English (210)</td>
          <td>03/01/2024</td>
          <td>10:30:00</td>
          <td>120</td>
          <td>23G</td>
        </tr>
        <tr>
          <td>Mathematics (110)</td>
          <td>03/05/2024</td>
          <td>10:30:00</td>
          <td>120</td>
          <td>34FF</td>
        </tr>
        <tr>
          <td>Science (111)</td>
          <td>03/12/2024</td>
          <td>10:30:00</td>
          <td>120</td>
          <td>23FF</td>
        </tr>
        <tr>
          <td>Computer (00220)</td>
          <td>03/16/2024</td>
          <td>10:30:00</td>
          <td>120</td>
          <td>25G</td>
        </tr>
      </tbody>
    </Table>
    <h5>Monthly Test (FEBRUARY-2024)</h5>
    <Table bordered>
      <thead>
        <tr>
          <th>Subject</th>
          <th>Date</th>
          <th>Start Time</th>
          <th>Duration (minute)</th>
          <th>Room No.</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>English (210)</td>
          <td>02/05/2024</td>
          <td>10:00:00</td>
          <td>120</td>
          <td>123</td>
        </tr>
        <tr>
          <td>Mathematics (110)</td>
          <td>02/08/2024</td>
          <td>10:00:00</td>
          <td>120</td>
          <td>124</td>
        </tr>
        <tr>
          <td>Science (111)</td>
          <td>02/10/2024</td>
          <td>10:00:00</td>
          <td>120</td>
          <td>125</td>
        </tr>
        <tr>
          <td>Computer (00220)</td>
          <td>02/12/2024</td>
          <td>10:00:00</td>
          <td>120</td>
          <td>126</td>
        </tr>
      </tbody>
    </Table>
    <h5>Chapter Wise Weekly Test (January-2024)</h5>
    <Table bordered>
      <thead>
        <tr>
          <th>Subject</th>
          <th>Date</th>
          <th>Start Time</th>
          <th>Duration (minute)</th>
          <th>Room No.</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>English (210)</td>
          <td>01/10/2024</td>
          <td>01:30:00</td>
          <td>90</td>
          <td>23G</td>
        </tr>
        <tr>
          <td>Mathematics (110)</td>
          <td>01/12/2024</td>
          <td>01:30:00</td>
          <td>90</td>
          <td>24G</td>
        </tr>
        <tr>
          <td>Science (111)</td>
          <td>01/15/2024</td>
          <td>01:30:00</td>
          <td>90</td>
          <td>12F</td>
        </tr>
        <tr>
          <td>Computer (00220)</td>
          <td>01/18/2024</td>
          <td>01:30:00</td>
          <td>90</td>
          <td>23G</td>
        </tr>
      </tbody>
    </Table>
    <h5>Half Yearly Exam (December-2023)</h5>
    <Table bordered>
      <thead>
        <tr>
          <th>Subject</th>
          <th>Date</th>
          <th>Start Time</th>
          <th>Duration (minute)</th>
          <th>Room No.</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>English (210)</td>
          <td>12/05/2023</td>
          <td>10:30:00</td>
          <td>120</td>
          <td>342</td>
        </tr>
        <tr>
          <td>Hindi (230)</td>
          <td>12/08/2023</td>
          <td>10:30:00</td>
          <td>120</td>
          <td>232</td>
        </tr>
        <tr>
          <td>Mathematics (110)</td>
          <td>12/12/2023</td>
          <td>10:30:00</td>
          <td>120</td>
          <td>234</td>
        </tr>
        <tr>
          <td>Science (111)</td>
          <td>12/15/2023</td>
          <td>10:30:00</td>
          <td>120</td>
          <td>253</td>
        </tr>
      </tbody>
    </Table>
    <h5>Monthly Test (November-2023)</h5>
    <Table bordered>
      <thead>
        <tr>
          <th>Subject</th>
          <th>Date</th>
          <th>Start Time</th>
          <th>Duration (minute)</th>
          <th>Room No.</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>English (210)</td>
          <td>11/02/2023</td>
          <td>10:30:00</td>
          <td>90</td>
          <td>234</td>
        </tr>
        <tr>
          <td>Mathematics (110)</td>
          <td>11/04/2023</td>
          <td>10:30:00</td>
          <td>90</td>
          <td>231</td>
        </tr>
        <tr>
          <td>Science (111)</td>
          <td>11/06/2023</td>
          <td>10:30:00</td>
          <td>90</td>
          <td>122</td>
        </tr>
        <tr>
          <td>Hindi (230)</td>
          <td>11/10/2023</td>
          <td>10:30:00</td>
          <td>90</td>
          <td>121</td>
        </tr>
      </tbody>
    </Table>
       </div>
       </React.Fragment>
         );
        }; 
export default connect(null, { setBreadcrumbItems })(examschedule);