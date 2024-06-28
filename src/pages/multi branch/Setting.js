import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import {
  Table,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Label,
  Input,
  FormFeedback,
  Badge,
  Modal,
  ModalBody,
  Form,
} from "reactstrap"

import { connect } from "react-redux"

import { useFormik } from "formik"
import * as Yup from "yup"
import { createClient } from "@supabase/supabase-js"
import { toast, ToastContainer } from "react-toastify"
import DataTable from "react-data-table-component"
import { v4 as uuidv4 } from "uuid"
import "react-toastify/dist/ReactToastify.css"

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"
import { isNil } from "lodash"

const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)

const Setting = props => {
  document.title =
    "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard"

  const breadcrumbItems = [
    { title: "Smart school", link: "#" },
    { title: "Setting", link: "#" },
  ]
  const navigate = useNavigate()

  const [data, setdata] = useState([])
  const [student, setStudent] = useState([])
  const [keyword, setkeyword] = useState("")
  const [roles, setroles] = useState([])
  const [staff, setStaff] = useState([])
  const [parent, setparent] = useState([])

  async function getdata() {
    const { data, error } = await supabase.from("Branchs").select("*")
    setdata(data ?? [])
  }

  useEffect(() => {
    props.setBreadcrumbItems("Branchs", breadcrumbItems)
    getdata()
  }, [])

  const handleSearch = async () => {
    const { data, error } = await supabase
      .from("Branch")
      .select("*")
      .or(`name.ilike.%${keyword}%`)

    setdata(data)
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

  const handelEdit = async row => {
    validation.setFieldValue("name", row.name)
    validation.setFieldValue("id", row.id)

    setshow(true)
    settype("edit")
  }

  const handelDelete = async id => {
    const { error } = await supabase.from("Branchs").delete().eq("id", id)

    if (error) {
      toast.error("Branchs Deleted Failed", { autoClose: 2000 })
    } else {
      toast.success("Branchs Deleted", { autoClose: 2000 })
    }
  }

  const columns = [
    {
      name: "Name",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.name ?? "None",
    },
    {
      name: "Action",
      //allowOverflow: true,
      reorder: true,
      center: true,
      minWidth: "300px",

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

  const [show, setshow] = useState(false)
  const [type, settype] = useState("new")

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: "",
    },

    validationSchema: Yup.object({}),
    onSubmit: async values => {
      if (type === "new") {
        const { data, error } = await supabase
          .from("Branchs")
          .insert([
            { 
              name: values.name,
            },
          ])
          .select()

        if (error) {
          toast.error("Branchs Inserted Failed", { autoClose: 2000 })
        } else {
          toast.success("Branchs Inserted", { autoClose: 2000 })
          setshow(false)
          validation.resetForm()
          getdata()
        }
      } else {
        const { data, error } = await supabase
          .from("Branchs")
          .update([
            {
              name: values.name,
            },
          ])
          .eq("id", values.id)
          .select()

        if (error) {
          toast.error("Branchs Updated Failed", { autoClose: 2000 })
        } else {
          toast.success("Branchs Updated", { autoClose: 2000 })
          setshow(false)
          validation.resetForm()
          getdata()
        }
      }
    },
  })

  const handleClick = () => {
    settype("new")
    validation.resetForm()
    setshow(true)
  }

  return (
    <React.Fragment>
      <Row>
        <div className="d-flex mb-2">
          {/* Vos éléments de filtre ici */}
          <label className="col-form-label">Search By Keyword :</label>&nbsp;
          <div className="col-md-4 me-2">
            <input
              type="text"
              value={keyword}
              onChange={val => {
                setkeyword(val.target.value)
              }}
              className="form-control"
              placeholder="Search By Name ..."
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
          <button className="btn btn-primary" onClick={handleClick}>
            Add Branch
          </button>
        </div>
      </Row>
      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <CardTitle className="h4"> Branchs Details </CardTitle>

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
                <Label htmlFor="useremail">name</Label>

                <input
                  id="name"
                  name="name"
                  className="form-control"
                  placeholder="Enter name"
                  type="name"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.name || ""}
                  invalid={
                    validation.touched.name && validation.errors.name
                      ? true
                      : false
                  }
                />

                {validation.touched.name && validation.errors.name ? (
                  <FormFeedback type="invalid">
                    {validation.errors.name}
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

export default connect(null, { setBreadcrumbItems })(Setting)
