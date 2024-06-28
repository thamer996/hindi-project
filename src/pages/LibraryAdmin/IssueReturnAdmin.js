import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import DataTable from "react-data-table-component"
import { createClient } from "@supabase/supabase-js"

import {
  Table,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Button,
  ModalBody,
  Modal,
  Label,
  Input,
  FormFeedback,
  Form,
} from "reactstrap"

import { connect } from "react-redux"
import { v4 as uuidv4 } from "uuid"

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useFormik } from "formik"
import * as Yup from "yup"
import moment from "moment"

const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)

const IssueReturn = props => {
  document.title =
    "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard"

  const breadcrumbItems = [
    { title: "Smart school", link: "#" },
    { title: "Library", link: "#" },
  ]

  const [Student, setStudent] = useState([])
  const [clas, setClas] = useState([])
  const [sections, setSections] = useState([])

  const [Books, setBooks] = useState("")
  const [Book, setBook] = useState("")
  const [Sect, setSect] = useState("")

  const [show, setshow] = useState(false)
  const [type, settype] = useState("new")
  const [search, setSearch] = useState("")
  const [currentRow, setcurrentRow] = useState({})
  const [booksBymember, setbooksBymember] = useState([])

  async function getCountries() {
    const { data: dataStaff } = await supabase.from("Staff").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    const { data: dataStudent } = await supabase.from("Student").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    const { data: libraryMemberdata, error: libraryMembererror } =
      await supabase.from("LibraryMember").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)

    const staff = dataStaff?.map(el => ({
      ...el,
      libraryCardNo:
        libraryMemberdata?.find(elm => elm.ref === String(el.id))
          ?.libraryCardNo ?? "NA",
    }))

    const student = dataStudent?.map(el => ({
      ...el,
      libraryCardNo:
        libraryMemberdata?.find(elm => elm.ref === String(el.id))
          ?.libraryCardNo ?? "NA",
      role: "Student",
    }))

    setStudent(student.concat(staff))
  }

  async function getBooks() {
    const { data, error } = await supabase.from("Books").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    setBooks(data ?? [])
  }

  // async function getSections() {
  //   const { data, error } = await supabase.from("Section").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
  //   setSections(data ?? [])
  // }

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      title: "",
      memberRef: "",
      number: "",
      issueDate: "",
      returnDate: "",
      dueReturnDate: "",
    },

    validationSchema: Yup.object({}),
    onSubmit: async values => {
      const { data, error } = await supabase
        .from("LibraryBooks")
        .insert([
          {
            title: JSON.parse(Book)?.title,
            memberRef: currentRow.id,
            number: JSON.parse(Book)?.number,
            issueDate: null,
            returnDate: null,
            dueReturnDate: values.dueReturnDate,
          },
        ])
        .select()

      if (error) {
        toast.error("Book Inserted Failed", { autoClose: 2000 })
      } else {
        toast.success("Book Inserted", { autoClose: 2000 })
        const { data, error } = await supabase
        .from("LibraryBooks")
        .select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
        .ilike("memberRef", `%${currentRow.id}%`)

      setbooksBymember(data)
      }

      //   else {
      //     const { data, error } = await supabase
      //       .from("Student")
      //       .update([
      //         {
      //           title: values.title,
      //           ISBNNumber: values.ISBNNumber,
      //           author: values.author,
      //           rackNumber: values.rackNumber,
      //           price: values.price,
      //           number: values.number,
      //           publisher: values.publisher,
      //           subject: values.subject,
      //           Qty: values.Qty,
      //           postDate: values.postDate,
      //           description: values.description,
      //         },
      //       ])
      //       .eq("id", values.id)
      //       .select()

      //     if (error) {
      //       toast.error("Student Updated Failed", { autoClose: 2000 })
      //     } else {
      //       toast.success("Student Updated", { autoClose: 2000 })
      //       setshow(false)
      //       getCountries()
      //       validation.resetForm()
      //     }
      //   }
    },
  })

  const navigate = useNavigate()

  useEffect(() => {
    props.setBreadcrumbItems("Student", breadcrumbItems)
    getCountries()
    getBooks()
    // getSections()
  }, [])

  const handleClick = () => {
    settype("new")
    validation.resetForm()
    setshow(true)
  }

  const handleSearch = async () => {
    const { data: dataStaff } = await supabase.from("Staff").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    .ilike("firstName", `%${search}%`)
    
    const { data: dataStudent } = await supabase.from("Student").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    .ilike("firstName", `%${search}%`)

    const { data: libraryMemberdata, error: libraryMembererror } =
      await supabase.from("LibraryMember").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)

    const staff = dataStaff?.map(el => ({
      ...el,
      libraryCardNo:
        libraryMemberdata?.find(elm => elm.ref === String(el.id))
          ?.libraryCardNo ?? "NA",
    }))

    const student = dataStudent?.map(el => ({
      ...el,
      libraryCardNo:
        libraryMemberdata?.find(elm => elm.ref === String(el.id))
          ?.libraryCardNo ?? "NA",
      role: "Student",
    }))

    setStudent(student.concat(staff))
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
    color: "black", // Example: Change color for delete icon
  }
  const editIconStyle = {
    ...iconStyle,
    color: "black", // Color for edit icon (black)
  }

  const handelgetBooksByMember = async row => {
    setshow(!show)
    setcurrentRow(row)

    const { data, error } = await supabase
      .from("LibraryBooks")
      .select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
      .ilike("memberRef", `%${row.id}%`)

    setbooksBymember(data)
  }

  const handelupdate = async row => {
    const { data, error } = await supabase
      .from("LibraryBooks")
      .update([
        {
          issueDate: moment().format("MM/DD/YYYY"),
          returnDate: moment().format("MM/DD/YYYY"),
        },
      ])
      .eq("id", row.id)
      .select()

    if (error) {
      toast.error("Book returned Failed", { autoClose: 2000 })
    } else {
      toast.success("Book returned", { autoClose: 2000 })
      const { data, error } = await supabase
        .from("LibraryBooks")
        .select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
        .ilike("memberRef", `%${currentRow.id}%`)

      setbooksBymember(data)
    }
  }

  const columns = [
    {
      name: "Member ID",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.id ?? "-",
    },
    {
      name: "libraryCardNo",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.libraryCardNo ?? "-",
    },
    {
      name: "Admission No",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.admissionNo ?? "-",
    },
    {
      name: "Name",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => `${row?.firstName ?? "-"} ${row?.lastName ?? "-"}`,
    },
    {
      name: "Email",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => `${row?.email ?? "-"}`,
    },

    {
      name: "Member Type",
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
      minWidth: "250px",

      cell: row => {
        return (
          <div className="d-flex">
            <>
              <span
                style={actionIconStyle}
                onClick={() => {
                  handelgetBooksByMember(row)
                }}
              >
                {row?.libraryCardNo === "NA" ? (
                  <i className="ti-plus"></i>
                ) : (
                  <i className="ti-back-left"></i>
                )}
              </span>
            </>
          </div>
        )
      },
    },
  ]

  const columnsBooks = [
    {
      name: "Title",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.title ?? "-",
    },

    {
      name: "number",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.number ?? "-",
    },
    {
      name: "issueDate",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.issueDate ?? "-",
    },
    {
      name: "Due Return Date",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.dueReturnDate ?? "-",
    },

    {
      name: "returnDate",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.returnDate ?? "-",
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
              <span style={editIconStyle} onClick={() => handelupdate(row)}>
                <i className="ti-marker-alt"></i>
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
          <label className="col-form-label">Name</label>&nbsp;
          <div className="col-md-2 me-1">
            <input
              type="text"
              onChange={val => {
                setSearch(val.target.value)
              }}
               value={search}
              className="form-control"
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
                getCountries()
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </Row>
      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <CardTitle className="h4">Issue Return </CardTitle>
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
                  data={Student}
                />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Modal
        isOpen={show}
        toggle={() => setshow(!show)}
        centered={true}
        size="xl"
      >
        <ModalBody className="py-3 px-5">
          <Row>
            <h6> Member ID : {currentRow.id}</h6>
            <hr></hr>
            <Form
              className="form-horizontal mt-4"
              onSubmit={e => {
                e.preventDefault()
                validation.handleSubmit()
                return false
              }}
            >
              <Row>
                <div>
                  <Label htmlFor="useremail">Books</Label>
                  <select
                    id="name"
                    name="name"
                    className="form-control"
                    placeholder="Enter section Name"
                    onChange={e => {
                      setBook(e.target.value)
                    }}
                    value={Book}
                  >
                    <option value={""}>Select</option>
                    {Books &&
                      Books?.map(el => (
                        <option value={JSON.stringify(el)}>{el.title}</option>
                      ))}
                  </select> 
                </div>

                <div className="mb-3">
                  <Label htmlFor="useremail">Due Return Date</Label>
                  <input
                    id="dueReturnDate"
                    name="dueReturnDate"
                    className="form-control"
                    placeholder="Enter dueReturnDate"
                    type="date"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.dueReturnDate || ""}
                    invalid={
                      validation.touched.dueReturnDate &&
                      validation.errors.dueReturnDate
                        ? true
                        : false
                    }
                  />

                  {validation.touched.dueReturnDate &&
                  validation.errors.dueReturnDate ? (
                    <FormFeedback type="invalid">
                      {validation.errors.dueReturnDate}
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
          </Row>

          <div className="table-responsive">
            <DataTable
              noHeader
              pagination
              subHeader
              selectableRowsHighlight={true}
              highlightOnHover={true}
              //   paginationServer
              columns={columnsBooks}
              //paginationPerPage={7}
              className="react-dataTable"
              paginationDefaultPage={1}
              data={booksBymember ?? []}
            />
          </div>
        </ModalBody>
      </Modal>

      <ToastContainer />
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(IssueReturn)
