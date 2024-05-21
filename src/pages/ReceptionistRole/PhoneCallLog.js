import React , {useEffect,useState} from "react";
import { connect } from "react-redux";
import { Row, Col, Card, CardBody, Table, Button, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import HeaderTeacher from "../../components/HorizontalLayoutTeacher/HeaderTeacher";
import NvbarStudent from "../../components/HorizontalLayoutTeacher/NvbarStudent";
import { setBreadcrumbItems } from "../../store/actions";
import user3 from "../../assets/images/users/user-3.jpg"
const Phonecalls = () => {
    const [phoneCallLogs, setPhoneCallLogs] = useState([
        { id: 1, name: "Marketing Manager", phone: "5480158412", date: "04/25/2024", nextFollowUpDate: "04/30/2024", callType: "Outgoing" },
        { id: 2, name: "Exam Center Office", phone: "5184410151", date: "04/20/2024", nextFollowUpDate: "04/24/2024", callType: "Incoming" },
        { id: 3, name: "Cleaning Services", phone: "265101541", date: "04/15/2024", nextFollowUpDate: "04/19/2024", callType: "Outgoing" },
        { id: 4, name: "Sports Games", phone: "181015825", date: "04/10/2024", nextFollowUpDate: "04/13/2024", callType: "Incoming" },
        { id: 5, name: "Book seller", phone: "51801561512", date: "04/05/2024", nextFollowUpDate: "04/09/2024", callType: "Outgoing" },
        { id: 6, name: "Telephone office", phone: "54184152101", date: "04/01/2024", nextFollowUpDate: "04/04/2024", callType: "Incoming" },
        { id: 7, name: "Staff Health Checkup", phone: "1650156122", date: "03/25/2024", nextFollowUpDate: "03/30/2024", callType: "Outgoing" },
        { id: 8, name: "Covid sanitization services", phone: "2165168015", date: "03/20/2024", nextFollowUpDate: "03/25/2024", callType: "Incoming" },
        { id: 9, name: "Johnson Book seller", phone: "416501562", date: "03/15/2024", nextFollowUpDate: "03/19/2024", callType: "Outgoing" },
        { id: 10, name: "Sports Games", phone: "899067897", date: "03/11/2024", nextFollowUpDate: "03/14/2024", callType: "Incoming" },
        { id: 11, name: "Book seller", phone: "899067897", date: "03/05/2024", nextFollowUpDate: "03/09/2024", callType: "Outgoing" },
        { id: 12, name: "Telephone office", phone: "788966506", date: "03/01/2024", nextFollowUpDate: "03/04/2024", callType: "Incoming" },
        { id: 13, name: "Exam Office", phone: "6541222452", date: "02/26/2024", nextFollowUpDate: "02/29/2024", callType: "Outgoing" },
        { id: 14, name: "Marketing Manager", phone: "2165512022", date: "02/20/2024", nextFollowUpDate: "02/24/2024", callType: "Incoming" },
        { id: 15, name: "Cleaning Services", phone: "0898741563", date: "02/15/2024", nextFollowUpDate: "02/19/2024", callType: "Outgoing" },
        { id: 16, name: "National Cadet Camp", phone: "0896786785", date: "02/10/2024", nextFollowUpDate: "02/14/2024", callType: "Incoming" },
    ]);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        date: "",
        nextFollowUpDate: "",
        callDuration: "",
        note: "",
        callType: "Incoming"
      });
    
      // Function to handle form submission
      const handleSubmit = (e) => {
        e.preventDefault();
        // Add form data to phone call log list
        setPhoneCallLogs([...phoneCallLogs, { id: phoneCallLogs.length + 1, ...formData }]);
        // Clear form data
        setFormData({
          name: "",
          phone: "",
          date: "",
          nextFollowUpDate: "",
          callDuration: "",
          note: "",
          callType: "Incoming"
        });
      };
    
      // Function to handle form input change
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    return (
      <React.Fragment>
       <div className="container mt-5">
       <div className="row">
        <div className="col-lg-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Phone Call Log Form</h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Phone Call Log List</h5>
              <input type="text" className="form-control mb-3" placeholder="Search..." />
              <Table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Date</th>
                    <th>Next Follow Up Date</th>
                    <th>Call Type</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {phoneCallLogs.map((log) => (
                    <tr key={log.id}>
                      <td>{log.name}</td>
                      <td>{log.phone}</td>
                      <td>{log.date}</td>
                      <td>{log.nextFollowUpDate}</td>
                      <td>{log.callType}</td>
                      <td>Action button/link here</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
        </div>
       </React.Fragment>
         );
        }; 
export default connect(null, { setBreadcrumbItems })(Phonecalls);