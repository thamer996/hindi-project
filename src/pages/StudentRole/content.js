import React , {useEffect} from "react"

import { connect } from "react-redux";
import { Row, Col, Card, CardBody, Table, Button, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import { setBreadcrumbItems } from "../../store/actions";
import { useState } from 'react';
import { Input, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
const Content = () => {
        const [activeTab, setActiveTab] = useState('1');
        const [searchQuery, setSearchQuery] = useState('');
      
        const toggleTab = (tab) => {
          if (activeTab !== tab) setActiveTab(tab);
        };
      
        // Mock data
     const data = [
  {
    category: 'All',
    items: [
      { title: 'Multiples and Factors (Complete Chapter)', shareDate: '03/05/2024', validUpto: '03/30/2024', sharedBy: 'Joe Black (9000)', action: '' },
      { title: 'Fees Structure', shareDate: '03/01/2024', validUpto: '03/26/2024', sharedBy: 'Joe Black (9000)', action: '' },
      { title: 'ADMISSION NOTICE FOR NURSERY 2024-2025', shareDate: '02/01/2024', validUpto: '02/29/2024', sharedBy: 'Joe Black (9000)', action: '' },
      { title: 'FEES STRUCTURE', shareDate: '02/01/2024', validUpto: '02/29/2024', sharedBy: 'Joe Black (9000)', action: '' },
      { title: 'Time and Calendar', shareDate: '01/05/2024', validUpto: '01/31/2024', sharedBy: 'Joe Black (9000)', action: '' },
      { title: 'Fees Structure For All student\'s', shareDate: '01/01/2024', validUpto: '01/31/2024', sharedBy: 'Joe Black (9000)', action: '' },
      { title: 'Half Yearly Exam Pattern', shareDate: '12/05/2023', validUpto: '12/30/2023', sharedBy: 'Joe Black (9000)', action: '' },
      { title: 'December Month Fees Structure', shareDate: '12/01/2023', validUpto: '12/30/2023', sharedBy: 'Joe Black (9000)', action: '' },
      { title: 'Fees Updates', shareDate: '11/02/2023', validUpto: '11/25/2023', sharedBy: 'Joe Black (9000)', action: '' },
      { title: 'Study Material', shareDate: '11/01/2023', validUpto: '11/30/2023', sharedBy: 'Joe Black (9000)', action: '' },
      { title: 'Student Fees October Month details', shareDate: '10/03/2023', validUpto: '10/26/2023', sharedBy: 'Joe Black (9000)', action: '' },
      { title: 'Study Material', shareDate: '10/01/2023', validUpto: '10/31/2023', sharedBy: 'Joe Black (9000)', action: '' },
      { title: 'CLass 3 EVS-1 Chapter Details', shareDate: '09/08/2023', validUpto: '09/30/2023', sharedBy: 'Joe Black (9000)', action: '' },
      { title: 'Student Fees September Month details', shareDate: '09/01/2023', validUpto: '09/30/2023', sharedBy: 'Joe Black (9000)', action: '' },
      { title: 'class 3 Science Syllabus', shareDate: '09/01/2023', validUpto: '09/30/2023', sharedBy: 'Joe Black (9000)', action: '' },
      { title: 'Class 4 Maths Chapter', shareDate: '08/16/2023', validUpto: '08/30/2023', sharedBy: 'Joe Black (9000)', action: '' },
      { title: 'Fees Details', shareDate: '08/01/2023', validUpto: '08/22/2023', sharedBy: 'Joe Black (9000)', action: '' },
      { title: 'Study Material', shareDate: '07/05/2023', validUpto: '07/25/2023', sharedBy: 'Joe Black (9000)', action: '' },
      { title: 'Fees Structure', shareDate: '07/01/2023', validUpto: '07/20/2023', sharedBy: 'Joe Black (9000)', action: '' },
      { title: 'Study Material', shareDate: '06/01/2023', validUpto: '06/30/2023', sharedBy: 'Joe Black (9000)', action: '' },
      { title: 'Exam Admit Card', shareDate: '06/12/2023', validUpto: '06/20/2023', sharedBy: 'Joe Black (9000)', action: '' },
      { title: 'Fees Structure', shareDate: '06/05/2023', validUpto: '06/15/2023', sharedBy: 'Joe Black (9000)', action: '' },
      { title: 'Study Material', shareDate: '05/15/2023', validUpto: '05/31/2023', sharedBy: 'Joe Black (9000)', action: '' },
      { title: 'Exam Form', shareDate: '05/05/2023', validUpto: '05/22/2023', sharedBy: 'Joe Black (9000)', action: '' },
      { title: 'English Writer Assignment', shareDate: '05/01/2023', validUpto: '05/20/2023', sharedBy: 'Joe Black (9000)', action: '' },
      { title: 'MATHEMATICAL REASONING', shareDate: '04/18/2023', validUpto: '04/26/2023', sharedBy: 'Joe Black (9000)', action: '' },
      { title: 'English Assignment', shareDate: '04/12/2023', validUpto: '04/22/2023', sharedBy: 'Joe Black (9000)', action: '' },
      { title: 'Fees Details', shareDate: '04/01/2023', validUpto: '04/20/2023', sharedBy: 'Joe Black (9000)', action: '' },
      { title: 'Student Previous Fees', shareDate: '04/10/2023', validUpto: '04/15/2023', sharedBy: 'Joe Black (9000)', action: '' },
      { title: 'Study Material', shareDate: '04/01/2023', validUpto: '04/10/2023', sharedBy: 'Joe Black (9000)', action: '' },
      { title: 'Study Material', shareDate: '03/14/2023', validUpto: '03/30/2023', sharedBy: 'Joe Black (9000)', action: '' },
      { title: 'Admit Card', shareDate: '03/14/2023', validUpto: '03/30/2023', sharedBy: 'Joe Black (9000)', action: '' },
      { title: 'Study Material', shareDate: '03/14/2023', validUpto: '03/30/2023', sharedBy: 'Joe Black (9000)', action: '' },
      { title: 'testing', shareDate: '03/13/2023', validUpto: '08/25/2024', sharedBy: 'Joe Black (9000)', action: '' },
      { title: 'testing', shareDate: '03/13/2023', validUpto: '04/12/2024', sharedBy: 'Joe Black (9000)', action: '' },
      { title: 'testing', shareDate: '03/13/2023', validUpto: '11/26/2023', sharedBy: 'Joe Black (9000)', action: '' },
      { title: 'Study Material', shareDate: '03/01/2023', validUpto: '03/10/2023', sharedBy: 'Joe Black (9000)', action: '' },
      { title: 'Study Material', shareDate: '02/11/2023', validUpto: '02/23/2023', sharedBy: 'Jason Sharlton (900002301)', action: '' },
      { title: 'Math Syllabus', shareDate: '02/06/2023', validUpto: '02/15/2023', sharedBy: 'Joe Black (9000)', action: '' },
      { title: 'All Subjects Study Material', shareDate: '02/15/2023', validUpto: '02/25/2023', sharedBy: 'Joe Black (9000)', action: '' },
      { title: 'All Subject Syllabus', shareDate: '02/01/2023', validUpto: '02/10/2023', sharedBy: 'Joe Black (9000)', action: '' },
      { title: 'Assignment Math', shareDate: '01/10/2023', validUpto: '01/25/2023', sharedBy: 'Joe Black (9000)', action: '' },
      { title: 'Study Material', shareDate: '01/18/2023', validUpto: '01/30/2023', sharedBy: 'Joe Black (9000)', action: '' },
    ]
  }
];
    return (
      <React.Fragment>
       <div className="container mt-5">
       <div>
      <Input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button color="primary">Search</Button>
      <Nav tabs>
        {data.map((category, index) => (
          <NavItem key={index}>
            <NavLink
              className={activeTab === (index + 1).toString() ? 'active' : ''}
              onClick={() => toggleTab((index + 1).toString())}
            >
              {category.category}
            </NavLink>
          </NavItem>
        ))}
      </Nav>
      <TabContent activeTab={activeTab}>
        {data.map((category, index) => (
          <TabPane key={index} tabId={(index + 1).toString()}>
            <Table striped>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Share Date</th>
                  <th>Valid Upto</th>
                  <th>Shared By</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {category.items.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.title}</td>
                    <td>{item.shareDate}</td>
                    <td>{item.validUpto}</td>
                    <td>{item.sharedBy}</td>
                    <td>{item.action}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TabPane>
        ))}
      </TabContent>
    </div>
       </div>
       </React.Fragment>
         );
        }; 
export default connect(null, { setBreadcrumbItems })(Content);