import React, { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

import {
  Table,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardImg,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Label,
  Input,
  FormFeedback,
} from "reactstrap"

import { connect } from "react-redux"
import ReactPlayer from "react-player"

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"
import "../../pages/downloadcenter/VideoTutorial.css"
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

const VideoTutorial = props => {
  document.title =
    "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard"

  const breadcrumbItems = [
    { title: "Smart school", link: "#" },
    { title: "download center", link: "#" },
  ]
  const navigate = useNavigate()

  const [data, setdata] = useState([])
  const [Class, setClass] = useState("")
  const [ClassList, setClassList] = useState([])
  const [sectModal, setsectModal] = useState([])
  const [Sectionss, setSectionss] = useState([])
  const [Section, setSection] = useState("")
  const [keyword, setkeyword] = useState("")
  const [playerData, setplayerData] = useState({})
  const [show, setshow] = useState(false)
  const [showPlayer, setshowPlayer] = useState(false)
  const [type, settype] = useState("add")

  async function getClass() {
    const { data, error } = await supabase.from("Class").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    setClassList(data ?? [])
  }
  async function getVideoTuto() {
    const { data, error } = await supabase.from("VideoTuto").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    setdata(data ?? [])
  }

  useEffect(() => {
    props.setBreadcrumbItems("Video Tutorial", breadcrumbItems)
    getClass()
    getVideoTuto()
  }, [])

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      class: "",
      section: "",
      title: "",
      videoLink: "",
      imageLink: "",
      description: "",
    },

    validationSchema: Yup.object({
      class: Yup.string().required("Please Enter Your class"),
      section: Yup.string().required("please insert section"),
      title: Yup.string().required("please insert title"),
      videoLink: Yup.string().required("please insert videoLink"),
      imageLink: Yup.string().required("please insert imageLink"),
      description: Yup.string().required("please insert description"),
    }),
    onSubmit: async values => {
      if (type === "add") {
        const { data, error } = await supabase
          .from("VideoTuto")
          .insert([
            { brancheId: localStorage.getItem("BranchId") ?? 1,
              class: values.class,
              section: values.section,
              title: values.title,
              videoLink: values.videoLink,
              imageLink: values.imageLink,
              description: values.description,
            },
          ])
          .select()

        if (error) {
          toast.error("VideoTuto Added Failed", { autoClose: 2000 })
        } else {
          toast.success("VideoTuto Added", { autoClose: 2000 })
          setshow(false)
          getVideoTuto()
          validation.resetForm()
        }
      } else {
        const { data, error } = await supabase
          .from("VideoTuto")
          .update([
            {
              class: values.class,
              section: values.section,
              title: values.title,
              videoLink: values.videoLink,
              imageLink: values.imageLink,
              description: values.description,
            },
          ])
          .eq("id", values.id)
          .select()

        if (error) {
          toast.error("VideoTuto Updated Failed", { autoClose: 2000 })
        } else {
          toast.success("VideoTuto Updated", { autoClose: 2000 })
          setshow(false)
          getVideoTuto()
          validation.resetForm()
        }
      }
    },
  })

  const handleSearch = async () => {
    const { data, error } = await supabase
      .from("VideoTuto")
      .select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
      .ilike("class", `%${Class}%`)
      .ilike("section", `%${Section}%`)
      .ilike("title", `%${keyword}%`)

    setdata(data)
  }

  const handelEdit = async row => {
    validation.resetForm()

    validation.setFieldValue("class", row.class)
    validation.setFieldValue("section", row.section)
    validation.setFieldValue("title", row.title)
    validation.setFieldValue("videoLink", row.videoLink)
    validation.setFieldValue("imageLink", row.imageLink)
    validation.setFieldValue("description", row.description)

    settype("edit")
    validation.setFieldValue("id", row.id)
    setshow(true)
  }

  const handleAdd = () => {
    validation.resetForm()

    settype("add")
    setshow(true)
  }

  const handelDelete = async id => {
    const { error } = await supabase.from("VideoTuto").delete().eq("id", id)

    if (error) {
      toast.error("VideoTuto Deleted Failed", { autoClose: 2000 })
    } else {
      toast.success("VideoTuto Deleted", { autoClose: 2000 })
      getVideoTuto()
    }
  }

  const handleClick = () => {
    navigate("/add-video-tutorial")
  }
  const handleClickProfile = () => {
    navigate("/VideoTuto-profile")
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
  const [isHovered, setIsHovered] = useState(null)

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
                  ClassList.find(el => el.className === val.target.value)
                    ?.sections,
                )
              }}
              value={Class}
              className="form-control"
            >
              <option> Select </option>
              {ClassList?.map(el => (
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
              {Sectionss?.map(el => (
                <option value={el}>{el}</option>
              ))}
            </select> 
          </div>
          <label className="col-form-label">Search By title</label>&nbsp;
          <div className="col-md-2 me-1">
            <input
              type="text"
              value={keyword}
              onChange={val => {
                setkeyword(val.target.value)
              }}
              className="form-control"
              placeholder="Search By VideoTuto Name, Roll Number, Enroll Number.."
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
            Add VideoTuto
          </button>
        </div>
      </Row>
      <Row>
        {data.map(el => (
          <Col lg={3}>
            <Card
              className="position-relative"
              onMouseEnter={() => setIsHovered(el?.id)}
              onMouseLeave={() => setIsHovered(null)}
            >
              <CardImg
                top
                className="img-fluid"
                style={{ height: "200px", overflow: "hidden" }}
                src={el?.imageLink}
                alt="image"
              />
              {isHovered === el?.id && (
                <div className="overlay">
                  <i
                    className="ti-eye icon"
                    onClick={() => {
                      setshowPlayer(!showPlayer)
                      setplayerData(el)
                    }}
                  ></i>
                  <i
                    className="ti-marker-alt icon"
                    onClick={() => handelEdit(el)}
                  ></i>
                  <i
                    className="ti-trash icon"
                    onClick={() => handelDelete(el?.id)}
                  ></i>
                </div>
              )}
              <CardBody>
                <CardTitle className="h4">
                  {el?.title} - {el?.class} - {el?.section}
                </CardTitle>
              </CardBody>
            </Card>
          </Col>
        ))}
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
                  <Label htmlFor="useremail">title</Label>
                  <Input
                    id="title"
                    name="title"
                    className="form-control"
                    placeholder="Enter section title"
                    type="title"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.title || ""}
                    invalid={
                      validation.touched.title && validation.errors.title
                        ? true
                        : false
                    }
                  />
                  {validation.touched.title && validation.errors.title ? (
                    <FormFeedback type="invalid">
                      {validation.errors.title}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col>
                <div className="mb-3">
                  <Label htmlFor="useremail">videoLink</Label>
                  <Input
                    id="videoLink"
                    name="videoLink"
                    className="form-control"
                    placeholder="Enter section videoLink"
                    type="videoLink"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.videoLink || ""}
                    invalid={
                      validation.touched.videoLink &&
                      validation.errors.videoLink
                        ? true
                        : false
                    }
                  />
                  {validation.touched.videoLink &&
                  validation.errors.videoLink ? (
                    <FormFeedback type="invalid">
                      {validation.errors.videoLink}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col>
                <div className="mb-3">
                  <Label htmlFor="useremail">description</Label>
                  <Input
                    id="description"
                    name="description"
                    className="form-control"
                    placeholder="Enter section description"
                    type="textarea"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.description || ""}
                    invalid={
                      validation.touched.description &&
                      validation.errors.description
                        ? true
                        : false
                    }
                  />
                  {validation.touched.description &&
                  validation.errors.description ? (
                    <FormFeedback type="invalid">
                      {validation.errors.description}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="mb-3">
                  <Label htmlFor="useremail">imageLink</Label>
                  <Input
                    id="imageLink"
                    name="imageLink"
                    className="form-control"
                    placeholder="Enter section imageLink"
                    type="imageLink"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.imageLink || ""}
                    invalid={
                      validation.touched.imageLink &&
                      validation.errors.imageLink
                        ? true
                        : false
                    }
                  />
                  {validation.touched.imageLink &&
                  validation.errors.imageLink ? (
                    <FormFeedback type="invalid">
                      {validation.errors.imageLink}
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
                        ClassList.find(el => el.className === val.target.value)
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
                    {ClassList?.map(el => (
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
      <Modal
        isOpen={showPlayer}
        toggle={() => setshowPlayer(!showPlayer)}
        centered={true}
        size="xl"
      >
        <ModalHeader toggle={() => setshowPlayer(!showPlayer)}>
          {playerData?.title} - {playerData?.class} - {playerData?.section}
        </ModalHeader>
        <ModalBody className="py-3 px-5">
          <Row>
            <Col md={7}>
              <ReactPlayer width="100%" url={playerData?.videoLink} controls />
            </Col>
            <Col md={5}>
              <strong>Description: </strong> <p>{playerData?.description}</p>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
      <ToastContainer />
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(VideoTutorial)
