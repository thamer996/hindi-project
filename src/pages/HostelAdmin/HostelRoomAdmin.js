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
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useFormik } from "formik"
import * as Yup from "yup"
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)



const HostelRoom = (props) => {
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";
    const [hostelRoom, sethostelRoom] = useState([])
    const [show, setshow] = useState(false)
    const [type, settype] = useState("new")
    const [search, setSearch] = useState("")
    const [hostel, setHostel] = useState([])
    const [roomType, setRoomType] = useState([])
    async function getHostelRoom() {
        const { data, error } = await supabase.from("HostelRoom").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
        sethostelRoom(data ?? [])
      }
    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "Hostel", link: "#" },
    ]
    const navigate = useNavigate();

    useEffect(() => {
        props.setBreadcrumbItems('Hostel Room', breadcrumbItems)
        getHostelRoom()
        getHostel()
        getroomType()
    },[])
    const handleSearch = async () => {
        const { data, error } = await supabase
          .from("HostelRoom")
          .select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
          .or(
    `RoomName.like.%${search}%` ,
    `Hostel.like.%${search}%`,
    `RoomType.like.%${search}%`,     
    `NumberOfBed.like.%${search}%`,     
    `CoastPerBed.like.%${search}%`,     
)
        sethostelRoom(data)
      }

      const handleClick = () => {
        settype('new')
        validation.resetForm()
        setshow(true)
      }
      async function getHostel() {
        const { data, error } = await supabase.from("Hostel").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
        setHostel(data ?? [])
      }
      async function getroomType() {
        const { data, error } = await supabase.from("Room").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
        setRoomType(data ?? [])
      }
      const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,
    
        initialValues: {
          RoomName: "",
          Hostel: "",
          RoomType: "",
          NumberOfBed: "",
          CoastPerBed: "",
        },
    
        validationSchema: Yup.object({
          RoomName: Yup.string().required("Please Enter Your Room Name"),
          Hostel: Yup.string().required("Please Enter Your Hostel"),
          RoomType: Yup.string().required("Please Enter Your RoomType"),
          NumberOfBed: Yup.string().required("Please Enter Your NumberOfBed"),
          CoastPerBed: Yup.string().required("Please Enter Your CoastPerBed"),
        }),
        onSubmit: async values => {
          if (type === "new") {
            const { data, error } = await supabase
              .from("HostelRoom")
              .insert([
                {
                  RoomName: values.RoomName,
                  Hostel: values.Hostel,
                  RoomType: values.RoomType,
                  NumberOfBed: values.NumberOfBed,
                  CoastPerBed: values.CoastPerBed,
                },
              ])
              .select()
    
            if (error) {
              console.log("ez", error)
              toast.error("Hostel Room Inserted Failed", { autoClose: 2000 })
            } else {
              toast.success("Hostel Room Inserted", { autoClose: 2000 })
              setshow(false)
              getHostelRoom()
              validation.resetForm()
            }
          } else {
            const { data, error } = await supabase
              .from("HostelRoom")
              .update([
                {
                  RoomName: values.RoomName,
                  Hostel: values.Hostel,
                  RoomType: values.RoomType,
                  NumberOfBed: values.NumberOfBed,
                  CoastPerBed: values.CoastPerBed,
                },
              ])
              .eq("id", values.id)
              .select()
    
            if (error) {
              toast.error("Hostel Room Updated Failed", { autoClose: 2000 })
            } else {
              toast.success("Hostel Room Updated", { autoClose: 2000 })
              setshow(false)
              getHostelRoom()
              validation.resetForm()
            }
          }
        },
      })
      const handelDelete = async id => {
        const { error } = await supabase.from("HostelRoom").delete().eq("id", id)
    
        if (error) {
          toast.error("Hostel Room Deleted Failed", { autoClose: 2000 })
        } else {
          toast.success("Hostel Room Deleted", { autoClose: 2000 })
          getHostelRoom()
        }
      }
      const handelEdit = async row => {
        console.log('row',row)
        validation.resetForm()
    
        validation.setFieldValue("RoomName", row.RoomName)
        validation.setFieldValue("Hostel", row.Hostel)
        validation.setFieldValue("RoomType", row.RoomType)
        validation.setFieldValue("NumberOfBed", row.NumberOfBed)
        validation.setFieldValue("CoastPerBed", row.CoastPerBed)
    
        validation.setFieldValue("id", row.id)
        setshow(true)
        settype("edit")
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
          name: "Room Number /Name",
          sortable: true,
          reorder: true,
          center: true,
          minWidth: "230px",
          selector: row => row?.RoomName,
        },
        {
          name: "Hostel",
          sortable: true,
          reorder: true,
          center: true,
          minWidth: "230px",
          selector: row => row?.Hostel,
        },
        {
          name: "Room Type",
          sortable: true,
          reorder: true,
          center: true,
          minWidth: "230px",
          selector: row => row?.RoomType,
        },
        {
          name: "Number Of Bed",
          sortable: true,
          reorder: true,
          center: true,
          minWidth: "230px",
          selector: row => row?.NumberOfBed,
        },
        {
          name: "Coast Per Bed ",
          sortable: true,
          reorder: true,
          center: true,
          minWidth: "230px",
          selector: row => row?.CoastPerBed,
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

          <label className="col-form-label">Room </label>
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
                getHostelRoom()
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
            Add Hostel Room
          </button>
        </div>
      </Row>
            <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <CardTitle className="h4">Hostel Room</CardTitle>
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
                  data={hostelRoom}
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
                <Label htmlFor="useremail">RoomName /Number</Label>
                <Input
                  id="RoomName"
                  name="RoomName"
                  className="form-control"
                  placeholder="Enter Room Name"
                  type="name"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.RoomName || ""}
                  invalid={
                    validation.touched.RoomName && validation.errors.RoomName
                      ? true
                      : false
                  }
                />
                {validation.touched.RoomName && validation.errors.RoomName ? (
                  <FormFeedback type="invalid">
                    {validation.errors.RoomName}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label htmlFor="useremail">Hostel</Label>
                <select
                  id="Hostel"
                  name="Hostel"
                  className="form-control"
                  placeholder="Select hostel"
                  type="Hostel"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.Hostel || ""}
                  invalid={
                    validation.touched.Hostel && validation.errors.Hostel
                      ? true
                      : false
                  }
                >
                  <option value={""}>Select</option>
                  {hostel?.map(el => (
                    <option value={el.hostelName}>{el.hostelName}</option>
                  ))}
                </select> 

                {validation.touched.Hostel && validation.errors.Hostel ? (
                  <FormFeedback type="invalid">
                    {validation.errors.Hostel}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label htmlFor="useremail">RoomType</Label>
                <select
                  id="RoomType"
                  name="RoomType"
                  className="form-control"
                  placeholder="Enter  class"
                  type="RoomType"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.RoomType || ""}
                  invalid={
                    validation.touched.RoomType &&
                    validation.errors.RoomType
                      ? true
                      : false
                  }
                >
                  <option value={""}>Select</option>
                  {roomType?.map(el => (
                    <option value={el.type}>{el.type}</option>
                  ))}
                </select> 

                {validation.touched.RoomType &&
                validation.errors.RoomType ? (
                  <FormFeedback type="invalid">
                    {validation.errors.RoomType}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label htmlFor="useremail">Number Of Bed</Label>
                <Input
                  id="NumberOfBed"
                  NumberOfBed="NumberOfBed"
                  className="form-control"
                  placeholder="Enter section Name"
                  type="NumberOfBed"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.NumberOfBed || ""}
                  invalid={
                    validation.touched.NumberOfBed && validation.errors.NumberOfBed
                      ? true
                      : false
                  }
                />
                {validation.touched.NumberOfBed && validation.errors.NumberOfBed ? (
                  <FormFeedback type="invalid">
                    {validation.errors.NumberOfBed}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label htmlFor="useremail">Cost Per Bed</Label>
                <Input
                  id="CoastPerBed"
                  CoastPerBed="CoastPerBed"
                  className="form-control"
                  placeholder="Enter section Name"
                  type="CoastPerBed"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.CoastPerBed || ""}
                  invalid={
                    validation.touched.CoastPerBed && validation.errors.CoastPerBed
                      ? true
                      : false
                  }
                />
                {validation.touched.CoastPerBed && validation.errors.CoastPerBed ? (
                  <FormFeedback type="invalid">
                    {validation.errors.CoastPerBed}
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

export default connect(null, { setBreadcrumbItems })(HostelRoom);