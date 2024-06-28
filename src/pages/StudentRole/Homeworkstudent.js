/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import DataTable from "react-data-table-component"
import { createClient } from "@supabase/supabase-js"
import { v4 as uuidv4 } from "uuid"

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
  ModalHeader,
} from "reactstrap"

import { connect } from "react-redux"

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useFormik } from "formik"
import * as Yup from "yup"
import { isEmpty } from "lodash"
import { isNil } from "lodash"

const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)
const ClosedHomeworkSuperAdmin = props => {
  document.title =
    "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard"

  const breadcrumbItems = [
    { title: "Smart school", link: "#" },
    { title: "Academics", link: "#" },
  ]

  const [section, setSection] = useState([])

  const [clas, setclas] = useState([])
  const [sections, setSections] = useState([])
  const [subject, setSubject] = useState([])
  const [X, setX] = useState({})
  const [attachDocument, setattachDocument] = useState([])
  const [Studentdetail, SetStudentDetail] = useState([])
  const [show, setshow] = useState(false)
  const [type, settype] = useState("new")
  const [search, setSearch] = useState("")
  async function getStudentDetail() {
      const authUser = JSON.parse(localStorage.getItem("authUser") ?? "{}")
    const refUser = localStorage.getItem("StudentId") ?? ""
    const { data, error } = await supabase
      .from("Student")
      .select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
      .eq("id", refUser)
      .single()
    SetStudentDetail(data ?? [])
  }console.log("studzent", Studentdetail)
const  getCountries = async (studentDetail)  => {
  try {    
    
    const { data, error } = await supabase.from("Homework").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    if (error) throw error;
    if (data) {
      console.log("homework data", data)
      const groupedData = data.filter(o => o.classRef === studentDetail?.class &&  o.sectionRef === studentDetail?.section)
      console.log("Grouped data:", groupedData);
      setSection(groupedData ?? [])
    }
  } catch (error) {
    console.error("Error fetching approve leave data:", error);
  }


}
console.log("homework by student ", section)



  // async function getSections() {
  //   const { data, error } = await supabase.from("Section").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
  //   setSections(data ?? [])
  // }

  // async function getclas() {
  //   const { data, error } = await supabase.from("Class").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
  //   setclas(data ?? [])
  // }

  // async function getSubject() {
  //   const { data, error } = await supabase.from("Subjects").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
  //   setSubject(data ?? [])
  // }

  // async function getSubjectGroup() {
  //   const { data, error } = await supabase.from("SubjectGroup").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
  //   setSubjectGroup(data ?? [])
  // }

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      class: "",
      sections: "",
      subjectGroup: "",
      subject: "",
      homeworkDate: "",
      evaluationDate: "",
      submissionDate: "",
      maxMarks: "",
      attachDocument: "",
      description: "",
      id: "",
    },

    validationSchema: Yup.object({
      class: Yup.string().required("Please Enter Your  class"),
      sections: Yup.string().required("Please Enter Your  sections"),
      subjectGroup: Yup.string().required("Please Enter Your subjectGroup"),
      subject: Yup.string().required("Please Enter Your  subject"),
      homeworkDate: Yup.string().required("Please Enter Your  homeworkDate"),
      maxMarks: Yup.string().required("Please Enter Your  maxMarks"),
      description: Yup.string().required("Please Enter Your  description"),
    }),
    onSubmit: async values => {
      if (type === "new") {
        const { data, error } = await supabase
          .from("Homework")
          .insert([
            { brancheId: localStorage.getItem("BranchId") ?? 1,
              classRef: values.class,
              sectionRef: values.sections,
              subjectGroupRef: values.subjectGroup,
              subjectRef: values.subject,
              homeworkDate: values.homeworkDate,
              evaluationDate: values.evaluationDate,
              submissionDate: values.submissionDate,
              maxMarks: values.maxMarks,
              attachDocument: attachDocument,
              description: values.description,
              createdBy: values?.createdBy ?? "ADMIN",
              status: "upcoming",
            },
          ])
          .select()

        if (error) {
          console.log("ez", error)
          toast.error("Homework Inserted Failed", { autoClose: 2000 })
        } else {
          toast.success("Homework Inserted", { autoClose: 2000 })
          setshow(false)
          getCountries (Studentdetail) 
          validation.resetForm()
        }
      } else {
        const { data, error } = await supabase
          .from("Homework")
          .update([
            {
              classRef: values.class,
              sectionRef: values.sections,
              subjectGroupRef: values.subjectGroup,
              subjectRef: values.subject,
              homeworkDate: values.homeworkDate,
              evaluationDate: values.evaluationDate,
              submissionDate: values.submissionDate,
              maxMarks: values.maxMarks,
              attachDocument: attachDocument,
              description: values.description,
              createdBy: values?.createdBy ?? "ADMIN",
            },
          ])
          .eq("id", values.id)
          .select()

        if (error) {
          toast.error("Homework Updated Failed", { autoClose: 2000 })
        } else {
          toast.success("Homework Updated", { autoClose: 2000 })
          setshow(false)
          getCountries (Studentdetail) 
          validation.resetForm()
        }
      }
    },
  })

  async function uploadDoc(e, setstate) {
    let file = e.target.files[0]

    const uuidv4Val = uuidv4()

    const { data, error } = await supabase.storage
      .from("uploads")
      .upload(uuidv4Val, file)

    if (data) {
      //   //   to get image
      //   const { data: datas, error: errors } = await supabase.storage
      //     .from("uploads")
      //     .download(data?.path)
      //   const url = URL.createObjectURL(datas)

      console.log("eeeeeeeeeeeeeeeee", data?.path)
      setstate(data?.path)
    } else {
      console.log("eeeeeeeeeeeeeeeee", error)
      console.log(error)
    }
  }

  const navigate = useNavigate()
  useEffect(()=> {
    if (Studentdetail  && Object.keys(Studentdetail).length > 0){
      getCountries (Studentdetail)    }
  }, [Studentdetail])
  useEffect(() => {
    props.setBreadcrumbItems("Homework", breadcrumbItems)
    getStudentDetail()

    // getSubject()
    // getclas()
    // getSections()
    // getSubjectGroup()
  }, [])

  const handleClick = () => {
    settype("new")
    validation.resetForm()
    setshow(true)
  }

  const handleSearch = async () => {
    console.log('search',search)
    const { data, error } = await supabase
      .from("Homework")
      .select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
      .or(`status.ilike.%${search}%,subjectRef.ilike.%${search}%`)
      .eq('classRef', Studentdetail.class)
      .eq('sectionRef', Studentdetail.section)
    if (error) {
      console.error("Error fetching data:", error);
      return;
    }
  
    console.log("search results:", data);
    setSection(data);
  };
  
  const handelEdit = async row => {
    // validation.resetForm()
setX(row)
    // validation.setFieldValue("id", row.id)

    setattachDocument(row.attachDocument)
    setshow(true)

  }

  const handelDelete = async id => {
    const { error } = await supabase.from("Homework").delete().eq("id", id)

    if (error) {
      toast.error("Homework Deleted Failed", { autoClose: 2000 })
    } else {
      toast.success("Homework Deleted", { autoClose: 2000 })
      getCountries (Studentdetail) 
    }
  }

  const handelupdateStatus = async row => {
    const { data, error } = await supabase
      .from("Homework")
      .update([
        {
          status: row.status === "upcoming" ? "closed" : "upcoming",
        },
      ])
      .eq("id", row.id)
      .select()

    if (error) {
      toast.error("Homework Deleted Failed", { autoClose: 2000 })
    } else {
      toast.success(row.status === "upcoming" ? "To Closed" : "To Upcoming", {
        autoClose: 2000,
      })
      getCountries (Studentdetail) 
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

  const columns = [
    {
      name: "Class",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.classRef,
    },
    {
      name: "Section",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.sectionRef,
    },
    {
      name: "Subject Group",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.subjectGroupRef,
    },
    {
      name: "Subject",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.subjectRef,
    },
    {
      name: "Homework Date",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.homeworkDate,
    },
    {
      name: "Submission Date",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.submissionDate,
    },
    {
      name: "Evaluation Date",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.evaluationDate,
    },
    {
      name: "Created by",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.createdBy,
    },
    {
      name: "Status",
      sortable: true,
      reorder: true,
      center: true,
      minWidth: "230px",
      selector: row => row?.status,
    },
    {
      name: "Action",
      // allowOverflow: true,
      reorder: true,
      center: true,
      minWidth: "250px",
    
      cell: row => {
        if (row?.status === 'closed') {
          return <span style={editIconStyle}><i className="ti-lock"></i></span>;
        } else {
          return (
            <div className="d-flex">
              <span style={editIconStyle} onClick={() => handelEdit(row)}>
                <i className="ti-eye"></i>
              </span>
            </div>
          );
        }
      }
    }
    
  ]

  return (
    <React.Fragment>
      <Row>
        <div className="d-flex mb-2">
          <div></div>
          {/* Vos éléments de filtre ici */}

          <label className="col-form-label">Homework </label>
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
                getCountries (Studentdetail) 
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
              <CardTitle className="h4">Homework List </CardTitle>
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
                  data={section}
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
        
      >
        <ModalHeader>Homework detail </ModalHeader>
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
            {/* {zz && zz.length > 0 ? zz?.status.join(', ') : 'No status available'}      */}
                   <p><strong>class:</strong> {X.classRef}</p>
                   <p><strong>section:</strong> {X.sectionRef}</p>
                   <p><strong>homeworkDate:</strong> {X.homeworkDate}</p>
                   <p><strong>evaluationDate:</strong> {X.evaluationDate}</p>
                   <p><strong>description:</strong> {X.description}</p>
                   <p><strong>subjectGroup:</strong> {X.subjectGroupRef}</p>
                   <p><strong>submissionDate:</strong> {X.submissionDate}</p>
                   <p><strong>Download Document:</strong>  {!isEmpty(X.attachDocument) && !isNil(X.attachDocument) && (
                    <Col md={1}>
                      <a
                        href={`https://ypduxejepwdmssduohpi.supabase.co/storage/v1/object/public/uploads/${X.attachDocument}`}
                        alt="img"
                        target="_blank"
                      >
                       Click to download
                      </a>
                    </Col>
                  )}</p>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
      <ToastContainer />
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(ClosedHomeworkSuperAdmin)
