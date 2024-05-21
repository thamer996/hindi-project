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

const ItemCategory = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const [category, setCategory] = useState([])
    const [show, setshow] = useState(false)
    const [type, settype] = useState("new")
    const [search, setSearch] = useState("")
    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "Inventory", link: "#" },
    ]
    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,
    
        initialValues: {
          ItemCategory: "",
          description: "",
          
          id: "",
        },
    
        validationSchema: Yup.object({
          ItemCategory: Yup.string().required("Please Enter Your Item Category"),
          description: Yup.string().required("Please Enter Your Item Category description"),
          
        }),
        onSubmit: async values => {
          if (type === "new") {
            const { data, error } = await supabase
              .from("ItemCategory")
              .insert([
                {
                  itemCategory: values.ItemCategory,
                  description: values.description,
                  
                },
              ])
              .select()
    
            if (error) {
              console.log("ez", error)
              toast.error("Item Category Inserted Failed", { autoClose: 2000 })
            } else {
              toast.success("Item Category Inserted", { autoClose: 2000 })
              setshow(false)
              getCategory()
              validation.resetForm()
            }
          } else {
            const { data, error } = await supabase
              .from("ItemCategory")
              .update([
                {
                  itemCategory: values.ItemCategory,
                  description: values.description,
                  
                },
              ])
              .eq("id", values.id)
              .select()
    
            if (error) {
              toast.error("Item Category Updated Failed", { autoClose: 2000 })
            } else {
              toast.success("Item Category Updated", { autoClose: 2000 })
              setshow(false)
              getCategory()
              validation.resetForm()
            }
          }
        },
      })
    const navigate = useNavigate();
    async function getCategory() {
        const { data, error } = await supabase.from("ItemCategory").select("*")
        setCategory(data ?? [])
      }
    useEffect(() => {
        props.setBreadcrumbItems('Item Category', breadcrumbItems)
        getCategory()
    },[])
    const handleClick = () => {
        settype('new')
        validation.resetForm()
        setshow(true)
      }
    
      const handleSearch = async () => {
        const { data, error } = await supabase
          .from("ItemCategory")
          .select("*")
          .or(
    `itemCategory.like.%${search}%` ,
    `description.like.%${search}%`,
         )
        setCategory(data)
      }
    
      const handelEdit = async row => {
        validation.resetForm()
        validation.setFieldValue("ItemCategory", row.itemCategory)
        validation.setFieldValue("description", row.description)
       
        validation.setFieldValue("id", row.id)
        setshow(true)
        settype("edit")
      }
    
      const handelDelete = async id => {
        const { error } = await supabase.from("ItemCategory").delete().eq("id", id)
    
        if (error) {
          toast.error("Item Category Deleted Failed", { autoClose: 2000 })
        } else {
          toast.success("Item Category Deleted", { autoClose: 2000 })
          getCategory()
        }
      }
    const iconStyle = {
        cursor: 'pointer',
        display: 'inline-block',
        marginRight: '10px',
        fontSize: '24px',
        color: 'blue' // Change color as needed
    };

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
          name: "Item Category",
          sortable: true,
          reorder: true,
          center: true,
          minWidth: "230px",
          selector: row => row?.itemCategory,
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
          //allowOverflow: true,
          reorder: true,
          center: true,
          minWidth: "250px",
    
          cell: row => {
            return (
              <div className="d-flex">
                <>
                  <span style={editIconStyle} 
                  onClick={() => handelEdit(row)}
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

          <label className="col-form-label">Item Category </label>
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
                getCategory()
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
            Add Item Category
          </button>
        </div>
      </Row>
            <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <CardTitle className="h4">Item Category List  </CardTitle>
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
                  data={category}
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
                <Label htmlFor="useremail">Item Category</Label>
                <Input
                  id="ItemCategory"
                  name="ItemCategory"
                  className="form-control"
                  placeholder="Enter ItemCategory"
                  type="ItemCategory"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.ItemCategory || ""}
                  invalid={
                    validation.touched.ItemCategory &&
                    validation.errors.ItemCategory
                      ? true
                      : false
                  }
                />
                {validation.touched.ItemCategory &&
                validation.errors.ItemCategory ? (
                  <FormFeedback type="invalid">
                    {validation.errors.ItemCategory}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label htmlFor="useremail">description</Label>
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

export default connect(null, { setBreadcrumbItems })(ItemCategory);