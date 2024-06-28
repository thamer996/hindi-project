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
  Alert,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
} from "reactstrap"
import _ from "lodash"
import { isEmpty } from "lodash"

//
import * as XLSX from "xlsx"
import { connect } from "react-redux"

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"
import { useFormik } from "formik"
import * as Yup from "yup"
import { createClient } from "@supabase/supabase-js"
import { toast, ToastContainer } from "react-toastify"
import DataTable from "react-data-table-component"

const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)
const AssignIncidentSuperAdminBehaviour = props => {
  document.title =
    "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard"

  const [sectionss, setSectionss] = useState([])
  const [data, setdata] = useState([])
  const [assignIncident, setAssignIncident] = useState([])
  const [incidentById, setIncidentById] = useState([])
  const [Class, setClass] = useState("")
  const [clas, setClas] = useState([])
  const [keyword, setkeyword] = useState("")
  const [Section, setSection] = useState("")
  const [incident, setIncident] = useState([])
  const [show, setshow] = useState(false)
  const [type, settype] = useState("new")
  const [idStudent, setIdStudent] = useState("")
  const [openAcc, setOpenAcc] = useState(false)
  const [show1, setshow1] = useState(false)

  const breadcrumbItems = [
    { title: "Smart school", link: "#" },
    { title: "Behaviour", link: "#" },
  ]
  const navigate = useNavigate()

  useEffect(() => {
    props.setBreadcrumbItems("Assign Incident", breadcrumbItems)
  })
  const handleClick = () => {
    navigate("/add-students")
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
  const handleSearch = async () => {
    const { data, error } = await supabase
      .from("Student")
      .select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
      .ilike("class", `%${Class}%`)
      .ilike("section", `%${Section}%`)
      .or(
        `firstName.ilike.%${keyword}%,rollNumber.ilike.%${keyword}%,lastName.ilike.%${keyword}%,category.ilike.%${keyword}%,rollNumber.ilike.%${keyword}%,mobileNumber.ilike.%${keyword}%`,
      )

    setdata(data)
  }

  async function getStudents() {
    const { data, error } = await supabase.from("Student").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    setdata(data ?? [])
    console.log("data, ++", data)
  }
  async function getClass() {
    const { data, error } = await supabase.from("Class").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    setClas(data ?? [])
  }
  async function getAssignIncident(stRef) {
    setAssignIncident(data ?? [])
  }

  async function getIncidentById(stRef) {
    const { data, error } = await supabase
      .from("AssignIncident")
      .select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
      .eq("studentRef", stRef?.id)

    const listincidentById = []

    const arrayOfPromiseApp = []

    data[0].incidentRef.forEach(async el => {
      arrayOfPromiseApp.push(
        supabase.from("Incident").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1).eq("id", el).single(),
      )
    })

    const test = await Promise.all(arrayOfPromiseApp)

    test.map(el => listincidentById.push(el.data))

    console.log("IncidentById )))))))))))", listincidentById)

    setIncidentById(listincidentById ?? [])
    validation.setFieldValue("studentRef", stRef)
    settype("edit")
    setshow1(true)
  }
  const handleClickExcel = () => {
    const array = data

    if (!isEmpty(array)) {
      const wb = XLSX.utils.book_new()
      const ws = XLSX.utils.json_to_sheet(array)

      const colsize = []

      Object.keys(array[0]).forEach(element => {
        const arrayGrouped = _.groupBy(array, element)
        const max = _.maxBy(Object.keys(arrayGrouped), function (o) {
          return o?.length
        })
        colsize.push({
          wch:
            element?.length > max?.length
              ? element?.length
              : max?.length ?? 0 + 10,
        })
      })
      ws["!cols"] = colsize

      XLSX.utils.book_append_sheet(wb, ws, "Details")

      XLSX.writeFile(wb, `EXPORT.xlsx`)
    } else {
      toast.error("NO DATA TO EXPORT")
    }
  }
  //Function calcul point:::

  useEffect(() => {
    props.setBreadcrumbItems("Student Details", breadcrumbItems)
    getStudents()
    getClass()
    getIncident()
    // getAssignIncident()
    // getIncidentById(assignIncident.map((e) => e.incidentRef))
  }, [])
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      incident: {},
      incidentList: [],
      studentRef: "",
    },

    validationSchema: Yup.object({
      // incident: Yup.object().shape({
      //   // title: Yup.string().required("Please provide a title for the incident"), // Validation for title property
      //   // description: Yup.string().required("Please provide a description for the incident"), // Validation for description property
      //   // point: Yup.string().required("Please select an incident"), // Validation for point property
      //   // // You can define validation for other properties of the incident object here
      // }).required("Please select an incident"),
    }),
    onSubmit: async values => {
      const { data: existingData, error: existingError } = await supabase
        .from("AssignIncident")
        .select()
        .eq("studentRef", values.studentRef)

      if (existingError) {
        console.error("Error checking existing record:", existingError)
        toast.error("Error occurred while checking existing record", {
          autoClose: 2000,
        })
        return
      }

      if (existingData && existingData.length > 0) {
        const old = existingData[0].incidentRef
        const newData = values.incident.map(el => JSON.parse(el).id)

        const totalPoint =
          Number(existingData[0].totalPoint) +
          Number(
            _.sumBy(
              values.incident.map(el => Number(JSON.parse(el).point)),
              function (o) {
                return Number(o)
              },
            ),
          )

        const { data: updateData, error: updateError } = await supabase
          .from("AssignIncident")
          .update({
            incidentRef: _.concat(old, newData),
            totalPoint: totalPoint,
          })
          .eq("studentRef", values.studentRef)

        if (updateError) {
          console.error("Error updating record:", updateError)
          toast.error("AssignIncident Operation Failed", { autoClose: 2000 })
        } else {
          console.log("Record updated successfully:", updateData)
          toast.success("AssignIncident Updated", { autoClose: 2000 })
          const { dataStd, errorStd } = await supabase
            .from("Student")
            .update({ pickupPoint: totalPoint })
            .eq("id", values.studentRef)
            .select()
        }
      } else {
        const totalPoint =
          Number(0) +
          Number(
            _.sumBy(
              values.incident.map(el => Number(JSON.parse(el).point)),
              function (o) {
                return Number(o)
              },
            ),
          )

        const { data: insertData, error: insertError } = await supabase
          .from("AssignIncident")
          .insert([
            { brancheId: localStorage.getItem("BranchId") ?? 1,
              studentRef: values.studentRef,
              incidentRef: values.incident.map(el => JSON.parse(el).id),
              totalPoint: totalPoint,
            },
          ])

        if (insertError) {
          console.error("Error inserting record:", insertError)
          toast.error("AssignIncident Operation Failed", { autoClose: 2000 })
        } else {
          console.log("Record inserted successfully:", insertData)
          toast.success("AssignIncident Inserted", { autoClose: 2000 })

          const { dataStd, errorStd } = await supabase
            .from("Student")
            .update({ pickupPoint: totalPoint })
            .eq("id", values.studentRef)
            .select()
        }
      }

      setshow(false)
      getIncident()
      getStudents()
      validation.resetForm()
    },
  })
  async function getIncident() {
    const { data, error } = await supabase.from("Incident").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    setIncident(data ?? [])
    console.log("data", data)
    console.log("incident", incident)
  }
  const handelAdd = async row => {
    validation.resetForm()
    // validation.setFieldValue("subjectName", row.subjectName)
    // validation.setFieldValue("subjectCode", row.subjectCode)
    // validation.setFieldValue("subjectType", row.subjectType)
    // validation.setFieldValue("id", row.id)

    console.log("row data and incident", row)
    validation.setFieldValue("studentRef", row.id)

    setshow(true)
    setIdStudent(row)
    settype("new")
  }
  const columns = [
    {
      name: "Student Name",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.firstName ?? "None",
    },
    {
      name: "Admission No",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.admissionNo ?? "None",
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
      name: "Gender",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.gender,
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
      name: "Total Points Number",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.pickupPoint || 0,
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
              <span style={editIconStyle} onClick={() => handelAdd(row)}>
                <i className="ti-plus"></i>
              </span>
              <span style={iconStyle} onClick={() => getIncidentById(row)}>
                <i className="ti-eye"></i>
              </span>
            </>
          </div>
        )
      },
    },
  ]
  const toggleAcc = id => {
    if (openAcc === id) {
      setOpenAcc()
    } else {
      setOpenAcc(id)
    }
  }

  return (
    <React.Fragment>
      <Row>
        <div className="d-flex mb-2">
          <div></div>
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
        <div className="d-flex justify-content-end  mb-2">
          <div></div>
          {/* Button */}
   
          <button className="btn btn-primary ms-3" onClick={handleClickExcel}>
            Export Excel
          </button>
        </div>
      </Row>

      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <CardTitle className="h4"> Assign Incident List </CardTitle>

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
        size="lg"
      >
        <ModalBody className="py-3 px-5">
          <Form
            className="form-horizontal mt-4"
            onSubmit={validation.handleSubmit}
          >
            <Row>
              <div className="mb-3">
                <Label htmlFor="useremail">Incident List</Label>
                <select
                  id="incident"
                  name="incident"
                  className="form-control"
                  placeholder="Enter incident"
                  type="incident"
                  multiple
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.incident || ""}
                  invalid={
                    validation.touched.incident && validation.errors.incident
                      ? true
                      : false
                  }
                >
                  <option value={""}>Select</option>
                  {incident?.map(el => (
                    <option key={el.id} value={JSON.stringify(el)}>
                      <Alert
                        color={
                          el.point > 0
                            ? "success"
                            : el.point < 0
                              ? "danger"
                              : "secondary"
                        }
                        className="container"
                      >
                        <h4 className="alert-heading"> {el.title} </h4>
                        <hr />
                        <p
                          style={{ whiteSpace: "pre-wrap" }}
                          className="text-break"
                        >
                          {el.description}
                        </p>

                        <p className="mb-0">Points : {el.point}</p>
                      </Alert>
                    </option>
                  ))}
                </select> 
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

      <Modal
        isOpen={show1}
        toggle={() => setshow1(!show1)}
        centered={true}
        size="lg"
      >
        <ModalBody className="py-3 px-5">
          <Form
            className="form-horizontal mt-4"
            onSubmit={validation.handleSubmit}
          >
            <Row>
              <div className="mb-3">
                <Label htmlFor="useremail">incident detail</Label>

                <Accordion flush open={openAcc} toggle={toggleAcc}>
                  {incidentById?.map(el => (
                    <AccordionItem key={el.id}>
                      <AccordionHeader targetId={el.id}>
                        {el.title}
                      </AccordionHeader>
                      <AccordionBody accordionId={el.id}>
                        <strong>{el.description}</strong>
                        <code>{el.point}</code>
                      </AccordionBody>
                    </AccordionItem>
                  ))}
                </Accordion>

             
              </div>

        
            </Row>
          </Form>
        </ModalBody>
      </Modal>
      <ToastContainer />
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(
  AssignIncidentSuperAdminBehaviour,
)
