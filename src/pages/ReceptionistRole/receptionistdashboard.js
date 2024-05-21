import React , {useEffect} from "react";
import { connect } from "react-redux";
import { Row, Col, Card, CardBody, Table, Button, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import HeaderTeacher from "../../components/HorizontalLayoutTeacher/HeaderTeacher";
import NavbarReceptionist from "../../components/HorizontalLayoutReceptionist/NavbarReceptionist";
import { setBreadcrumbItems } from "../../store/actions";
import user3 from "../../assets/images/users/user-3.jpg"

const ReceptionistDashboard = () => {
    const enquiries = [
        { name: "Stanley Wood", phone: "879056753", source: "Google Ads", enquiryDate: "04/02/2024", lastFollowUpDate: "04/02/2024", nextFollowUpDate: "04/06/2024", status: "Active" },
        { name: "Jacob", phone: "89067874", source: "Google Ads", enquiryDate: "04/04/2024", lastFollowUpDate: "", nextFollowUpDate: "04/06/2024", status: "Active" },
        { name: "James", phone: "795676743", source: "Admission Campaign", enquiryDate: "04/26/2024", lastFollowUpDate: "", nextFollowUpDate: "04/30/2024", status: "Active" },
        { name: "Tim David", phone: "0890867563", source: "Front Office", enquiryDate: "04/22/2024", lastFollowUpDate: "", nextFollowUpDate: "04/26/2024", status: "Active" },
        { name: "Berlin", phone: "980789876", source: "Admission Campaign", enquiryDate: "03/26/2024", lastFollowUpDate: "", nextFollowUpDate: "03/31/2024", status: "Active" },
        { name: "Sinu Raina", phone: "8987956567", source: "Online Front Site", enquiryDate: "03/12/2024", lastFollowUpDate: "", nextFollowUpDate: "03/16/2024", status: "Active" },
        { name: "Philip", phone: "5161601551", source: "Online Front Site", enquiryDate: "03/26/2024", lastFollowUpDate: "", nextFollowUpDate: "03/30/2024", status: "Active" },
        { name: "Darwin", phone: "654984160", source: "Advertisement", enquiryDate: "03/20/2024", lastFollowUpDate: "", nextFollowUpDate: "03/25/2024", status: "Active" },
        { name: "Stanley", phone: "5116501483", source: "Google Ads", enquiryDate: "03/11/2024", lastFollowUpDate: "", nextFollowUpDate: "03/15/2024", status: "Active" },
        { name: "Hemant Rao", phone: "789877363", source: "Google Ads", enquiryDate: "02/18/2024", lastFollowUpDate: "", nextFollowUpDate: "02/25/2024", status: "Active" },
        { name: "Olivia Martin", phone: "0898773630", source: "Front Office", enquiryDate: "02/26/2024", lastFollowUpDate: "", nextFollowUpDate: "02/28/2024", status: "Active" },
        { name: "Alexander", phone: "21651015215", source: "Advertisement", enquiryDate: "02/24/2024", lastFollowUpDate: "", nextFollowUpDate: "02/29/2024", status: "Active" },
    ];
    return (
      <React.Fragment>
       <div className="container mt-5">
       <h2>Admission Enquiry</h2>
      <div className="row mt-3">
        <div className="col">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Source</th>
                <th>Enquiry Date</th>
                <th>Last Follow Up Date</th>
                <th>Next Follow Up Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((enquiry, index) => (
                <tr key={index}>
                  <td>{enquiry.name}</td>
                  <td>{enquiry.phone}</td>
                  <td>{enquiry.source}</td>
                  <td>{enquiry.enquiryDate}</td>
                  <td>{enquiry.lastFollowUpDate}</td>
                  <td>{enquiry.nextFollowUpDate}</td>
                  <td>{enquiry.status}</td>
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
export default connect(null, { setBreadcrumbItems })(ReceptionistDashboard);