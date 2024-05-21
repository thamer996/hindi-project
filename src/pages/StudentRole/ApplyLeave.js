import React, { useState } from 'react';
import { connect } from "react-redux";
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { setBreadcrumbItems } from "../../store/actions";
import { Form, FormGroup, Label, Input } from 'reactstrap';

const Applyleave = () => {
  const [modal, setModal] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [editedLeave, setEditedLeave] = useState(null);
  const toggleModal = () => setModal(!modal);

  const leaveData = [
    {
      id: 1,
      class: 'Class 3',
      section: 'A',
      applyDate: '04/01/2023',
      fromDate: '04/03/2023',
      toDate: '04/08/2023',
      reason: 'Fever',
      status: 'Approved',
      action: 'Edit/Delete'
    },
    {
      id: 2,
      class: 'Class 3',
      section: 'A',
      applyDate: '05/01/2023',
      fromDate: '05/10/2023',
      toDate: '05/20/2023',
      reason: 'Family Function',
      status: 'Pending',
      action: 'Edit/Delete'
    },
    {
      id: 3,
      class: 'Class 3',
      section: 'A',
      applyDate: '05/03/2023',
      fromDate: '05/15/2023',
      toDate: '05/25/2023',
      status: 'Pending',
      action: 'Edit/Delete'
    },
    {
      id: 4,
      class: 'Class 3',
      section: 'A',
      applyDate: '08/04/2023',
      fromDate: '08/05/2023',
      toDate: '08/08/2023',
      status: 'Pending',
      action: 'Edit/Delete'
    },
    {
      id: 5,
      class: 'Class 3',
      section: 'A',
      applyDate: '08/21/2023',
      fromDate: '08/22/2023',
      toDate: '08/21/2023',
      reason: 'testing',
      status: 'Pending',
      action: 'Edit/Delete'
    },
    {
      id: 6,
      class: 'Class 3',
      section: 'A',
      applyDate: '09/05/2023',
      fromDate: '09/12/2023',
      toDate: '09/15/2023',
      status: 'Pending',
      action: 'Edit/Delete'
    },
    {
      id: 7,
      class: 'Class 3',
      section: 'A',
      applyDate: '10/03/2023',
      fromDate: '10/10/2023',
      toDate: '10/14/2023',
      status: 'Pending',
      action: 'Edit/Delete'
    },
    {
      id: 8,
      class: 'Class 3',
      section: 'A',
      applyDate: '11/01/2023',
      fromDate: '11/08/2023',
      toDate: '11/15/2023',
      status: 'Pending',
      action: 'Edit/Delete'
    },
    {
      id: 9,
      class: 'Class 3',
      section: 'A',
      applyDate: '01/05/2024',
      fromDate: '01/22/2024',
      toDate: '01/27/2024',
      status: 'Pending',
      action: 'Edit/Delete'
    },
    {
      id: 10,
      class: 'Class 3',
      section: 'A',
      applyDate: '02/02/2024',
      fromDate: '02/05/2024',
      toDate: '02/10/2024',
      status: 'Pending',
      action: 'Edit/Delete'
    },
    {
      id: 11,
      class: 'Class 3',
      section: 'A',
      applyDate: '03/04/2024',
      fromDate: '03/20/2024',
      toDate: '03/24/2024',
      status: 'Pending',
      action: 'Edit/Delete'
    }
  ];

  const getColorForStatus = status => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'success';
      case 'pending':
        return 'warning';
      default:
        return 'secondary';
    }
  }

  const openModal = leave => {
    setSelectedLeave(leave);
    toggleModal();
  }

  const renderLeaveTable = () => {
    return (
      <Table striped>
        <thead>
          <tr>
            <th>Class</th>
            <th>Section</th>
            <th>Apply Date</th>
            <th>From Date</th>
            <th>To Date</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {leaveData.map(leave => (
            <tr key={leave.id}>
              <td>{leave.class}</td>
              <td>{leave.section}</td>
              <td>{leave.applyDate}</td>
              <td>{leave.fromDate}</td>
              <td>{leave.toDate}</td>
              <td>{leave.reason}</td>
              <td>
                <span className={`badge bg-${getColorForStatus(leave.status)}`}>{leave.status}</span>
              </td>
              <td>
                <Button color="info" onClick={() => handleEdit(leave)}>Edit</Button>{' '}
                <Button color="danger" onClick={() => handleDelete(leave)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }

  const renderEditForm = () => {
    if (!editFormVisible || !editedLeave) return null;
    return (
      <Modal isOpen={editFormVisible} toggle={toggleEditForm}>
        <ModalHeader toggle={toggleEditForm}>Edit Leave</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="exampleReason">Reason</Label>
              <Input type="text" name="reason" id="exampleReason" placeholder="Enter reason" value={editedLeave.reason} onChange={handleInputChange} />
            </FormGroup>
            {/* Add more form fields for editing other leave properties */}
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSave}>Save</Button>{' '}
          <Button color="secondary" onClick={toggleEditForm}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }

  const toggleEditForm = () => {
    setEditFormVisible(!editFormVisible);
  }

  const handleEdit = leave => {
    setEditedLeave(leave);
    toggleEditForm();
  }

  const handleDelete = leave => {
    // Handle deletion logic here
    // For example, filter out the selected leave from the leaveData array
  }

  const handleInputChange = e => {
    // Handle input changes for the edit form
    // Update the editedLeave state accordingly
  }

  const handleSave = () => {
    // Handle save logic for the edited leave
    // For example, update the leaveData array with the edited leave
    toggleEditForm();
  }

  return (
    <React.Fragment>
      <div className="container mt-5">
        <div>
          <h1>Leave Management</h1>
          {renderLeaveTable()}
          {renderEditForm()}
        </div>
      </div>
    </React.Fragment>
  );
};

export default connect(null, { setBreadcrumbItems })(Applyleave);
    