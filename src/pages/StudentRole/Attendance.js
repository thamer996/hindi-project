import React , {useEffect} from "react"

import { connect } from "react-redux";
import { Row, Col, Card, CardBody, Table, Button, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import { setBreadcrumbItems } from "../../store/actions";
import Calendar from "../Calendar";

const Fees = () => {
    return (
      <React.Fragment>
       <div className="container mt-5">
        <Calendar/>
              </div>
       </React.Fragment>
         );
        }; 
export default connect(null, { setBreadcrumbItems })(Fees);