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
import _ from "lodash"
import { isEmpty } from "lodash"

//
import * as XLSX from "xlsx"
const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)

const MarksDevision = props => {
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


  async function getCountries() {
    const { data, error } = await supabase.from("MarksDevision").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    setSection(data ?? [])
  }


  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      divisionName: "",
      percentForm: "",
      percentUpto: "",
      id: "",
    },

    validationSchema: Yup.object({}),
    onSubmit: async values => {
      if (type === "new") {
        const { data, error } = await supabase
          .from("MarksDevision")
          .insert([
            { brancheId: localStorage.getItem("BranchId") ?? 1,
              divisionName: values.divisionName,
              percentForm: values.percentForm,
              percentUpto: values.percentUpto,
            },
          ])
          .select()

        if (error) {
          console.log("ez", error)
          toast.error("MarksDevision Inserted Failed", { autoClose: 2000 })
        } else {
          toast.success("MarksDevision Inserted", { autoClose: 2000 })
          setshow(false)
          getCountries()

          validation.resetForm()
        }
      } else {
        const { data, error } = await supabase
          .from("MarksDevision")
          .update([
            {
              divisionName: values.divisionName,
              percentForm: values.percentForm,
              percentUpto: values.percentUpto,
            },
          ])
          .eq("id", values.id)
          .select()

        if (error) {
          toast.error("MarksDevision Updated Failed", { autoClose: 2000 })
        } else {
          toast.success("MarksDevision Updated", { autoClose: 2000 })
          setshow(false)
          getCountries()
          validation.resetForm()
        }
      }
    },
  })

  const navigate = useNavigate()

  useEffect(() => {
    props.setBreadcrumbItems("MarksDevision", breadcrumbItems)
    getCountries()
  }, [])

  const handleClick = () => {
    settype("new")
    validation.resetForm()
    setshow(true)
  }
  const handleClickExcel = () => {
    const array = section

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
    const { data, error } = await supabase
      .from("MarksDevision")
      .select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
      .ilike("divisionName", `%${search}%`)
    setSection(data)
  }

  const handelEdit = async row => {
    validation.resetForm()

    validation.setFieldValue("divisionName", row.divisionName)
    validation.setFieldValue("percentForm", row.percentForm)
    validation.setFieldValue("percentUpto", row.percentUpto)

    validation.setFieldValue("id", row.id)
    setshow(true)
    settype("edit")
  }

  const handelDelete = async id => {
    const { error } = await supabase.from("MarksDevision").delete().eq("id", id)

    if (error) {
      toast.error("MarksDevision Deleted Failed", { autoClose: 2000 })
    } else {
      toast.success("MarksDevision Deleted", { autoClose: 2000 })
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
      name: "Division Name",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.divisionName,
    },
    {
      name: "Percentage From",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row.percentForm,
    },
    {
      name: "Percentage Upto",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row.percentUpto,
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

          <label className="col-form-label"> division Name </label>
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
        <div className="d-flex justify-content-end  mb-2">
          <div></div>
          {/* Button */}
          <button className="btn btn-primary" onClick={handleClick}>
            Add Marks Devision
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
              <CardTitle className="h4">Marks Devision List </CardTitle>
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

      <Modal isOpen={show} toggle={() => setshow(!show)} centered={true} size="xl">
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
                Division Name
              </label>
              <div className="col-md-10">
                <input
                  className="form-control"
                  id="divisionName"
                  name="divisionName"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.divisionName || ""}
                  type="text"
                />
              </div>
            </Row>

            <Row className="mb-3">
              <label
                htmlFor="example-text-input"
                className="col-md-2 col-form-label"
              >
                Percentage From
              </label>
              <div className="col-md-10">
                <input
                  className="form-control"
                  id="percentForm"
                  name="percentForm"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.percentForm || ""}
                  type="number"
                />
              </div>
            </Row>

            <Row className="mb-3">
              <label
                htmlFor="example-text-input"
                className="col-md-2 col-form-label"
              >
                PercentUpto
              </label>
              <div className="col-md-10">
                <input
                  className="form-control"
                  id="percentUpto"
                  name="percentUpto"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.percentUpto || ""}
                  type="number"
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
      <ToastContainer />
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(MarksDevision)
