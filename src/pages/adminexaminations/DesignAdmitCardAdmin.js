/* eslint-disable jsx-a11y/alt-text */
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

const DesignAdmitCard = props => {
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
  const [rightLogo, setrightLogo] = useState("")
  const [sign, setsign] = useState("")
  const [background, setbackground] = useState("")

  async function getCountries() {
    const { data, error } = await supabase.from("AdmitCard").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
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
      heading: "",
      title: "",
      examName: "",
      schoolName: "",
      examCenter: "",
      footerText: "",
      leftLogo: "",
      rightLogo: "",
      sign: "",
      background: "",

      name: null,
      fatherName: null,
      motherName: null,
      dateOfBirth: null,
      admissionNo: null,
      rollNumber: null,
      address: null,
      gender: null,
      photo: null,
      class: null,
      section: null,

      id: "",
    },

    validationSchema: Yup.object({}),
    onSubmit: async values => {
      if (type === "new") {
        const { data, error } = await supabase
          .from("AdmitCard")
          .insert([
            { brancheId: localStorage.getItem("BranchId") ?? 1,
              template: values.template,
              heading: values.heading,
              title: values.title,
              examName: values.examName,
              schoolName: values.schoolName,
              examCenter: values.examCenter,
              footerText: values.footerText,

              leftLogo: leftLogo,
              rightLogo: rightLogo,
              sign: sign,
              background: background,

              name: values.name,
              fatherName: values.fatherName,
              motherName: values.motherName,
              dateOfBirth: values.dateOfBirth,
              admissionNo: values.admissionNo,
              rollNumber: values.rollNumber,
              address: values.address,
              gender: values.gender,
              photo: values.photo,
              class: values.class,
              section: values.section,
            },
          ])
          .select()

        if (error) {
          console.log("ez", error)
          toast.error("AdmitCard Inserted Failed", { autoClose: 2000 })
        } else {
          toast.success("AdmitCard Inserted", { autoClose: 2000 })
          setshow(false)
          getCountries()
          validation.resetForm()
        }
      } else {
        const { data, error } = await supabase
          .from("AdmitCard")
          .update([
            {
              template: values.template,
              heading: values.heading,
              title: values.title,
              examName: values.examName,
              schoolName: values.schoolName,
              examCenter: values.examCenter,
              footerText: values.footerText,

              leftLogo: leftLogo,
              rightLogo: rightLogo,
              sign: sign,
              background: background,

              name: values.name,
              fatherName: values.fatherName,
              motherName: values.motherName,
              dateOfBirth: values.dateOfBirth,
              admissionNo: values.admissionNo,
              rollNumber: values.rollNumber,
              address: values.address,
              gender: values.gender,
              photo: values.photo,
              class: values.class,
              section: values.section,
            },
          ])
          .eq("id", values.id)
          .select()

        if (error) {
          toast.error("AdmitCard Updated Failed", { autoClose: 2000 })
        } else {
          toast.success("AdmitCard Updated", { autoClose: 2000 })
          setshow(false)
          getCountries()
          validation.resetForm()
        }
      }
    },
  })

  const navigate = useNavigate()

  useEffect(() => {
    props.setBreadcrumbItems("AdmitCard", breadcrumbItems)
    getCountries()
  }, [])

  const handleClick = () => {
    settype("new")
    validation.resetForm()
    setshow(true)
  }

  const handleSearch = async () => {
    const { data, error } = await supabase
      .from("AdmitCard")
      .select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
      .ilike("template", `%${search}%`)
    setSection(data)
  }

  const handelEdit = async row => {
    validation.resetForm()
    validation.setFieldValue("template", row.template)
    validation.setFieldValue("heading", row.heading)
    validation.setFieldValue("title", row.title)
    validation.setFieldValue("examName", row.examName)
    validation.setFieldValue("schoolName", row.schoolName)
    validation.setFieldValue("examCenter", row.examCenter)
    validation.setFieldValue("footerText", row.footerText)

    validation.setFieldValue("leftLogo", row.leftLogo)
    validation.setFieldValue("rightLogo", row.rightLogo)
    validation.setFieldValue("sign", row.sign)
    validation.setFieldValue("background", row.background)

    setbackground(row.background)
    setleftLogo(row.leftLogo)
    setrightLogo(row.rightLogo)
    setsign(row.sign)

    validation.setFieldValue("name", row.name)
    validation.setFieldValue("fatherName", row.fatherName)
    validation.setFieldValue("motherName", row.motherName)
    validation.setFieldValue("fatherName", row.fatherName)
    validation.setFieldValue("dateOfBirth", row.dateOfBirth)
    validation.setFieldValue("admissionNo", row.admissionNo)
    validation.setFieldValue("rollNumber", row.rollNumber)
    validation.setFieldValue("address", row.address)
    validation.setFieldValue("photo", row.photo)
    validation.setFieldValue("class", row.class)
    validation.setFieldValue("section", row.section)

    validation.setFieldValue("id", row.id)
    setshow(true)
    settype("edit")
  }

  const handelDelete = async id => {
    const { error } = await supabase.from("AdmitCard").delete().eq("id", id)

    if (error) {
      toast.error("AdmitCard Deleted Failed", { autoClose: 2000 })
    } else {
      toast.success("AdmitCard Deleted", { autoClose: 2000 })
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

  return (
    <React.Fragment>
      <Row>
        <div className="d-flex mb-2">
          <div></div>
          {/* Vos éléments de filtre ici */}

          <label className="col-form-label">AdmitCard </label>
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
            Add AdmitCard
          </button>
        </div>
      </Row>
      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <CardTitle className="h4">AdmitCard List </CardTitle>
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
                Heading
              </label>
              <div className="col-md-10">
                <input
                  className="form-control"
                  id="heading"
                  name="heading"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.heading || ""}
                  type="text"
                />
              </div>
            </Row>
            <Row className="mb-3">
              <label
                htmlFor="example-text-input"
                className="col-md-2 col-form-label"
              >
                Title
              </label>
              <div className="col-md-10">
                <input
                  className="form-control"
                  id="title"
                  name="title"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.title || ""}
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
                />{" "}
              </div>
            </Row>
            <Row className="mb-3">
              <label
                htmlFor="example-text-input"
                className="col-md-2 col-form-label"
              >
                School Name
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
                />{" "}
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
                Footer Text
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
                Sign
              </label>
              <div className="col-md-10">
                <Row>
                  <Col md={1}>
                    <img
                      width={50}
                      src={`https://ypduxejepwdmssduohpi.supabase.co/storage/v1/object/public/uploads/${sign}`}
                      alt="img"
                    />
                  </Col>
                  <Col>
                    <input
                      accept="image/png, image/jpeg"
                      onChange={e => uploadDoc(e, setsign)}
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
                onChange={validation.handleChange}
                checked={validation.values.name}
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
                onChange={validation.handleChange}
                checked={validation.values.fatherName}
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
                onChange={validation.handleChange}
                checked={validation.values.motherName}
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
                name="dateOfBirth"
                onChange={validation.handleChange}
                checked={validation.values.dateOfBirth}
              />

              <label className="form-check-label" htmlFor="customSwitchsizelg">
                Date Of Birth
              </label>
            </div>

            <div className="form-check form-switch form-switch-lg mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="customSwitchsizelg"
                name="admissionNo"
                onChange={validation.handleChange}
                checked={validation.values.admissionNo}
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
                name="rollNumber"
                onChange={validation.handleChange}
                checked={validation.values.rollNumber}
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
                name="address"
                onChange={validation.handleChange}
                checked={validation.values.address}
              />
              <label className="form-check-label" htmlFor="customSwitchsizelg">
                Address
              </label>
            </div>

            <div className="form-check form-switch form-switch-lg mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="customSwitchsizelg"
                name="gender"
                onChange={validation.handleChange}
                checked={validation.values.gender}
              />
              <label className="form-check-label" htmlFor="customSwitchsizelg">
                Gender
              </label>
            </div>

            <div className="form-check form-switch form-switch-lg mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="photo"
                name="photo"
                onChange={validation.handleChange}
                checked={validation.values.photo}
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
                onChange={validation.handleChange}
                checked={validation.values.class}
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
                onChange={validation.handleChange}
                checked={validation.values.section}
              />
              <label className="form-check-label" htmlFor="customSwitchsizelg">
                Section
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

export default connect(null, { setBreadcrumbItems })(DesignAdmitCard)
