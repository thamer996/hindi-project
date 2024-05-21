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
import { Field, FieldArray, Formik, getIn, useFormik } from "formik"
import * as Yup from "yup"
import { v4 as uuidv4 } from "uuid"
import _, { isEmpty } from "lodash"

const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)

const MarksGrade = props => {
  document.title =
    "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard"

  const breadcrumbItems = [
    { title: "Smart school", link: "#" },
    { title: "Academics", link: "#" },
  ]

  const [section, setSection] = useState([])
  const [show, setshow] = useState(false)
  const [show2, setshow2] = useState(false)
  const [currData, setcurrData] = useState([])
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
    const { data, error } = await supabase.from("MarksGrade").select("*")

    if (data) {
      let grouped_data = _.groupBy(data, "examType")

      let dataconverted = []

      Object.keys(grouped_data)?.map(el => {
        dataconverted.push({
          examType: el,
          list: grouped_data[el],
        })
      })

      setSection(dataconverted ?? [])
    }
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
    enableReinitialize: true,

    initialValues: {
      examType: "",
      gradeName: "",
      percentUpto: "",
      percentFrom: "",
      gradePoint: "",
      description: "",
      id: "",
    },

    validationSchema: Yup.object({}),
    onSubmit: async values => {
      if (type === "new") {
        const { data, error } = await supabase
          .from("MarksGrade")
          .insert([
            {
              examType: values.examType,
              gradeName: values.gradeName,
              percentUpto: values.percentUpto,
              percentFrom: values.percentFrom,
              gradePoint: values.gradePoint,
              description: values.description,
            },
          ])
          .select()

        if (error) {
          console.log("ez", error)
          toast.error("MarksGrade Inserted Failed", { autoClose: 2000 })
        } else {
          toast.success("MarksGrade Inserted", { autoClose: 2000 })
          setshow(false)
          getCountries()
          validation.resetForm()
        }
      } else {
        const { data, error } = await supabase
          .from("MarksGrade")
          .update([
            {
              examType: values.examType,
              gradeName: values.gradeName,
              percentUpto: values.percentUpto,
              percentFrom: values.percentFrom,
              gradePoint: values.gradePoint,
              description: values.description,
            },
          ])
          .eq("id", values.id)
          .select()

        if (error) {
          toast.error("MarksGrade Updated Failed", { autoClose: 2000 })
        } else {
          toast.success("MarksGrade Updated", { autoClose: 2000 })
          const { data, error } = await supabase.from("MarksGrade").select("*")

          if (data) {
            let grouped_data = _.groupBy(data, "examType")

            let dataconverted = []

            Object.keys(grouped_data).map(el => {
              dataconverted.push({
                examType: el,
                list: grouped_data[el],
              })
            })

            setcurrData(
              dataconverted.filter(el => el.examType === values.examType)[0]
                ?.list ?? [],
            )
          }

          setshow(false)

          validation.resetForm()
        }
      }
    },
  })

  const navigate = useNavigate()

  useEffect(() => {
    props.setBreadcrumbItems("MarksGrade", breadcrumbItems)
    getCountries()
  }, [])

  const handleClick = () => {
    settype("new")
    setshow(true)
  }

  const handleSearch = async () => {
    const { data, error } = await supabase
      .from("MarksGrade")
      .select("*")
      .ilike("examType", `%${search}%`)
      if (data) {
        let grouped_data = _.groupBy(data, "examType")
  
        let dataconverted = []
  
        Object.keys(grouped_data)?.map(el => {
          dataconverted.push({
            examType: el,
            list: grouped_data[el],
          })
        })
  
        setSection(dataconverted ?? [])
      }
  }

  const handelEdit = async row => {
    setcurrData(row.list)
    setshow2(true)
  }

  const handelEditline = async values => {
    setshow(true)

    validation.setFieldValue("examType", values.examType)
    validation.setFieldValue("gradeName", values.gradeName)
    validation.setFieldValue("percentUpto", values.percentUpto)
    validation.setFieldValue("percentFrom", values.percentFrom)
    validation.setFieldValue("gradePoint", values.gradePoint)
    validation.setFieldValue("description", values.description)
    validation.setFieldValue("id", values.id)

    settype("edit")
  }

  const handelDelete = async id => {
    const { error } = await supabase
      .from("MarksGrade")
      .delete()
      .eq("examType", id)

    if (error) {
      toast.error("MarksGrade Deleted Failed", { autoClose: 2000 })
    } else {
      toast.success("MarksGrade Deleted", { autoClose: 2000 })
      getCountries()
    }
  }
  const handelDeleteline = async id => {
    const { error } = await supabase.from("MarksGrade").delete().eq("id", id)

    if (error) {
      toast.error("Marks Grade line Deleted Failed", { autoClose: 2000 })
    } else {
      toast.success("MarksGrade line Deleted ", { autoClose: 2000 })
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
      name: "Exam Type",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.examType,
    },
    {
      name: "Grade Name",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.gradeName,
      cell: row => (
        <ul className="mt-2">
          {row?.list.map(el => (
            <li>{el.gradeName}</li>
          ))}
        </ul>
      ),
    },
    {
      name: "Percent Form/Upto",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => `${row?.percentFrom} / ${row.percentUpto}`,
      cell: row => (
        <ul className="mt-2">
          {row.list.map(el => (
            <li>
              {el?.percentFrom} / {el.percentUpto}
            </li>
          ))}
        </ul>
      ),
    },
    {
      name: "Grade Point",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.gradePoint,
      cell: row => (
        <ul className="mt-2">
          {row.list.map(el => (
            <li>{el?.gradePoint}</li>
          ))}
        </ul>
      ),
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
                onClick={() => handelDelete(row?.examType)}
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
    setstate(e.target.checked)
  }

  return (
    <React.Fragment>
      <Row>
        <div className="d-flex mb-2">
          <div></div>
          {/* Vos éléments de filtre ici */}

          <label className="col-form-label">Exam Type </label>
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
            Add MarksGrade
          </button>
        </div>
      </Row>
      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <CardTitle className="h4">MarksGrade List </CardTitle>
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
        size="xl"
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
              <label className="col-md-2 col-form-label">Exam Type</label>
              <div className="col-md-10">
                <select
                  className="form-control"
                  name="examType"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values?.examType || ""}
                >
                  <option value={""}>Select</option>
                  <option value={"General Pupose (Pass/Fail)"}>
                    {" "}
                    General Pupose (Pass/Fail){" "}
                  </option>
                  <option value={"School Based Grading System"}>
                    {" "}
                    School Based Grading System
                  </option>
                  <option value={"College Based Grading System"}>
                    College Based Grading System
                  </option>
                  <option value={"GPA Based Grading System"}>
                    GPA Based Grading System
                  </option>
                  <option value={"Average Passing"}>Average Passing</option>
                </select>
              </div>
            </Row>

            <Row className="mb-3">
              <label
                htmlFor="example-text-input"
                className="col-md-2 col-form-label"
              >
                Grade Name
              </label>
              <div className="col-md-10">
                <input
                  className="form-control"
                  id="gradeName"
                  name="gradeName"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.gradeName || ""}
                  type="text"
                />
              </div>
            </Row>

            <Row className="mb-3">
              <label
                htmlFor="example-text-input"
                className="col-md-2 col-form-label"
              >
                Percent Upto
              </label>
              <div className="col-md-10">
                <input
                  className="form-control"
                  id="percentUpto"
                  name="percentUpto"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.percentUpto || ""}
                  type="text"
                />
              </div>
            </Row>

            <Row className="mb-3">
              <label
                htmlFor="example-text-input"
                className="col-md-2 col-form-label"
              >
                Percent From
              </label>
              <div className="col-md-10">
                <input
                  className="form-control"
                  id="percentFrom"
                  name="percentFrom"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.percentFrom || ""}
                  type="text"
                />
              </div>
            </Row>

            <Row className="mb-3">
              <label
                htmlFor="example-text-input"
                className="col-md-2 col-form-label"
              >
                Grade Point
              </label>
              <div className="col-md-10">
                <input
                  className="form-control"
                  id="gradePoint"
                  name="gradePoint"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.gradePoint || ""}
                  type="text"
                />
              </div>
            </Row>

            <Row className="mb-3">
              <label
                htmlFor="example-text-input"
                className="col-md-2 col-form-label"
              >
                Description
              </label>
              <div className="col-md-10">
                <input
                  className="form-control"
                  id="description"
                  name="description"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.description || ""}
                  type="text"
                />
              </div>
            </Row>

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

      <Modal
        isOpen={show2}
        toggle={() => setshow2(!show2)}
        centered={true}
        size="xl"
      >
        <ModalBody className="py-3 px-5">
          <span className="mb-3"> Exam Type : {currData[0]?.examType}</span>

          <ul>
            {currData.map(el => (
              <li>
                <div>
                  <span className="me-3"> Grade Name : {el.gradeName}</span>

                  <span className="me-3"> percent Upto : {el.percentUpto}</span>

                  <span className="me-3"> Percent From : {el.percentFrom}</span>

                  <span className="me-3"> Grade Point : {el.gradePoint}</span>

                  <span className="me-3"> Description : {el.description}</span>

                  <span
                    className="me-3"
                    style={editIconStyle}
                    onClick={() => handelEditline(el)}
                  >
                    <i className="ti-marker-alt"></i>
                  </span>

                  <span
                    className="me-3"
                    style={actionIconStyle}
                    onClick={() => handelDeleteline(el?.id)}
                  >
                    <i className="ti-trash"></i>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </ModalBody>
      </Modal>
      <ToastContainer />
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(MarksGrade)
