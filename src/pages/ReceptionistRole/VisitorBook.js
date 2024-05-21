import React , {useEffect} from "react";
import { connect } from "react-redux";
import { Row, Col, Card, CardBody, Table, Button, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import HeaderTeacher from "../../components/HorizontalLayoutTeacher/HeaderTeacher";
import NavbarReceptionist from "../../components/HorizontalLayoutReceptionist/NavbarReceptionist";
import { setBreadcrumbItems } from "../../store/actions";
import user3 from "../../assets/images/users/user-3.jpg"

const ReceptionistVisitorBook= () => {
    const visitorList = [
        { purpose: "School Events", meetingWith: "Student (Edward Thomas - 18001)", visitorName: "Nelson", phone: "890867875", idCard: "456345", numberOfPerson: 5, date: "04/12/2024", inTime: "10:30 AM", outTime: "11:30 AM" },
        { purpose: "Marketing", meetingWith: "Student (Edward Thomas - 18001)", visitorName: "Sonny", phone: "2684151801", idCard: "3262", numberOfPerson: 2, date: "04/30/2024", inTime: "02:50 PM", outTime: "03:50 PM" },
        { purpose: "School Events", meetingWith: "Staff (James Deckar - 9004)", visitorName: "Callan", phone: "5418418015", idCard: "6568", numberOfPerson: 4, date: "04/25/2024", inTime: "10:45 AM", outTime: "11:45 AM" },
        { purpose: "Principal Meeting", meetingWith: "Student (Jhony Taylor - 18020)", visitorName: "Milo", phone: "1818101471", idCard: "1521", numberOfPerson: 2, date: "04/20/2024", inTime: "11:45 AM", outTime: "12:45 PM" },
        { purpose: "Staff Meeting", meetingWith: "Staff (Jason Sharlton - 900002301)", visitorName: "Pearson", phone: "1801881021", idCard: "1520", numberOfPerson: 4, date: "04/15/2024", inTime: "03:40 PM", outTime: "04:40 PM" },
        { purpose: "Student Meeting", meetingWith: "Student (Edward Thomas - 18001)", visitorName: "Preston", phone: "4984021512", idCard: "1521", numberOfPerson: 5, date: "04/10/2024", inTime: "12:35 PM", outTime: "01:35 PM" },
        { purpose: "Parent Teacher Meeting", meetingWith: "Staff (Shivam Verma - 9002)", visitorName: "Emrys", phone: "21651610152", idCard: "3263", numberOfPerson: 3, date: "04/05/2024", inTime: "02:35 PM", outTime: "03:35 PM" },
        { purpose: "Marketing", meetingWith: "Student (Edward Thomas - 18001)", visitorName: "Farah", phone: "216518510", idCard: "151", numberOfPerson: 3, date: "04/01/2024", inTime: "03:50 PM", outTime: "04:50 PM" },
        { purpose: "School Events", meetingWith: "Student (Edward Thomas - 18001)", visitorName: "Marco Fadel", phone: "908795675", idCard: "656767", numberOfPerson: 5, date: "03/08/2024", inTime: "11:00 AM", outTime: "12:00 PM" },
        { purpose: "Staff Meeting", meetingWith: "Student (Glen Stark - 18005)", visitorName: "Scott", phone: "5418901852", idCard: "8466", numberOfPerson: 3, date: "03/30/2024", inTime: "11:15 AM", outTime: "12:15 PM" },
        { purpose: "Student Meeting", meetingWith: "Staff (James Deckar - 9004)", visitorName: "Winston", phone: "4598401512", idCard: "5488", numberOfPerson: 5, date: "03/25/2024", inTime: "09:15 AM", outTime: "10:15 AM" },
        { purpose: "Parent Teacher Meeting", meetingWith: "Student (Edward Thomas - 18001)", visitorName: "Nelson", phone: "1651015112", idCard: "8745", numberOfPerson: 4 },
    ];
    return (
      <React.Fragment>
       <div className="container mt-5">
       <h2>Visitor List</h2>
      <div className="row mt-3">
        <div className="col">
          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Search..." />
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Purpose</th>
                <th>Meeting With</th>
                <th>Visitor Name</th>
                <th>Phone</th>
                <th>ID Card</th>
                <th>Number Of Person</th>
                <th>Date</th>
                <th>In Time</th>
                <th>Out Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {visitorList.map((visitor, index) => (
                <tr key={index}>
                  <td>{visitor.purpose}</td>
                  <td>{visitor.meetingWith}</td>
                  <td>{visitor.visitorName}</td>
                  <td>{visitor.phone}</td>
                  <td>{visitor.idCard}</td>
                  <td>{visitor.numberOfPerson}</td>
                  <td>{visitor.date}</td>
                  <td>{visitor.inTime}</td>
                  <td>{visitor.outTime}</td>
                  <td>test</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
       </div>
       </React.Fragment>
         );
        }; 
export default connect(null, { setBreadcrumbItems })(ReceptionistVisitorBook);