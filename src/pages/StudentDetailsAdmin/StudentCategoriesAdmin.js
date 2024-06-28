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
const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)

const StudentCategorieSuper = props => {
  document.title =
    "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard"

  const breadcrumbItems = [
    { title: "Smart school", link: "#" },
    { title: "Student Information", link: "#" },
  ]
  const navigate = useNavigate()
  const [data, setdata] = useState([])
  const [show, setshow] = useState(false)

  const [category, setcategory] = useState("")
  const [type, settype] = useState("")

  async function getCategory() {
    const { data, error } = await supabase.from("Category").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    setdata(data ?? [])
  }

  useEffect(() => {
    props.setBreadcrumbItems("Category", breadcrumbItems)
    getCategory()
  }, [])

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      category: "",
    },

    validationSchema: Yup.object({
      category: Yup.string().required("Please Enter Your category"),
    }),
    onSubmit: async values => {
      if (type === "add") {
        const { data, error } = await supabase
          .from("Category")
          .insert([
            { brancheId: localStorage.getItem("BranchId") ?? 1,
              category: values.category,
            },
          ])
          .select()

        if (error) {
          toast.error("category Added Failed", { autoClose: 2000 })
        } else {
          toast.success("category Added", { autoClose: 2000 })
          setshow(false)
          getCategory()
          validation.resetForm()
        }
      } else {
        const { data, error } = await supabase
          .from("Category")
          .update([
            {
              category: values.category,
            },
          ])
          .eq("id", values.id)
          .select()

        if (error) {
          toast.error("category Updated Failed", { autoClose: 2000 })
        } else {
          toast.success("category Updated", { autoClose: 2000 })
          setshow(false)
          getCategory()
          validation.resetForm()
        }
      }
    },
  })

  const handleSearch = async () => {
    const { data, error } = await supabase
      .from("Category")
      .select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
      .ilike("category", `%${category}%`)

    setdata(data)
  }

  const handelAddEdit = async (row, action) => {
    validation.resetForm()
    if (action === "edit") {
      validation.setFieldValue("category", row.category)
      validation.setFieldValue("id", row.id)
    }
    settype(action)
    setshow(true)
  }
  const handleClick = () => {
    navigate("/student-add-categorie-student")
  }
  const handleClickProfile = () => {
    navigate("/student-profile")
  }

  const handelDelete = async id => {
    const { error } = await supabase.from("Category").delete().eq("id", id)

    if (error) {
      toast.error("Category Deleted Failed", { autoClose: 2000 })
    } else {
      toast.success("Category Deleted", { autoClose: 2000 })
      getCategory()
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
      name: "Category",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.category ?? "None",
    },
    {
      name: "Category ID",
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
          <label className="col-form-label">Category</label>&nbsp;
          <div className="col-md-2 me-1">
            <input
              type="text"
              onChange={val => {
                setcategory(val.target.value)
              }}
              value={category}
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
                setcategory("")
              }}
            >
              Reset
            </button>
          </div>
        </div>
        <div className="d-flex justify-content-between  mb-2">
          <div></div>
          {/* Button */}
          <button
            className="btn btn-primary"
            onClick={() => {
              handelAddEdit({}, "add")
            }}
          >
            Add Category
          </button>
        </div>
      </Row>
      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <CardTitle className="h4"> Category List </CardTitle>

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
                  <Label htmlFor="useremail">category</Label>
                  <Input
                    id="category"
                    name="category"
                    className="form-control"
                    placeholder="Enter section category"
                    type="category"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.category || ""}
                    invalid={
                      validation.touched.category && validation.errors.category
                        ? true
                        : false
                    }
                  />
                  {validation.touched.category && validation.errors.category ? (
                    <FormFeedback type="invalid">
                      {validation.errors.category}
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

export default connect(null, { setBreadcrumbItems })(StudentCategorieSuper)
