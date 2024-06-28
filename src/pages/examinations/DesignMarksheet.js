import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import DataTable from "react-data-table-component"
import { createClient } from "@supabase/supabase-js"

import {
  Table,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Button,
  ModalBody,
  Modal,
  Label,
  Input,
  FormFeedback,
  Form,
} from "reactstrap"

import { connect } from "react-redux"

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useFormik } from "formik"
import * as Yup from "yup"
import { v4 as uuidv4 } from "uuid"

const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)

const DesignMarksheet = props => {
  document.title =
    "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard"

  const breadcrumbItems = [
    { title: "Smart school", link: "#" },
    { title: "Academics", link: "#" },
  ]

  const [section, setSection] = useState([])
  const [show, setshow] = useState(false)
  const [type, settype] = useState("new")
  const [search, setSearch] = useState("")

  const [leftLogo, setleftLogo] = useState("")
  const [headerImage, setheaderImage] = useState("")
  const [leftSign, setleftSign] = useState("")
  const [middleSign, setmiddleSign] = useState("")
  const [rightSign, setrightSign] = useState("")

  const [rightLogo, setrightLogo] = useState("")
  const [sign, setsign] = useState("")
  const [background, setbackground] = useState("")

  const [name, setname] = useState(null)
  const [fatherName, setfatherName] = useState(null)
  const [motherName, setmotherName] = useState(null)
  const [examSession, setexamSession] = useState(null)
  const [division, setdivision] = useState(null)
  const [rank, setrank] = useState(null)
  const [remark, setremark] = useState(null)
  const [dateOfBirth, setdateOfBirth] = useState(null)
  const [admissionNo, setadmissionNo] = useState(null)
  const [rollNumber, setrollNumber] = useState(null)
  const [gender, setgender] = useState(null)
  const [photo, setphoto] = useState(null)
  const [cl, setcl] = useState(null)
  const [sections, setsections] = useState(null)

  async function getCountries() {
    const { data, error } = await supabase.from("Marksheet").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    setSection(data ?? [])
  }

  async function uploadDoc(e, setstate) {
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

      console.log("eeeeeeeeeeeeeeeee", data?.path)
      setstate(data?.path)
    } else {
      console.log("eeeeeeeeeeeeeeeee", error)
      console.log(error)
    }
  }

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      template: "",
      examName: "",
      schoolName: "",
      examCenter: "",
      bodyText: "",
      footerText: "",
      printingDate: "",

      headerImage: "",
      leftLogo: "",
      rightLogo: "",
      leftSign: "",
      middleSign: "",
      rightSign: "",
      backgroundImage: "",

      name: null,
      fatherName: null,
      motherName: null,
      examSession: null,
      division: null,
      rank: null,
      remark: null,
      dateOfBirth: null,
      admissionNo: null,
      rollNumber: null,
      gender: null,
      photo: null,
      class: null,
      section: null,

      id: "",
    },

    validationSchema: Yup.object({}),
    onSubmit: async values => {
      console.log("eddqsqdds", typeof values.name, values.name)
      if (type === "new") {
        const { data, error } = await supabase
          .from("Marksheet")
          .insert([
            { brancheId: localStorage.getItem("BranchId") ?? 1,
              template: values.template,
              examName: values.examName,
              schoolName: values.schoolName,
              examCenter: values.examCenter,
              bodyText: values.bodyText,
              footerText: values.footerText,
              printingDate: values.printingDate,

              headerImage: headerImage,
              leftLogo: leftLogo,
              rightLogo: rightLogo,
              leftSign: leftSign,
              middleSign: middleSign,
              rightSign: rightSign,
              backgroundImage: background,

              name: name,
              fatherName: fatherName,
              motherName: motherName,
              examSession: examSession,
              division: division,
              rank: rank,
              remark: remark,
              dateOfBirth: dateOfBirth,
              admissionNo: admissionNo,
              rollNumber: rollNumber,
              photo: photo,
              class: cl,
              section: sections,
            },
          ])
          .select()

        if (error) {
          console.log("ez", error)
          toast.error("Marksheet Inserted Failed", { autoClose: 2000 })
        } else {
          toast.success("Marksheet Inserted", { autoClose: 2000 })
          setshow(false)
          getCountries()

          setname(null)
          setfatherName(null)
          setmotherName(null)
          setfatherName(null)
          setdivision(null)
          setrank(null)
          setremark(null)
          setdateOfBirth(null)
          setadmissionNo(null)
          setrollNumber(null)
          setgender(null)
          setphoto(null)
          setcl(null)
          setsections(null)

          validation.resetForm()
        }
      } else {
        const { data, error } = await supabase
          .from("Marksheet")
          .update([
            {
              template: values.template,
              examName: values.examName,
              schoolName: values.schoolName,
              examCenter: values.examCenter,
              bodyText: values.bodyText,
              footerText: values.footerText,
              printingDate: values.printingDate,

              headerImage: headerImage,
              leftLogo: leftLogo,
              rightLogo: rightLogo,
              leftSign: leftSign,
              middleSign: middleSign,
              rightSign: rightSign,
              backgroundImage: background,

              name: name,
              fatherName: fatherName,
              motherName: motherName,
              examSession: examSession,
              division: division,
              rank: rank,
              remark: remark,
              dateOfBirth: dateOfBirth,
              admissionNo: admissionNo,
              rollNumber: rollNumber,
              photo: photo,
              class: cl,
              section: sections,
            },
          ])
          .eq("id", values.id)
          .select()

        if (error) {
          toast.error("Marksheet Updated Failed", { autoClose: 2000 })
        } else {
          toast.success("Marksheet Updated", { autoClose: 2000 })
          setshow(false)
          getCountries()

          setname(null)
          setfatherName(null)
          setfatherName(null)
          setmotherName(null)
          setdivision(null)
          setrank(null)
          setremark(null)
          setdateOfBirth(null)
          setadmissionNo(null)
          setrollNumber(null)
          setgender(null)
          setphoto(null)
          setcl(null)
          setsections(null)
          validation.resetForm()
        }
      }
    },
  })

  const navigate = useNavigate()

  useEffect(() => {
    props.setBreadcrumbItems("Marksheet", breadcrumbItems)
    getCountries()
  }, [])

  const handleClick = () => {
    settype("new")
    validation.resetForm()
    setshow(true)
  }

  const handleSearch = async () => {
    const { data, error } = await supabase
      .from("Marksheet")
      .select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
      .ilike("template", `%${search}%`)
    setSection(data)
  }

  const handelEdit = async row => {
    validation.resetForm()
    validation.setFieldValue("template", row.template)
    validation.setFieldValue("examName", row.examName)
    validation.setFieldValue("schoolName", row.schoolName)
    validation.setFieldValue("examCenter", row.examCenter)
    validation.setFieldValue("footerText", row.footerText)
    validation.setFieldValue("bodyText", row.bodyText)
    validation.setFieldValue("printingDate", row.printingDate)
    validation.setFieldValue("headerImage", row.headerImage)
    validation.setFieldValue("leftLogo", row.leftLogo)
    validation.setFieldValue("rightLogo", row.rightLogo)

    validation.setFieldValue("leftSign", row.leftSign)
    validation.setFieldValue("middleSign", row.middleSign)
    validation.setFieldValue("rightSign", row.rightSign)

    validation.setFieldValue("backgroundImage", row.backgroundImage)

    setname(row)
    setfatherName(row.fatherName)
    setfatherName(row.fatherName)
    setmotherName(row.motherName)
    setdivision(row.division)
    setrank(row.rank)
    setremark(row.remark)
    setdateOfBirth(row.dateOfBirth)
    setadmissionNo(row.admissionNo)
    setrollNumber(row.rollNumber)
    setgender(row.gender)
    setphoto(row.photo)
    setcl(row.class)
    setsections(row.section)

    validation.setFieldValue("id", row.id)
    setshow(true)
    settype("edit")
  }

  const handelDelete = async id => {
    const { error } = await supabase.from("Marksheet").delete().eq("id", id)

    if (error) {
      toast.error("Marksheet Deleted Failed", { autoClose: 2000 })
    } else {
      toast.success("Marksheet Deleted", { autoClose: 2000 })
      getCountries()
    }
  }

  const handleClickProfile = () => {
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

  const columns = [
    {
      name: "school Name",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.schoolName,
    },
    {
      name: "template",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.template,
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

  const handelsetvalue = (e, setstate) => {
    console.log("sssssssssssssssssss", e.target.checked)
    setstate(e.target.checked)
  }

  return (
    <React.Fragment>
      <Row>
        <div className="d-flex mb-2">
          <div></div>
          {/* Vos éléments de filtre ici */}

          <label className="col-form-label">Marksheet </label>
          <div className="col-md-2 ms-2">
            <input
              type="text"
              onChange={e => setSearch(e.target.value)}
              value={search}
              className="form-control me-1"
              placeholder=""
            />
          </div>
          <div>
            <button
              className="btn btn-primary ms-2"
              onClick={() => {
                handleSearch()
              }}
            >
              Search
            </button>
          </div>
          <div>
            <button
              className="btn btn-danger ms-2"
              onClick={() => {
                setSearch("")
                getCountries()
              }}
            >
              Reset
            </button>
          </div>
        </div>
        <div className="d-flex justify-content-between  mb-2">
          <div></div>
          {/* Button */}
          <button className="btn btn-primary" onClick={handleClick}>
            Add Marksheet
          </button>
        </div>
      </Row>
      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <CardTitle className="h4">Marksheet List </CardTitle>
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
                  data={section}
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
        fullscreen
      >
        <ModalBody className="py-3 px-5">
          <Form
            className="form-horizontal mt-4"
            onSubmit={e => {
              e.preventDefault()
              validation.handleSubmit()
              return false
            }}
          >
            <Row className="mb-3">
              <label
                htmlFor="example-text-input"
                className="col-md-2 col-form-label"
              >
                Template
              </label>
              <div className="col-md-10">
                <input
                  className="form-control"
                  id="template"
                  name="template"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.template || ""}
                  type="text"
                />
              </div>
            </Row>

            <Row className="mb-3">
              <label
                htmlFor="example-text-input"
                className="col-md-2 col-form-label"
              >
                Exam Name
              </label>
              <div className="col-md-10">
                <input
                  className="form-control"
                  id="examName"
                  name="examName"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.examName || ""}
                  type="text"
                />
              </div>
            </Row>
            <Row className="mb-3">
              <label
                htmlFor="example-text-input"
                className="col-md-2 col-form-label"
              >
                school Name
              </label>
              <div className="col-md-10">
                <input
                  className="form-control"
                  id="schoolName"
                  name="schoolName"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.schoolName || ""}
                  type="text"
                />
              </div>
            </Row>
            <Row className="mb-3">
              <label
                htmlFor="example-text-input"
                className="col-md-2 col-form-label"
              >
                Exam Center
              </label>
              <div className="col-md-10">
                <input
                  className="form-control"
                  id="examCenter"
                  name="examCenter"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.examCenter || ""}
                  type="text"
                />{" "}
              </div>
            </Row>
            <Row className="mb-3">
              <label
                htmlFor="example-text-input"
                className="col-md-2 col-form-label"
              >
                body Text
              </label>
              <div className="col-md-10">
                <input
                  className="form-control"
                  id="bodyText"
                  name="bodyText"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.bodyText || ""}
                  type="text"
                />{" "}
              </div>
            </Row>
            <Row className="mb-3">
              <label
                htmlFor="example-text-input"
                className="col-md-2 col-form-label"
              >
                footer Text
              </label>
              <div className="col-md-10">
                <input
                  className="form-control"
                  id="footerText"
                  name="footerText"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.footerText || ""}
                  type="text"
                />{" "}
              </div>
            </Row>
            <Row className="mb-3">
              <label
                htmlFor="example-text-input"
                className="col-md-2 col-form-label"
              >
                Printing Date
              </label>
              <div className="col-md-10">
                <input
                  className="form-control"
                  id="printingDate"
                  name="printingDate"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.printingDate || ""}
                  type="text"
                />{" "}
              </div>
            </Row>

            <Row className="mb-3">
              <label
                htmlFor="example-text-input"
                className="col-md-2 col-form-label"
              >
                Header Image
              </label>
              <div className="col-md-10">
                <Row>
                  <Col md={1}>
                    <img
                      width={50}
                      src={`https://ypduxejepwdmssduohpi.supabase.co/storage/v1/object/public/uploads/${headerImage}`}
                      alt="img"
                    />
                  </Col>
                  <Col>
                    <input
                      accept="image/png, image/jpeg"
                      onChange={e => uploadDoc(e, setheaderImage)}
                      className="form-control"
                      type="file"
                    />
                  </Col>
                </Row>
              </div>
            </Row>

            <Row className="mb-3">
              <label
                htmlFor="example-text-input"
                className="col-md-2 col-form-label"
              >
                Left Logo
              </label>
              <div className="col-md-10">
                <Row>
                  <Col md={1}>
                    <img
                      width={50}
                      src={`https://ypduxejepwdmssduohpi.supabase.co/storage/v1/object/public/uploads/${leftLogo}`}
                      alt="img"
                    />
                  </Col>
                  <Col>
                    <input
                      accept="image/png, image/jpeg"
                      onChange={e => uploadDoc(e, setleftLogo)}
                      className="form-control"
                      type="file"
                    />
                  </Col>
                </Row>
              </div>
            </Row>

            <Row className="mb-3">
              <label
                htmlFor="example-text-input"
                className="col-md-2 col-form-label"
              >
                Right Logo
              </label>
              <div className="col-md-10">
                <Row>
                  <Col md={1}>
                    <img
                      width={50}
                      src={`https://ypduxejepwdmssduohpi.supabase.co/storage/v1/object/public/uploads/${rightLogo}`}
                      alt="img"
                    />
                  </Col>
                  <Col>
                    <input
                      accept="image/png, image/jpeg"
                      onChange={e => uploadDoc(e, setrightLogo)}
                      className="form-control"
                      type="file"
                    />{" "}
                  </Col>
                </Row>
              </div>
            </Row>

            <Row className="mb-3">
              <label
                htmlFor="example-text-input"
                className="col-md-2 col-form-label"
              >
                left Sign
              </label>
              <div className="col-md-10">
                <Row>
                  <Col md={1}>
                    <img
                      width={50}
                      src={`https://ypduxejepwdmssduohpi.supabase.co/storage/v1/object/public/uploads/${leftSign}`}
                      alt="img"
                    />
                  </Col>
                  <Col>
                    <input
                      accept="image/png, image/jpeg"
                      onChange={e => uploadDoc(e, setleftSign)}
                      className="form-control"
                      type="file"
                    />{" "}
                  </Col>
                </Row>
              </div>
            </Row>

            <Row className="mb-3">
              <label
                htmlFor="example-text-input"
                className="col-md-2 col-form-label"
              >
                Middle Sign
              </label>
              <div className="col-md-10">
                <Row>
                  <Col md={1}>
                    <img
                      width={50}
                      src={`https://ypduxejepwdmssduohpi.supabase.co/storage/v1/object/public/uploads/${middleSign}`}
                      alt="img"
                    />
                  </Col>
                  <Col>
                    <input
                      accept="image/png, image/jpeg"
                      onChange={e => uploadDoc(e, setmiddleSign)}
                      className="form-control"
                      type="file"
                    />{" "}
                  </Col>
                </Row>
              </div>
            </Row>

            <Row className="mb-3">
              <label
                htmlFor="example-text-input"
                className="col-md-2 col-form-label"
              >
                right Sign
              </label>
              <div className="col-md-10">
                <Row>
                  <Col md={1}>
                    <img
                      width={50}
                      src={`https://ypduxejepwdmssduohpi.supabase.co/storage/v1/object/public/uploads/${rightSign}`}
                      alt="img"
                    />
                  </Col>
                  <Col>
                    <input
                      accept="image/png, image/jpeg"
                      onChange={e => uploadDoc(e, setrightSign)}
                      className="form-control"
                      type="file"
                    />{" "}
                  </Col>
                </Row>
              </div>
            </Row>

            <Row className="mb-3">
              <label
                htmlFor="example-text-input"
                className="col-md-2 col-form-label"
              >
                Background Image
              </label>
              <div className="col-md-10">
                <Row>
                  <Col md={1}>
                    <img
                      width={50}
                      src={`https://ypduxejepwdmssduohpi.supabase.co/storage/v1/object/public/uploads/${background}`}
                      alt="img"
                    />
                  </Col>
                  <Col>
                    <input
                      accept="image/png, image/jpeg"
                      onChange={e => uploadDoc(e, setbackground)}
                      className="form-control"
                      type="file"
                    />{" "}
                  </Col>
                </Row>
              </div>
            </Row>

            <div className="form-check form-switch form-switch-lg mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="customSwitchsizelg"
                name="name"
                onChange={e => handelsetvalue(e, setname)}
                checked={name}
              />
              <label className="form-check-label" htmlFor="customSwitchsizelg">
                Name
              </label>
            </div>

            <div className="form-check form-switch form-switch-lg mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="customSwitchsizelg"
                name="fatherName"
                onChange={e => handelsetvalue(e, setfatherName)}
                checked={fatherName}
              />
              <label className="form-check-label" htmlFor="customSwitchsizelg">
                Father Name
              </label>
            </div>

            <div className="form-check form-switch form-switch-lg mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="customSwitchsizelg"
                name="motherName"
                onChange={e => handelsetvalue(e, setmotherName)}
                checked={motherName}
              />
              <label className="form-check-label" htmlFor="customSwitchsizelg">
                Mother Name
              </label>
            </div>

            <div className="form-check form-switch form-switch-lg mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="customSwitchsizelg"
                name="examSession"
                onChange={e => handelsetvalue(e, setexamSession)}
                checked={examSession}
              />
              <label className="form-check-label" htmlFor="customSwitchsizelg">
                Exam Session
              </label>
            </div>

            <div className="form-check form-switch form-switch-lg mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="customSwitchsizelg"
                name="admissionNo"
                onChange={e => handelsetvalue(e, setadmissionNo)}
                checked={admissionNo}
              />
              <label className="form-check-label" htmlFor="customSwitchsizelg">
                Admission No
              </label>
            </div>

            <div className="form-check form-switch form-switch-lg mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="customSwitchsizelg"
                name="division"
                onChange={e => handelsetvalue(e, setdivision)}
                checked={division}
              />
              <label className="form-check-label" htmlFor="customSwitchsizelg">
                Division
              </label>
            </div>

            <div className="form-check form-switch form-switch-lg mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="customSwitchsizelg"
                name="rank"
                onChange={e => handelsetvalue(e, setrank)}
                checked={rank}
              />
              <label className="form-check-label" htmlFor="customSwitchsizelg">
                Rank
              </label>
            </div>

            <div className="form-check form-switch form-switch-lg mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="customSwitchsizelg"
                name="rollNumber"
                onChange={e => handelsetvalue(e, setrollNumber)}
                checked={rollNumber}
              />
              <label className="form-check-label" htmlFor="customSwitchsizelg">
                Roll Number
              </label>
            </div>

            <div className="form-check form-switch form-switch-lg mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="customSwitchsizelg"
                name="photo"
                onChange={e => handelsetvalue(e, setphoto)}
                checked={photo}
              />
              <label className="form-check-label" htmlFor="customSwitchsizelg">
                Photo
              </label>
            </div>

            <div className="form-check form-switch form-switch-lg mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="customSwitchsizelg"
                name="class"
                onChange={e => handelsetvalue(e, setcl)}
                checked={cl}
              />
              <label className="form-check-label" htmlFor="customSwitchsizelg">
                Class
              </label>
            </div>

            <div className="form-check form-switch form-switch-lg mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="customSwitchsizelg"
                name="section"
                onChange={e => handelsetvalue(e, setsections)}
                checked={sections}
              />
              <label className="form-check-label" htmlFor="customSwitchsizelg">
                Section
              </label>
            </div>

            <div className="form-check form-switch form-switch-lg mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="customSwitchsizelg"
                name="dateOfBirth"
                onChange={e => handelsetvalue(e, setdateOfBirth)}
                checked={dateOfBirth}
              />
              <label className="form-check-label" htmlFor="customSwitchsizelg">
                Date of Birth
              </label>
            </div>

            <div className="form-check form-switch form-switch-lg mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="customSwitchsizelg"
                name="remark"
                onChange={e => handelsetvalue(e, setremark)}
                checked={remark}
              />
              <label className="form-check-label" htmlFor="customSwitchsizelg">
                Remark
              </label>
            </div>

            <Row></Row>

            <div className="d-flex justify-content-center mt-3 mb-3">
              {" "}
              {/* mt-3 adds margin top, mb-3 adds margin bottom */}
              <button type="submit" className="btn btn-primary w-md">
                Submit
              </button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
      <ToastContainer />
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(DesignMarksheet)
