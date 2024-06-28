/* eslint-disable no-lone-blocks */
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
  Label,
  Input,
  FormFeedback,
  Badge,
  Modal,
  ModalBody,
  Form,
} from "reactstrap"

import { connect } from "react-redux"

import { useFormik } from "formik"
import * as Yup from "yup"
import { createClient } from "@supabase/supabase-js"
import { toast, ToastContainer } from "react-toastify"
import DataTable from "react-data-table-component"
import { v4 as uuidv4 } from "uuid"
import "react-toastify/dist/ReactToastify.css"

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"
import _, { isEmpty, isNil } from "lodash"

const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)

const Users = props => {
  document.title =
    "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard"

  const breadcrumbItems = [
    { title: "Smart school", link: "#" },
    { title: "settings", link: "#" },
  ]
  const navigate = useNavigate()

  const [data, setdata] = useState([])
  const [student, setStudent] = useState([])
  const [keyword, setkeyword] = useState("")
  const [roles, setroles] = useState([])
  const [staff, setStaff] = useState([])
  const [parent, setparent] = useState([])

  async function getdata() {
    const { data, error } = await supabase
      .from("Users")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
    setdata(data ?? [])
  }

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

  async function getroles() {
    const { data, error } = await supabase
      .from("RolesPermissions")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
    setroles(data ?? [])
  }

  async function getstudents() {
    const { data, error } = await supabase
      .from("Student")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
    setStudent(data ?? [])
  }
  async function getparents() {
    const { data, error } = await supabase
      .from("Parent")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
    setparent(data ?? [])
  }

  async function getStaff() {
    const { data, error } = await supabase
      .from("Staff")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
    setStaff(data ?? [])
  }

  useEffect(() => {
    props.setBreadcrumbItems("Users", breadcrumbItems)
    getdata()
    getroles()
    getstudents()
    getStaff()
    getparents()
  }, [])

  const handleSearch = async () => {
    const { data, error } = await supabase
      .from("Users")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
      .or(
        `userName.ilike.%${keyword}%,role.ilike.%${keyword}%,email.ilike.%${keyword}%`,
      )

    setdata(data)
  }

  const handleAddProfile = () => {
    navigate("/student-profile")
  }

  const handelUpdateUser = async row => {
    const { data, error } = await supabase
      .from("Users")
      .update([
        {
          isDisabled: !isNil(row.isDisabled) ? !row.isDisabled : true,
        },
      ])
      .eq("id", row.id)
      .select()

    getdata()
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

  const handelEdit = async row => {
    validation.setFieldValue("role", row.role)
    validation.setFieldValue("password", row.password)
    validation.setFieldValue("refUser", row.refUser)

    validation.setFieldValue("id", row.id)

    setshow(true)
    settype("edit")
  }

  const handelDelete = async id => {
    const { error } = await supabase.from("Users").delete().eq("id", id)

    if (error) {
      toast.error("RolesPermissions Deleted Failed", { autoClose: 2000 })
    } else {
      toast.success("RolesPermissions Deleted", { autoClose: 2000 })
    }
  }

  const columns = [
    {
      name: "Name",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.userName ?? "None",
    },
    {
      name: "Email",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.email ?? "None",
    },
    {
      name: "role",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.role ?? "None",
    },

    {
      name: "Action",
      //allowOverflow: true,
      reorder: true,
      center: true,
      minWidth: "300px",

      cell: row => {
        return (
          <div className="d-flex">
            <>
              <Badge
                className="me-1"
                onClick={() => {
                  handelUpdateUser(row)
                }}
                color={row?.isDisabled ? "success" : "danger"}
              >
                {row?.isDisabled ? "ACTIVE" : "UNACTIVE"}
              </Badge>

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

  const [show, setshow] = useState(false)
  const [type, settype] = useState("new")

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      userName: "",
      email: "",
      password: "",
      role: "",
      refUser: "",
      img: "",
    },

    validationSchema: Yup.object({}),
    onSubmit: async values => {
      let email
      let userName
      let img

      if (
        ["Admin", "Teacher", "Librarian", "Receptionist"].includes(
          validation.values.role,
        )
      ) {
        const obj = staff?.find(
          elm => Number(elm.id) === Number(validation.values.refUser),
        )

        email = obj.email
        userName = `${obj.firstName} ${obj.lastName}`
        img = obj.photo
      } else if (validation.values.role === "Student") {
        const obj = student.find(
          elm => Number(elm.id) === Number(validation.values.refUser),
        )

        email = obj.email
        userName = `${obj.firstName} ${obj.lastName}`
        img = obj?.studentPhoto
      } else {
        const obj = parent.find(
          elm => Number(elm.id) === Number(validation.values.refUser),
        )

        email = obj.guardianEmail
        userName = `${obj.fathername}`
        img = obj?.fatherphoto
      }

      if (type === "new") {
        const { data, error } = await supabase
          .from("Users")
          .insert([
            {
              brancheId: localStorage.getItem("BranchId") ?? 1,
              userName: userName,
              email: email,
              password: values.password,
              role: values.role,
              refUser: values.refUser,
              img,
              isDisabled: false,
            },
          ])
          .select()

        if (error) {
          toast.error("RolesPermissions Inserted Failed", { autoClose: 2000 })
        } else {
          toast.success("RolesPermissions Inserted", { autoClose: 2000 })
          setshow(false)
          validation.resetForm()
          getdata()
        }
      } else {
        const { data, error } = await supabase
          .from("Users")
          .update([
            {
              userName: userName,
              email: email,
              password: values.password,
              role: values.role,
              refUser: values.refUser,
            },
          ])
          .eq("id", values.id)
          .select()

        if (error) {
          toast.error("RolesPermissions Updated Failed", { autoClose: 2000 })
        } else {
          toast.success("RolesPermissions Updated", { autoClose: 2000 })
          setshow(false)
          validation.resetForm()
          getdata()
        }
      }
    },
  })

  const handleClick = () => {
    settype("new")
    validation.resetForm()
    setshow(true)
  }

  return (
    <React.Fragment>
      <Row>
        <div className="d-flex mb-2">
          {/* Vos éléments de filtre ici */}
          <label className="col-form-label">Search By Keyword :</label>&nbsp;
          <div className="col-md-4 me-2">
            <input
              type="text"
              value={keyword}
              onChange={val => {
                setkeyword(val.target.value)
              }}
              className="form-control"
              placeholder="Search By  Name, Role ..."
            />
          </div>
          <div>
            <button className="btn btn-primary" onClick={handleSearch}>
              Search
            </button>
          </div>
          <div>
            <button
              className="btn btn-danger ms-2"
              onClick={() => {
                setkeyword("")
              }}
            >
              Reset
            </button>
          </div>
        </div>

        <div className="d-flex justify-content-end  mb-2">
          <div></div>
          {/* Button */}
          <button className="btn btn-primary" onClick={handleClick}>
            Add User
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
              <CardTitle className="h4"> Users Details </CardTitle>

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
                <Label htmlFor="useremail">role</Label>

                <select
                  id="role"
                  name="role"
                  className="form-control"
                  placeholder="Enter  class"
                  type="role"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.role || ""}
                  invalid={
                    validation.touched.role && validation.errors.role
                      ? true
                      : false
                  }
                >
                  <option value={""}>Select</option>
                  {roles?.map(el => (
                    <option value={el.name}>{el.name}</option>
                  ))}
                </select>

                {validation.touched.role && validation.errors.role ? (
                  <FormFeedback type="invalid">
                    {validation.errors.role}
                  </FormFeedback>
                ) : null}
              </div>
            </Row>

            <Row>
              <div className="mb-3">
                <Label htmlFor="useremail">linked user</Label>

                <select
                  id="refUser"
                  name="refUser"
                  className="form-control"
                  placeholder="Enter  refUser"
                  type="refUser"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.refUser || ""}
                  invalid={
                    validation.touched.refUser && validation.errors.refUser
                      ? true
                      : false
                  }
                >
                  <option value={""}>Select</option>
                  {["Admin", "Teacher", "Librarian", "Receptionist"].includes(
                    validation.values.role,
                  )
                    ? staff
                        ?.filter(elm => elm.role === validation.values.role)
                        .map(el => (
                          <option value={el.id}>
                            {el.firstName} {el.lastName}
                          </option>
                        ))
                    : validation.values.role === "Student"
                      ? student.map(el => (
                          <option value={el.id}>
                            {el.firstName} {el.lastName}
                          </option>
                        ))
                      : parent.map(el => (
                          <option value={el.id}>{el.fathername}</option>
                        ))}
                </select>

                {validation.touched.refUser && validation.errors.refUser ? (
                  <FormFeedback type="invalid">
                    {validation.errors.refUser}
                  </FormFeedback>
                ) : null}
              </div>
            </Row>

            {/* <Row>
              <div className="mb-3">
                <Label htmlFor="useremail">userName</Label>
                <input
                  id="userName"
                  name="userName"
                  className="form-control"
                  placeholder="Enter userName"
                  type="userName"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.userName || ""}
                  invalid={
                    validation.touched.userName && validation.errors.userName
                      ? true
                      : false
                  }
                />

                {validation.touched.userName && validation.errors.userName ? (
                  <FormFeedback type="invalid">
                    {validation.errors.userName}
                  </FormFeedback>
                ) : null}
              </div>
            </Row>

            <Row>
              <div className="mb-3">
                <Label htmlFor="useremail">email</Label>
                <input
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
            </Row> */}

            <Row>
              <div className="mb-3">
                <Label htmlFor="useremail">password</Label>
                <input
                  id="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter password"
                  type="password"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.password || ""}
                  invalid={
                    validation.touched.password && validation.errors.password
                      ? true
                      : false
                  }
                />

                {validation.touched.password && validation.errors.password ? (
                  <FormFeedback type="invalid">
                    {validation.errors.password}
                  </FormFeedback>
                ) : null}
              </div>
            </Row>

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
          </Form>
        </ModalBody>
      </Modal>

      <ToastContainer />
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(Users)
