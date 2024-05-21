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

const StudentDetailsSuper = props => {
  document.title =
    "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard"

  const breadcrumbItems = [
    { title: "Smart school", link: "#" },
    { title: "Student Information", link: "#" },
  ]
  const navigate = useNavigate()

  const [data, setdata] = useState([])
  const [show, setshow] = useState(false)
  const [Class, setClass] = useState("")
  const [Section, setSection] = useState("")
  const [keyword, setkeyword] = useState("")
  const [type, settype] = useState("add")
  const [clas, setClas] = useState([])
  const [cat, setcat] = useState([])
  const [houses, sethouses] = useState([])
  const [sectModal, setsectModal] = useState([])

  const [sectionss, setSectionss] = useState([])

  const [StudentPhoto, setStudentPhoto] = useState("")

  const [FatherPhoto, setFatherPhoto] = useState("")

  const [MotherPhoto, setMotherPhoto] = useState("")
  const [IfGuardianIs, setIfGuardianIs] = useState("")
  const [GuardianPhoto, setGuardianPhoto] = useState("")

  async function getStudents() {
    const { data, error } = await supabase.from("Student").select("*")
    setdata(data ?? [])
  }
  async function getClass() {
    const { data, error } = await supabase.from("Class").select("*")
    setClas(data ?? [])
  }

  // async function getSections() {
  //   const { data, error } = await supabase.from("Section").select("*")
  //   setSectionss(data ?? [])
  // }
  async function getCategorys() {
    const { data, error } = await supabase.from("Category").select("*")
    setcat(data ?? [])
  }
  async function getHouse() {
    const { data, error } = await supabase.from("House").select("*")
    sethouses(data ?? [])
  }
  useEffect(() => {
    props.setBreadcrumbItems("Student Details", breadcrumbItems)
    getStudents()
    getClass()
    getCategorys()
    getHouse()
  }, [])

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      admissionNo: "",
      rollNumber: "",
      class: "",
      section: "",
      firstName: "",
      lastName: "",
      gender: "",
      dateOfBirth: "",
      category: "",
      religion: "",
      caste: "",
      mobileNumber: "",
      admissionDate: "",
      studentPhoto: "",
      bloodGroup: "",
      house: "",
      height: "",
      weight: "",
      measurementDate: "",
      medicalHistory: "",
      routeList: "",
      pickupPoint: "",
      feesMonth: "",
      hostel: "",
      roomNo: "",
      fatherName: "",
      fatherPhone: "",
      fatherOccupation: "",
      fatherPhoto: "",
      motherName: "",
      motherPhone: "",
      motherOccupation: "",
      motherPhoto: "",
      ifGuardianIs: "",
      guardianName: "",
      guardianRelation: "",
      guardianEmail: "",
      guardianPhoto: "",
      guardianOccupation: "",
      guardianAddress: "",
    },

    validationSchema: Yup.object({
      admissionNo: Yup.string().required("Please Enter Your admissionNo"),
      rollNumber: Yup.string().required("please insert rollNumber"),
      class: Yup.string().required("please insert class"),
      section: Yup.string().required("please insert section"),
      firstName: Yup.string().required("please insert firstName"),
      lastName: Yup.string().required("please insert lastName"),
      gender: Yup.string().required("please insert gender"),
      dateOfBirth: Yup.string().required("please insert dateOfBirth"),
      category: Yup.string().required("please insert category"),
      religion: Yup.string().required("please insert religion"),
      caste: Yup.string().required("please insert caste"),
      mobileNumber: Yup.string().required("please insert mobileNumber"),
      admissionDate: Yup.string().required("please insert admissionDate"),
      bloodGroup: Yup.string().required("please insert bloodGroup"),
      house: Yup.string().required("please insert house"),
      height: Yup.string().required("please insert height"),
      weight: Yup.string().required("please insert weight"),
      measurementDate: Yup.string().required("please insert measurementDate"),
      medicalHistory: Yup.string().required("please insert medicalHistory"),
      routeList: Yup.string().required("please insert routeList"),
      pickupPoint: Yup.string().required("please insert pickupPoint"),
      feesMonth: Yup.string().required("please insert feesMonth"),
      hostel: Yup.string().required("please insert hostel"),
      roomNo: Yup.string().required("please insert roomNo"),
      fatherName: Yup.string().required("please insert fatherName"),
      fatherPhone: Yup.string().required("please insert fatherPhone"),
      fatherOccupation: Yup.string().required("please insert fatherOccupation"),
      motherName: Yup.string().required("please insert motherName"),
      motherPhone: Yup.string().required("please insert motherPhone"),
      motherOccupation: Yup.string().required("please insert motherOccupation"),
      guardianName: Yup.string().required("please insert guardianName"),
      guardianRelation: Yup.string().required("please insert guardianRelation"),
      guardianEmail: Yup.string().required("please insert guardianEmail"),
      guardianOccupation: Yup.string().required(
        "please insert guardianOccupation",
      ),
      guardianAddress: Yup.string().required("please insert guardianAddress"),
    }),
    onSubmit: async values => {
      if (type === "add") {
        const { data, error } = await supabase
          .from("Student")
          .insert([
            {
              admissionNo: values.admissionNo,
              rollNumber: values.rollNumber,
              class: values.class,
              section: values.section,
              firstName: values.firstName,
              lastName: values.lastName,
              gender: values.gender,
              dateOfBirth: values.dateOfBirth,
              category: values.category,
              religion: values.religion,
              caste: values.caste,
              mobileNumber: values.mobileNumber,
              admissionDate: values.admissionDate,
              studentPhoto: StudentPhoto,
              bloodGroup: values.bloodGroup,
              house: values.house,
              height: values.height,
              weight: values.weight,
              measurementDate: values.measurementDate,
              medicalHistory: values.medicalHistory,
              routeList: values.routeList,
              pickupPoint: values.pickupPoint,
              feesMonth: values.feesMonth,
              hostel: values.hostel,
              roomNo: values.roomNo,
              fatherName: values.fatherName,
              fatherPhone: values.fatherPhone,
              fatherOccupation: values.fatherOccupation,
              fatherPhoto: FatherPhoto,
              motherName: values.motherName,
              motherPhone: values.motherPhone,
              motherOccupation: values.motherOccupation,
              motherPhoto: MotherPhoto,
              ifGuardianIs: IfGuardianIs,
              guardianName: values.guardianName,
              guardianRelation: values.guardianRelation,
              guardianEmail: values.guardianEmail,
              guardianPhoto: GuardianPhoto,
              guardianOccupation: values.guardianOccupation,
              guardianAddress: values.guardianAddress,
            },
          ])
          .select()

        if (error) {
          toast.error("Student Added Failed", { autoClose: 2000 })
        } else {
          toast.success("Student Added", { autoClose: 2000 })
          setshow(false)
          getStudents()
          validation.resetForm()
        }
      } else {
        const { data, error } = await supabase
          .from("Student")
          .update([
            {
              admissionNo: values.admissionNo,
              rollNumber: values.rollNumber,
              class: values.class,
              section: values.section,
              firstName: values.firstName,
              lastName: values.lastName,
              gender: values.gender,
              dateOfBirth: values.dateOfBirth,
              category: values.category,
              religion: values.religion,
              caste: values.caste,
              mobileNumber: values.mobileNumber,
              admissionDate: values.admissionDate,
              studentPhoto: StudentPhoto,
              bloodGroup: values.bloodGroup,
              house: values.house,
              height: values.height,
              weight: values.weight,
              measurementDate: values.measurementDate,
              medicalHistory: values.medicalHistory,
              routeList: values.routeList,
              pickupPoint: values.pickupPoint,
              feesMonth: values.feesMonth,
              hostel: values.hostel,
              roomNo: values.roomNo,
              fatherName: values.fatherName,
              fatherPhone: values.fatherPhone,
              fatherOccupation: values.fatherOccupation,
              fatherPhoto: FatherPhoto,
              motherName: values.motherName,
              motherPhone: values.motherPhone,
              motherOccupation: values.motherOccupation,
              motherPhoto: MotherPhoto,
              ifGuardianIs: IfGuardianIs,
              guardianName: values.guardianName,
              guardianRelation: values.guardianRelation,
              guardianEmail: values.guardianEmail,
              guardianPhoto: GuardianPhoto,
              guardianOccupation: values.guardianOccupation,
              guardianAddress: values.guardianAddress,
            },
          ])
          .eq("id", values.id)
          .select()

        if (error) {
          toast.error("Student Updated Failed", { autoClose: 2000 })
        } else {
          toast.success("Student Updated", { autoClose: 2000 })
          setshow(false)
          getStudents()
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
      .from("Student")
      .select("*")
      .ilike("class", `%${Class}%`)
      .ilike("section", `%${Section}%`)
      .or(
        `firstName.ilike.%${keyword}%,rollNumber.ilike.%${keyword}%,lastName.ilike.%${keyword}%,category.ilike.%${keyword}%,rollNumber.ilike.%${keyword}%,mobileNumber.ilike.%${keyword}%`,
      )

    setdata(data)
  }

  const handelEdit = async row => {
    validation.resetForm()

    validation.setFieldValue("admissionNo", row.admissionNo)
    validation.setFieldValue("rollNumber", row.rollNumber)
    validation.setFieldValue("section", row.section)
    validation.setFieldValue("category", row.category)
    validation.setFieldValue("class", row.class)
    validation.setFieldValue("firstName", row.firstName)
    validation.setFieldValue("lastName", row.lastName)
    validation.setFieldValue("gender", row.gender)
    validation.setFieldValue("dateOfBirth", row.dateOfBirth)
    validation.setFieldValue("religion", row.religion)
    validation.setFieldValue("caste", row.caste)
    validation.setFieldValue("mobileNumber", row.mobileNumber)
    validation.setFieldValue("admissionDate", row.admissionDate)
    validation.setFieldValue("studentPhoto", row.studentPhoto)
    validation.setFieldValue("bloodGroup", row.bloodGroup)
    validation.setFieldValue("house", row.house)
    validation.setFieldValue("height", row.height)
    validation.setFieldValue("weight", row.weight)
    validation.setFieldValue("measurementDate", row.measurementDate)
    validation.setFieldValue("medicalHistory", row.medicalHistory)
    validation.setFieldValue("routeList", row.routeList)
    validation.setFieldValue("pickupPoint", row.pickupPoint)
    validation.setFieldValue("feesMonth", row.feesMonth)
    validation.setFieldValue("hostel", row.hostel)
    validation.setFieldValue("roomNo", row.roomNo)
    validation.setFieldValue("fatherName", row.fatherName)
    validation.setFieldValue("fatherPhone", row.fatherPhone)
    validation.setFieldValue("fatherOccupation", row.fatherOccupation)
    validation.setFieldValue("fatherPhoto", row.fatherPhoto)
    validation.setFieldValue("motherName", row.motherName)
    validation.setFieldValue("motherPhone", row.motherPhone)
    validation.setFieldValue("motherOccupation", row.motherOccupation)
    validation.setFieldValue("motherPhoto", row.motherPhoto)
    validation.setFieldValue("ifGuardianIs", row.ifGuardianIs)
    validation.setFieldValue("guardianName", row.guardianName)
    validation.setFieldValue("guardianRelation", row.guardianRelation)
    validation.setFieldValue("guardianEmail", row.guardianEmail)
    validation.setFieldValue("guardianPhoto", row.guardianPhoto)
    validation.setFieldValue("guardianOccupation", row.guardianOccupation)
    validation.setFieldValue("guardianAddress", row.guardianAddress)
    setGuardianPhoto(row.guardianPhoto)
    setIfGuardianIs(row.ifGuardianIs)
    setMotherPhoto(row.motherPhoto)
    setFatherPhoto(row.fatherPhoto)
    setStudentPhoto(row.studentPhoto)
    settype("edit")
    validation.setFieldValue("id", row.id)
    setshow(true)
  }

  const handleAdd = () => {
    settype("add")
    setshow(true)
  }
  const handleAddProfile = () => {
    navigate("/student-profile")
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
    const { error } = await supabase.from("Student").delete().eq("id", id)

    if (error) {
      toast.error("Student Deleted Failed", { autoClose: 2000 })
    } else {
      toast.success("Student Deleted", { autoClose: 2000 })
      getStudents()
    }
  }

  const columns = [
    {
      name: "Admission No",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.admissionNo ?? "None",
    },
    {
      name: "Student Name",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.firstName ?? "None",
    },
    {
      name: "Roll No",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.rollNumber ?? "None",
    },
    {
      name: "Class",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.class,
    },
    {
      name: "Section",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.section,
    },
    {
      name: "Father Name",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.fatherName,
    },
    {
      name: "Date of Birth",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.dateOfBirth,
    },
    {
      name: "Gender",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.gender,
    },
    {
      name: "Category",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.category,
    },
    {
      name: "Mobile Number",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.mobileNumber,
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
          <label className="col-form-label">Class</label>&nbsp;
          <div className="col-md-2 me-1">
            <select
              onChange={val => {
                setClass(val.target.value)
                setSectionss(
                  clas.find(el => el.className === val.target.value)?.sections,
                )
              }}
              value={Class}
              className="form-control"
            >
              <option> Select </option>
              {clas?.map(el => (
                <option value={el.className}>{el.className}</option>
              ))}
            </select>
          </div>
          <label className="col-form-label">Section</label>&nbsp;
          <div className="col-md-2 me-1">
            <select
              onChange={val => {
                setSection(val.target.value)
              }}
              value={Section}
              className="form-control"
            >
              <option> Select </option>
              {sectionss?.map(el => (
                <option value={el}>{el}</option>
              ))}
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
              placeholder="Search By Student Name, Roll Number, Enroll Number.."
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
                setSection("")
                setSectionss([])
                setkeyword("")
                setClass("")
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
            Add Student
          </button>
        </div>
      </Row>
      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <CardTitle className="h4"> Students Details </CardTitle>

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
                  <Label htmlFor="useremail">admissionNo</Label>
                  <Input
                    id="admissionNo"
                    name="admissionNo"
                    className="form-control"
                    placeholder="Enter section admissionNo"
                    type="admissionNo"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.admissionNo || ""}
                    invalid={
                      validation.touched.admissionNo &&
                      validation.errors.admissionNo
                        ? true
                        : false
                    }
                  />
                  {validation.touched.admissionNo &&
                  validation.errors.admissionNo ? (
                    <FormFeedback type="invalid">
                      {validation.errors.admissionNo}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col>
                <div className="mb-3">
                  <Label htmlFor="useremail">rollNumber</Label>
                  <Input
                    id="rollNumber"
                    name="rollNumber"
                    className="form-control"
                    placeholder="Enter section rollNumber"
                    type="rollNumber"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.rollNumber || ""}
                    invalid={
                      validation.touched.rollNumber &&
                      validation.errors.rollNumber
                        ? true
                        : false
                    }
                  />
                  {validation.touched.rollNumber &&
                  validation.errors.rollNumber ? (
                    <FormFeedback type="invalid">
                      {validation.errors.rollNumber}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col>
                <div className="mb-3">
                  <Label htmlFor="useremail">Class</Label>
                  <select
                    id="class"
                    name="class"
                    className="form-control"
                    placeholder="Enter  class"
                    type="class"
                    onChange={val => {
                      validation.handleChange(val)
                      setsectModal(
                        clas.find(el => el.className === val.target.value)
                          ?.sections,
                      )
                    }}
                    onBlur={validation.handleBlur}
                    value={validation.values.class || ""}
                    invalid={
                      validation.touched.class && validation.errors.class
                        ? true
                        : false
                    }
                  >
                    <option value={""}>Select</option>
                    {clas?.map(el => (
                      <option value={el.className}>{el.className}</option>
                    ))}
                  </select>

                  {validation.touched.class && validation.errors.class ? (
                    <FormFeedback type="invalid">
                      {validation.errors.class}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="mb-3">
                  <Label htmlFor="useremail">section</Label>
                  <select
                    id="section"
                    name="section"
                    className="form-control"
                    placeholder="Enter section"
                    type="section"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.section || ""}
                    invalid={
                      validation.touched.section && validation.errors.section
                        ? true
                        : false
                    }
                  >
                    <option value={""}>Select</option>
                    {sectModal?.map(el => (
                      <option value={el}>{el}</option>
                    ))}
                  </select>

                  {validation.touched.section && validation.errors.section ? (
                    <FormFeedback type="invalid">
                      {validation.errors.section}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>

              <Col>
                <div className="mb-3">
                  <Label htmlFor="useremail">category</Label>
                  <select
                    id="category"
                    name="category"
                    className="form-control"
                    placeholder="Enter  category"
                    type="category"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.category || ""}
                    invalid={
                      validation.touched.category && validation.errors.category
                        ? true
                        : false
                    }
                  >
                    <option> Select </option>
                    {cat?.map(el => (
                      <option value={el.category}>{el.category}</option>
                    ))}
                  </select>

                  {validation.touched.category && validation.errors.category ? (
                    <FormFeedback type="invalid">
                      {validation.errors.category}
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
                    placeholder="Enter section firstName"
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
            </Row>
            <Row>
              <Col>
                <div className="mb-3">
                  <Label htmlFor="useremail">lastName</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    className="form-control"
                    placeholder="Enter section lastName"
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
                    placeholder="Enter section dateOfBirth"
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
            </Row>
            <Row>
              <Col>
                <div className="mb-3">
                  <Label htmlFor="useremail">religion</Label>
                  <Input
                    id="religion"
                    name="religion"
                    className="form-control"
                    placeholder="Enter section religion"
                    type="religion"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.religion || ""}
                    invalid={
                      validation.touched.religion && validation.errors.religion
                        ? true
                        : false
                    }
                  />
                  {validation.touched.religion && validation.errors.religion ? (
                    <FormFeedback type="invalid">
                      {validation.errors.religion}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col>
                <div className="mb-3">
                  <Label htmlFor="useremail">caste</Label>
                  <Input
                    id="caste"
                    name="caste"
                    className="form-control"
                    placeholder="Enter section caste"
                    type="caste"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.caste || ""}
                    invalid={
                      validation.touched.caste && validation.errors.caste
                        ? true
                        : false
                    }
                  />
                  {validation.touched.caste && validation.errors.caste ? (
                    <FormFeedback type="invalid">
                      {validation.errors.caste}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col>
                <div className="mb-3">
                  <Label htmlFor="useremail">mobileNumber</Label>
                  <Input
                    id="mobileNumber"
                    name="mobileNumber"
                    className="form-control"
                    placeholder="Enter section mobileNumber"
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
            </Row>
            <Row>
              <Col>
                <div className="mb-3">
                  <Label htmlFor="useremail">admissionDate</Label>

                  <input
                    id="admissionDate"
                    name="admissionDate"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.admissionDate || ""}
                    className="form-control"
                    type="date"
                  />
                  {validation.touched.admissionDate &&
                  validation.errors.admissionDate ? (
                    <FormFeedback type="invalid">
                      {validation.errors.admissionDate}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col>
                <div className="mb-3 w-100">
                  <label htmlFor="example-text-input" className="w-100">
                    Student Photo
                  </label>
                  <div className="col-md-5">
                    <input
                      accept="image/png, image/jpeg"
                      onChange={e => uploadImage(e, setStudentPhoto)}
                      className="form-control w-100"
                      type="file"
                    />
                  </div>
                </div>
              </Col>
              <Col>
                <label className="w-100">Blood Group</label>
                <div className="col-md-10">
                  <select
                    id="bloodGroup"
                    name="bloodGroup"
                    className="form-control"
                    placeholder="Enter  bloodGroup"
                    type="bloodGroup"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.bloodGroup || ""}
                    invalid={
                      validation.touched.bloodGroup &&
                      validation.errors.bloodGroup
                        ? true
                        : false
                    }
                  >
                    <option> Select </option>
                    <option>O+</option>
                    <option>A+</option>
                    <option>B+</option>
                    <option>AB+</option>
                  </select>
                  {validation.touched.bloodGroup &&
                  validation.errors.bloodGroup ? (
                    <FormFeedback type="invalid">
                      {validation.errors.bloodGroup}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <label className="w-100">House</label>
                <div className="col-md-10">
                  <select
                    id="house"
                    name="house"
                    className="form-control"
                    placeholder="Enter  house"
                    type="house"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.house || ""}
                    invalid={
                      validation.touched.house && validation.errors.house
                        ? true
                        : false
                    }
                  >
                    <option> Select </option>
                    {houses?.map(el => (
                      <option value={el.name}>{el.name}</option>
                    ))}
                  </select>
                  {validation.touched.house && validation.errors.house ? (
                    <FormFeedback type="invalid">
                      {validation.errors.house}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col>
                <div className="mb-3">
                  <Label htmlFor="useremail">height</Label>
                  <Input
                    id="height"
                    name="height"
                    className="form-control"
                    placeholder="Enter section height"
                    type="height"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.height || ""}
                    invalid={
                      validation.touched.height && validation.errors.height
                        ? true
                        : false
                    }
                  />
                  {validation.touched.height && validation.errors.height ? (
                    <FormFeedback type="invalid">
                      {validation.errors.height}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col>
                <div className="mb-3">
                  <Label htmlFor="useremail">weight</Label>
                  <Input
                    id="weight"
                    name="weight"
                    className="form-control"
                    placeholder="Enter section weight"
                    type="weight"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.weight || ""}
                    invalid={
                      validation.touched.weight && validation.errors.weight
                        ? true
                        : false
                    }
                  />
                  {validation.touched.weight && validation.errors.weight ? (
                    <FormFeedback type="invalid">
                      {validation.errors.weight}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="mb-3">
                  <Label htmlFor="useremail">measurementDate</Label>
                  <Input
                    id="measurementDate"
                    name="measurementDate"
                    className="form-control"
                    placeholder="Enter section measurementDate"
                    type="measurementDate"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.measurementDate || ""}
                    invalid={
                      validation.touched.measurementDate &&
                      validation.errors.measurementDate
                        ? true
                        : false
                    }
                  />
                  {validation.touched.measurementDate &&
                  validation.errors.measurementDate ? (
                    <FormFeedback type="invalid">
                      {validation.errors.measurementDate}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col>
                <div className="mb-3">
                  <Label htmlFor="useremail">medicalHistory</Label>
                  <Input
                    id="medicalHistory"
                    name="medicalHistory"
                    className="form-control"
                    placeholder="Enter section medicalHistory"
                    type="medicalHistory"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.medicalHistory || ""}
                    invalid={
                      validation.touched.medicalHistory &&
                      validation.errors.medicalHistory
                        ? true
                        : false
                    }
                  />
                  {validation.touched.medicalHistory &&
                  validation.errors.medicalHistory ? (
                    <FormFeedback type="invalid">
                      {validation.errors.medicalHistory}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
            </Row>
            <Row>
              <label>Transport Details</label>
              <hr />
              <Col>
                <div className="mb-3">
                  <label className="w-100">Route List</label>
                  <div className="col-md-10">
                    <select
                      id="routeList"
                      name="routeList"
                      className="form-control"
                      placeholder="Enter  routeList"
                      type="routeList"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.routeList || ""}
                      invalid={
                        validation.touched.routeList &&
                        validation.errors.routeList
                          ? true
                          : false
                      }
                    >
                      <option> Select </option>
                      <optgroup label="Brooklyn Central">
                        <option>VH1001</option>
                      </optgroup>
                      <optgroup label="Brooklyn East">
                        <option>VH4584</option>
                        <option>VH1001</option>
                      </optgroup>
                    </select>
                    {validation.touched.routeList &&
                    validation.errors.routeList ? (
                      <FormFeedback type="invalid">
                        {validation.errors.routeList}
                      </FormFeedback>
                    ) : null}
                  </div>
                </div>
              </Col>

              <Col>
                <div className="mb-3">
                  <label className="w-100">Pickup Point</label>
                  <div className="col-md-10">
                    <select
                      id="pickupPoint"
                      name="pickupPoint"
                      className="form-control"
                      placeholder="Enter  pickupPoint"
                      type="pickupPoint"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.pickupPoint || ""}
                      invalid={
                        validation.touched.pickupPoint &&
                        validation.errors.pickupPoint
                          ? true
                          : false
                      }
                    >
                      <option> Select </option>
                      <option> Pickup Point 1 </option>
                      <option> Pickup Point 2</option>
                    </select>
                    {validation.touched.pickupPoint &&
                    validation.errors.pickupPoint ? (
                      <FormFeedback type="invalid">
                        {validation.errors.pickupPoint}
                      </FormFeedback>
                    ) : null}
                  </div>
                </div>
              </Col>
              <Col>
                <div className="mb-3">
                  <label className="w-100">Fees Month</label>
                  <div className="col-md-10">
                    <select
                      id="feesMonth"
                      name="feesMonth"
                      className="form-control"
                      placeholder="Enter  feesMonth"
                      type="feesMonth"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.feesMonth || ""}
                      invalid={
                        validation.touched.feesMonth &&
                        validation.errors.feesMonth
                          ? true
                          : false
                      }
                    >
                      <option> Select </option>
                      <option>April</option>
                      <option>May</option>
                      <option>June</option>
                      <option>July</option>
                    </select>
                    {validation.touched.feesMonth &&
                    validation.errors.feesMonth ? (
                      <FormFeedback type="invalid">
                        {validation.errors.feesMonth}
                      </FormFeedback>
                    ) : null}
                  </div>
                </div>
              </Col>
            </Row>
            <label>Hostel Details</label>
            <hr />
            <Row>
              <Col>
                <div className="mb-3">
                  <label className="w-100">Hostel</label>
                  <div className="col-md-10">
                    <select
                      id="hostel"
                      name="hostel"
                      className="form-control"
                      placeholder="Enter  hostel"
                      type="hostel"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.hostel || ""}
                      invalid={
                        validation.touched.hostel && validation.errors.hostel
                          ? true
                          : false
                      }
                    >
                      <option> Select </option>
                      <option>Boys Hostel 101</option>
                      <option>Boys Hostel 102</option>
                      <option>Girls Hostel 103</option>
                      <option>Girls Hostel 104</option>
                    </select>
                    {validation.touched.hostel && validation.errors.hostel ? (
                      <FormFeedback type="invalid">
                        {validation.errors.hostel}
                      </FormFeedback>
                    ) : null}
                  </div>
                </div>
              </Col>

              <Col>
                <div className="mb-3">
                  <label className="w-100">Room No.</label>
                  <div className="col-md-10">
                    <select
                      id="roomNo"
                      name="roomNo"
                      className="form-control"
                      placeholder="Enter roomNo"
                      type="roomNo"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.roomNo || ""}
                      invalid={
                        validation.touched.roomNo && validation.errors.roomNo
                          ? true
                          : false
                      }
                    >
                      <option> Select </option>
                      <option>B1 (One Bed)</option>
                      <option>B3 (One Bed)</option>
                      <option>B4 (One Bed)</option>
                    </select>
                    {validation.touched.roomNo && validation.errors.roomNo ? (
                      <FormFeedback type="invalid">
                        {validation.errors.roomNo}
                      </FormFeedback>
                    ) : null}
                  </div>
                </div>
              </Col>
            </Row>
            <label>Parent Guardian Detail</label>
            <hr />
            <Row>
              <Col>
                <div className="mb-3">
                  <Label htmlFor="useremail">Father Name</Label>
                  <Input
                    id="fatherName"
                    name="fatherName"
                    className="form-control"
                    placeholder="Enter section fatherName"
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
                  <Label htmlFor="useremail">Father Phone</Label>
                  <Input
                    id="fatherPhone"
                    name="fatherPhone"
                    className="form-control"
                    placeholder="Enter section fatherPhone"
                    type="fatherPhone"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.fatherPhone || ""}
                    invalid={
                      validation.touched.fatherPhone &&
                      validation.errors.fatherPhone
                        ? true
                        : false
                    }
                  />
                  {validation.touched.fatherPhone &&
                  validation.errors.fatherPhone ? (
                    <FormFeedback type="invalid">
                      {validation.errors.fatherPhone}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="mb-3">
                  <Label htmlFor="useremail">Father Occupation</Label>
                  <Input
                    id="fatherOccupation"
                    name="fatherOccupation"
                    className="form-control"
                    placeholder="Enter section fatherOccupation"
                    type="fatherOccupation"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.fatherOccupation || ""}
                    invalid={
                      validation.touched.fatherOccupation &&
                      validation.errors.fatherOccupation
                        ? true
                        : false
                    }
                  />
                  {validation.touched.fatherOccupation &&
                  validation.errors.fatherOccupation ? (
                    <FormFeedback type="invalid">
                      {validation.errors.fatherOccupation}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col>
                <div className="mb-3">
                  <label htmlFor="example-text-input" className="w-100">
                    Father Photo
                  </label>
                  <div className="col-md-10">
                    <input
                      onChange={e => uploadImage(e, setFatherPhoto)}
                      className="form-control"
                      type="file"
                    />
                  </div>
                </div>
              </Col>
              <Col>
                <div className="mb-3">
                  <Label htmlFor="useremail">Mother Name</Label>
                  <Input
                    id="motherName"
                    name="motherName"
                    className="form-control"
                    placeholder="Enter section motherName"
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
            </Row>
            <Row>
              <Col>
                <div className="mb-3">
                  <Label htmlFor="useremail">Mother Phone</Label>
                  <Input
                    id="motherPhone"
                    name="motherPhone"
                    className="form-control"
                    placeholder="Enter section motherPhone"
                    type="motherPhone"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.motherPhone || ""}
                    invalid={
                      validation.touched.motherPhone &&
                      validation.errors.motherPhone
                        ? true
                        : false
                    }
                  />
                  {validation.touched.motherPhone &&
                  validation.errors.motherPhone ? (
                    <FormFeedback type="invalid">
                      {validation.errors.motherPhone}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col>
                <div className="mb-3">
                  <Label htmlFor="useremail">Mother Occupation</Label>
                  <Input
                    id="motherOccupation"
                    name="motherOccupation"
                    className="form-control"
                    placeholder="Enter section motherOccupation"
                    type="motherOccupation"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.motherOccupation || ""}
                    invalid={
                      validation.touched.motherOccupation &&
                      validation.errors.motherOccupation
                        ? true
                        : false
                    }
                  />
                  {validation.touched.motherOccupation &&
                  validation.errors.motherOccupation ? (
                    <FormFeedback type="invalid">
                      {validation.errors.motherOccupation}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col>
                <div className="mb-3">
                  <label htmlFor="example-text-input" className="w-100">
                    Mother Photo
                  </label>
                  <div className="col-md-10">
                    <input
                      onChange={e => uploadImage(e, setMotherPhoto)}
                      className="form-control"
                      type="file"
                    />
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="mb-3">
                  <label>If Guardian Is</label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="exampleRadios"
                      id="exampleRadios2"
                      checked={IfGuardianIs === "Father"}
                      onClick={val => {
                        if (IfGuardianIs !== "Father") {
                          setIfGuardianIs("Father")
                        }
                      }}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="exampleRadios2"
                    >
                      Father
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="exampleRadios"
                      id="exampleRadios2"
                      checked={IfGuardianIs === "Mother"}
                      onClick={val => {
                        if (IfGuardianIs !== "Mother") {
                          setIfGuardianIs("Mother")
                        }
                      }}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="exampleRadios2"
                    >
                      Mother
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="exampleRadios"
                      id="exampleRadios2"
                      checked={IfGuardianIs === "Other"}
                      onClick={val => {
                        if (IfGuardianIs !== "Other") {
                          setIfGuardianIs("Other")
                        }
                      }}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="exampleRadios2"
                    >
                      Other
                    </label>
                  </div>
                </div>
              </Col>
              <Col>
                <div className="mb-3">
                  <Label htmlFor="useremail">Guardian Name</Label>
                  <Input
                    id="guardianName"
                    name="guardianName"
                    className="form-control"
                    placeholder="Enter section guardianName"
                    type="guardianName"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.guardianName || ""}
                    invalid={
                      validation.touched.guardianName &&
                      validation.errors.guardianName
                        ? true
                        : false
                    }
                  />
                  {validation.touched.guardianName &&
                  validation.errors.guardianName ? (
                    <FormFeedback type="invalid">
                      {validation.errors.guardianName}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col>
                <div className="mb-3">
                  <Label htmlFor="useremail"> Guardian Relation</Label>
                  <Input
                    id="guardianRelation"
                    name="guardianRelation"
                    className="form-control"
                    placeholder="Enter section guardianRelation"
                    type="guardianRelation"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.guardianRelation || ""}
                    invalid={
                      validation.touched.guardianRelation &&
                      validation.errors.guardianRelation
                        ? true
                        : false
                    }
                  />
                  {validation.touched.guardianRelation &&
                  validation.errors.guardianRelation ? (
                    <FormFeedback type="invalid">
                      {validation.errors.guardianRelation}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="mb-3">
                  <Label htmlFor="useremail">Guardian Email</Label>
                  <Input
                    id="guardianEmail"
                    name="guardianEmail"
                    className="form-control"
                    placeholder="Enter section guardianEmail"
                    type="guardianEmail"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.guardianEmail || ""}
                    invalid={
                      validation.touched.guardianEmail &&
                      validation.errors.guardianEmail
                        ? true
                        : false
                    }
                  />
                  {validation.touched.guardianEmail &&
                  validation.errors.guardianEmail ? (
                    <FormFeedback type="invalid">
                      {validation.errors.guardianEmail}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col>
                <div className="mb-3">
                  <label htmlFor="example-text-input" className="w-100">
                    Guardian Photo
                  </label>
                  <div className="col-md-10">
                    <input
                      onChange={e => uploadImage(e, setGuardianPhoto)}
                      className="form-control"
                      type="file"
                    />
                  </div>
                </div>
              </Col>
              <Col>
                <div className="mb-3">
                  <Label htmlFor="useremail">Guardian Occupation</Label>
                  <Input
                    id="guardianOccupation"
                    name="guardianOccupation"
                    className="form-control"
                    placeholder="Enter section guardianOccupation"
                    type="guardianOccupation"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.guardianOccupation || ""}
                    invalid={
                      validation.touched.guardianOccupation &&
                      validation.errors.guardianOccupation
                        ? true
                        : false
                    }
                  />
                  {validation.touched.guardianOccupation &&
                  validation.errors.guardianOccupation ? (
                    <FormFeedback type="invalid">
                      {validation.errors.guardianOccupation}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="mb-3">
                  <Label htmlFor="useremail">Guardian Address</Label>
                  <Input
                    id="guardianAddress"
                    name="guardianAddress"
                    className="form-control"
                    placeholder="Enter section guardianAddress"
                    type="guardianAddress"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.guardianAddress || ""}
                    invalid={
                      validation.touched.guardianAddress &&
                      validation.errors.guardianAddress
                        ? true
                        : false
                    }
                  />
                  {validation.touched.guardianAddress &&
                  validation.errors.guardianAddress ? (
                    <FormFeedback type="invalid">
                      {validation.errors.guardianAddress}
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

export default connect(null, { setBreadcrumbItems })(StudentDetailsSuper)
