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
  Button,
} from "reactstrap"

import { connect } from "react-redux"

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"

import DataTable from "react-data-table-component"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useFormik } from "formik"
import * as Yup from "yup"
import { createClient } from "@supabase/supabase-js"
const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)
const ItemStock = props => {
  document.title =
    "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard"

  const [itemStock, setItemStock] = useState([])
  const [show, setshow] = useState(false)
  const [type, settype] = useState("new")
  const [search, setSearch] = useState("")
  const [cat, setSearchCat] = useState("")
  const [category, setCategory] = useState([])
  const [items, setItems] = useState([])
  const [itemList, setItemList] = useState([])
  const [itemSuppList, setItemSuppList] = useState([])
  const [itemStoreList, setItemStoreList] = useState([])
  const breadcrumbItems = [
    { title: "Smart school", link: "#" },
    { title: "Inventory", link: "#" },
  ]
  console.log("itemcategory", cat)
  console.log("itemList", itemList)
  const navigate = useNavigate()
  async function getItemStock() {
    const { data, error } = await supabase.from("ItemStock").select("*")
    setItemStock(data ?? [])
  }
  async function getCategory() {
    const { data, error } = await supabase.from("ItemCategory").select("*")
    setCategory(data ?? [])
  }
  async function getItemSuppList() {
    const { data, error } = await supabase.from("ItemSupplier").select("*")
    setItemSuppList(data ?? [])
  }
  async function getsetItemStoreList() {
    const { data, error } = await supabase.from("ItemStore").select("*")
    setItemStoreList(data ?? [])
  }
  async function getItemList() {
    const { data, error } = await supabase
      .from("Item")
      .select("*")
      .or(`itemCategory.ilike.%${cat}%`)
    setItemList(data ?? [])
  }
  useEffect(() => {
    props.setBreadcrumbItems("Item Stock", breadcrumbItems)
    getItemStock()
    getCategory()
    getItemSuppList()
    getsetItemStoreList()
  }, [])
  const handleSearch = async () => {
    const { data, error } = await supabase
      .from("ItemStock")
      .select("*")
      .or(
        `itemCategory.ilike.%${search}%`,
        `item.ilike.%${search}%`,
        `supplier.ilike.%${search}%`,
        `store.ilike.%${search}%`,
        `quantity.ilike.%${search}%`,
      )
    setItemStock(data)
  }
  const handleClick = () => {
    settype("new")
    validation.resetForm()
    setshow(true)
  }
  const handelDelete = async id => {
    const { error } = await supabase.from("ItemStock").delete().eq("id", id)

    if (error) {
      toast.error("ItemStock Deleted Failed", { autoClose: 2000 })
    } else {
      toast.success("ItemStock Deleted", { autoClose: 2000 })
      getItemStock()
    }
  }

  const validation = useFormik({
    // enableReinitialize: use this flag when initial values need to be changed
    enableReinitialize: true,
  
    initialValues: {
      item: "",
      description: "",
      itemCategory: "",
      supplier: "",
      store: "",
      quantity: "",
      purchasePrice: "", 
      date: "",
      document: "",
    },
  
    validationSchema: Yup.object({
      item: Yup.string().required("Please Enter Your ItemStock Name"),
      description: Yup.string().required(
        "Please Enter Your ItemStock Description"
      ),
      itemCategory: Yup.string().required(
        "Please Select your ItemStock Category"
      ),
  
      supplier: Yup.string().required("Please Enter The Supplier"),
      store: Yup.string().required("Please Enter The Store"),
      quantity: Yup.number().required("Please Enter The Quantity"),
      purchasePrice: Yup.number().required("Please Enter The Purchase Price"), 
      date: Yup.date().required("Please Enter The Date"),
      document: Yup.string().required("Please Enter The Document"),
    }),
  
    onSubmit: async (values) => {
      console.log("values add", values);
      if (type === "new") {
        const { data, error } = await supabase
          .from("ItemStock")
          .insert([
            {
              item: values.item,
              description: values.description,
              itemCategory: values.itemCategory,
  
              supplier: values.supplier,
              store: values.store,
              quantity: values.quantity,
              purchasePrise: values.purchasePrice,
              date: values.date,
              document: values.document,
            },
          ])
          .select();
  
        if (error) {
          console.log("ez", error);
          toast.error("ItemStock Inserted Failed", { autoClose: 2000 });
        } else {
          toast.success("ItemStock Inserted", { autoClose: 2000 });
          setshow(false);
          getItemStock();
          validation.resetForm();
        }
      
    
  
  
      } else {
        const { data, error } = await supabase
          .from("ItemStock")
          .update(
            {
              item: values.item,
              description: values.description,
              itemCategory: values.itemCategory,
              supplier: values.supplier,
              store: values.store,
              quantity: values.quantity,
              purchasePrise: values.purchasePrice,
              date: values.date,
              document: values.document,
            },
          )
          .eq("id", values.id)
          .select()

        if (error) {
          toast.error("ItemStock Updated Failed", { autoClose: 2000 })
        } else {
          toast.success("ItemStock Updated", { autoClose: 2000 })
          setshow(false)
          getItemStock()
          validation.resetForm()
        }
      }
    },
  })

  const handelEdit = async row => {
    validation.resetForm()
    validation.setFieldValue("item", row.item)
    validation.setFieldValue("description", row.description)
    validation.setFieldValue("itemCategory", row.itemCategory)
    validation.setFieldValue("supplier", row.supplier)
    validation.setFieldValue("store", row.store)
    validation.setFieldValue("quantity", row.quantity)
    validation.setFieldValue("purchasePrise", row.purchasePrise)
    validation.setFieldValue("date", row.date)
    validation.setFieldValue("document", row.document)
    validation.setFieldValue("id", row.id)
    setshow(true)
    settype("edit")
  }
  console.log("llll", cat)
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
      name: "Item Category",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.itemCategory,
    },
    {
      name: "Item",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.item,
    },
    {
      name: "Supplier",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.supplier,
    },
    {
      name: "Store",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.store,
    },
    {
      name: "Quantity",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.quantity,
    },
    {
      name: "Purchase Price",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.purchasePrise,
    },
    {
      name: "Date",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.date,
    },
    {
      name: "Document",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.document,
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
                getItemStock()
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
              <CardTitle className="h4">Item Stock List </CardTitle>
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
                  data={itemStock}
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
                <Label htmlFor="itemCategory">Item Category</Label>
                <select
                  id="itemCategory"
                  name="itemCategory"
                  className="form-control"
                  onChange={val => {
                    validation.handleChange(val)
                    setSearchCat(val.target.value)
                    getItemList()
                  }}
                  onBlur={validation.handleBlur}
                  value={validation.values.itemCategory || ""}
                  invalid={
                    validation.touched.itemCategory &&
                    validation.errors.itemCategory
                      ? true
                      : false
                  }
                >
                  <option value="">Select Category</option>
                  {category?.map(el => (
                    <option value={el.itemCategory}>{el.itemCategory}</option>
                  ))}
                </select>

                {validation.touched.itemCategory &&
                validation.errors.itemCategory ? (
                  <FormFeedback type="invalid">
                    {validation.errors.itemCategory}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label htmlFor="item">Item Name</Label>
                <select
                  id="item"
                  name="item"
                  className="form-control"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.item || ""}
                  invalid={
                    validation.touched.item && validation.errors.item
                      ? true
                      : false
                  }
                >
                  <option value="">Select Item</option>
                  {itemList?.map(item => (
                    <option value={item.item}>{item.item}</option>
                  ))}
                </select>
                {validation.touched.item && validation.errors.item ? (
                  <FormFeedback type="invalid">
                    {validation.errors.item}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label htmlFor="supplier">Supplier</Label>
                <select
                  id="supplier"
                  name="supplier"
                  className="form-control"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.supplier || ""}
                  invalid={
                    validation.touched.supplier && validation.errors.supplier
                      ? true
                      : false
                  }
                >
                  <option value="">Select Supplier</option>
                  {itemSuppList?.map(el => (
                    <option value={el.name}>{el.name}</option>
                  ))}
                </select>

                {validation.touched.supplier && validation.errors.supplier ? (
                  <FormFeedback type="invalid">
                    {validation.errors.supplier}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label htmlFor="store">Store</Label>
                <select
                  id="store"
                  name="store"
                  className="form-control"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.store || ""}
                  invalid={
                    validation.touched.store && validation.errors.store
                      ? true
                      : false
                  }
                >
                  <option value="">Select Store</option>
                  {itemStoreList?.map(el => (
                    <option value={el.itemStoreName}>
                      {el.itemStoreName}({el.itemStoreCode})
                    </option>
                  ))}
                </select>

                {validation.touched.store && validation.errors.store ? (
                  <FormFeedback type="invalid">
                    {validation.errors.store}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  name="quantity"
                  className="form-control"
                  placeholder="Enter quantity"
                  type="number"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.quantity || ""}
                  invalid={
                    validation.touched.quantity && validation.errors.quantity
                      ? true
                      : false
                  }
                />
                {validation.touched.quantity && validation.errors.quantity ? (
                  <FormFeedback type="invalid">
                    {validation.errors.quantity}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label htmlFor="purchasePrice">Purchase Price</Label>
                <Input
                  id="purchasePrice"
                  name="purchasePrice"
                  className="form-control"
                  placeholder="Enter purchase price"
                  type="number"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.purchasePrice || ""}
                  invalid={
                    validation.touched.purchasePrice &&
                    validation.errors.purchasePrice
                      ? true
                      : false
                  }
                />
                {validation.touched.purchasePrice &&
                validation.errors.purchasePrice ? (
                  <FormFeedback type="invalid">
                    {validation.errors.purchasePrice}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  name="date"
                  className="form-control"
                  type="date"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.date || ""}
                  invalid={
                    validation.touched.date && validation.errors.date
                      ? true
                      : false
                  }
                />
                {validation.touched.date && validation.errors.date ? (
                  <FormFeedback type="invalid">
                    {validation.errors.date}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label htmlFor="document">Document</Label>
                <Input
                  id="document"
                  name="document"
                  className="form-control"
                  placeholder="Enter document"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.document || ""}
                  invalid={
                    validation.touched.document && validation.errors.document
                      ? true
                      : false
                  }
                />
                {validation.touched.document && validation.errors.document ? (
                  <FormFeedback type="invalid">
                    {validation.errors.document}
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
              <div className="col-12 text-end">
                <Button
                  className="btn btn-primary w-md waves-effect waves-light"
                  type="submit"
                >
                  Submit
                </Button>
              </div>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
      <ToastContainer />
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(ItemStock)
