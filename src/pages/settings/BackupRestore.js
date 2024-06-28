/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { Table, Row, Col, Card, CardBody, CardTitle, Form } from "reactstrap"

import { connect } from "react-redux"

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"
import DataTable from "react-data-table-component"
import { createClient } from "@supabase/supabase-js"

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useFormik } from "formik"
import * as Yup from "yup"
import _, { isEmpty } from "lodash"
import { v4 as uuidv4 } from "uuid"

const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)

const BackupRestore = props => {
  document.title =
    "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard"

  const breadcrumbItems = [
    { title: "Smart school", link: "#" },
    { title: "settings", link: "#" },
  ]

  const [section, setSection] = useState([])
  const [type, settype] = useState("new")
  const [doc, setDoc] = useState("")

  const navigate = useNavigate()

  async function getCountries() {
    const { data, error } = await supabase.from("Backup").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    setSection(data ?? [])
  }

  useEffect(() => {
    props.setBreadcrumbItems("Backup Restore", breadcrumbItems)
    getCountries()
  }, [])

  async function uploadDoc(e, setstate) {
    let file = e.target.files[0]

    const uuidv4Val = uuidv4()

    const { data, error } = await supabase.storage
      .from("uploads")
      .upload(uuidv4Val, file)

    if (data) {
      console.log("eeeeeeeeeeeeeeeeee", data?.path)
      setstate(data?.path)
    } else {
      console.log(error)
    }
  }

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: "",
    },

    validationSchema: Yup.object({}),
    onSubmit: async values => {
      if (type === "new" && !isEmpty(doc)) {
        const { data, error } = await supabase
          .from("Backup")
          .insert([
            { brancheId: localStorage.getItem("BranchId") ?? 1,
              name: doc,
            },
          ])
          .select()

        if (error) {
          toast.error("Backup Inserted Failed Hint : wait for Upload !", {
            autoClose: 2000,
          })
        } else {
          toast.success("Backup Inserted", { autoClose: 2000 })
          getCountries()

          validation.resetForm()
        }
      } else {
        const { data, error } = await supabase
          .from("Backup")
          .update([
            {
              name: doc,
            },
          ])
          .eq("id", values.id)
          .select()

        if (error) {
          toast.error("Backup Updated Failed", {
            autoClose: 2000,
          })
        } else {
          toast.success("Backup Updated", { autoClose: 2000 })
          getCountries()

          validation.resetForm()
        }
      }
    },
  })

  const handleClick = () => {
    navigate("/add-role")
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

  const handelDelete = async id => {
    const { error } = await supabase.from("Backup").delete().eq("id", id)

    if (error) {
      toast.error("Backup Deleted Failed", { autoClose: 2000 })
    } else {
      toast.success("Backup Deleted", { autoClose: 2000 })
      getCountries()
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
      minWidth: "280px",

      cell: row => {
        return (
          <div className="d-flex">
            <>
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
        <div className="d-flex   mb-2">
          <div></div>

          {/* Button */}

          <div></div>
        </div>

        <Col lg={8}>
          <Card>
            <CardBody>
              <CardTitle className="h4">Backup History </CardTitle>
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

        <Col lg={4}>
          <Card>
            <CardBody>
              <CardTitle className="h4">Upload From Local Directory </CardTitle>

              <Form
                className="form-horizontal mt-4"
                onSubmit={e => {
                  e.preventDefault()
                  validation.handleSubmit()
                  return false
                }}
              >
                <Row className="mb-3">
                  <div className="col-md-10">
                    <input
                      className="form-control"
                      type="file"
                      onChange={e => uploadDoc(e, setDoc)}
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
            </CardBody>
          </Card>
          {/* 
          <Card>
            <CardBody>
              <div className="d-flex justify-content-between  mb-2">
                <div></div>

                <button className="btn btn-primary">Regenerate</button>
              </div>
              <CardTitle className="h4">Cron Secret Key </CardTitle>
            </CardBody>
          </Card> */}
        </Col>
      </Row>
      <ToastContainer />
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(BackupRestore)
