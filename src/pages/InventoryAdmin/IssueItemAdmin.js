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
  FormFeedback,
  Input,
  Button,
  Badge,
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

const IssueItem = props => {
  document.title =
    "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard"
  const [issueItemList, setIssueItemList] = useState([])
  const [userType, setUserType] = useState([])
  const [show, setshow] = useState(false)
  const [type, settype] = useState("new")
  const [search, setSearch] = useState("")
  const [cat, setSearchCat] = useState("")
  const [category, setCategory] = useState([])
  const [itemList, setItemList] = useState([])
  const [userNameList, setUserNameList] = useState([])
  // const [userTypeList, setUserTypeList] = useState([])
  async function getIssueItemList() {
    const { data, error } = await supabase.from("IssueItem").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    setIssueItemList(data ?? [])
  }

  async function getUserType() {
    const { data, error } = await supabase.from("Staff").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    setUserType(data ?? [])
  }
  async function getCategory() {
    const { data, error } = await supabase.from("ItemCategory").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    setCategory(data ?? [])
  }
  async function getItemList() {
    const { data, error } = await supabase
      .from("Item")
      .select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
      .or(`itemCategory.ilike.%${cat}%`)
    setItemList(data ?? [])
  }
  const breadcrumbItems = [
    { title: "Smart school", link: "#" },
    { title: "Inventory", link: "#" },
  ]
  const navigate = useNavigate()

  useEffect(() => {
    props.setBreadcrumbItems("Issue Item", breadcrumbItems)
    getIssueItemList()
    getUserType()

    getCategory()
  }, [])
  // console.log(
  //   "users",
  //   userType.map(e => ({
  //     role: e.role,
  //     firstName: e.firstName,
  //   })),
  // )
  const handleClick = () => {
    settype("new")
    validation.resetForm()
    setshow(true)
  }
  const handleClickProfile = () => {
    navigate("/student-profile")
  }
  const validation = useFormik({
    // enableReinitialize: use this flag when initial values need to be changed
    enableReinitialize: true,

    initialValues: {
        item: "",
        note: "",
        itemCategory: "",
        issueReturn: "",
        issueTo: "",
        issuedBy: "",
        quantity: "",
        status: "Click to return",
    },

    validationSchema: Yup.object({
    
            // item: Yup.string().required("Please Enter Your IssueItem Name"),
            // note: Yup.string().required("Please Enter Your Note"),
            // itemCategory: Yup.string().required("Please Select your Item Category"),
            // issueReturn: Yup.string().required("Please Enter Issue Return"),
            // issueTo: Yup.string().required("Please Enter Issue To"),
            // issuedBy: Yup.string().required("Please Enter Issued By"),
            // quantity: Yup.number().required("Please Enter The Quantity"),
            // status: Yup.string().required("Please Enter The Status"),
    }),

    onSubmit: async (values) => {
        console.log("values add", values);
        if (type === "new") {
          const { data, error } = await supabase
            .from("IssueItem")
            .insert([
              {
                item: values.item,
                note: values.note,
                itemCategory: values.itemCategory,
                issueReturn: values.issueReturn,
                issueTo: values.issueTo,
                issuedBy: values.issuedBy,
                quantity: values.quantity,
                status: values.status,
              },
            ])
            .select();
      
          if (error) {
            console.log("Insertion error", error);
            toast.error("IssueItem Insertion Failed", { autoClose: 2000 });
          } else {
            toast.success("IssueItem Inserted", { autoClose: 2000 });
            setshow(false);
            getIssueItemList();
            validation.resetForm();
          }
        } else {
          const { data, error } = await supabase
            .from("IssueItem")
            .update({
            
              status: "Returned",
            })
            .eq("id", values.id)
            .select();
      
          if (error) {
            toast.error("IssueItem Update Failed", { autoClose: 2000 });
          } else {
            toast.success("IssueItem Updated", { autoClose: 2000 });
            setshow(false);
            getIssueItemList();
            validation.resetForm();
          }
        }
      },
      
  })
  const handelEdit = async row => {
    validation.resetForm()
    validation.setFieldValue("id", row.id)
    const { data, error } = await supabase
    .from("IssueItem")
    .update({
    
      status: "Returned",
    })
    .eq("id", row.id)
    .select();

  if (error) {
    toast.error("IssueItem Update Failed", { autoClose: 2000 });
  } else {
    toast.success("IssueItem Updated", { autoClose: 2000 });
    setshow(false);
    getIssueItemList();
    validation.resetForm();
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
  const handleSearch = async () => {
    const { data, error } = await supabase
      .from("IssueItem")
      .select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
      .or(`item.ilike.%${search}%`)
    setIssueItemList(data)
  }
  const handelDelete = async id => {
    const { error } = await supabase.from("IssueItem").delete().eq("id", id)

    if (error) {
      toast.error("issued Item  Deleted Failed", { autoClose: 2000 })
    } else {
      toast.success("Issued item Deleted", { autoClose: 2000 })
      getIssueItemList()
    }
  }
  const columns = [
    {
      name: "item",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.item,
    },
    {
      name: "note",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.note,
    },
    {
      name: "itemCategory",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.itemCategory,
    },
    {
      name: "issueReturn",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.issueReturn,
    },
    {
      name: "issueTo",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.issueTo,
    },
    {
      name: "issuedBy",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.issuedBy,
    },

    {
      name: "quantity",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.quantity,
    },
    {
      name: "status",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: (row) => {
        if (row?.status === "Returned") {
          return (
            <Badge color="success">
              {row?.status}
            </Badge>
          );
        } else {
          return (
            <Badge color="danger">
              {row?.status}
            </Badge>
          );
        }
      },
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
                  onClick={() => handelEdit(row)}
              >
                <i className="ti-back-left"></i>
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
                getIssueItemList()
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
              <CardTitle className="h4">Issue Item List </CardTitle>
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
                  data={issueItemList}
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
                <Label htmlFor="userType">User Type</Label>
                <select
                  id="userType"
                  name="userType"
                  className="form-control"
                  onChange={val => {
                    validation.handleChange(val)
                    setSearch(val.target.value)
                    getItemList()
                  }}
                  onBlur={validation.handleBlur}
                  value={validation.values.userType || ""}
                  invalid={
                    validation.touched.userType && validation.errors.userType
                      ? true
                      : false
                  }
                >
                  <option value="">Select User Type</option>
                  {userType?.map(el => (
                    <option value={String(el.role)}>{el.role}</option>
                  ))}
                </select> 

                {validation.touched.userType && validation.errors.userType ? (
                  <FormFeedback type="invalid">
                    {validation.errors.userType}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label htmlFor="userName">Issue To</Label>
                <select
                  id="userName"
                  name="userName"
                  className="form-control"
                  onChange={validation.handleChange
                  }
                  onBlur={validation.handleBlur}
                  value={validation.values.userName || ""}
                  invalid={
                    validation.touched.userName && validation.errors.userName
                      ? true
                      : false
                  }
                >
                  <option value="">Select Item</option>
                  {userType
                    .filter(el => el.role === validation.values.userType)
                    .map(user => (
                      <option value={String(user.firstName)}>{user.firstName}</option>
                    ))}
                </select> 
                {validation.touched.userName && validation.errors.userName ? (
                  <FormFeedback type="invalid">
                    {validation.errors.userName}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label htmlFor="issueBy">Issue By</Label>
                <select
                  id="issueBy"
                  name="issueBy"
                  className="form-control"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.issueBy || ""}
                  invalid={
                    validation.touched.issueBy && validation.errors.issueBy
                      ? true
                      : false
                  }
                >
                  <option value="">Select Item</option>
                  {userType.map(user => (
                      <option value={String(user.firstName)}>{user.firstName}</option>
                    ))}
                </select> 
                {validation.touched.issueBy && validation.errors.issueBy ? (
                  <FormFeedback type="invalid">
                    {validation.errors.issueBy}
                  </FormFeedback>
                ) : null}
              </div>
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
                    <option value={String(el.itemCategory)}>{el.itemCategory}</option>
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
                    <option value={String(item.item)}>{item.item}</option>
                  ))}
                </select> 
                {validation.touched.item && validation.errors.item ? (
                  <FormFeedback type="invalid">
                    {validation.errors.item}
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
                <Label htmlFor="note">Note</Label>
                <Input
                  id="note"
                  name="note"
                  className="form-control"
                  placeholder="Enter note"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.note || ""}
                  invalid={
                    validation.touched.note && validation.errors.note
                      ? true
                      : false
                  }
                />
                {validation.touched.note && validation.errors.note ? (
                  <FormFeedback type="invalid">
                    {validation.errors.note}
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

export default connect(null, { setBreadcrumbItems })(IssueItem)
