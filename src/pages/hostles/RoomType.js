import React, { useEffect, useState } from "react"
import { Link, useNavigate } from 'react-router-dom';


import {
    Table,
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    Container,
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
import { createClient } from "@supabase/supabase-js";
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useFormik } from "formik"
import * as Yup from "yup"


const supabase = createClient(
    "https://ypduxejepwdmssduohpi.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
  )
const RoomType = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";

    const [roomtype, setRoomtype] = useState([])
    const [show, setshow] = useState(false)
    const [type, settype] = useState("new")
    const [search, setSearch] = useState("")
    async function getRoomType() {
        const { data, error } = await supabase.from("Room").select("*")
        setRoomtype(data ?? [])
      }


      const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,
    
        initialValues: {
          Roomtype: "",
          
        },
    
        validationSchema: Yup.object({
            Roomtype: Yup.string().required("Please Enter Your Room type"),
          
        }),
        onSubmit: async values => {
          if (type === "new") {
            const { data, error } = await supabase
              .from("Room")
              .insert([
                {
                    type: values.Roomtype,
                 
                },
              ])
              .select()
    
            if (error) {
              console.log("ez", error)
              toast.error("Room Type Inserted Failed", { autoClose: 2000 })
            } else {
              toast.success("Room Type Inserted", { autoClose: 2000 })
              setshow(false)
              getRoomType()
              validation.resetForm()
            }
          } else {
            const { data, error } = await supabase
              .from("Room")
              .update([
                {
                    type: values.Roomtype,
                  
                },
              ])
              .eq("id", values.id)
              .select()
    
            if (error) {
              toast.error("Room Type Updated Failed", { autoClose: 2000 })
            } else {
              toast.success("Room Type Updated", { autoClose: 2000 })
              setshow(false)
              getRoomType()
              validation.resetForm()
            }
          }
        },
      })
    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "Hostel", link: "#" },
    ]
    const navigate = useNavigate();

    useEffect(() => {
        props.setBreadcrumbItems('Room Type', breadcrumbItems)
        getRoomType()
    }, [])
    const handleSearch = async () => {
        const { data, error } = await supabase
          .from("Room")
          .select("*")
          .or(
    `type.like.%${search}%` ,
     )
    setRoomtype(data)
      }

      const handelEdit = async row => {
        console.log("row", row)
        validation.resetForm()
        validation.setFieldValue("Roomtype", row.type)
        validation.setFieldValue("id", row.id)
        setshow(true)
        settype("edit")
      }

      const handelDelete = async id => {
        const { error } = await supabase.from("Room").delete().eq("id", id)
    
        if (error) {
          toast.error("Room type Deleted Failed", { autoClose: 2000 })
        } else {
          toast.success("Room type Deleted", { autoClose: 2000 })
          getRoomType()
        }
      }
      const handleClick = () => {
        settype('new')
        validation.resetForm()
        setshow(true)
      }
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
          name: "Room Type",
          sortable: true,
          reorder: true,
          center: true,
          minWidth: "230px",
          selector: row => row?.type,
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

          <label className="col-form-label">Room Type </label>
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
                getRoomType()
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
            Add Room Type
          </button>
        </div>
      </Row>
            <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <CardTitle className="h4">Room Type List</CardTitle>
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
                  data={roomtype}
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
                <Label htmlFor="useremail">Room type</Label>
                <Input
                  id="type"
                  name="Roomtype"
                  className="form-control"
                  placeholder="Enter Roomtype"
                  type="Roomtype"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.Roomtype || ""}
                  invalid={
                    validation.touched.Roomtype &&
                    validation.errors.Roomtype
                      ? true
                      : false
                  }
                />
                {validation.touched.Roomtype &&
                validation.errors.Roomtype ? (
                  <FormFeedback type="invalid">
                    {validation.errors.Roomtype}
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
      <ToastContainer/>
        </React.Fragment>
    )
}

export default connect(null, { setBreadcrumbItems })(RoomType);