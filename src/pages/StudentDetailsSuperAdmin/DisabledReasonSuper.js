import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import * as XLSX from "xlsx"
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
  ModalHeader,
} from "reactstrap"

import { connect } from "react-redux"

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"
import HeaderTeacher from "../../components/HorizontalLayoutTeacher/HeaderTeacher"
import NvbarTeacher from "../../components/HorizontalLayoutTeacher/NvbarTeacher"
import { useFormik } from "formik"
import * as Yup from "yup"
import { createClient } from "@supabase/supabase-js"
import { toast, ToastContainer } from "react-toastify"
import DataTable from "react-data-table-component"
import _, { isEmpty } from "lodash"

const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)

const DisabledReasonSuper = props => {
  document.title =
    "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard"

  const breadcrumbItems = [
    { title: "Smart school", link: "#" },
    { title: "Student Details", link: "#" },
  ]
  const navigate = useNavigate()
  const [data, setdata] = useState([])
  const [show, setshow] = useState(false)

  const [disable_reason, setdisable_reason] = useState("")
  const [type, settype] = useState("")

  async function getDisabeledReason() {
    const { data, error } = await supabase
      .from("DisableReason")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
    setdata(data ?? [])
  }

  useEffect(() => {
    props.setBreadcrumbItems("Disable Reason", breadcrumbItems)
    getDisabeledReason()
  }, [])

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      disable_reason: "",
    },

    validationSchema: Yup.object({
      disable_reason: Yup.string().required("Please Enter Your disable_reason"),
    }),
    onSubmit: async values => {
      if (type === "add") {
        const { data, error } = await supabase
          .from("DisableReason")
          .insert([
            {
              brancheId: localStorage.getItem("BranchId") ?? 1,
              disable_reason: values.disable_reason,
            },
          ])
          .select()

        if (error) {
          toast.error("disable_reason Added Failed", { autoClose: 2000 })
        } else {
          toast.success("disable_reason Added", { autoClose: 2000 })
          setshow(false)
          getDisabeledReason()
          validation.resetForm()
        }
      } else {
        const { data, error } = await supabase
          .from("DisableReason")
          .update([
            {
              disable_reason: values.disable_reason,
            },
          ])
          .eq("id", values.id)
          .select()

        if (error) {
          toast.error("disable_reason Updated Failed", { autoClose: 2000 })
        } else {
          toast.success("disable_reason Updated", { autoClose: 2000 })
          setshow(false)
          getDisabeledReason()
          validation.resetForm()
        }
      }
    },
  })

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

  const handleSearch = async () => {
    const { data, error } = await supabase
      .from("DisableReason")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
      .ilike("disable_reason", `%${disable_reason}%`)

    setdata(data)
  }
  const handelAddEdit = async (row, action) => {
    validation.resetForm()
    if (action === "edit") {
      validation.setFieldValue("disable_reason", row.disable_reason)
      validation.setFieldValue("id", row.id)
    }
    settype(action)
    setshow(true)
  }
  const handelDelete = async id => {
    const { error } = await supabase.from("DisableReason").delete().eq("id", id)

    if (error) {
      toast.error("DisableReason Deleted Failed", { autoClose: 2000 })
    } else {
      toast.success("DisableReason Deleted", { autoClose: 2000 })
      getDisabeledReason()
    }
  }

  const handleClick = () => {
    navigate("/student-add-disable-reason-student")
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
      name: "DisableReason",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.disable_reason ?? "None",
    },
    {
      name: "DisableReason ID",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.id ?? "None",
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
              <span
                style={editIconStyle}
                onClick={() => handelAddEdit(row, "edit")}
              >
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
          <label className="col-form-label">DisableReason</label>&nbsp;
          <div className="col-md-2 me-1">
            <input
              onChange={val => {
                setdisable_reason(val.target.value)
              }}
              value={disable_reason}
              type="text"
              className="form-control"
              placeholder=""
            />
          </div>
          <div>
            <button className="btn btn-primary" onClick={handleSearch}>
              Search
            </button>
          </div>
          <div className="ms-1">
            <button
              className="btn btn-danger ms-2"
              onClick={() => {
                setdisable_reason("")
              }}
            >
              Reset
            </button>
          </div>
        </div>
        <div className="d-flex justify-content-end  mb-2">
          <div></div>
          {/* Button */}
          <button
            className="btn btn-primary"
            onClick={() => {
              handelAddEdit({}, "add")
            }}
          >
            Add DisableReason
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
              <CardTitle className="h4"> Disable Reason List </CardTitle>

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
        <ModalHeader>{type}</ModalHeader>
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
                  <Label htmlFor="useremail">disable_reason</Label>
                  <Input
                    id="disable_reason"
                    name="disable_reason"
                    className="form-control"
                    placeholder="Enter section disable_reason"
                    type="disable_reason"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.disable_reason || ""}
                    invalid={
                      validation.touched.disable_reason &&
                      validation.errors.disable_reason
                        ? true
                        : false
                    }
                  />
                  {validation.touched.disable_reason &&
                  validation.errors.disable_reason ? (
                    <FormFeedback type="invalid">
                      {validation.errors.disable_reason}
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
      <ToastContainer />
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(DisabledReasonSuper)
