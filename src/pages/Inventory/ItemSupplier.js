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
} from "reactstrap"

import { connect } from "react-redux"
import { createClient } from "@supabase/supabase-js"
//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"
import DataTable from "react-data-table-component"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useFormik } from "formik"
import * as Yup from "yup"

const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)

const ItemSupplier = props => {
  document.title =
    "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard"
  const [itemSupplier, setItemSupplier] = useState([])
  const [show, setshow] = useState(false)
  const [type, settype] = useState("new")
  const [search, setSearch] = useState("")

  async function getItemSupplier() {
    const { data, error } = await supabase.from("ItemSupplier").select("*")
    setItemSupplier(data ?? [])
  }

  const breadcrumbItems = [
    { title: "Smart school", link: "#" },
    { title: "Inventory", link: "#" },
  ]
  const navigate = useNavigate()

  useEffect(() => {
    props.setBreadcrumbItems("Item Supplier", breadcrumbItems)
    getItemSupplier()
  }, [])
  const handleClick = () => {
    settype('new')
    validation.resetForm()
    setshow(true)
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
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
      contactPersonName: "",
      contactPersonPhone: "",
      contactPersonEmail: "",
      description: "",
      id:"",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter The Name"),
      phone: Yup.string().required("Please Enter The Phone Number"),
      email: Yup.string().required("Please Enter The Email"),
      address: Yup.string().required("Please Enter The address "),
      contactPersonName: Yup.string().required(
        "Please Enter The contactPersonName",
      ),
      contactPersonPhone: Yup.string().required(
        "Please Enter The contactPersonPhone ",
      ),
      contactPersonEmail: Yup.string().required(
        "Please Enter The  contactPersonEmail",
      ),
      description: Yup.string().required("Please Enter The description"),
    }),
    onSubmit: async values => {
      if (type === "new") {
        const { data, error } = await supabase
          .from("ItemSupplier")
          .insert([
            {
              name: values.name,
              phone: values.phone,
              email: values.email,
              address: values.address,
              contactPersonName: values.contactPersonName,
              contactPersonPhone: values.contactPersonPhone,
              contactPersonEmail: values.contactPersonEmail,
              description: values.description,
            },
          ])
          .select()

        if (error) {
          console.log("ez", error)
          toast.error("Item Supplier Inserted Failed", { autoClose: 2000 })
        } else {
          toast.success("Item Supplier Inserted", { autoClose: 2000 })
          setshow(false)
          getItemSupplier()
          validation.resetForm()
        }
      } else {
        console.log("values",values)
        const { data, error } = await supabase
          .from("ItemSupplier")
          .update([
            {
              name: values.name,
              phone: values.phone,
              email: values.email,
              address: values.address,
              contactPersonName: values.contactPersonName,
              contactPersonPhone: values.contactPersonPhone,
              contactPersonEmail: values.contactPersonEmail,
              description: values.description,
            },
          ])
          .eq("id", values.id)
          .select()

        if (error) {
          toast.error("Item Supplier Updated Failed", { autoClose: 2000 })
        } else {
          toast.success("Item Supplier Updated", { autoClose: 2000 })
          setshow(false)
          getItemSupplier()
          validation.resetForm()
        }
      }
    },
  })
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
      .from("ItemSupplier")
      .select("*")
      .or(
        `name.like.%${search}%`,
        `phone.like.%${search}%`,
        `email.like.%${search}%`,
        `address.like.%${search}%`,
        `contactPersonName.like.%${search}%`,
        `contactPersonPhone.like.%${search}%`,
        `contactPersonEmail.like.%${search}%`,
      )
    setItemSupplier(data)
  }
  const handelEdit = async row => {
    validation.resetForm()
    validation.setFieldValue("name", row.name)
    validation.setFieldValue("phone", row.phone)
    validation.setFieldValue("email", row.email)
    validation.setFieldValue("address", row.address)
    validation.setFieldValue("contactPersonName", row.contactPersonName)
    validation.setFieldValue("contactPersonPhone", row.contactPersonPhone)
    validation.setFieldValue("contactPersonEmail", row.contactPersonEmail)
    validation.setFieldValue("description", row.description)
    validation.setFieldValue("id", row.id)
    setshow(true)
    settype("edit")
  }

  const handelDelete = async id => {
    const { error } = await supabase.from("ItemSupplier").delete().eq("id", id)

    if (error) {
      toast.error("ItemSupplier Deleted Failed", { autoClose: 2000 })
    } else {
      toast.success("ItemSupplier Deleted", { autoClose: 2000 })
      getItemSupplier()
    }
  }

  const columns = [
    {
      name: "name",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.name,
    },
    {
      name: "phone",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.phone,
    },
    {
      name: "email",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.email,
    },
    {
      name: "address",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.address,
    },
    {
      name: "contactPersonName",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.contactPersonName,
    },

    {
      name: "contactPersonPhone",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.contactPersonPhone,
    },

    {
      name: "contactPersonEmail",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.contactPersonEmail,
    },
    {
      name: "description",
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

          <label className="col-form-label">Item Supplier </label>
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
                getItemSupplier()
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
            Add Item Supplier
          </button>
        </div>
      </Row>
      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <CardTitle className="h4">Item Supplier List </CardTitle>
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
                  data={itemSupplier}
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
                <Label htmlFor="useremail"> Name</Label>
                <Input
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
              <div className="mb-3">
                <Label htmlFor="useremail"> Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  className="form-control"
                  placeholder="Enter phone"
                  type="number"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.phone || ""}
                  invalid={
                    validation.touched.phone && validation.errors.phone
                      ? true
                      : false
                  }
                />
                {validation.touched.phone && validation.errors.phone ? (
                  <FormFeedback type="invalid">
                    {validation.errors.phone}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label htmlFor="useremail">Email</Label>
                <Input
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter email"
                  type="email"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.email || ""}
                  invalid={
                    validation.touched.email && validation.errors.email
                      ? true
                      : false
                  }
                />
                {validation.touched.email && validation.errors.email ? (
                  <FormFeedback type="invalid">
                    {validation.errors.email}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  className="form-control"
                  placeholder="Enter address"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.address || ""}
                  invalid={
                    validation.touched.address && validation.errors.address
                      ? true
                      : false
                  }
                />
                {validation.touched.address && validation.errors.address ? (
                  <FormFeedback type="invalid">
                    {validation.errors.address}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label htmlFor="contactPersonName">Contact Person Name</Label>
                <Input
                  id="contactPersonName"
                  name="contactPersonName"
                  className="form-control"
                  placeholder="Enter contact person name"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.contactPersonName || ""}
                  invalid={
                    validation.touched.contactPersonName &&
                    validation.errors.contactPersonName
                      ? true
                      : false
                  }
                />
                {validation.touched.contactPersonName &&
                validation.errors.contactPersonName ? (
                  <FormFeedback type="invalid">
                    {validation.errors.contactPersonName}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label htmlFor="contactPersonPhone">Contact Person Phone</Label>
                <Input
                  id="contactPersonPhone"
                  name="contactPersonPhone"
                  className="form-control"
                  placeholder="Enter contact person phone"
                  type="number"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.contactPersonPhone || ""}
                  invalid={
                    validation.touched.contactPersonPhone &&
                    validation.errors.contactPersonPhone
                      ? true
                      : false
                  }
                />
                {validation.touched.contactPersonPhone &&
                validation.errors.contactPersonPhone ? (
                  <FormFeedback type="invalid">
                    {validation.errors.contactPersonPhone}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label htmlFor="contactPersonEmail">Contact Person Email</Label>
                <Input
                  id="contactPersonEmail"
                  name="contactPersonEmail"
                  className="form-control"
                  placeholder="Enter contact person email"
                  type="email"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.contactPersonEmail || ""}
                  invalid={
                    validation.touched.contactPersonEmail &&
                    validation.errors.contactPersonEmail
                      ? true
                      : false
                  }
                />
                {validation.touched.contactPersonEmail &&
                validation.errors.contactPersonEmail ? (
                  <FormFeedback type="invalid">
                    {validation.errors.contactPersonEmail}
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
                  type="text"
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

export default connect(null, { setBreadcrumbItems })(ItemSupplier)