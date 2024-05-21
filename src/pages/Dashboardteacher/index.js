import React , {useEffect} from "react"

import { connect } from "react-redux";
import {
  Row,
  Col,
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

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions";

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

  return (
    <React.Fragment>

      {/*mimi widgets */}
     

      <Row>
        <Col xl="3">
          {/* Monthly Earnings */}
          <MonthlyEarnings />
        </Col>

        <Col xl="4" lg="6">
          {/* inbox */}
          <Inbox />
        </Col>
        <Col xl="5">
          {/* latest orders */}
          <LatestOrders />
        </Col>
      </Row>
      <Row>

       
      </Row>

      <Row>
       

       
      </Row>

    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(Dashboard);