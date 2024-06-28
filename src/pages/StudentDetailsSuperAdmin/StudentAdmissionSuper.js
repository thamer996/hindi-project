import React, { useEffect, useState } from "react"

import {
  Card,
  CardBody,
  Col,
  Row,
  CardTitle,
  FormGroup,
  Form,
} from "reactstrap"

import { connect } from "react-redux"

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"
import HeaderTeacher from "../../components/HorizontalLayoutTeacher/HeaderTeacher"
import NvbarTeacher from "../../components/HorizontalLayoutTeacher/NvbarTeacher"
import { v4 as uuidv4 } from "uuid"
import { createClient } from "@supabase/supabase-js"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { isEmpty } from "lodash"

const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)

const StudentAdmissionSuper = props => {
  document.title =
    "Form Elements | Lexa - Responsive Bootstrap 5 Admin Dashboard"

  const breadcrumbItems = [
    { title: "Smart school", link: "#" },
    { title: "Student Details", link: "#" },
  ]
  const [clas, setClas] = useState([])
  const [sectionss, setSectionss] = useState([])
  const [cat, setcat] = useState([])
  const [houses, sethouses] = useState([])

  async function getClass() {
    const { data, error } = await supabase.from("Class").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    setClas(data ?? [])
  }

  async function getSections() {
    const { data, error } = await supabase.from("Section").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    setSectionss(data ?? [])
  }
  async function getCategorys() {
    const { data, error } = await supabase.from("Category").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    setcat(data ?? [])
  }
  async function getHouse() {
    const { data, error } = await supabase.from("House").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    sethouses(data ?? [])
  }

  useEffect(() => {
    props.setBreadcrumbItems("Student Admission", breadcrumbItems)
    getClass()
    getSections()
    getCategorys()
    getHouse()
  }, [])

  const [AdmissionNo, setAdmissionNo] = useState("")
  const [RollNumber, setRollNumber] = useState("")
  const [Class, setClass] = useState("")
  const [Section, setSection] = useState("")
  const [FirstName, setFirstName] = useState("")
  const [LastName, setLastName] = useState("")
  const [Gender, setGender] = useState("")
  const [DateOfBirth, setDateOfBirth] = useState("")
  const [Category, setCategory] = useState("")
  const [Religion, setReligion] = useState("")
  const [Caste, setCaste] = useState("")
  const [MobileNumber, setMobileNumber] = useState("")
  const [AdmissionDate, setAdmissionDate] = useState("")
  const [StudentPhoto, setStudentPhoto] = useState("")
  const [BloodGroup, setBloodGroup] = useState("")
  const [House, setHouse] = useState("")
  const [Height, setHeight] = useState("")
  const [Weight, setWeight] = useState("")
  const [MeasurementDate, setMeasurementDate] = useState("")
  const [MedicalHistory, setMedicalHistory] = useState("")
  const [RouteList, setRouteList] = useState("")
  const [PickupPoint, setPickupPoint] = useState("")
  const [FeesMonth, setFeesMonth] = useState("")
  const [Hostel, setHostel] = useState("")
  const [RoomNo, setRoomNo] = useState("")
  const [FatherName, setFatherName] = useState("")
  const [FatherPhone, setFatherPhone] = useState("")
  const [FatherOccupation, setFatherOccupation] = useState("")
  const [FatherPhoto, setFatherPhoto] = useState("")
  const [MotherName, setMotherName] = useState("")
  const [MotherPhone, setMotherPhone] = useState("")
  const [MotherOccupation, setMotherOccupation] = useState("")
  const [MotherPhoto, setMotherPhoto] = useState("")
  const [IfGuardianIs, setIfGuardianIs] = useState("")
  const [GuardianName, setGuardianName] = useState("")
  const [GuardianRelation, setGuardianRelation] = useState("")
  const [GuardianEmail, setGuardianEmail] = useState("")
  const [GuardianPhoto, setGuardianPhoto] = useState("")
  const [GuardianOccupation, setGuardianOccupation] = useState("")
  const [GuardianAddress, setGuardianAddress] = useState("")

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

  const handleSubmit = async () => {
    if (
      !isEmpty(AdmissionNo) &&
      !isEmpty(RollNumber) &&
      !isEmpty(Class) &&
      !isEmpty(Section) &&
      !isEmpty(FirstName) &&
      !isEmpty(LastName) &&
      !isEmpty(Gender) &&
      !isEmpty(DateOfBirth) &&
      !isEmpty(Category) &&
      !isEmpty(Religion) &&
      !isEmpty(Caste) &&
      !isEmpty(MobileNumber) &&
      !isEmpty(AdmissionDate) &&
      !isEmpty(StudentPhoto) &&
      !isEmpty(BloodGroup) &&
      !isEmpty(House) &&
      !isEmpty(Height) &&
      !isEmpty(Weight) &&
      !isEmpty(MeasurementDate) &&
      !isEmpty(MedicalHistory) &&
      !isEmpty(RouteList) &&
      !isEmpty(PickupPoint) &&
      !isEmpty(FeesMonth) &&
      !isEmpty(Hostel) &&
      !isEmpty(RoomNo) &&
      !isEmpty(FatherName) &&
      !isEmpty(FatherPhone) &&
      !isEmpty(FatherOccupation) &&
      !isEmpty(FatherPhoto) &&
      !isEmpty(MotherName) &&
      !isEmpty(MotherPhone) &&
      !isEmpty(MotherOccupation) &&
      !isEmpty(MotherPhoto) &&
      !isEmpty(IfGuardianIs) &&
      !isEmpty(GuardianName) &&
      !isEmpty(GuardianRelation) &&
      !isEmpty(GuardianEmail) &&
      !isEmpty(GuardianPhoto) &&
      !isEmpty(GuardianOccupation) &&
      !isEmpty(GuardianAddress)
    ) {
      const { data, error } = await supabase
        .from("Student")
        .insert([
          {
            admissionNo: AdmissionNo,
            rollNumber: RollNumber,
            class: Class,
            section: Section,
            firstName: FirstName,
            lastName: LastName,
            gender: Gender,
            dateOfBirth: DateOfBirth,
            category: Category,
            religion: Religion,
            caste: Caste,
            mobileNumber: MobileNumber,
            admissionDate: AdmissionDate,
            studentPhoto: StudentPhoto,
            bloodGroup: BloodGroup,
            house: House,
            height: Height,
            weight: Weight,
            measurementDate: MeasurementDate,
            medicalHistory: MedicalHistory,
            routeList: RouteList,
            pickupPoint: PickupPoint,
            feesMonth: FeesMonth,
            hostel: Hostel,
            roomNo: RoomNo,
            fatherName: FatherName,
            fatherPhone: FatherPhone,
            fatherOccupation: FatherOccupation,
            fatherPhoto: FatherPhoto,
            motherName: MotherName,
            motherPhone: MotherPhone,
            motherOccupation: MotherOccupation,
            motherPhoto: MotherPhoto,
            ifGuardianIs: IfGuardianIs,
            guardianName: GuardianName,
            guardianRelation: GuardianRelation,
            guardianEmail: GuardianEmail,
            guardianPhoto: GuardianPhoto,
            guardianOccupation: GuardianOccupation,
            guardianAddress: GuardianAddress,
          },
        ])
        .select()

      if (error) {
        toast.error("Student Inserted Failed", { autoClose: 2000 })
      } else {
        toast.success("Student Inserted", { autoClose: 2000 })
        setAdmissionNo("")
        setRollNumber("")
        setClass("")
        setSection("")
        setFirstName("")
        setLastName("")
        setGender("")
        setDateOfBirth("")
        setCategory("")
        setReligion("")
        setCaste("")
        setMobileNumber("")
        setAdmissionDate("")
        setStudentPhoto("")
        setBloodGroup("")
        setHouse("")
        setHeight("")
        setWeight("")
        setMeasurementDate("")
        setMedicalHistory("")
        setRouteList("")
        setPickupPoint("")
        setFeesMonth("")
        setHostel("")
        setRoomNo("")
        setFatherName("")
        setFatherPhone("")
        setFatherOccupation("")
        setFatherPhoto("")
        setMotherName("")
        setMotherPhone("")
        setMotherOccupation("")
        setMotherPhoto("")
        setIfGuardianIs("")
        setGuardianName("")
        setGuardianRelation("")
        setGuardianEmail("")
        setGuardianPhoto("")
        setGuardianOccupation("")
        setGuardianAddress("")
      }
    } else {
      toast.error("All fields required", { autoClose: 2000 })
    }
  }

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <CardBody>
              {/*<CardTitle className="h4">Textual inputs</CardTitle>
            <p className="card-title-desc">
              Here are examples of <code>.form-control</code> applied to
                  each textual HTML5 <code>&lt;input&gt;</code>{" "}
              <code>type</code>.
</p>*/}
              <Row className="mb-3">
                <label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label"
                >
                  Admission No
                </label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    onChange={val => {
                      setAdmissionNo(val.target.value)
                    }}
                    value={AdmissionNo}
                    type="text"
                  />
                </div>
              </Row>
              <Row className="mb-3">
                <label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label"
                >
                  Roll Number
                </label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    onChange={val => {
                      setRollNumber(val.target.value)
                    }}
                    value={RollNumber}
                    type="text"
                  />
                </div>
              </Row>

              <Row className="mb-3">
                <label className="col-md-2 col-form-label">Class</label>
                <div className="col-md-10">
                  <select
                    onChange={val => {
                      setClass(val.target.value)
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
              </Row>

              <Row className="mb-3">
                <label className="col-md-2 col-form-label">Section</label>
                <div className="col-md-10">
                  <select
                    onChange={val => {
                      setSection(val.target.value)
                    }}
                    value={Section}
                    className="form-control"
                  >
                    <option> Select </option>
                    {sectionss?.map(el => (
                      <option value={el.sectionName}>{el.sectionName}</option>
                    ))}
                  </select> 
                </div>
              </Row>

              <Row className="mb-3">
                <label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label"
                >
                  First Name
                </label>
                <div className="col-md-10">
                  <input
                    onChange={val => {
                      setFirstName(val.target.value)
                    }}
                    value={FirstName}
                    className="form-control"
                    type="text"
                  />
                </div>
              </Row>
              <Row className="mb-3">
                <label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label"
                >
                  Last Name
                </label>
                <div className="col-md-10">
                  <input
                    onChange={val => {
                      setLastName(val.target.value)
                    }}
                    value={LastName}
                    className="form-control"
                    type="text"
                  />
                </div>
              </Row>

              <Row className="mb-3">
                <label className="col-md-2 col-form-label">Gender</label>
                <div className="col-md-10">
                  <select
                    onChange={val => {
                      setGender(val.target.value)
                    }}
                    value={Gender}
                    className="form-control"
                  >
                    <option> Select </option>
                    <option>Male</option>
                    <option>Female</option>
                  </select> 
                </div>
              </Row>

              <Row className="mb-3">
                <label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label"
                >
                  Date Of Birth
                </label>
                <div className="col-md-10">
                  <input
                    onChange={val => {
                      setDateOfBirth(val.target.value)
                    }}
                    value={DateOfBirth}
                    className="form-control"
                    type="text"
                  />
                </div>
              </Row>
              <Row className="mb-3">
                <label className="col-md-2 col-form-label">Category</label>
                <div className="col-md-10">
                  <select
                    onChange={val => {
                      setCategory(val.target.value)
                    }}
                    value={Category}
                    className="form-control"
                  >
                    <option> Select </option>
                    {cat?.map(el => (
                      <option value={el.category}>{el.category}</option>
                    ))}
                  </select> 
                </div>
              </Row>
              <Row className="mb-3">
                <label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label"
                >
                  Religion
                </label>
                <div className="col-md-10">
                  <input
                    onChange={val => {
                      setReligion(val.target.value)
                    }}
                    value={Religion}
                    className="form-control"
                    type="text"
                  />
                </div>
              </Row>
              <Row className="mb-3">
                <label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label"
                >
                  Caste
                </label>
                <div className="col-md-10">
                  <input
                    onChange={val => {
                      setCaste(val.target.value)
                    }}
                    value={Caste}
                    className="form-control"
                    type="text"
                  />
                </div>
              </Row>

              <Row className="mb-3">
                <label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label"
                >
                  Mobile Number
                </label>
                <div className="col-md-10">
                  <input
                    onChange={val => {
                      setMobileNumber(val.target.value)
                    }}
                    value={MobileNumber}
                    className="form-control"
                    type="text"
                  />
                </div>
              </Row>

              <Row className="mb-3">
                <label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label"
                >
                  Admission Date
                </label>
                <div className="col-md-10">
                  <input
                    onChange={val => {
                      setAdmissionDate(val.target.value)
                    }}
                    value={AdmissionDate}
                    className="form-control"
                    type="date"
                  />
                </div>
              </Row>
              <Row className="mb-3">
                <label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label"
                >
                  Student Photo
                </label>
                <div className="col-md-5">
                  <input
                    accept="image/png, image/jpeg"
                    onChange={e => uploadImage(e, setStudentPhoto)}
                    className="form-control"
                    type="file"
                  />
                </div>
              </Row>

              <Row className="mb-3">
                <label className="col-md-2 col-form-label">Blood Group</label>
                <div className="col-md-10">
                  <select
                    onChange={val => {
                      setBloodGroup(val.target.value)
                    }}
                    value={BloodGroup}
                    className="form-control"
                  >
                    <option> Select </option>
                    <option>O+</option>
                    <option>A+</option>
                    <option>B+</option>
                    <option>AB+</option>
                  </select> 
                </div>
              </Row>
              <Row className="mb-3">
                <label className="col-md-2 col-form-label">House</label>
                <div className="col-md-10">
                  <select
                    onChange={val => {
                      setHouse(val.target.value)
                    }}
                    value={House}
                    className="form-control"
                  >
                    <option> Select </option>
                    {houses?.map(el => (
                      <option value={el.name}>{el.name}</option>
                    ))}
                  </select> 
                </div>
              </Row>
              <Row className="mb-3">
                <label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label"
                >
                  Height
                </label>
                <div className="col-md-10">
                  <input
                    onChange={val => {
                      setHeight(val.target.value)
                    }}
                    value={Height}
                    className="form-control"
                    type="text"
                  />
                </div>
              </Row>
              <Row className="mb-3">
                <label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label"
                >
                  Weight
                </label>
                <div className="col-md-10">
                  <input
                    onChange={val => {
                      setWeight(val.target.value)
                    }}
                    value={Weight}
                    className="form-control"
                    type="text"
                  />
                </div>
              </Row>
              <Row className="mb-3">
                <label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label"
                >
                  Measurement Date
                </label>
                <div className="col-md-10">
                  <input
                    onChange={val => {
                      setMeasurementDate(val.target.value)
                    }}
                    value={MeasurementDate}
                    className="form-control"
                    type="date"
                  />
                </div>
              </Row>
              <Row className="mb-3">
                <label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label"
                >
                  Medical History
                </label>
                <div className="col-md-10">
                  <input
                    onChange={val => {
                      setMedicalHistory(val.target.value)
                    }}
                    value={MedicalHistory}
                    className="form-control"
                    type="text"
                  />
                </div>
              </Row>

              <label>Transport Details</label>
              <Row className="mb-3">
                <label className="col-md-2 col-form-label">Route List</label>
                <div className="col-md-10">
                  <select
                    onChange={val => {
                      setRouteList(val.target.value)
                    }}
                    value={RouteList}
                    className="form-control"
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
                </div>
              </Row>
              <Row className="mb-3">
                <label className="col-md-2 col-form-label"> Pickup Point</label>
                <div className="col-md-10">
                  <select
                    onChange={val => {
                      setPickupPoint(val.target.value)
                    }}
                    value={PickupPoint}
                    className="form-control"
                  >
                    <option> Select </option>
                    <option> Pickup Point 1 </option>
                    <option> Pickup Point 2</option>
                  </select> 
                </div>
              </Row>
              <Row className="mb-3">
                <label className="col-md-2 col-form-label">Fees Month</label>
                <div className="col-md-10">
                  <select
                    onChange={val => {
                      setFeesMonth(val.target.value)
                    }}
                    value={FeesMonth}
                    className="form-control"
                  >
                    <option> Select </option>
                    <option>April</option>
                    <option>May</option>
                    <option>June</option>
                    <option>July</option>
                  </select> 
                </div>
              </Row>
              <label>Hostel Details</label>
              <Row className="mb-3">
                <label className="col-md-2 col-form-label">Hostel</label>
                <div className="col-md-10">
                  <select
                    onChange={val => {
                      setHostel(val.target.value)
                    }}
                    value={Hostel}
                    className="form-control"
                  >
                    <option> Select </option>
                    <option>Boys Hostel 101</option>
                    <option>Boys Hostel 102</option>
                    <option>Girls Hostel 103</option>
                    <option>Girls Hostel 104</option>
                  </select> 
                </div>
              </Row>
              <Row className="mb-3">
                <label className="col-md-2 col-form-label">Room No.</label>
                <div className="col-md-10">
                  <select
                    onChange={val => {
                      setRoomNo(val.target.value)
                    }}
                    value={RoomNo}
                    className="form-control"
                  >
                    <option> Select </option>
                    <option>B1 (One Bed)</option>
                    <option>B3 (One Bed)</option>
                    <option>B4 (One Bed)</option>
                  </select> 
                </div>
              </Row>
              <label>Fees Details</label>
              <label>Parent Guardian Detail</label>
              <Row className="mb-3">
                <label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label"
                >
                  Father Name
                </label>
                <div className="col-md-10">
                  <input
                    onChange={val => {
                      setFatherName(val.target.value)
                    }}
                    value={FatherName}
                    className="form-control"
                    type="text"
                  />
                </div>
              </Row>
              <Row className="mb-3">
                <label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label"
                >
                  Father Phone
                </label>
                <div className="col-md-10">
                  <input
                    onChange={val => {
                      setFatherPhone(val.target.value)
                    }}
                    value={FatherPhone}
                    className="form-control"
                    type="text"
                  />
                </div>
              </Row>
              <Row className="mb-3">
                <label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label"
                >
                  Father Occupation
                </label>
                <div className="col-md-10">
                  <input
                    onChange={val => {
                      setFatherOccupation(val.target.value)
                    }}
                    value={FatherOccupation}
                    className="form-control"
                    type="text"
                  />
                </div>
              </Row>
              <Row className="mb-3">
                <label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label"
                >
                  Father Photo
                </label>
                <div className="col-md-10">
                  <input
                    onChange={e => uploadImage(e, setFatherPhoto)}
                    className="form-control"
                    type="file"
                  />
                </div>
              </Row>
              <Row className="mb-3">
                <label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label"
                >
                  Mother Name
                </label>
                <div className="col-md-10">
                  <input
                    onChange={val => {
                      setMotherName(val.target.value)
                    }}
                    value={MotherName}
                    className="form-control"
                    type="text"
                  />
                </div>
              </Row>
              <Row className="mb-3">
                <label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label"
                >
                  Mother Phone
                </label>
                <div className="col-md-10">
                  <input
                    onChange={val => {
                      setMotherPhone(val.target.value)
                    }}
                    value={MotherPhone}
                    className="form-control"
                    type="text"
                  />
                </div>
              </Row>
              <Row className="mb-3">
                <label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label"
                >
                  Mother Occupation
                </label>
                <div className="col-md-10">
                  <input
                    onChange={val => {
                      setMotherOccupation(val.target.value)
                    }}
                    value={MotherOccupation}
                    className="form-control"
                    type="text"
                  />
                </div>
              </Row>
              <Row className="mb-3">
                <label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label"
                >
                  Mother Photo
                </label>
                <div className="col-md-10">
                  <input
                    onChange={e => uploadImage(e, setMotherPhoto)}
                    className="form-control"
                    type="file"
                  />
                </div>
              </Row>

              <label>If Guardian Is</label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="exampleRadios"
                  id="exampleRadios2"
                  value="Father"
                  onChange={val => {
                    if (val.target.checked) {
                      setIfGuardianIs("Father")
                    }
                  }}
                />
                <label className="form-check-label" htmlFor="exampleRadios2">
                  Father
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="exampleRadios"
                  id="exampleRadios2"
                  value="Mother"
                  onChange={val => {
                    if (val.target.checked) {
                      setIfGuardianIs("Mother")
                    }
                  }}
                />
                <label className="form-check-label" htmlFor="exampleRadios2">
                  Mother
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="exampleRadios"
                  id="exampleRadios2"
                  value="Other"
                  onChange={val => {
                    if (val.target.checked) {
                      setIfGuardianIs("Other")
                    }
                  }}
                />
                <label className="form-check-label" htmlFor="exampleRadios2">
                  Other
                </label>
              </div>
              <Row className="mb-3">
                <label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label"
                >
                  Guardian Name
                </label>
                <div className="col-md-10">
                  <input
                    onChange={val => {
                      setGuardianName(val.target.value)
                    }}
                    value={GuardianName}
                    className="form-control"
                    type="text"
                  />
                </div>
              </Row>
              <Row className="mb-3">
                <label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label"
                >
                  Guardian Relation
                </label>
                <div className="col-md-10">
                  <input
                    onChange={val => {
                      setGuardianRelation(val.target.value)
                    }}
                    value={GuardianRelation}
                    className="form-control"
                    type="text"
                  />
                </div>
              </Row>
              <Row className="mb-3">
                <label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label"
                >
                  Guardian Email
                </label>
                <div className="col-md-10">
                  <input
                    onChange={val => {
                      setGuardianEmail(val.target.value)
                    }}
                    value={GuardianEmail}
                    className="form-control"
                    type="text"
                  />
                </div>
              </Row>
              <Row className="mb-3">
                <label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label"
                >
                  Guardian Photo
                </label>
                <div className="col-md-10">
                  <input
                    onChange={e => uploadImage(e, setGuardianPhoto)}
                    className="form-control"
                    type="file"
                  />
                </div>
              </Row>

              <Row className="mb-3">
                <label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label"
                >
                  Guardian Occupation
                </label>
                <div className="col-md-10">
                  <input
                    onChange={val => {
                      setGuardianOccupation(val.target.value)
                    }}
                    value={GuardianOccupation}
                    className="form-control"
                    type="text"
                  />
                </div>
              </Row>
              <Row className="mb-3">
                <label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label"
                >
                  Guardian Address
                </label>
                <div className="col-md-10">
                  <input
                    onChange={val => {
                      setGuardianAddress(val.target.value)
                    }}
                    value={GuardianAddress}
                    className="form-control"
                    type="text"
                  />
                </div>
              </Row>

              <Row></Row>
            </CardBody>
            <div className="d-flex justify-content-center mt-3 mb-3">
              {" "}
              {/* mt-3 adds margin top, mb-3 adds margin bottom */}
              <button onClick={handleSubmit} className="btn btn-primary w-md">
                Submit
              </button>
            </div>
          </Card>
        </Col>
      </Row>
      <ToastContainer />
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(StudentAdmissionSuper)
