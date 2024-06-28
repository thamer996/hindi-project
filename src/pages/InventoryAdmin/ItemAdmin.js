import React, { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';


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

import { connect } from "react-redux";

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions";
import DataTable from "react-data-table-component";
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useFormik } from "formik"
import * as Yup from "yup"
import { createClient } from "@supabase/supabase-js"
const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)

const Item = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "Inventory", link: "#" },
    ]
    const [item, setItem] = useState ([])
  const [show, setshow] = useState(false)
  const [type, settype] = useState("new")
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState([])
  async function getItem() {
    const { data, error } = await supabase.from("Item").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    setItem(data ?? [])
  }

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
        item: "",
        description: "",
        itemCategory: "",
        unit: "",
        availableQuantity: "",
      
    },

    validationSchema: Yup.object({
      item: Yup.string().required("Please Enter Your Item Name"),
      description: Yup.string().required("Please Enter Your Item Description"),
      itemCategory: Yup.string().required("Please Select your Item Category"),
      unit: Yup.string().required("Please Enter Your unit"),
      availableQuantity: Yup.string().required("Please Enter The availableQuantity"),
    }),
    onSubmit: async values => {
      if (type === "new") {
        const { data, error } = await supabase
          .from("Item")
          .insert([
            { brancheId: localStorage.getItem("BranchId") ?? 1,
              item: values.item,
              description: values.description,
              itemCategory: values.itemCategory,
              unit: values.unit,
              availableQuantity: values.availableQuantity,
            },
          ])
          .select()

        if (error) {
          console.log("ez", error)
          toast.error("Item Inserted Failed", { autoClose: 2000 })
        } else {
          toast.success("Item Inserted", { autoClose: 2000 })
          setshow(false)
          getItem()
          validation.resetForm()
        }
      } else {
        const { data, error } = await supabase
          .from("Item")
          .update([
            {
              item: values.item,
              description: values.description,
              itemCategory: values.itemCategory,
              unit: values.unit,
              availableQuantity: values.availableQuantity,
            },
          ])
          .eq("id", values.id)
          .select()

        if (error) {
          toast.error("Item Updated Failed", { autoClose: 2000 })
        } else {
          toast.success("Item Updated", { autoClose: 2000 })
          setshow(false)
          getItem()
          validation.resetForm()
        }
      }
    },
  })

  const navigate = useNavigate()
  async function getCategory() {
    const { data, error } = await supabase.from("ItemCategory").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    setCategory(data ?? [])
  }
  useEffect(() => {
    props.setBreadcrumbItems("Item", breadcrumbItems)
    getItem()
    getCategory()
  }, [])

  const handleClick = () => {
    settype('new')
    validation.resetForm()
    setshow(true)
  }

  const handleSearch = async () => {
    const { data, error } = await supabase
      .from("Item")
      .select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
      .or(
`item.like.%${search}%` ,
`description.like.%${search}%`,
`itemCategory.like.%${search}%`,     
`unit.like.%${search}%`,     
`availableQuantity.like.%${search}%`     )
    setItem(data)
  }

  const handelEdit = async row => {
    validation.resetForm()
    validation.setFieldValue("item", row.item)
    validation.setFieldValue("description", row.description)
    validation.setFieldValue("itemCategory", row.itemCategory)
    validation.setFieldValue("unit", row.unit)
    validation.setFieldValue("availableQuantity", row.availableQuantity)
    validation.setFieldValue("id", row.id)
    setshow(true)
    settype("edit")
  }

  const handelDelete = async id => {
    const { error } = await supabase.from("Item").delete().eq("id", id)

    if (error) {
      toast.error("Item Deleted Failed", { autoClose: 2000 })
    } else {
      toast.success("Item Deleted", { autoClose: 2000 })
      getItem()
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
        color: 'red' // Example: Change color for delete icon
    };
    const editIconStyle = {
        ...iconStyle,
        color: 'black' // Color for edit icon (black)
    };
    const columns = [
        {
          name: "Item",
          sortable: true,
          reorder: true,
          center: true,
          minWidth: "230px",
          selector: row => row?.item,
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
          name: "Item Category",
          sortable: true,
          reorder: true,
          center: true,
          minWidth: "230px",
          selector: row => row?.itemCategory,
        },
        {
          name: "Unit",
          sortable: true,
          reorder: true,
          center: true,
          minWidth: "230px",
          selector: row => row?.unit,
        },
        {
          name: "Available Quantity",
          sortable: true,
          reorder: true,
          center: true,
          minWidth: "230px",
          selector: row => row?.availableQuantity,
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

          <label className="col-form-label">Item </label>
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
                getItem()
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
            Add Item
          </button>
        </div>
      </Row>
     
            <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <CardTitle className="h4">Item List </CardTitle>
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
                  data={item}
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
                <Label htmlFor="useremail">Item Name</Label>
                <Input
                  id="item"
                  name="item"
                  className="form-control"
                  placeholder="Enter item"
                  type="item"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.item || ""}
                  invalid={
                    validation.touched.item &&
                    validation.errors.item
                      ? true
                      : false
                  }
                />
                {validation.touched.item &&
                validation.errors.item ? (
                  <FormFeedback type="invalid">
                    {validation.errors.item}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label htmlFor="useremail">Description</Label>
                <Input
                  id="description"
                  name="description"
                  className="form-control"
                  placeholder="Enter description"
                  type="description"
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
              <div className="mb-3">
                <Label htmlFor="useremail">Item Category</Label>
                <select
                  id="itemCategory"
                  name="itemCategory"
                  className="form-control"
                  placeholder="Enter itemcategory"
                  type="itemCategory"
                  
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.itemCategory || ""}
                  invalid={
                    validation.touched.itemCategory && validation.errors.itemCategory
                      ? true
                      : false
                  }
                >
                  {category?.map(el => (
                    <option value={el.itemCategory}>{el.itemCategory}</option>
                  ))}
                </select> 

                {validation.touched.itemCategory && validation.errors.itemCategory ? (
                  <FormFeedback type="invalid">
                    {validation.errors.itemCategory}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label htmlFor="useremail">Unit</Label>
                <Input
                  id="unit"
                  name="unit"
                  className="form-control"
                  placeholder="Enter unit"
                  type="unit"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.unit || ""}
                  invalid={
                    validation.touched.unit &&
                    validation.errors.unit
                      ? true
                      : false
                  }
                />
                {validation.touched.unit &&
                validation.errors.unit ? (
                  <FormFeedback type="invalid">
                    {validation.errors.unit}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label htmlFor="useremail">Available Quantity</Label>
                <Input
                  id="availableQuantity"
                  name="availableQuantity"
                  className="form-control"
                  placeholder="Enter availableQuantity"
                  type="availableQuantity"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.availableQuantity || ""}
                  invalid={
                    validation.touched.availableQuantity &&
                    validation.errors.availableQuantity
                      ? true
                      : false
                  }
                />
                {validation.touched.availableQuantity &&
                validation.errors.availableQuantity ? (
                  <FormFeedback type="invalid">
                    {validation.errors.availableQuantity}
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

export default connect(null, { setBreadcrumbItems })(Item);