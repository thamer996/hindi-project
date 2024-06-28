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
  input,
  FormFeedback,
  Form,
  Badge,
} from "reactstrap"

import { connect } from "react-redux"

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useFormik } from "formik"
import * as Yup from "yup"
import _, { isEmpty } from "lodash"

const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)

const NotificationSetting = props => {
  document.title =
    "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard"

  const breadcrumbItems = [
    { title: "Smart school", link: "#" },
    { title: "Academics", link: "#" },
  ]

  const [section, setSection] = useState([])

  const [sections, setSections] = useState([])
  const [students, setStudent] = useState([])
  const [subject, setSubject] = useState([])
  const [subjectValues, setSubjectValues] = useState([])

  const [show, setshow] = useState(false)
  const [type, settype] = useState("new")
  const [search, setSearch] = useState("")

  async function getCountries() {
    const { data, error } = await supabase
      .from("NotificationSetting")
      .select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    setSection(data ?? [])
  }

  async function getstudents() {
    const { data, error } = await supabase.from("Student").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    setStudent(data ?? [])
  }

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      templateID: "",
      event: "",

      destination: "",
      recipient: "",
      sampleMessage: "",
    },

    validationSchema: Yup.object({}),
    onSubmit: async values => {
      if (type === "new") {
        const { data, error } = await supabase
          .from("NotificationSetting")
          .insert([
            { brancheId: localStorage.getItem("BranchId") ?? 1,
              templateID: values.templateID,
              event: values.event,

              destination: values.destination,
              recipient: values.recipient,
              sampleMessage: values.sampleMessage,
            },
          ])
          .select()

        if (error) {
          toast.error("NotificationSetting Inserted Failed", {
            autoClose: 2000,
          })
        } else {
          toast.success("NotificationSetting Inserted", { autoClose: 2000 })
          setshow(false)
          getCountries()
          setSubject([])
          validation.resetForm()
        }
      } else {
        const { data, error } = await supabase
          .from("NotificationSetting")
          .update([
            {
              templateID: values.templateID,
              event: values.event,

              destination: values.destination,
              recipient: values.recipient,
              sampleMessage: values.sampleMessage,
            },
          ])
          .eq("id", values.id)
          .select()

        if (error) {
          toast.error("NotificationSetting Updated Failed", {
            autoClose: 2000,
          })
        } else {
          toast.success("NotificationSetting Updated", { autoClose: 2000 })
          setshow(false)
          getCountries()
          setSubject([])
          validation.resetForm()
        }
      }
    },
  })

  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
      props.setBreadcrumbItems("NotificationSetting", breadcrumbItems)
      await getCountries()
      await getstudents()
    })()
  }, [])

  const handleClick = () => {
    settype("new")
    validation.resetForm()
    setshow(true)
  }

  const handleSearch = async () => {
    const { data, error } = await supabase
      .from("NotificationSetting")
      .select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
      .ilike("event", `%${search}%`)
    setSection(data ?? [])
  }

  const handelEdit = async row => {
    validation.setFieldValue("templateID", row.templateID)
    validation.setFieldValue("event", row.event)

    validation.setFieldValue("destination", row.destination)
    validation.setFieldValue("recipient", row.recipient)
    validation.setFieldValue("sampleMessage", row.sampleMessage)

    validation.setFieldValue("id", row.id)

    setshow(true)
    settype("edit")
  }

  const handelDelete = async id => {
    const { error } = await supabase
      .from("NotificationSetting")
      .delete()
      .eq("id", id)

    if (error) {
      toast.error("NotificationSetting Deleted Failed", { autoClose: 2000 })
    } else {
      toast.success("NotificationSetting Deleted", { autoClose: 2000 })
      getCountries()
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

  const columns = [
    {
      name: "Template ID",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.templateID ?? "None",
    },
    {
      name: "Event",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.event,
    },
    {
      name: "Destination",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      cell: row => {
        return (
          <>
            {row.destination.includes("Email") && (
              <Badge color={"danger"}> Email</Badge>
            )}

            {row.destination.includes("SMS") && (
              <Badge color={"info"} className="ms-2"> SMS</Badge>
            )}
          </>
        )
      },
    },
    {
      name: "Recipient",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.recipient ?? "None",
      cell: row => {
        return (
          <>
            {row.recipient.includes("Student") && (
              <Badge color={"info"}> Student</Badge>
            )}

            {row.recipient.includes("Guardian") && (
              <Badge color={"danger"} className="ms-2"> Guardian</Badge>
            )}
          </>
        )
      },
    },

    {
      name: "Sample Message",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.sampleMessage ?? "None",
    },

    {
      name: "Action",
      //allowOverflow: true,
      reorder: true,
      center: true,
      minWidth: "280px",

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

          <label className="col-form-label">Notif Setting </label>
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
            Add NotifConfig
          </button>
        </div>
      </Row>
      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <CardTitle className="h4">NotificationSetting List </CardTitle>
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
                <Label htmlFor="useremail">templateID</Label>
                <input
                  id="templateID"
                  name="templateID"
                  className="form-control"
                  placeholder="Enter templateID"
                  type="templateID"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.templateID || ""}
                  invalid={
                    validation.touched.templateID &&
                    validation.errors.templateID
                      ? true
                      : false
                  }
                />

                {validation.touched.templateID &&
                validation.errors.templateID ? (
                  <FormFeedback type="invalid">
                    {validation.errors.templateID}
                  </FormFeedback>
                ) : null}
              </div>
            </Row>

            <Row>
              <div className="mb-3">
                <Label htmlFor="useremail">event</Label>
                <input
                  id="event"
                  name="event"
                  className="form-control"
                  placeholder="Enter event"
                  type="event"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.event || ""}
                  invalid={
                    validation.touched.event && validation.errors.event
                      ? true
                      : false
                  }
                />

                {validation.touched.event && validation.errors.event ? (
                  <FormFeedback type="invalid">
                    {validation.errors.event}
                  </FormFeedback>
                ) : null}
              </div>
            </Row>

            <Row>
              <div className="mb-3">
                <Label htmlFor="useremail">destination</Label>
                <select
                  id="destination"
                  name="destination"
                  multiple
                  className="form-control"
                  placeholder="Enter destination"
                  type="destination"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.destination || ""}
                  invalid={
                    validation.touched.destination &&
                    validation.errors.destination
                      ? true
                      : false
                  }
                >
                  <option value={"Email"}>Email </option>
                  <option value={"SMS"}>SMS </option>
                </select> 

                {validation.touched.destination &&
                validation.errors.destination ? (
                  <FormFeedback type="invalid">
                    {validation.errors.destination}
                  </FormFeedback>
                ) : null}
              </div>
            </Row>
            <Row>
              <div className="mb-3">
                <Label htmlFor="useremail">recipient</Label>
                <select
                  id="recipient"
                  name="recipient"
                  multiple
                  className="form-control"
                  placeholder="Enter recipient"
                  type="recipient"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.recipient || ""}
                  invalid={
                    validation.touched.recipient && validation.errors.recipient
                      ? true
                      : false
                  }
                >
                  <option value={"Guardian"}>Guardian </option>
                  <option value={"Student"}>Student </option>
                </select> 

                {validation.touched.recipient && validation.errors.recipient ? (
                  <FormFeedback type="invalid">
                    {validation.errors.recipient}
                  </FormFeedback>
                ) : null}
              </div>
            </Row>
            <Row>
              <div className="mb-3">
                <Label htmlFor="useremail">sampleMessage</Label>
                <input
                  id="sampleMessage"
                  name="sampleMessage"
                  className="form-control"
                  placeholder="Enter sampleMessage"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.sampleMessage || ""}
                  invalid={
                    validation.touched.sampleMessage &&
                    validation.errors.sampleMessage
                      ? true
                      : false
                  }
                />

                {validation.touched.sampleMessage &&
                validation.errors.sampleMessage ? (
                  <FormFeedback type="invalid">
                    {validation.errors.sampleMessage}
                  </FormFeedback>
                ) : null}
              </div>
            </Row>

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
          </Form>
        </ModalBody>
      </Modal>
      <ToastContainer />
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(NotificationSetting)
