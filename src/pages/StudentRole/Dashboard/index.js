import React , {useEffect} from "react"

import { connect } from "react-redux";
import {
  Table,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
} from "reactstrap"

// Pages Components
import Miniwidget from "./Miniwidget"
import MonthlyEarnings from "./montly-earnings";
import MonthlyEarnings2 from "./montly-earnings2";
import Inbox from "./inbox";
import RecentActivity from "./recent-activity";
import WidgetUser from "./widget-user";
import YearlySales from "./yearly-sales";
import LatestTransactions from "./latest-transactions";
import LatestOrders from "./latest-orders";
import ChartsAppex from  "../../../pages/Charts/charts-appex"
//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../../store/actions";
import HeaderTeacher from "../../../components/HorizontalLayoutTeacher/HeaderTeacher";


const Dashboard = (props) => {

  document.title = "Dashboard | Lexa - Responsive Bootstrap 5 Admin Dashboard";


  const breadcrumbItems = [
    { title: "Lexa", link: "#" },
    { title: "Dashboard", link: "#" }
  ]

  useEffect(() => {
    props.setBreadcrumbItems('Dashboard' , breadcrumbItems)
  },)

  const reports = [
    
    { title: "Outcomes", iconClass: "buffer", total: "$46,782", average: "-29%", badgecolor: "danger" },
    { title: "Students", iconClass: "cube-outline", total: "1,587", badgecolor: "info" },
    { title: "Teachers", iconClass: "tag-text-outline", total: "200", badgecolor: "warning" },
    { title: "Classes", iconClass: "briefcase-check", total: "60", badgecolor: "info" },
  ]
    const visitors = [
      { name: "Marco Fadel", purpose: "School Events", date: "03/08/2024" },
      { name: "Nelson", purpose: "Parent Teacher Meeting", date: "03/20/2024" },
      { name: "Marvin", purpose: "School Events", date: "03/12/2024" },
      { name: "Richard", purpose: "Staff Meeting", date: "03/01/2024" },
      { name: "Charlie", purpose: "Marketing", date: "02/20/2024" },
      { name: "Henry", purpose: "Principal Meeting", date: "02/10/2024" },
      { name: "Lewis", purpose: "Student Meeting", date: "02/01/2024" },
      { name: "Roy", purpose: "Parent Teacher Meeting", date: "01/31/2024" },
      { name: "Martin", purpose: "School Events", date: "01/20/2024" },
      { name: "Madison", purpose: "Staff Meeting", date: "01/10/2024" },
      { name: "Matthew", purpose: "Marketing", date: "12/30/2023" },
      { name: "Jack", purpose: "Principal Meeting", date: "12/20/2023" },
      { name: "Robert", purpose: "Staff Meeting", date: "12/15/2023" },
      { name: "Jackson", purpose: "School Events", date: "11/25/2023" },
      { name: "Dewon", purpose: "Principal Meeting", date: "11/15/2023" },
      { name: "Urman Malik", purpose: "Student Meeting", date: "11/10/2023" },
      { name: "Arjun Singh", purpose: "Marketing", date: "11/05/2023" },
      { name: "Sam", purpose: "School Events", date: "11/01/2023" },
      { name: "Avery", purpose: "Principal Meeting", date: "10/16/2023" },
      { name: "Carter", purpose: "Student Meeting", date: "10/05/2023" },
      { name: "Thomas", purpose: "School Events", date: "09/25/2023" },
      { name: "Faran", purpose: "Student Meeting", date: "08/18/2023" },
      { name: "Jhonson", purpose: "Principal Meeting", date: "08/12/2023" },
      { name: "Garry", purpose: "School Events", date: "08/10/2023" },
      { name: "Varina", purpose: "Principal Meeting", date: "07/18/2023" },
      { name: "Kalvin", purpose: "Student Meeting", date: "07/10/2023" },
      { name: "Daniel", purpose: "School Events", date: "07/15/2023" },
      { name: "Hemant Rao", purpose: "Student Meeting", date: "06/30/2023" },
      { name: "Lokesh Shah", purpose: "School Events", date: "06/20/2023" },
      { name: "Jhonson", purpose: "Parent Teacher Meeting", date: "06/10/2023" },
      { name: "Sinu Raina", purpose: "Student Meeting", date: "06/05/2023" },
      { name: "Lawrence", purpose: "School Events", date: "06/01/2023" },
      { name: "Lokesh Singh", purpose: "School Events", date: "05/15/2023" },
      { name: "Jack", purpose: "Parent Teacher Meeting", date: "05/10/2023" },
      { name: "Glen Wood", purpose: "Parent Teacher Meeting", date: "05/05/2023" },
      { name: "Alex Martin", purpose: "Student Meeting", date: "05/01/2023" },
      { name: "Usmaan", purpose: "Student Meeting", date: "04/18/2023" },
      { name: "Lawrence", purpose: "Parent Teacher Meeting", date: "04/12/2023" },
      { name: "William", purpose: "Staff Meeting", date: "04/08/2023" },
      { name: "Harper", purpose: "Student Meeting", date: "04/05/2023" }
    ];

  return (
    <React.Fragment>
  <div className="container mt-5">
      {/*mimi widgets */}
      <Row>
        <Col lg="7">
        <WidgetUser  />
        </Col>
        <Col lg="5">
        <RecentActivity />
        </Col>
      </Row>
      <Row>
        
      
       
       
      </Row>
      <Row>

       
        <Col xl="4" lg="6">
          {/* recent activity */}
         

        </Col>
      </Row>

      <Row>
        <Col lg="4">
          <Inbox/>
        </Col>
        <Col lg="4">
        <Card style={{ height: "26.5rem" }}>
      <CardTitle className="p-3">Visitor List</CardTitle>
      <CardBody style={{ overflowY: "auto" }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Purpose</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {visitors.map((visitor, index) => (
              <tr key={index}>
                <td>{visitor.name}</td>
                <td>{visitor.purpose}</td>
                <td>{visitor.date}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </CardBody>
    </Card>
    </Col>
    <Col lg="4">
    <Card style={{ height: "26.5rem" }}>
      <CardTitle className="p-3">Library Book Issue List</CardTitle>
      <CardBody style={{ overflowY: "auto" }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Book No.</th>
              <th>Book Title</th>
              <th>Issue Date</th>
              <th>Due Return</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>3411</td>
              <td>Carbon and its Compounds (H.S.Singh)</td>
              <td>03/04/2024</td>
              <td>03/22/2024</td>
            </tr>
            <tr>
              <td>6855</td>
              <td>Arithmetic progressions Chapter 3 (H.M.Rao)</td>
              <td>03/04/2024</td>
              <td>03/18/2024</td>
            </tr>
            <tr>
              <td>6654</td>
              <td>Coal and Mine Chapter 10 (Vinay Singh)</td>
              <td>03/04/2024</td>
              <td>03/10/2024</td>
            </tr>
            <tr>
              <td>5152</td>
              <td>A History of Adventure (H. Rider Haggard)</td>
              <td>02/02/2024</td>
              <td>02/20/2024</td>
            </tr>
            <tr>
              <td>8965</td>
              <td>Human Body Systems Chapter -II (R.S Mehra)</td>
              <td>No Data</td>
              <td>No Data</td>
            </tr>
          </tbody>
        </Table>
      </CardBody>
    </Card>
    </Col>
        
      </Row>
      </div>
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(Dashboard);