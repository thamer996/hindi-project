import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import {
  Table,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Modal,
  ModalBody,
  Form,
  Label,
  Input,
  FormFeedback,
  ModalHeader,
} from "reactstrap"

import { connect } from "react-redux"

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"
import HeaderTeacher from "../../components/HorizontalLayoutTeacher/HeaderTeacher"
import NvbarTeacher from "../../components/HorizontalLayoutTeacher/NvbarTeacher"
import { useFormik } from "formik"
import * as Yup from "yup"
import { createClient } from "@supabase/supabase-js"
import { toast, ToastContainer } from "react-toastify"
import DataTable from "react-data-table-component"
import { v4 as uuidv4 } from "uuid"

const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)

const StaffDirectory = props => {
  document.title =
    "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard"

  const breadcrumbItems = [
    { title: "Smart school", link: "#" },
    { title: "Human Resource", link: "#" },
  ]
  const navigate = useNavigate()

  const [data, setdata] = useState([])
  const [show, setshow] = useState(false)
  const [Role, setRole] = useState("")
  const [role, setrole] = useState("")
  const [keyword, setkeyword] = useState("")
  const [type, settype] = useState("add")
  const [clas, setClas] = useState([])
  const [cat, setcat] = useState([])
  const [maritalStatuss, setmaritalStatuss] = useState([])
  const [sectModal, setsectModal] = useState([])

  const [roless, setroless] = useState([])
  const [Designation, setDesignation] = useState([])
  const [Department, setDepartment] = useState([])

  const [photo, setphoto] = useState("")

  const [FatherPhoto, setFatherPhoto] = useState("")

  const [MotherPhoto, setMotherPhoto] = useState("")
  const [IfGuardianIs, setIfGuardianIs] = useState("")
  const [GuardianPhoto, setGuardianPhoto] = useState("")

  async function getStaff() {
    const { data, error } = await supabase.from("Staff").select("*")
    setdata(data ?? [])
  }
  async function getDesignation() {
    const { data, error } = await supabase.from("Designation").select("*")
    setDesignation(data ?? [])
  }
  async function getDepartment() {
    const { data, error } = await supabase.from("Department").select("*")
    setDepartment(data ?? [])
  }

  useEffect(() => {
    props.setBreadcrumbItems("Staff Directory", breadcrumbItems)
    getStaff()
    getDepartment()
    getDesignation()
  }, [])

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      staffID: "",
      department: "",
      designation: "",
      role: "",
      firstName: "",
      lastName: "",
      fatherName: "",
      motherName: "",
      email: "",
      gender: "",
      dateOfBirth: "",
      dateOfJoining: "",
      mobileNumber: "",
      emergencyContactNumber: "",
      maritalStatus: "",
      photo: "",
      address: "",
      permanentAddress: "",
      qualification: "",
      workExperience: "",
      note: "",
      panNumber: "",
    },

    validationSchema: Yup.object({
      department: Yup.string().required("Please Enter Your department"),
      designation: Yup.string().required("please insert designation"),
      role: Yup.string().required("please insert role"),
      firstName: Yup.string().required("please insert firstName"),
      lastName: Yup.string().required("please insert lastName"),
      gender: Yup.string().required("please insert gender"),
      dateOfBirth: Yup.string().required("please insert dateOfBirth"),
      email: Yup.string().required("please insert email"),
      emergencyContactNumber: Yup.string().required(
        "please insert emergencyContactNumber",
      ),
      mobileNumber: Yup.string().required("please insert mobileNumber"),
      maritalStatus: Yup.string().required("please insert maritalStatus"),
      address: Yup.string().required("please insert address"),
      permanentAddress: Yup.string().required("please insert permanentAddress"),

      workExperience: Yup.string().required("please insert workExperience"),
      fatherName: Yup.string().required("please insert fatherName"),
      qualification: Yup.string().required("please insert qualification"),
      motherName: Yup.string().required("please insert motherName"),
      panNumber: Yup.string().required("please insert panNumber"),
      note: Yup.string().required("please insert note"),
      staffID: Yup.string().required("please insert staffID"),
      dateOfJoining: Yup.string().required("please insert dateOfJoining"),
    }),
    onSubmit: async values => {
      if (type === "add") {
        const { data, error } = await supabase
          .from("Staff")
          .insert([
            {
              staffID: values?.staffID,
              department: values?.department,
              designation: values?.designation,
              role: values?.role,
              firstName: values?.firstName,
              lastName: values?.lastName,
              fatherName: values?.fatherName,
              motherName: values?.motherName,
              email: values?.email,
              gender: values?.gender,
              dateOfBirth: values?.dateOfBirth,
              dateOfJoining: values?.dateOfJoining,
              mobileNumber: values?.mobileNumber,
              emergencyContactNumber: values?.emergencyContactNumber,
              maritalStatus: values?.maritalStatus,
              photo: photo,
              address: values?.address,
              permanentAddress: values?.permanentAddress,
              qualification: values?.qualification,
              workExperience: values?.workExperience,
              note: values?.note,
              panNumber: values?.panNumber,
            },
          ])
          .select()

        if (error) {
          toast.error("Staff Added Failed", { autoClose: 2000 })
        } else {
          toast.success("Staff Added", { autoClose: 2000 })
          setshow(false)
          getStaff()
          validation.resetForm()
        }
      } else {
        const { data, error } = await supabase
          .from("Staff")
          .update([
            {
              staffID: values?.staffID,
              department: values?.department,
              designation: values?.designation,
              role: values?.role,
              firstName: values?.firstName,
              lastName: values?.lastName,
              fatherName: values?.fatherName,
              motherName: values?.motherName,
              email: values?.email,
              gender: values?.gender,
              dateOfBirth: values?.dateOfBirth,
              dateOfJoining: values?.dateOfJoining,
              mobileNumber: values?.mobileNumber,
              emergencyContactNumber: values?.emergencyContactNumber,
              maritalStatus: values?.maritalStatus,
              photo: photo,
              address: values?.address,
              permanentAddress: values?.permanentAddress,
              qualification: values?.qualification,
              workExperience: values?.workExperience,
              note: values?.note,
              panNumber: values?.panNumber,
            },
          ])
          .eq("id", values.id)
          .select()

        if (error) {
          toast.error("Staff Updated Failed", { autoClose: 2000 })
        } else {
          toast.success("Staff Updated", { autoClose: 2000 })
          setshow(false)
          getStaff()
          validation.resetForm()
        }
      }
    },
  })
  async function uploadImage(e, setstate) {
    let file = e.target.files[0]

    const uuidv4Val = uuidv4()

    const { data, error } = await supabase.storage
      .from("uploads")
      .upload(uuidv4Val, file)

    if (data) {
      //   //   to get image
      //   const { data: datas, error: errors } = await supabase.storage
      //     .from("uploads")
      //     .download(data?.path)
      //   const url = URL.createObjectURL(datas)

      setstate(data?.path)
    } else {
      console.log(error)
    }
  }

  const handleSearch = async () => {
    const { data, error } = await supabase
      .from("Staff")
      .select("*")
      .ilike("role", `%${Role}%`)
      .or(
        `firstName.ilike.%${keyword}%,designation.ilike.%${keyword}%,lastName.ilike.%${keyword}%,mobileNumber.ilike.%${keyword}%`,
      )

    setdata(data)
  }

  const handelEdit = async row => {
    validation.resetForm()

    validation.setFieldValue("staffID", row.staffID)
    validation.setFieldValue("department", row.department)
    validation.setFieldValue("designation", row.designation)
    validation.setFieldValue("role", row.role)
    validation.setFieldValue("firstName", row.firstName)
    validation.setFieldValue("lastName", row.lastName)
    validation.setFieldValue("fatherName", row.fatherName)
    validation.setFieldValue("motherName", row.motherName)
    validation.setFieldValue("email", row.email)
    validation.setFieldValue("gender", row.gender)
    validation.setFieldValue("dateOfBirth", row.dateOfBirth)
    validation.setFieldValue("dateOfJoining", row.dateOfJoining)
    validation.setFieldValue("mobileNumber", row.mobileNumber)
    validation.setFieldValue(
      "emergencyContactNumber",
      row.emergencyContactNumber,
    )
    validation.setFieldValue("maritalStatus", row.maritalStatus)
    validation.setFieldValue("photo", row.photo)
    validation.setFieldValue("address", row.address)
    validation.setFieldValue("permanentAddress", row.permanentAddress)
    validation.setFieldValue("qualification", row.qualification)
    validation.setFieldValue("workExperience", row.workExperience)
    validation.setFieldValue("note", row.note)
    validation.setFieldValue("panNumber", row.panNumber)

    setphoto(row.photo)
    settype("edit")
    validation.setFieldValue("id", row.id)
    setshow(true)
  }

  const handleAdd = () => {
    settype("add")
    setshow(true)
  }
  const handleAddProfile = () => {
    navigate("/Staff-profile")
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

  const handelDelete = async id => {
    const { error } = await supabase.from("Staff").delete().eq("id", id)

    if (error) {
      toast.error("Staff Deleted Failed", { autoClose: 2000 })
    } else {
      toast.success("Staff Deleted", { autoClose: 2000 })
      getStaff()
    }
  }

  const columns = [
    {
      name: "staffID",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.staffID ?? "None",
    },
    {
      name: "firstName",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.firstName ?? "None",
    },
    {
      name: "lastName",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.lastName ?? "None",
    },
    {
      name: "role",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.role ?? "None",
    },
    {
      name: "department",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.department,
    },
    {
      name: "designation",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.designation,
    },

    {
      name: "mobileNumber",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.mobileNumber,
    },

    {
      name: "panNumber",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.panNumber,
    },

    {
      name: "Action",
      //allowOverflow: true,
      reorder: true,
      center: true,
      minWidth: "250px",

      cell: row => {
        return (
          <div className="d-flex">
            <>
              <span style={editIconStyle} onClick={() => handelEdit(row)}>
                <i className="ti-marker-alt"></i>
              </span>
              <span
                style={actionIconStyle}
                onClick={() => handelDelete(row?.id)}
              >
                <i className="ti-trash"></i>
              </span>
            </>
          </div>
        )
      },
    },
  ]

  return (
    <React.Fragment>
      <Row>
        <div className="d-flex mb-2">
          {/* Vos éléments de filtre ici */}
          <label className="col-form-label">Role</label>&nbsp;
          <div className="col-md-2 me-1">
            <select
              onChange={val => {
                setRole(val.target.value)
              }}
              value={Role}
              className="form-control"
            >
              <option> Select </option>
              <option>Admin</option>
              <option>Teacher</option>
              <option>Accountant</option>
              <option>Librarian</option>
              <option>Receptionist</option>
              <option>Super Admin</option>
            </select>
          </div>
          <label className="col-form-label">Search By Keyword</label>&nbsp;
          <div className="col-md-2 me-1">
            <input
              type="text"
              value={keyword}
              onChange={val => {
                setkeyword(val.target.value)
              }}
              className="form-control"
              placeholder="Search By Name, Mobile Number..."
            />
          </div>
          <div>
            <button className="btn btn-primary" onClick={handleSearch}>
              Search
            </button>
          </div>
          <div>
            <button
              className="btn btn-danger ms-2"
              onClick={() => {
                setRole("")
                setkeyword("")
              }}
            >
              Reset
            </button>
          </div>
        </div>
        <div className="d-flex justify-content-between  mb-2">
          <div></div>
          {/* Button */}
          <button className="btn btn-primary" onClick={handleAdd}>
            Add Staff
          </button>
        </div>
      </Row>
      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <CardTitle className="h4"> Staffs Details </CardTitle>

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
                  data={data}
                />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Modal
        isOpen={show}
        toggle={() => setshow(!show)}
        centered={true}
        size="xl"
      >
        <ModalHeader toggle={() => setshow(!show)}>{type}</ModalHeader>
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
              <Col>
                <div className="mb-3">
                  <Label htmlFor="useremail">staffID</Label>
                  <Input
                    id="staffID"
                    name="staffID"
                    className="form-control"
                    placeholder="Enter role staffID"
                    type="staffID"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.staffID || ""}
                    invalid={
                      validation.touched.staffID && validation.errors.staffID
                        ? true
                        : false
                    }
                  />
                  {validation.touched.staffID && validation.errors.staffID ? (
                    <FormFeedback type="invalid">
                      {validation.errors.staffID}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col>
                <div className="mb-3">
                  <Label htmlFor="useremail">department</Label>
                  <select
                    id="department"
                    name="department"
                    className="form-control"
                    type="department"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.department || ""}
                    invalid={
                      validation.touched.department &&
                      validation.errors.department
                        ? true
                        : false
                    }
                  >
                    <option value={""}>Select</option>
                    {Department?.map(el => (
                      <option value={el.name}>{el.name}</option>
                    ))}
                  </select>
                  {validation.touched.department &&
                  validation.errors.department ? (
                    <FormFeedback type="invalid">
                      {validation.errors.department}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col>
                <div className="mb-3">
                  <Label htmlFor="useremail">designation</Label>
                  <select
                    id="designation"
                    name="designation"
                    className="form-control"
                    type="designation"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.designation || ""}
                    invalid={
                      validation.touched.designation &&
                      validation.errors.designation
                        ? true
                        : false
                    }
                  >
                    <option value={""}>Select</option>
                    {Designation?.map(el => (
                      <option value={el.name}>{el.name}</option>
                    ))}
                  </select>
                  {validation.touched.designation &&
                  validation.errors.designation ? (
                    <FormFeedback type="invalid">
                      {validation.errors.designation}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="mb-3">
                  <Label htmlFor="useremail">role</Label>
                  <select
                    id="role"
                    name="role"
                    className="form-control"
                    placeholder="Enter role"
                    type="role"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.role || ""}
                    invalid={
                      validation.touched.role && validation.errors.role
                        ? true
                        : false
                    }
                  >
                    <option value={""}>Select</option>
                    <option>Admin</option>
                    <option>Teacher</option>
                    <option>Accountant</option>
                    <option>Librarian</option>
                    <option>Receptionist</option>
                    <option>Super Admin</option>
                  </select>

                  {validation.touched.role && validation.errors.role ? (
                    <FormFeedback type="invalid">
                      {validation.errors.role}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col>
                <div className="mb-3">
                  <Label htmlFor="useremail">firstName</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    className="form-control"
                    placeholder="Enter role firstName"
                    type="firstName"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.firstName || ""}
                    invalid={
                      validation.touched.firstName &&
                      validation.errors.firstName
                        ? true
                        : false
                    }
                  />
                  {validation.touched.firstName &&
                  validation.errors.firstName ? (
                    <FormFeedback type="invalid">
                      {validation.errors.firstName}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col>
                <div className="mb-3">
                  <Label htmlFor="useremail">lastName</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    className="form-control"
                    placeholder="Enter role lastName"
                    type="lastName"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.lastName || ""}
                    invalid={
                      validation.touched.lastName && validation.errors.lastName
                        ? true
                        : false
                    }
                  />
                  {validation.touched.lastName && validation.errors.lastName ? (
                    <FormFeedback type="invalid">
                      {validation.errors.lastName}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="mb-3">
                  <Label htmlFor="useremail">Father Name</Label>
                  <Input
                    id="fatherName"
                    name="fatherName"
                    className="form-control"
                    placeholder="Enter role fatherName"
                    type="fatherName"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.fatherName || ""}
                    invalid={
                      validation.touched.fatherName &&
                      validation.errors.fatherName
                        ? true
                        : false
                    }
                  />
                  {validation.touched.fatherName &&
                  validation.errors.fatherName ? (
                    <FormFeedback type="invalid">
                      {validation.errors.fatherName}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col>
                <div className="mb-3">
                  <Label htmlFor="useremail">Mother Name</Label>
                  <Input
                    id="motherName"
                    name="motherName"
                    className="form-control"
                    placeholder="Enter role motherName"
                    type="motherName"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.motherName || ""}
                    invalid={
                      validation.touched.motherName &&
                      validation.errors.motherName
                        ? true
                        : false
                    }
                  />
                  {validation.touched.motherName &&
                  validation.errors.motherName ? (
                    <FormFeedback type="invalid">
                      {validation.errors.motherName}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col>
                <div className="mb-3">
                  <Label htmlFor="useremail">email</Label>
                  <Input
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter role email"
                    type="email"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.email || ""}
                    invalid={
                      validation.touched.email && validation.errors.email
                        ? true
                        : false
                    }
                  />
                  {validation.touched.email && validation.errors.email ? (
                    <FormFeedback type="invalid">
                      {validation.errors.email}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="mb-3">
                  <Label htmlFor="useremail">gender</Label>
                  <select
                    id="gender"
                    name="gender"
                    className="form-control"
                    placeholder="Enter gender"
                    type="gender"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.gender || ""}
                    invalid={
                      validation.touched.gender && validation.errors.gender
                        ? true
                        : false
                    }
                  >
                    <option> Select </option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>

                  {validation.touched.gender && validation.errors.gender ? (
                    <FormFeedback type="invalid">
                      {validation.errors.gender}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col>
                <div className="mb-3">
                  <Label htmlFor="useremail">dateOfBirth</Label>
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    className="form-control"
                    placeholder="Enter role dateOfBirth"
                    type="dateOfBirth"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.dateOfBirth || ""}
                    invalid={
                      validation.touched.dateOfBirth &&
                      validation.errors.dateOfBirth
                        ? true
                        : false
                    }
                  />
                  {validation.touched.dateOfBirth &&
                  validation.errors.dateOfBirth ? (
                    <FormFeedback type="invalid">
                      {validation.errors.dateOfBirth}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col>
                <div className="mb-3">
                  <Label htmlFor="useremail">dateOfJoining</Label>
                  <Input
                    id="dateOfJoining"
                    name="dateOfJoining"
                    className="form-control"
                    placeholder="Enter role dateOfJoining"
                    type="dateOfJoining"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.dateOfJoining || ""}
                    invalid={
                      validation.touched.dateOfJoining &&
                      validation.errors.dateOfJoining
                        ? true
                        : false
                    }
                  />
                  {validation.touched.dateOfJoining &&
                  validation.errors.dateOfJoining ? (
                    <FormFeedback type="invalid">
                      {validation.errors.dateOfJoining}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="mb-3">
                  <Label htmlFor="useremail">mobileNumber</Label>
                  <Input
                    id="mobileNumber"
                    name="mobileNumber"
                    className="form-control"
                    placeholder="Enter role mobileNumber"
                    type="mobileNumber"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.mobileNumber || ""}
                    invalid={
                      validation.touched.mobileNumber &&
                      validation.errors.mobileNumber
                        ? true
                        : false
                    }
                  />
                  {validation.touched.mobileNumber &&
                  validation.errors.mobileNumber ? (
                    <FormFeedback type="invalid">
                      {validation.errors.mobileNumber}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col>
                <div className="mb-3">
                  <Label htmlFor="useremail">emergencyContactNumber</Label>
                  <Input
                    id="emergencyContactNumber"
                    name="emergencyContactNumber"
                    className="form-control"
                    placeholder="Enter role emergencyContactNumber"
                    type="emergencyContactNumber"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.emergencyContactNumber || ""}
                    invalid={
                      validation.touched.emergencyContactNumber &&
                      validation.errors.emergencyContactNumber
                        ? true
                        : false
                    }
                  />
                  {validation.touched.emergencyContactNumber &&
                  validation.errors.emergencyContactNumber ? (
                    <FormFeedback type="invalid">
                      {validation.errors.emergencyContactNumber}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col>
                <div className="mb-3">
                  <Label htmlFor="useremail">maritalStatus</Label>
                  <Input
                    id="maritalStatus"
                    name="maritalStatus"
                    className="form-control"
                    placeholder="Enter role maritalStatus"
                    type="maritalStatus"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.maritalStatus || ""}
                    invalid={
                      validation.touched.maritalStatus &&
                      validation.errors.maritalStatus
                        ? true
                        : false
                    }
                  />
                  {validation.touched.maritalStatus &&
                  validation.errors.maritalStatus ? (
                    <FormFeedback type="invalid">
                      {validation.errors.maritalStatus}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="mb-3 w-100">
                  <label htmlFor="example-text-input" className="w-100">
                    Staff Photo
                  </label>
                  <div className="col-md-5">
                    <input
                      accept="image/png, image/jpeg"
                      onChange={e => uploadImage(e, setphoto)}
                      className="form-control w-100"
                      type="file"
                    />
                  </div>
                </div>
              </Col>
              <Col>
                <div className="mb-3">
                  <Label htmlFor="useremail">address</Label>
                  <Input
                    id="address"
                    name="address"
                    className="form-control"
                    placeholder="Enter role address"
                    type="address"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.address || ""}
                    invalid={
                      validation.touched.address && validation.errors.address
                        ? true
                        : false
                    }
                  />
                  {validation.touched.address && validation.errors.address ? (
                    <FormFeedback type="invalid">
                      {validation.errors.address}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col>
                <div className="mb-3">
                  <Label htmlFor="useremail">permanentAddress</Label>
                  <Input
                    id="permanentAddress"
                    name="permanentAddress"
                    className="form-control"
                    placeholder="Enter role permanentAddress"
                    type="permanentAddress"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.permanentAddress || ""}
                    invalid={
                      validation.touched.permanentAddress &&
                      validation.errors.permanentAddress
                        ? true
                        : false
                    }
                  />
                  {validation.touched.permanentAddress &&
                  validation.errors.permanentAddress ? (
                    <FormFeedback type="invalid">
                      {validation.errors.permanentAddress}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="mb-3">
                  <Label htmlFor="useremail">qualification</Label>
                  <Input
                    id="qualification"
                    name="qualification"
                    className="form-control"
                    placeholder="Enter role qualification"
                    type="qualification"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.qualification || ""}
                    invalid={
                      validation.touched.qualification &&
                      validation.errors.qualification
                        ? true
                        : false
                    }
                  />
                  {validation.touched.qualification &&
                  validation.errors.qualification ? (
                    <FormFeedback type="invalid">
                      {validation.errors.qualification}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col>
                <div className="mb-3">
                  <Label htmlFor="useremail">workExperience</Label>
                  <Input
                    id="workExperience"
                    name="workExperience"
                    className="form-control"
                    placeholder="Enter role workExperience"
                    type="workExperience"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.workExperience || ""}
                    invalid={
                      validation.touched.workExperience &&
                      validation.errors.workExperience
                        ? true
                        : false
                    }
                  />
                  {validation.touched.workExperience &&
                  validation.errors.workExperience ? (
                    <FormFeedback type="invalid">
                      {validation.errors.workExperience}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="mb-3">
                  <Label htmlFor="useremail">note</Label>
                  <Input
                    id="note"
                    name="note"
                    className="form-control"
                    placeholder="Enter role note"
                    type="note"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.note || ""}
                    invalid={
                      validation.touched.note && validation.errors.note
                        ? true
                        : false
                    }
                  />
                  {validation.touched.note && validation.errors.note ? (
                    <FormFeedback type="invalid">
                      {validation.errors.note}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col>
                <div className="mb-3">
                  <Label htmlFor="useremail">panNumber</Label>
                  <Input
                    id="panNumber"
                    name="panNumber"
                    className="form-control"
                    placeholder="Enter role panNumber"
                    type="panNumber"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.panNumber || ""}
                    invalid={
                      validation.touched.panNumber &&
                      validation.errors.panNumber
                        ? true
                        : false
                    }
                  />
                  {validation.touched.panNumber &&
                  validation.errors.panNumber ? (
                    <FormFeedback type="invalid">
                      {validation.errors.panNumber}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
            </Row>

            <Row>
              <div>
                <div className="col-12 text-center">
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
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(StaffDirectory)
