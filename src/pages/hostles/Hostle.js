import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { createClient } from "@supabase/supabase-js"
import * as XLSX from "xlsx"
import {
  Table,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Container,
  Label,
  Input,
  Modal,
  ModalBody,
  Form,
  FormFeedback,
} from "reactstrap"

import { connect } from "react-redux"

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"
import DataTable from "react-data-table-component"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useFormik } from "formik"
import * as Yup from "yup"
import _, { isEmpty } from "lodash"

const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)

const Hostel = props => {
  document.title =
    "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard"

  const [hostel, setHostel] = useState([])
  const [search, setSearch] = useState("")
  const [type, settype] = useState("new")
  const [show, setshow] = useState(false)
  async function getHostel() {
    const { data, error } = await supabase
      .from("Hostel")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
    setHostel(data ?? [])
  }

  const handleClickExcel = () => {
    const array = hostel

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

  const handleSearch = async () => {
    console.log("search", search)

    const { data, error } = await supabase
      .from("Hostel")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
      .ilike("hostelName", `%${search}%`)
      .or(
        `Type.like.%${search}%`,
        `Address.like.%${search}%`,
        `Intake.like.%${search}%`,
      )
    console.log("dataaaa", data)
    setHostel(data)
  }
  const breadcrumbItems = [
    { title: "Smart school", link: "#" },
    { title: "Hostel", link: "#" },
  ]
  const navigate = useNavigate()

  useEffect(() => {
    props.setBreadcrumbItems("Hostel", breadcrumbItems)
    getHostel()
  }, [])
  const handleClick = () => {
    settype("new")
    validation.resetForm()
    setshow(true)
  }
  const handelEdit = async row => {
    console.log("row", row)
    validation.resetForm()
    validation.setFieldValue("hostelName", row.hostelName)
    validation.setFieldValue("Type", row.Type)
    validation.setFieldValue("Address", row.Address)
    validation.setFieldValue("Intake", row.Intake)
    validation.setFieldValue("id", row.id)
    setshow(true)
    settype("edit")
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
    const { error } = await supabase.from("Hostel").delete().eq("id", id)

    if (error) {
      toast.error("Hostel Deleted Failed", { autoClose: 2000 })
    } else {
      toast.success("Hostel Deleted", { autoClose: 2000 })
      getHostel()
    }
  }
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      hostelName: "",
      Type: "",
      Address: "",
      Intake: "",
    },

    validationSchema: Yup.object({
      hostelName: Yup.string().required("Please Enter Your hostelName"),
      Type: Yup.string().required("Please Enter Your type "),
      Address: Yup.string().required("Please Enter Your address "),
      Intake: Yup.string().required("Please Enter Your intake "),
    }),
    onSubmit: async values => {
      if (type === "new") {
        const { data, error } = await supabase
          .from("Hostel")
          .insert([
            {
              brancheId: localStorage.getItem("BranchId") ?? 1,
              hostelName: values.hostelName,
              Type: values.Type,
              Address: values.Address,
              Intake: values.Intake,
            },
          ])
          .select()

        if (error) {
          console.log("ez", error)
          toast.error("Hostel Inserted Failed", { autoClose: 2000 })
        } else {
          toast.success("Hostel Inserted", { autoClose: 2000 })
          setshow(false)
          getHostel()
          validation.resetForm()
        }
      } else {
        const { data, error } = await supabase
          .from("Hostel")
          .update([
            {
              hostelName: values.hostelName,
              Type: values.Type,
              Address: values.Address,
              Intake: values.Intake,
            },
          ])
          .eq("id", values.id)
          .select()

        if (error) {
          toast.error("Hostel Updated Failed", { autoClose: 2000 })
        } else {
          toast.success("Hostel Updated", { autoClose: 2000 })
          setshow(false)
          getHostel()
          validation.resetForm()
        }
      }
    },
  })

  const columns = [
    {
      name: "Hostel Name",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.hostelName,
    },
    {
      name: "Type",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.Type,
    },
    {
      name: "Address",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.Address,
    },
    {
      name: "Intake",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.Intake,
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

          <label className="col-form-label">Hostel </label>
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
                getHostel()
              }}
            >
              Reset
            </button>
          </div>
        </div>
        <div className="d-flex justify-content-end  mb-2">
          <div></div>
          {/* Button */}
          <button className="btn btn-primary" onClick={handleClick}>
            Add Hostel
          </button>
          <button className="btn btn-primary ms-3" onClick={handleClickExcel}>
            Export Excel
          </button>
        </div>
      </Row>
      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <CardTitle className="h4">Hostel List </CardTitle>
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
                  data={hostel}
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
                <Label htmlFor="useremail">Hostel Name</Label>
                <Input
                  id="hostelName"
                  name="hostelName"
                  className="form-control"
                  placeholder="Enter hostelName"
                  type="hostelName"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.hostelName || ""}
                  invalid={
                    validation.touched.hostelName &&
                    validation.errors.hostelName
                      ? true
                      : false
                  }
                />
                {validation.touched.hostelName &&
                validation.errors.hostelName ? (
                  <FormFeedback type="invalid">
                    {validation.errors.hostelName}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label htmlFor="useremail">Type</Label>
                <Input
                  id="Type"
                  name="Type"
                  className="form-control"
                  placeholder="Enter Type"
                  type="Type"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.Type || ""}
                  invalid={
                    validation.touched.Type && validation.errors.Type
                      ? true
                      : false
                  }
                />
                {validation.touched.Type && validation.errors.Type ? (
                  <FormFeedback type="invalid">
                    {validation.errors.Type}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label htmlFor="useremail">Address</Label>
                <Input
                  id="Address"
                  name="Address"
                  className="form-control"
                  placeholder="Enter Address"
                  type="Address"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.Address || ""}
                  invalid={
                    validation.touched.Address && validation.errors.Address
                      ? true
                      : false
                  }
                />
                {validation.touched.Address && validation.errors.Address ? (
                  <FormFeedback type="invalid">
                    {validation.errors.Address}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label htmlFor="useremail">Intake</Label>
                <Input
                  id="Intake"
                  name="Intake"
                  className="form-control"
                  placeholder="Enter Intake"
                  type="Intake"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.Intake || ""}
                  invalid={
                    validation.touched.Intake && validation.errors.Intake
                      ? true
                      : false
                  }
                />
                {validation.touched.Intake && validation.errors.Intake ? (
                  <FormFeedback type="invalid">
                    {validation.errors.Intake}
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

export default connect(null, { setBreadcrumbItems })(Hostel)
