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
import * as XLSX from "xlsx"

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useFormik } from "formik"
import * as Yup from "yup"
import moment from "moment"
import { isEmpty } from "lodash"
import _ from "lodash"

const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)

const AddStudent = props => {
  document.title =
    "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard"

  const breadcrumbItems = [
    { title: "Smart school", link: "#" },
    { title: "Library", link: "#" },
  ]

  const [Student, setStudent] = useState([])
  const [clas, setClas] = useState([])
  const [sections, setSections] = useState([])

  const [Class, setClass] = useState("")
  const [Sect, setSect] = useState("")

  const [show, setshow] = useState(false)
  const [type, settype] = useState("new")
  const [search, setSearch] = useState("")

  async function getCountries() {
    const { data, error } = await supabase
      .from("Student")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
    const { data: libraryMemberdata, error: libraryMembererror } =
      await supabase
        .from("LibraryMember")
        .select("*")
        .eq("brancheId", localStorage.getItem("BranchId") ?? 1)

    setStudent(
      data.map(el => ({
        ...el,
        libraryCardNo:
          libraryMemberdata?.find(elm => elm.ref === String(el.id))
            ?.libraryCardNo ?? "NA",
      })) ?? [],
    )
  }

  const handleClickExcel = () => {
    const array = Student

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

  async function getClass() {
    const { data, error } = await supabase
      .from("Class")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
    setClas(data ?? [])
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
      ISBNNumber: "",
      author: "",
      rackNumber: "",
      price: "",
      number: "",
      publisher: "",
      subject: "",
      Qty: "",
      postDate: "",
      description: "",
    },

    validationSchema: Yup.object({
      title: Yup.string().required("Please Enter Your title"),
      ISBNNumber: Yup.string().required("Please Enter Your ISBNNumber"),
      author: Yup.string().required("Please Enter Your author"),
      rackNumber: Yup.string().required("Please Enter Your rackNumber"),
      price: Yup.string().required("Please Enter Your price"),
      number: Yup.string().required("Please Enter Your number"),
      publisher: Yup.string().required("Please Enter Your publisher"),

      subject: Yup.string().required("Please Enter Your subject"),
      Qty: Yup.string().required("Please Enter Your Qty"),
    }),
    onSubmit: async values => {
      if (type === "new") {
        const { data, error } = await supabase
          .from("Student")
          .insert([
            {
              brancheId: localStorage.getItem("BranchId") ?? 1,
              title: values.title,
              ISBNNumber: values.ISBNNumber,
              author: values.author,
              rackNumber: values.rackNumber,
              price: values.price,
              number: values.number,
              publisher: values.publisher,
              subject: values.subject,
              Qty: values.Qty,
              postDate: values.postDate,
              description: values.description,
            },
          ])
          .select()

        if (error) {
          toast.error("Student Inserted Failed", { autoClose: 2000 })
        } else {
          toast.success("Student Inserted", { autoClose: 2000 })
          setshow(false)
          getCountries()
          validation.resetForm()
        }
      } else {
        const { data, error } = await supabase
          .from("Student")
          .update([
            {
              title: values.title,
              ISBNNumber: values.ISBNNumber,
              author: values.author,
              rackNumber: values.rackNumber,
              price: values.price,
              number: values.number,
              publisher: values.publisher,
              subject: values.subject,
              Qty: values.Qty,
              postDate: values.postDate,
              description: values.description,
            },
          ])
          .eq("id", values.id)
          .select()

        if (error) {
          toast.error("Student Updated Failed", { autoClose: 2000 })
        } else {
          toast.success("Student Updated", { autoClose: 2000 })
          setshow(false)
          getCountries()
          validation.resetForm()
        }
      }
    },
  })

  const navigate = useNavigate()

  useEffect(() => {
    props.setBreadcrumbItems("Student", breadcrumbItems)
    getCountries()
    getClass()
    // getSections()
  }, [])

  const handleClick = () => {
    settype("new")
    validation.resetForm()
    setshow(true)
  }

  const handleSearch = async () => {
    const { data, error } = await supabase
      .from("Student")
      .select("*")
      .eq("brancheId", localStorage.getItem("BranchId") ?? 1)
      .ilike("class", `%${Class}%`)
      .ilike("section", `%${Sect}%`)

    const { data: libraryMemberdata, error: libraryMembererror } =
      await supabase
        .from("LibraryMember")
        .select("*")
        .eq("brancheId", localStorage.getItem("BranchId") ?? 1)

    setStudent(
      data.map(el => ({
        ...el,
        libraryCardNo:
          libraryMemberdata?.find(elm => elm.ref === String(el.id))
            .libraryCardNo ?? "NA",
      })) ?? [],
    )
  }

  const handelDelete = async row => {
    if (row.libraryCardNo !== "NA") {
      const { error } = await supabase
        .from("LibraryMember")
        .delete()
        .eq("ref", row.id)

      if (error) {
        toast.error("LibraryMember Failed", { autoClose: 2000 })
      } else {
        toast.success("LibraryMember Deleted", { autoClose: 2000 })
        getCountries()
      }
    } else {
      const uuidv4Val = uuidv4()
      const { error } = await supabase.from("LibraryMember").insert({
        ref: row.id,
        type: "student",
        libraryCardNo: uuidv4Val,
      })

      if (error) {
        toast.error("LibraryMember Failed", { autoClose: 2000 })
      } else {
        toast.success("LibraryMember Affected", { autoClose: 2000 })
        getCountries()
      }
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
    color: "black", // Example: Change color for delete icon
  }
  const editIconStyle = {
    ...iconStyle,
    color: "black", // Color for edit icon (black)
  }

  const columns = [
    {
      name: "libraryCardNo",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.libraryCardNo,
    },
    {
      name: "student admissionNo",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.admissionNo,
    },
    {
      name: "student Name",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => `${row?.firstName} ${row?.lastName}`,
    },
    {
      name: "fatherName",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.fatherName ?? "None",
    },
    {
      name: "dateOfBirth",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.dateOfBirth ?? "None",
    },
    {
      name: "Class (section)",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => `${row?.class} (${row?.section})`,
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
              <span style={actionIconStyle} onClick={() => handelDelete(row)}>
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

  return (
    <React.Fragment>
      <Row>
        <div className="d-flex mb-2">
          <div></div>
          {/* Vos éléments de filtre ici */}
          <label className="col-form-label">Class</label>&nbsp;
          <div className="col-md-2 me-1">
            <select
              onChange={val => {
                setClass(val.target.value)
                setSections(
                  clas.find(el => el.className === val.target.value)?.sections,
                )
              }}
              value={Class}
              className="form-control"
            >
              <option> Select </option>
              {clas?.map(el => (
                <option value={el.className}>{el.className}</option>
              ))}
            </select>
          </div>
          <label className="col-form-label">Section</label>&nbsp;
          <div className="col-md-2 me-1">
            <select
              onChange={val => {
                setSect(val.target.value)
              }}
              value={Sect}
              className="form-control"
            >
              <option> Select </option>
              {sections?.map(el => (
                <option value={el}>{el}</option>
              ))}
            </select>
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
            <button className="btn btn-primary ms-3" onClick={handleClickExcel}>
              Export Excel
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
              <CardTitle className="h4">Student List </CardTitle>
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

      <ToastContainer />
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(AddStudent)
