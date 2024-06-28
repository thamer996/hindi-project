import React, { useEffect, useState } from "react"
import {  useNavigate } from "react-router-dom"

import { Table, Row, Col, Card, CardBody, CardTitle, Input, Label, FormFeedback, ModalBody, Modal, Form } from "reactstrap"

import { connect } from "react-redux"

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useFormik } from "formik"
import * as Yup from "yup"
import { createClient } from "@supabase/supabase-js"
import DataTable from "react-data-table-component"

const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)

const IncidentsSuperAdminBehaviour = props => {
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
    
    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "Academics", link: "#" },
      ]
    const [incident, setIncident] = useState([])
    const [show, setshow] = useState(false)
    const [type, settype] = useState("new")
    const [search, setSearch] = useState("")
    
  const navigate = useNavigate()

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      title: "",
      point: "",
      description: "",
     
    },

    validationSchema: Yup.object({
        title: Yup.string().required("Please Enter Your Title"),
        point: Yup.string().required("Please Enter the number of Points"),
        description: Yup.string().required("Please Enter The description"),
    }),
    onSubmit: async values => {
      if (type === "new") {
        const { data, error } = await supabase
          .from("Incident")
          .insert([
            { brancheId: localStorage.getItem("BranchId") ?? 1,
                title: values.title,
                point: values.point,
                description: values.description,
            },
          ])
          .select()

        if (error) {
          console.log("ez", error)
          toast.error("incident Inserted Failed", { autoClose: 2000 })
        } else {
          toast.success("incident Inserted", { autoClose: 2000 })
          setshow(false)
          getIncident()
          validation.resetForm()
        }
      } else {
        const { data, error } = await supabase
          .from("Incident")
          .update([
            {
                title: values.title,
                point: values.point,
                description: values.description,
            },
          ])
          .eq("id", values.id)
          .select()

        if (error) {
          toast.error("Incident Updated Failed", { autoClose: 2000 })
        } else {
          toast.success("Incident Updated", { autoClose: 2000 })
          setshow(false)
          getIncident()
          validation.resetForm()
        }
      }
    },
  })
  const handelEdit = async row => {
    validation.resetForm()
    validation.setFieldValue("title", row.title)
    validation.setFieldValue("point", row.point)
    validation.setFieldValue("description", row.description)
    validation.setFieldValue("id", row.id)
    setshow(true)
    settype("edit")
  }
  const handelDelete = async id => {
    const { error } = await supabase.from("Incident").delete().eq("id", id)

    if (error) {
      toast.error("Incident Deleted Failed", { autoClose: 2000 })
    } else {
      toast.success("Incident Deleted", { autoClose: 2000 })
      getIncident()
    }
  }

  const handleSearch = async () => {
    const { data, error } = await supabase
      .from("Incident")
      .select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
      
      .or(
`title.like.%${search}%` ,
`point.like.%${search}%`,
`description.like.%${search}%`     )
setIncident(data)
  }


  const handleClick = () => {
    settype('new')
    validation.resetForm()
    setshow(true)
  }
  async function getIncident() {
    const { data, error } = await supabase.from("Incident").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    setIncident(data ?? [])
    console.log('data', data)
    console.log('incident', incident)
  }

  useEffect(() => {
    props.setBreadcrumbItems("Subjects", breadcrumbItems)
    getIncident()
  }, [])
  const columns = [
    {
      name: "Title",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.title,
    },
    {
      name: "Point",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.point,
    },
    {
      name: "Description",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.description,
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

          <label className="col-form-label">Incident </label>
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
                getIncident()
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
            Add Incident
          </button>
        </div>
      </Row>
      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <CardTitle className="h4"> Incident List </CardTitle>
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
                  data={incident}
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
              <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  className="form-control"
                  placeholder="Enter title"
                  type="title"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.title || ""}
                  invalid={
                    validation.touched.title &&
                    validation.errors.title
                      ? true
                      : false
                  }
                />
                {validation.touched.title &&
                validation.errors.title ? (
                  <FormFeedback type="invalid">
                    {validation.errors.title}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
              <Label htmlFor="point">Point</Label>
                <Input
                  id="point"
                  name="point"
                  className="form-control"
                  placeholder="Enter point"
                  type="point"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.point || ""}
                  invalid={
                    validation.touched.point &&
                    validation.errors.point
                      ? true
                      : false
                  }
                />
                {validation.touched.point &&
                validation.errors.point ? (
                  <FormFeedback type="invalid">
                    {validation.errors.point}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
              <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  name="description"
                  className="form-control"
                  placeholder="Enter description"
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
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(
  IncidentsSuperAdminBehaviour,
)
