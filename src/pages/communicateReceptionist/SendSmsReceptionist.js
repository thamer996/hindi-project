import React, { useEffect, useState } from "react"
import { Row, Col, Card, Input, FormFeedback, Form } from "reactstrap"
import { connect } from "react-redux"

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"

//Import Email Sidebar

import { Editor } from "react-draft-wysiwyg"

import HeaderTeacher from "../../components/HorizontalLayoutTeacher/HeaderTeacher"
import NvbarTeacher from "../../components/HorizontalLayoutTeacher/NvbarTeacher"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useFormik } from "formik"
import * as Yup from "yup"
import { createClient } from "@supabase/supabase-js"
import { v4 as uuidv4 } from "uuid"
import PuffLoader from "react-spinners/PuffLoader"
import EmailSideBarReceptionistSms from "./EmailSideBarReceptionistSms"
const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)
const SendSms = props => {
  document.title =
    "Email Compose | Lexa - Responsive Bootstrap 5 Admin Dashboard"

  const breadcrumbItems = [
    { title: "Lexa", link: "#" },
    { title: "Send SMS", link: "#" },
  ]
  const [attachment, setattachment] = useState("")
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      title: "",
      sms: "",
      attachment:""
    },

    validationSchema: Yup.object({
        title: Yup.string().required("Please Enter Your title"),
        sms: Yup.string().required("Please Enter Your sms"),
    }),
    onSubmit: async values => {
      
      console.log("values", values,attachment)
      
        const { data, error } = await supabase
          .from("Sms")
          .insert([
            { brancheId: localStorage.getItem("BranchId") ?? 1,
              title: values.title,
              attachment:attachment,
              sms: values.sms,
            },
          ])
          .select()

        if (error) {
          console.log("ez", error)
          toast.error("Sms send Failed", { autoClose: 2000 })
        } else {
          toast.success("Sms send -_-", { autoClose: 2000 })

          validation.resetForm()
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


  useEffect(() => {
    props.setBreadcrumbItems("Send SMS", breadcrumbItems)
  })

  return (
    <React.Fragment>
      <Row className="mt-5">
        <Col xs="12">
          {/* Render Email SideBar */}
          <EmailSideBarReceptionistSms />

          <div className="email-rightbar mb-3">
            <Card>
            <Form
                className="form-horizontal mt-4"
                onSubmit={e => {
                  e.preventDefault()
                  validation.handleSubmit()
                  return false
                }}
              >
              <div className="card-body">
                <div>
                  <div className="mb-3">
                    <Input
                    id="title"
                      type="text"
                      className="form-control"
                      placeholder=" Enter Title"
                      onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.title || ""}
                invalid={
                  validation.touched.title && !!validation.errors.title
                }
                    />
                     {validation.touched.title && validation.errors.title && (
                <FormFeedback type="invalid">
                  {validation.errors.title}
                </FormFeedback>
              )}
                  </div>

                  <div className="mb-3">
                    <Input
                      type="file"
                      className="form-control"
                      placeholder="Attachment "
                      onChange={e => uploadDoc(e, setattachment)}
                    />
                  </div>

                  <div className="mb-3">
                    <textarea
                    id="sms"
                      className="form-control"
                      rows="4"
                      placeholder="Write your SMS message here..."
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.sms || ""}
                      invalid={
                        validation.touched.sms && !!validation.errors.sms
                      }
                          />
                           {validation.touched.sms && validation.errors.sms && (
                      <FormFeedback type="invalid">
                        {validation.errors.sms}
                      </FormFeedback>
                    )}
                  
                  </div>

                  <div className="btn-toolbar form-group mb-0">
                    <div className="col-12 text-end">
                     
                      <button className="btn btn-primary waves-effect waves-light">
                        <span>Send</span>{" "}
                        <i className="fab fa-telegram-plane ms-2"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              </Form>
            </Card>
          </div>
        </Col>
      </Row>
      <ToastContainer />
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(SendSms)
