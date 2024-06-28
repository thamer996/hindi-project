import React , {useEffect} from "react"
import { useState } from 'react';
import { Table, Input, CardTitle } from 'reactstrap';
import { connect } from "react-redux";
import { Row, Col, Card, CardBody, Button, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { createClient } from "@supabase/supabase-js"
import { v4 as uuidv4 } from "uuid"
import { setBreadcrumbItems } from "../../store/actions";
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useFormik } from "formik"
import * as Yup from "yup"
import { isEmpty } from "lodash"
import { isNil } from "lodash"

const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)
const VisitorBook = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [visitorBook, setBooks] = useState ([])
    const handleSearch = event => {
        setSearchTerm(event.target.value);
      };
      async function getCountries() {
        const { data, error } = await supabase.from("VisitorBook").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
        setBooks(data ?? [])
      }
      const filteredVisitors = visitorBook.filter(visitor => {
        return (
          visitor['visitorName'].toLowerCase().includes(searchTerm.toLowerCase()) ||
          visitor['purpose'].toLowerCase().includes(searchTerm.toLowerCase()) ||
          visitor['phone'].includes(searchTerm) ||
          visitor['IDCard'].includes(searchTerm)
        );
      });
      console.log('visitorBook', visitorBook)

      useEffect(()=>{
        getCountries()
      },[])
    return (
      <React.Fragment>
       <div className="container mt-5">
       <div>
       <Card>
            <CardBody>
              <CardTitle className="h4">Visitor List </CardTitle>
              <div className="d-flex mb-2">
                <label className="col-form-label">Search Visitor</label>
              <div className="col-md-2 ms-2">
      <Input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        className="mb-3"
      />
      </div>
      </div>
      <div className="table-responsive">
      <Table striped hover responsive>
        <thead>
          <tr >
            <th>Purpose</th>
            <th>Visitor Name</th>
            <th>Phone</th>
            <th>ID Card</th>
           
            <th>Note</th>
            <th>Date</th>
            <th>In Time</th>
            <th>Out Time</th>
      
          </tr>
        </thead>
        <tbody>
          {filteredVisitors.map(visitor => (
            <tr key={visitor.id}>
              <td>{visitor['purpose']}</td>
              <td>{visitor['visitorName']}</td>
              <td>{visitor['phone']}</td>
              <td>{visitor['IDCard']}</td>
    
              <td>{visitor['note']}</td>
              <td>{visitor['date']}</td>
              <td>{visitor['inTime']}</td>
              <td>{visitor['outTime']}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
      </CardBody>
      </Card>
    
    </div>
       </div>
       </React.Fragment>
         );
        }; 
export default connect(null, { setBreadcrumbItems })(VisitorBook);