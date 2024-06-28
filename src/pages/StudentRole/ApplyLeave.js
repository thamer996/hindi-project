import React, {  useEffect, useState } from 'react';
import { connect } from "react-redux";
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, CardBody, CardTitle, Card, Badge, FormFeedback } from 'reactstrap';
import { useNavigate } from "react-router-dom"
import { createClient } from "@supabase/supabase-js"
import { setBreadcrumbItems } from "../../store/actions";
import { Form, FormGroup, Label, Input } from 'reactstrap';
import DataTable from "react-data-table-component"
//Import Action to copy breadcrumb items from local state to redux state
import { useFormik } from "formik"
import * as Yup from "yup"
import { ToastContainer, toast } from "react-toastify"
import _, { isEmpty } from "lodash"
//supabase connection :::
const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)
const Applyleave = () => {

  const [modal, setModal] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [editedLeave, setEditedLeave] = useState(null);
  const [leaveData , setleaveData] = useState([]);
  const [Studentdetail, SetStudentDetail] = useState([])
  const [type, settype] = useState("new")
  const [section, setSection] = useState([])
  const [show, setshow] = useState(false)
  const [days, setDays] = useState("");
  async function getStudentDetail() {
     const authUser = JSON.parse(localStorage.getItem("authUser") ?? "{}")
    const refUser = localStorage.getItem("StudentId") ?? ""
    const { data, error } = await supabase
      .from("Student")
      .select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
      .eq("id", refUser)
      .single()
    SetStudentDetail(data ?? [])
  }
  console.log("student", Studentdetail)
  const toggleModal = () => setModal(!modal);
  async function getTopic ()  {

    const { data, error } = await supabase
      .from("ApproveLeave")
      .select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1).eq("studentName",Studentdetail?.firstName  );

    if (error) throw error;

    if (data) {
      console.log('data get', data);
      
      setleaveData(data ?? []);
    }

};


  // const leaveData = [
  //   {
  //     id: 1,
  //     class: 'Class 3',
  //     section: 'A',
  //     applyDate: '04/01/2023',
  //     fromDate: '04/03/2023',
  //     toDate: '04/08/2023',
  //     reason: 'Fever',
  //     status: 'Approved',
  //     action: 'Edit/Delete'
  //   },
  //   {
  //     id: 2,
  //     class: 'Class 3',
  //     section: 'A',
  //     applyDate: '05/01/2023',
  //     fromDate: '05/10/2023',
  //     toDate: '05/20/2023',
  //     reason: 'Family Function',
  //     status: 'Pending',
  //     action: 'Edit/Delete'
  //   },
  //   {
  //     id: 3,
  //     class: 'Class 3',
  //     section: 'A',
  //     applyDate: '05/03/2023',
  //     fromDate: '05/15/2023',
  //     toDate: '05/25/2023',
  //     status: 'Pending',
  //     action: 'Edit/Delete'
  //   },
  //   {
  //     id: 4,
  //     class: 'Class 3',
  //     section: 'A',
  //     applyDate: '08/04/2023',
  //     fromDate: '08/05/2023',
  //     toDate: '08/08/2023',
  //     status: 'Pending',
  //     action: 'Edit/Delete'
  //   },
  //   {
  //     id: 5,
  //     class: 'Class 3',
  //     section: 'A',
  //     applyDate: '08/21/2023',
  //     fromDate: '08/22/2023',
  //     toDate: '08/21/2023',
  //     reason: 'testing',
  //     status: 'Pending',
  //     action: 'Edit/Delete'
  //   },
  //   {
  //     id: 6,
  //     class: 'Class 3',
  //     section: 'A',
  //     applyDate: '09/05/2023',
  //     fromDate: '09/12/2023',
  //     toDate: '09/15/2023',
  //     status: 'Pending',
  //     action: 'Edit/Delete'
  //   },
  //   {
  //     id: 7,
  //     class: 'Class 3',
  //     section: 'A',
  //     applyDate: '10/03/2023',
  //     fromDate: '10/10/2023',
  //     toDate: '10/14/2023',
  //     status: 'Pending',
  //     action: 'Edit/Delete'
  //   },
  //   {
  //     id: 8,
  //     class: 'Class 3',
  //     section: 'A',
  //     applyDate: '11/01/2023',
  //     fromDate: '11/08/2023',
  //     toDate: '11/15/2023',
  //     status: 'Pending',
  //     action: 'Edit/Delete'
  //   },
  //   {
  //     id: 9,
  //     class: 'Class 3',
  //     section: 'A',
  //     applyDate: '01/05/2024',
  //     fromDate: '01/22/2024',
  //     toDate: '01/27/2024',
  //     status: 'Pending',
  //     action: 'Edit/Delete'
  //   },
  //   {
  //     id: 10,
  //     class: 'Class 3',
  //     section: 'A',
  //     applyDate: '02/02/2024',
  //     fromDate: '02/05/2024',
  //     toDate: '02/10/2024',
  //     status: 'Pending',
  //     action: 'Edit/Delete'
  //   },
  //   {
  //     id: 11,
  //     class: 'Class 3',
  //     section: 'A',
  //     applyDate: '03/04/2024',
  //     fromDate: '03/20/2024',
  //     toDate: '03/24/2024',
  //     status: 'Pending',
  //     action: 'Edit/Delete'
  //   }
  // ];

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
  const iconStyle = {
    cursor: "pointer",
    display: "inline-block",
    marginRight: "10px",
    fontSize: "24px",
    color: "blue", // Change color as needed
  }
  const actionIconStyle = {
    ...iconStyle, // Inherit styles from iconStyle
    color: "red", // Example: Change color for delete icon
  }
  const editIconStyle = {
    ...iconStyle,
    color: "black", // Color for edit icon (black)
  }
  const handleClick = () => {
    settype("new")
    validation.resetForm()
    setshow(true)
  }
  const openModal = leave => {
    setSelectedLeave(leave);
    toggleModal();
  }
  const today = new Date();
const day = String(today.getDate()).padStart(2, '0');
const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
const year = today.getFullYear();
const todayDate = `${year}-${month}-${day}`;
console.log('todayDate', todayDate);
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      applyDate: "",
      approveDisapproveBy: "",
      classRef: "",
      created_at: "",
      fromDate: "",
      id: "",
      sectionRef: "",
      status: "pending",
      studentName: "",
      toDate: "",
      days: "",
    },

    validationSchema: Yup.object({
     


      fromDate: Yup.string().required("Please Enter The fromDate"),

      toDate: Yup.string().required("Please Enter toDate"),
    }),
    onSubmit: async values => {
      console.log("values", values)
      const fromDate = new Date(values.fromDate);
      const toDate = new Date(values.toDate);
      const timeDifference = toDate - fromDate;
      let days =  Math.ceil(timeDifference / (1000 * 60 * 60 * 24))

  
      console.log('Number of days:', days);
      // const student = JSON.parse(values.student)
      // console.log("student", student)
      if (type === "new") {
        const { data, error } = await supabase
          .from("ApproveLeave")
          .insert([
            { brancheId: localStorage.getItem("BranchId") ?? 1,
              applyDate: todayDate,
              approveDisapproveBy:values.approveDisapproveBy,
              classRef: Studentdetail?.class,
              fromDate: values.fromDate,
              sectionRef: Studentdetail?.section,
              status: values.status,
              studentName: Studentdetail?.firstName,
              toDate: values.toDate,
              days : days,
            },
          ])
          .select()

        if (error) {
          console.log("ez", error)
          toast.error("Approve leave Inserted Failed", { autoClose: 2000 })
        } else {
          toast.success("Approve leave Inserted", { autoClose: 2000 })
          setshow(false)
          getTopic(Studentdetail)
          
          validation.resetForm()
        }
      } else {
        const { data, error } = await supabase
          .from("ApproveLeave")
          .update([
            {
              applyDate: todayDate,
              approveDisapproveBy:values.approveDisapproveBy,
              classRef: Studentdetail?.class,
              fromDate: values.fromDate,
              sectionRef: Studentdetail?.class,
              status: values.status,
              days : days,
              studentName: Studentdetail?.firstName,
              toDate: values.toDate,
              id: values.id,
            },
          ])
          .eq("id", values.id)
          .select()

        if (error) {
          console.log("ez", error)
          toast.error("Approve leave Updated Failed", { autoClose: 2000 })
        } else {
          toast.success("Approve leave Updated", { autoClose: 2000 })
          setshow(false)
          getTopic(Studentdetail)
          validation.resetForm()
        }
      }
    },
  })
  const handelEdit1 = async row => {
    console.log("modal edit "  )
    validation.resetForm()
    validation.setFieldValue("id", row.id)
    validation.setFieldValue("toDate", row.toDate)
    validation.setFieldValue("studentName", row.studentName)
    validation.setFieldValue("status", row.status)
    validation.setFieldValue("sectionRef", row.sectionRef)
    validation.setFieldValue("fromDate", row.fromDate)
    validation.setFieldValue("classRef", row.classRef)
    validation.setFieldValue("approveDisapproveBy", row.approveDisapproveBy)
    validation.setFieldValue("applyDate", row.applyDate)
    setshow(true)
    settype("edit")
  }
  const handelDelete = async id => {
    const { error } = await supabase.from("ApproveLeave").delete().eq("id", id)

    if (error) {
      toast.error("Subject Deleted Failed", { autoClose: 2000 })
    } else {
      toast.success("Subject Deleted", { autoClose: 2000 })
      getTopic(Studentdetail)
    }
  }
  const columns = [
    {
      name: "studentName",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.studentName ?? "None",
    },
    {
      name: "section",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.sectionRef ?? "None",
      // cell: row => (
      //   <ul className="mt-4">
      //     {row?.map(el => (
      //       <li className ="mb-2">{el.sectionRef}</li>
      //     ))}
      //   </ul>
      // ),
    },
    {
      name: "classRef",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.classRef ?? "None",
      // cell: row => (
      //   <ul className="mt-4">
      //     {row?.map(el => (
      //       <li className ="mb-2">{el.classRef}</li>
      //     ))}
      //   </ul>
      // ),
    },
    {
      name: "status",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      cell: row =>
        row?.status === "approve" ? (
          <Badge color="success" className="rounded-pill bg-success">
            {row?.status}
          </Badge>
        ) : row?.status === "pending" ? (
          <Badge color="warning" className="rounded-pill bg-warning">
            {row?.status}
          </Badge>
        ) : (
          <Badge color="danger" className="rounded-pill bg-danger">
            {row?.status}
          </Badge>
        ),
      // cell: row => (
      //   <ul className="mt-4">
      //     {row?.map(el => (
      //       <li className ="mb-2">{el.status}</li>
      //     ))}
      //   </ul>
      // ),
    },
    {
      name: "fromDate",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.fromDate,
      // cell: row => (
      //   <ul className="mt-4">
      //     {row?.map(el => (
      //       <li className ="mb-2">{el.fromDate}</li>
      //     ))}
      //   </ul>
      // ),
    },
    {
      name: "toDate",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.toDate,
      // cell: row => (
      //   <ul className="mt-4">
      //     {row?.map(el => (
      //       <li className ="mb-2">{el.toDate}</li>
      //     ))}
      //   </ul>
      // ),
    },
    {
      name: "days",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.days,
      // cell: row => (
      //   <ul className="mt-4">
      //     {row?.map(el => (
      //       <li className ="mb-2">{el.days}</li>
      //     ))}
      //   </ul>
      // ),
    },

    {
      name: "Action",
      // allowOverflow: true,
      reorder: true,
      center: true,
      minWidth: "250px",
    
      cell: row => {
        if (row?.status !== 'pending') {
          return (
            <div className="d-flex">
              <i className='ti-lock' style={{ display: "inline-block",
    marginRight: "10px",
    fontSize: "24px",
    color: "blue",}}></i>
              
            </div>
          );
        } else {
          return (
            <div className="d-flex">
              <span style={editIconStyle} onClick={() => handelEdit1(row)}>
                <i className="ti-marker-alt"></i>
              </span>
              <span style={actionIconStyle} 
              onClick={() => handelDelete(row?.id)}
              >
                <i className="ti-trash"></i>
              </span>
            </div>
          );
        }
      }
    }
  ]
  

  console.log('eeeeeeeeeeeeeeeeee')
 
  // useEffect(()=> {
  //   if (Studentdetail  && Object.keys(Studentdetail).length > 0){
  //     getTopic(Studentdetail)    }
  // }, [Studentdetail])
  useEffect(()=>{
    getTopic()
    getStudentDetail()
  },[])
  const renderLeaveTable = () => {
    return (
      <>
      {/* <Table striped>
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
      </Table> */}
      


      <Row>
            <div className="d-flex justify-content-between  mb-2">
          <div></div>
          <button className="btn btn-primary" onClick={handleClick}>
            Add Approve Leave
          </button>
        </div>
      </Row>


      <Row>
      <Col lg={12}>
        <Card>
          <CardBody>
            <CardTitle className="h4">Topic List </CardTitle>
            <div className="table-responsive">
              <DataTable
                noHeader
                pagination
                subHeader
                selectableRowsHighlight={true}
                highlightOnHover={true}
                //   paginationServer
                columns={columns}
                //paginationPerPage={7}
                className="react-dataTable"
                paginationDefaultPage={1}
                data={leaveData}
              />
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
    <Modal isOpen={show} toggle={() => setshow(!show)} centered={true}>
        <ModalBody className="py-3 px-5">
          <Form
            className="form-horizontal mt-4"
            onSubmit={e => {
              e.preventDefault()
              validation.handleSubmit()
              return false
            }}
          >
            <Row>
              <div className="mb-3">
                <Label htmlFor="useremail">Student</Label>
                <Input
                  id="student"
                  name="student"
                  className="form-control"
                  type="student"
                  readonly={true}
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={Studentdetail?.firstName || ""}
                  invalid={
                    validation.touched.student && validation.errors.student
                      ? true
                      : false
                  }
                />
              

                {validation.touched.student && validation.errors.student ? (
                  <FormFeedback type="invalid">
                    {validation.errors.student}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label htmlFor="useremail">Apply Date</Label>
                <Input
                  id="applyDate"
                  name="applyDate"
                  className="form-control"
                  placeholder="Enter applyDate"
                  type="text"
                  readOnly
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={todayDate || ""}
                  invalid={
                    validation.touched.applyDate && validation.errors.applyDate
                      ? true
                      : false
                  }
                />
                {validation.touched.applyDate && validation.errors.applyDate ? (
                  <FormFeedback type="invalid">
                    {validation.errors.applyDate}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label htmlFor="useremail">From Date</Label>
                <Input
                  id="fromDate"
                  name="fromDate"
                  className="form-control"
                  placeholder="Enter fromDate"
                  type="Date"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.fromDate || ""}
                  invalid={
                    validation.touched.fromDate && validation.errors.fromDate
                      ? true
                      : false
                  }
                />
                {validation.touched.fromDate && validation.errors.fromDate ? (
                  <FormFeedback type="invalid">
                    {validation.errors.fromDate}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label htmlFor="useremail">To Date</Label>
                <Input
                  id="toDate"
                  name="toDate"
                  className="form-control"
                  placeholder="Enter toDate"
                  type="Date"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.toDate || ""}
                  invalid={
                    validation.touched.toDate && validation.errors.toDate
                      ? true
                      : false
                  }
                />
                {validation.touched.toDate && validation.errors.toDate ? (
                  <FormFeedback type="invalid">
                    {validation.errors.toDate}
                  </FormFeedback>
                ) : null}
              </div>
       
             

              <div>
                <div className="col-12 text-end">
                  <button
                    className="btn btn-primary w-md waves-effect waves-light"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
      <ToastContainer />
    </>
    );
  }

  const renderEditForm = () => {
    if (!editFormVisible || !editedLeave) return null;
    return (
      // <Modal isOpen={editFormVisible} toggle={toggleEditForm}>
      //   <ModalHeader toggle={toggleEditForm}>Edit Leave</ModalHeader>
      //   <ModalBody>
      //     <Form>
      //       <FormGroup>
      //         <Label for="exampleReason">Reason</Label>
      //         <Input type="text" name="reason" id="exampleReason" placeholder="Enter reason" value={editedLeave.reason} onChange={handleInputChange} />
      //       </FormGroup>
      //       {/* Add more form fields for editing other leave properties */}
      //     </Form>
      //   </ModalBody>
      //   <ModalFooter>
      //     <Button color="primary" onClick={handleSave}>Save</Button>{' '}
      //     <Button color="secondary" onClick={toggleEditForm}>Cancel</Button>
      //   </ModalFooter>
      // </Modal>
      <></>
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
    