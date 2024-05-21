import React , {useEffect} from "react";
import { connect } from "react-redux";
import { Row, Col, Card, CardBody, Table, Button, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import { setBreadcrumbItems } from "../../store/actions";
import user3 from "../../assets/images/users/user-3.jpg"
const Fees = () => {
    return (
      <React.Fragment>
       <div className="container mt-5">
       <Row>
          <Col>
            <Card>
              <CardBody>
              <img src={user3} alt="User Profile" className="img-fluid rounded-circle" style={{ width: '200px', height: '200px' }} />
                <p>Name: Edward Thomas</p>
                <p>Class (Section): Class 3 (A)</p>
                <p>Father Name: Olivier Thomas</p>
                <p>Admission No: 18001</p>
                <p>Mobile Number: 8233366611</p>
                <p>Roll Number: 101</p>
                <p>Category: General</p>
                <p>RTE: No</p>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* Table section */}
        <Row className="mt-3">
          <Col>
            <Card>
              <CardBody>
                <Table bordered hover>
                  <thead>
                    <tr>
                      <th>
                        <Button>Select All</Button>
                      </th>
                      <th>Name</th>
                      <th>Details</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>Item 1</td>
                      <td>Details for Item 1</td>
                      <td>
                        <DropdownToggle caret>
                          Pay
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem>Online Payment</DropdownItem>
                          <DropdownItem>Offline Payment</DropdownItem>
                        </DropdownMenu>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>Item 2</td>
                      <td>Details for Item 2</td>
                      <td>
                        <DropdownToggle caret>
                          Pay
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem>Online Payment</DropdownItem>
                          <DropdownItem>Offline Payment</DropdownItem>
                        </DropdownMenu>
                      </td>
                    </tr>
                    {/* Add more table rows as needed */}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        </div>
       </React.Fragment>
         );
        }; 
export default connect(null, { setBreadcrumbItems })(Fees);