import React , {useEffect} from "react"
import { useState } from 'react';
import { Table, Input } from 'reactstrap';
import { connect } from "react-redux";
import { Row, Col, Card, CardBody, Button, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import { setBreadcrumbItems } from "../../store/actions";

const VisitorBook = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearch = event => {
        setSearchTerm(event.target.value);
      };
      const visitorData = [
        {
          id: 1,
          Purpose: 'School Events',
          'Visitor Name': 'Marco Fadel',
          Phone: '908795675',
          'ID Card': '656767',
          'Number Of Person': 5,
          Note: '',
          Date: '03/08/2024',
          'In Time': '11:00 AM',
          'Out Time': '12:00 PM',
        },
        {
          id: 2,
          Purpose: 'Parent Teacher Meeting',
          'Visitor Name': 'Nelson',
          Phone: '1651015112',
          'ID Card': '8745',
          'Number Of Person': 4,
          Note: '',
          Date: '03/20/2024',
          'In Time': '10:05 AM',
          'Out Time': '11:05 AM',
        },
        {
          id: 3,
          Purpose: 'School Events',
          'Visitor Name': 'Marvin',
          Phone: '1651212105',
          'ID Card': '4745',
          'Number Of Person': 4,
          Note: '',
          Date: '03/12/2024',
          'In Time': '01:00 PM',
          'Out Time': '02:00 PM',
        },
        {
          id: 4,
          Purpose: 'Staff Meeting',
          'Visitor Name': 'Richard',
          Phone: '2165161056',
          'ID Card': '515',
          'Number Of Person': 2,
          Note: '',
          Date: '03/01/2024',
          'In Time': '03:00 PM',
          'Out Time': '04:00 PM',
        },
        {
          id: 5,
          Purpose: 'Marketing',
          'Visitor Name': 'Charlie',
          Phone: '1251515015',
          'ID Card': '5152',
          'Number Of Person': 2,
          Note: '',
          Date: '02/20/2024',
          'In Time': '10:30 AM',
          'Out Time': '11:30 AM',
        },
        {
          id: 6,
          Purpose: 'Principal Meeting',
          'Visitor Name': 'Henry',
          Phone: '5161685152',
          'ID Card': '1253',
          'Number Of Person': 5,
          Note: '',
          Date: '02/10/2024',
          'In Time': '03:20 PM',
          'Out Time': '04:20 PM',
        },
        {
          id: 7,
          Purpose: 'Student Meeting',
          'Visitor Name': 'Lewis',
          Phone: '51561511021',
          'ID Card': '5152',
          'Number Of Person': 2,
          Note: '',
          Date: '02/01/2024',
          'In Time': '12:15 PM',
          'Out Time': '01:15 PM',
        },
        {
          id: 8,
          Purpose: 'Parent Teacher Meeting',
          'Visitor Name': 'Roy',
          Phone: '65164554455',
          'ID Card': '2155',
          'Number Of Person': 6,
          Note: '',
          Date: '01/31/2024',
          'In Time': '11:00 AM',
          'Out Time': '12:00 PM',
        },
        {
          id: 9,
          Purpose: 'School Events',
          'Visitor Name': 'Martin',
          Phone: '54846545532',
          'ID Card': '2165',
          'Number Of Person': 5,
          Note: '',
          Date: '01/20/2024',
          'In Time': '11:45 AM',
          'Out Time': '12:45 PM',
        },
        {
          id: 10,
          Purpose: 'Staff Meeting',
          'Visitor Name': 'Madison',
          Phone: '2154164212',
          'ID Card': '232',
          'Number Of Person': 2,
          Note: '',
          Date: '01/10/2024',
          'In Time': '08:45 AM',
          'Out Time': '09:45 AM',
        },
        {
          id: 11,
          Purpose: 'Marketing',
          'Visitor Name': 'Matthew',
          Phone: '5165101651',
          'ID Card': '32632',
          'Number Of Person': 3,
          Note: '',
          Date: '12/30/2023',
          'In Time': '11:25 AM',
          'Out Time': '12:25 PM',
        },
        {
          id: 12,
          Purpose: 'Principal Meeting',
          'Visitor Name': 'Jack',
          Phone: '5185410821',
          'ID Card': '323',
          'Number Of Person': 3,
          Note: '',
          Date: '12/20/2023',
          'In Time': '08:15 AM',
          'Out Time': '09:15 AM',
        },
        {
          id: 13,
          Purpose: 'Staff Meeting',
          'Visitor Name': 'Robert',
          Phone: '165056412',
          'ID Card': '542',
          'Number Of Person': 2,
          Note: '',
          Date: '12/15/2023',
          'In Time': '02:15 PM',
          'Out Time': '03:15 PM',
        },
        {
          id: 14,
          Purpose: 'School Events',
          'Visitor Name': 'Jackson',
          Phone: '790789676',
          'ID Card': '5644',
          'Number Of Person': 4,
          Note: '',
          Date: '11/25/2023',
          'In Time': '01:32 PM',
          'Out Time': '02:32 PM',
        },
        {
          id: 15,
          Purpose: 'Principal Meeting',
          'Visitor Name': 'Dewon',
          Phone: '890667868',
          'ID Card': '4533',
          'Number Of Person': 5,
          Note: '',
          Date: '11/15/2023',
          'In Time': '12:58 PM',
          'Out Time': '01:58 PM',
        },
        {
          id: 16,
          Purpose: 'Student Meeting',
          'Visitor Name': 'Urman Malik',
          Phone: '989665062',
          'ID Card': '3455',
          'Number Of Person': 4,
          Note: '',
          Date: '11/10/2023',
          'In Time': '01:58 PM',
          'Out Time': '02:58 PM',
        },
        {
          id: 17,
          Purpose: 'Marketing',
          'Visitor Name': 'Arjun Singh',
          Phone: '78966506',
          'ID Card': '2344',
          'Number Of Person': 5,
          Note: '',
          Date: '11/05/2023',
          'In Time': '01:53 PM',
          'Out Time': '02:53 PM',
        },
        {
          id: 18,
          Purpose: 'School Events',
          'Visitor Name': 'Sam',
          Phone: '98098087',
          'ID Card': '465',
          'Number Of Person': 5,
          Note: '',
          Date: '11/01/2023',
          'In Time': '02:30 PM',
          'Out Time': '04:35 PM',
        },
        {
          id: 19,
          Purpose: 'Principal Meeting',
          'Visitor Name': 'Avery',
          Phone: '548489512',
          'ID Card': '5445',
          'Number Of Person': 6,
          Note: '',
          Date: '10/16/2023',
          'In Time': '02:00 PM',
          'Out Time': '03:00 PM',
        },
        {
          id: 20,
          Purpose: 'Student Meeting',
          'Visitor Name': 'Carter',
          Phone: '5484854870',
          'ID Card': '5452',
          'Number Of Person': 5,
          Note: '',
          Date: '10/05/2023',
          'In Time': '01:00 PM',
          'Out Time': '02:00 PM',
        },
        {
          id: 21,
          Purpose: 'School Events',
          'Visitor Name': 'Thomas',
          Phone: '6870541814',
          'ID Card': '5451',
          'Number Of Person': 3,
          Note: '',
          Date: '09/25/2023',
          'In Time': '02:30 PM',
          'Out Time': '04:30 PM',
        },
        {
          id: 22,
          Purpose: 'Student Meeting',
          'Visitor Name': 'Faran',
          Phone: '7667889776',
          'ID Card': '5567',
          'Number Of Person': 5,
          Note: '',
          Date: '08/18/2023',
          'In Time': '12:55 PM',
          'Out Time': '01:58 PM',
        },
        {
          id: 23,
          Purpose: 'Principal Meeting',
          'Visitor Name': 'Jhonson',
          Phone: '906786786',
          'ID Card': '54632',
          'Number Of Person': 5,
          Note: '',
          Date: '08/12/2023',
          'In Time': '01:56 PM',
          'Out Time': '02:56 PM',
        },
        {
          id: 24,
          Purpose: 'School Events',
          'Visitor Name': 'Garry',
          Phone: '7890067688',
          'ID Card': '678',
          'Number Of Person': 6,
          Note: '',
          Date: '08/10/2023',
          'In Time': '01:56 PM',
          'Out Time': '02:56 PM',
        },
        {
          id: 25,
          Purpose: 'Principal Meeting',
          'Visitor Name': 'Varina',
          Phone: '989456411',
          'ID Card': '5643',
          'Number Of Person': 5,
          Note: '',
          Date: '07/18/2023',
          'In Time': '12:58 PM',
          'Out Time': '01:58 PM',
        },
        {
          id: 26,
          Purpose: 'Student Meeting',
          'Visitor Name': 'Kalvin',
          Phone: '899456411',
          'ID Card': '3422',
          'Number Of Person': 5,
          Note: '',
          Date: '07/10/2023',
          'In Time': '12:57 PM',
          'Out Time': '01:57 PM',
        },
        {
          id: 27,
          Purpose: 'School Events',
          'Visitor Name': 'Daniel',
          Phone: '589456411',
          'ID Card': '5641',
          'Number Of Person': 3,
          Note: '',
          Date: '07/15/2023',
          'In Time': '11:10 AM',
          'Out Time': '12:10 PM',
        },
        {
          id: 28,
          Purpose: 'Student Meeting',
          'Visitor Name': 'Hemant Rao',
          Phone: '089877803',
          'ID Card': '6744',
          'Number Of Person': 4,
          Note: '',
          Date: '06/30/2023',
          'In Time': '11:35 AM',
          'Out Time': '12:48 PM',
        },
        {
          id: 29,
          Purpose: 'School Events',
          'Visitor Name': 'Lokesh Shah',
          Phone: '98490843',
          'ID Card': '342',
          'Number Of Person': 6,
          Note: '',
          Date: '06/20/2023',
          'In Time': '12:30 PM',
          'Out Time': '01:46 PM',
        },
        {
          id: 30,
          Purpose: 'Parent Teacher Meeting',
          'Visitor Name': 'Jhonson',
          Phone: '0898778500',
          'ID Card': '231',
          'Number Of Person': 4,
          Note: '',
          Date: '06/10/2023',
          'In Time': '11:44 AM',
          'Out Time': '12:35 PM',
        },
        {
          id: 31,
          Purpose: 'Student Meeting',
          'Visitor Name': 'Sinu Raina',
          Phone: '9849208480',
          'ID Card': '43',
          'Number Of Person': 6,
          Note: '',
          Date: '06/05/2023',
          'In Time': '12:42 PM',
          'Out Time': '01:42 PM',
        },
        {
          id: 32,
          Purpose: 'School Events',
          'Visitor Name': 'Lawrence',
          Phone: '984908480',
          'ID Card': '34',
          'Number Of Person': 6,
          Note: '',
          Date: '06/01/2023',
          'In Time': '01:41 PM',
          'Out Time': '01:41 PM',
        },
        {
          id: 33,
          Purpose: 'School Events',
          'Visitor Name': 'Lokesh Singh',
          Phone: '90678686',
          'ID Card': '3422',
          'Number Of Person': 5,
          Note: '',
          Date: '05/15/2023',
          'In Time': '01:30 PM',
          'Out Time': '02:30 PM',
        },
        {
          id: 34,
          Purpose: 'Parent Teacher Meeting',
          'Visitor Name': 'Jack',
          Phone: '9097898797',
          'ID Card': '6544',
          'Number Of Person': 5,
          Note: '',
          Date: '05/10/2023',
          'In Time': '02:30 PM',
          'Out Time': '03:30 PM',
        },
        {
          id: 35,
          Purpose: 'Parent Teacher Meeting',
          'Visitor Name': 'Glen Wood',
          Phone: '0786789802',
          'ID Card': '3602',
          'Number Of Person': 5,
          Note: '',
          Date: '05/05/2023',
          'In Time': '01:32 PM',
          'Out Time': '02:32 PM',
        },
        {
          id: 36,
          Purpose: 'Student Meeting',
          'Visitor Name': 'Alex Martin',
          Phone: '870867865',
          'ID Card': '3620',
          'Number Of Person': 5,
          Note: '',
          Date: '05/01/2023',
          'In Time': '03:31 PM',
          'Out Time': '04:31 PM',
        },
        {
          id: 37,
          Purpose: 'Student Meeting',
          'Visitor Name': 'Usmaan',
          Phone: '089067768',
          'ID Card': '545',
          'Number Of Person': 4,
          Note: '',
          Date: '04/18/2023',
          'In Time': '10:45 AM',
          'Out Time': '11:25 AM',
        },
        {
          id: 38,
          Purpose: 'Parent Teacher Meeting',
          'Visitor Name': 'Lawrence',
          Phone: '07898798967',
          'ID Card': '3434',
          'Number Of Person': 5,
          Note: '',
          Date: '04/12/2023',
          'In Time': '10:15 AM',
          'Out Time': '11:44 AM',
        },
        {
          id: 39,
          Purpose: 'Staff Meeting',
          'Visitor Name': 'William',
          Phone: '5656841351',
          'ID Card': '215',
          'Number Of Person': 2,
          Note: '',
          Date: '04/08/2023',
          'In Time': '04:00 PM',
          'Out Time': '05:00 PM',
        },
        {
          id: 40,
          Purpose: 'Student Meeting',
          'Visitor Name': 'Harper',
          Phone: '98465321',
          'ID Card': '3244',
          'Number Of Person': 4,
          Note: '',
          Date: '04/05/2023',
          'In Time': '01:50 PM',
          'Out Time': '02:50 PM',
        }
      ];
    
      const filteredVisitors = visitorData.filter(visitor => {
        return (
          visitor['Purpose'].toLowerCase().includes(searchTerm.toLowerCase()) ||
          visitor['Visitor Name'].toLowerCase().includes(searchTerm.toLowerCase()) ||
          visitor['Phone'].includes(searchTerm) ||
          visitor['ID Card'].includes(searchTerm)
        );
      });
    return (
      <React.Fragment>
       <div className="container mt-5">
       <div>
       <h1>Visitor List</h1>
      <Input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        className="mb-3"
      />
      <Table striped>
        <thead>
          <tr>
            <th>Purpose</th>
            <th>Visitor Name</th>
            <th>Phone</th>
            <th>ID Card</th>
            <th>Number Of Person</th>
            <th>Note</th>
            <th>Date</th>
            <th>In Time</th>
            <th>Out Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredVisitors.map(visitor => (
            <tr key={visitor.id}>
              <td>{visitor['Purpose']}</td>
              <td>{visitor['Visitor Name']}</td>
              <td>{visitor['Phone']}</td>
              <td>{visitor['ID Card']}</td>
              <td>{visitor['Number Of Person']}</td>
              <td>{visitor['Note']}</td>
              <td>{visitor['Date']}</td>
              <td>{visitor['In Time']}</td>
              <td>{visitor['Out Time']}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
       </div>
       </React.Fragment>
         );
        }; 
export default connect(null, { setBreadcrumbItems })(VisitorBook);