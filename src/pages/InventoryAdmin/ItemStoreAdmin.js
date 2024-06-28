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
import { createClient } from "@supabase/supabase-js"

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions";
import DataTable from "react-data-table-component";
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useFormik } from "formik"
import * as Yup from "yup"

const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)


const ItemStore = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";

    const [itemStore, setItemStore] = useState([])
    const [show, setshow] = useState(false)
    const [type, settype] = useState("new")
    const [search, setSearch] = useState("")
    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "Inventory", link: "#" },
    ]
    const navigate = useNavigate();
    async function getitemstore() {
        const { data, error } = await supabase.from("ItemStore").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
        setItemStore(data ?? [])
      }
      const handleSearch = async () => {
        const { data, error } = await supabase
          .from("ItemStore")
          .select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
          .or(
            `itemStoreName.like.%${search}%`,
            `itemStoreCode.like.%${search}%`,
            `description.like.%${search}%`
          );
        setItemStore(data);
      };
    useEffect(() => {
        props.setBreadcrumbItems('Item Store', breadcrumbItems)
        getitemstore()
    },[])
    const validation = useFormik({
        // enableReinitialize: use this flag when initial values need to be changed
        enableReinitialize: true,
      
        initialValues: {
          itemStoreName: "",
          itemStoreCode: "",
          description: "",
          id: "",
        },
      
        validationSchema: Yup.object({
          itemStoreName: Yup.string().required("Please enter the Item Store Name"),
          itemStoreCode: Yup.string().required("Please enter the Item Store Code"),
          description: Yup.string().required("Please enter the Description"),
        }),
      
        onSubmit: async (values) => {
          if (type === "new") {
            const { data, error } = await supabase
              .from("ItemStore")
              .insert([
                {
                  itemStoreName: values.itemStoreName,
                  itemStoreCode: values.itemStoreCode,
                  description: values.description,
                },
              ])
              .select();
      
            if (error) {
              console.log("Error:", error);
              toast.error("Item Store Insert Failed", { autoClose: 2000 });
            } else {
              toast.success("Item Store Inserted", { autoClose: 2000 });
              setshow(false);
              getitemstore();
              validation.resetForm();
            }
          } else {
            const { data, error } = await supabase
              .from("ItemStore")
              .update({
                itemStoreName: values.itemStoreName,
                itemStoreCode: values.itemStoreCode,
                description: values.description,
              })
              .eq("id", values.id)
              .select();
      
            if (error) {
              toast.error("Item Store Update Failed", { autoClose: 2000 });
            } else {
              toast.success("Item Store Updated", { autoClose: 2000 });
              setshow(false);
              getitemstore();
              validation.resetForm();
            }
          }
        },
      });
      
    const handelEdit = async (row) => {
        validation.resetForm();
        validation.setFieldValue("itemStoreName", row.itemStoreName);
        validation.setFieldValue("itemStoreCode", row.itemStoreCode);
        validation.setFieldValue("description", row.description);
        validation.setFieldValue("id", row.id);
        setshow(true);
        settype("edit");
      };
      
    
      const handelDelete = async id => {
        const { error } = await supabase.from("ItemStore").delete().eq("id", id)
    
        if (error) {
          toast.error("ItemStore Deleted Failed", { autoClose: 2000 })
        } else {
          toast.success("ItemStore Deleted", { autoClose: 2000 })
          getitemstore()
        }
      }
    
    const handleClick = () => {
        settype('new')
    validation.resetForm()
    setshow(true)
    };
    const handleClickProfile = () => {
        navigate('/student-profile');
    };
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
          name: "Item Store Name",
          sortable: true,
          reorder: true,
          center: true,
          minWidth: "230px",
          selector: row => row?.itemStoreName,
        },
        {
          name: "Item Store Code",
          sortable: true,
          reorder: true,
          center: true,
          minWidth: "230px",
          selector: row => row?.itemStoreCode,
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
      ];
      
    return (
        <React.Fragment>

<Row>
        <div className="d-flex mb-2">
          <div></div>
          {/* Vos éléments de filtre ici */}

          <label className="col-form-label">Item Store </label>
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
                getitemstore()
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
            Add Subject
          </button>
        </div>
      </Row>
        
            <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <CardTitle className="h4">Subjects List </CardTitle>
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
                  data={itemStore}
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
        e.preventDefault();
        validation.handleSubmit();
        return false;
      }}
    >
      <Row>
        <div className="mb-3">
          <Label htmlFor="itemStoreName">Item Store Name</Label>
          <Input
            id="itemStoreName"
            name="itemStoreName"
            className="form-control"
            placeholder="Enter item store name"
            type="text"
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            value={validation.values.itemStoreName || ""}
            invalid={
              validation.touched.itemStoreName &&
              validation.errors.itemStoreName ? true : false
            }
          />
          {validation.touched.itemStoreName &&
            validation.errors.itemStoreName ? (
              <FormFeedback type="invalid">
                {validation.errors.itemStoreName}
              </FormFeedback>
            ) : null}
        </div>
        <div className="mb-3">
          <Label htmlFor="itemStoreCode">Item Store Code</Label>
          <Input
            id="itemStoreCode"
            name="itemStoreCode"
            className="form-control"
            placeholder="Enter item store code"
            type="text"
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            value={validation.values.itemStoreCode || ""}
            invalid={
              validation.touched.itemStoreCode &&
              validation.errors.itemStoreCode ? true : false
            }
          />
          {validation.touched.itemStoreCode &&
            validation.errors.itemStoreCode ? (
              <FormFeedback type="invalid">
                {validation.errors.itemStoreCode}
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
              validation.errors.description ? true : false
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

export default connect(null, { setBreadcrumbItems })(ItemStore);