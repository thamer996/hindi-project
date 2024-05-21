import React , {useState} from "react"

import { connect } from "react-redux";
import { Row, Col, Card, CardBody, Table,Input, Button, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import { setBreadcrumbItems } from "../../store/actions";

const Fees = () => {
    const data = [
        { hostel: 'Boys Hostel 101', roomType: 'One Bed', roomNumber: 'B1', numberOfBeds: 1, status: 'Assigned', costPerBed: '$300.00' },
        { hostel: 'Boys Hostel 101', roomType: 'One Bed', roomNumber: 'B3', numberOfBeds: 1, status: '', costPerBed: '$500.00' },
        { hostel: 'Boys Hostel 101', roomType: 'One Bed', roomNumber: 'G1', numberOfBeds: 1, status: '', costPerBed: '$340.00' },
        { hostel: 'Boys Hostel 102', roomType: 'Two Bed AC', roomNumber: 'B2', numberOfBeds: 2, status: '', costPerBed: '$1,000.00' },
        { hostel: 'Boys Hostel 102', roomType: 'One Bed AC', roomNumber: 'B4', numberOfBeds: 1, status: '', costPerBed: '$1,200.00' },
        { hostel: 'Girls Hostel 103', roomType: 'Two Bed AC', roomNumber: 'G3', numberOfBeds: 2, status: '', costPerBed: '$500.00' },
        { hostel: 'Girls Hostel 104', roomType: 'One Bed', roomNumber: 'G2', numberOfBeds: 1, status: '', costPerBed: '$300.00' },
        { hostel: 'Girls Hostel 104', roomType: 'Two Bed', roomNumber: 'G4', numberOfBeds: 2, status: '', costPerBed: '$300.00' },
        // Add more data here
    ];
    
      const [searchTerm, setSearchTerm] = useState('');
      const filteredData = data.filter(item =>
        Object.values(item).some(value =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    return (
      <React.Fragment>
       <div className="container mt-5">
       <div>
      <Input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <Table>
        <thead>
          <tr>
            <th>Hostel</th>
            <th>Room Type</th>
            <th>Room Number / Name</th>
            <th>No Of Bed</th>
            <th>Status</th>
            <th>Cost Per Bed</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{item.hostel}</td>
              <td>{item.roomType}</td>
              <td>{item.roomNumber}</td>
              <td>{item.numberOfBeds}</td>
              <td>{item.status}</td>
              <td>{item.costPerBed}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
        </div>
       </React.Fragment>
         );
        }; 
export default connect(null, { setBreadcrumbItems })(Fees);