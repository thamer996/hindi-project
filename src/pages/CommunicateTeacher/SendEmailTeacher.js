import React, { useRef, useEffect, useState } from "react"
import {
  Row,
  Col,
  Card,
  Input,
  Form,
  Label,
  FormFeedback,
  Spinner,
  Button,
} from "reactstrap"
import { connect } from "react-redux"

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"

//Import Email Sidebar
import EmailSideBar from "../../pages/communicate/EmailSideBar"
import { Editor } from "react-draft-wysiwyg"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useFormik } from "formik"
import * as Yup from "yup"
import { createClient } from "@supabase/supabase-js"
import { v4 as uuidv4 } from "uuid"
import PuffLoader from "react-spinners/PuffLoader"
import emailjs from "@emailjs/browser"
import { quantum,waveform,metronome } from 'ldrs';




const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)

const SendEmail = props => {
  const [attachment, setattachment] = useState(null)
  const [loading, setLoading] = useState(false)
  const formRef = useRef(null)
  quantum.register();
  waveform.register();
  metronome.register();
  document.title =
    "Email Compose | Lexa - Responsive Bootstrap 5 Admin Dashboard"
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false)
    }, 3000)

    // Cleanup function to clear the timeout when the component unmounts
    return () => clearTimeout(timeoutId)
  }, [loading])
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
  const breadcrumbItems = [
    { title: "Lexa", link: "#" },
    { title: "Send Email", link: "#" },
  ]
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      // title: "",
      // attachment: "",
      // email: "",
      from_name: "",
      to_name: "",
      message: "",
    },

    validationSchema: Yup.object({
      //   title: Yup.string().required("Please Enter Your title"),
      //   attachment: Yup.string().required("Please Enter Your attachment"),
      //   email: Yup.string().required("Please Enter Your email"),
    }),
    onSubmit: async values => {
      setLoading(true)
      console.log("values", values,values.message.blocks[0].text)

      const templateParams = {
        from_name: values.from_name,
        to_name: values.to_name,
        message: values.message.blocks[0].text,
      }

      const serviceID = "service_izz44cy"
      const templateID = "template_g4np7ah"
      const publicKey = "044fPM4BupmmLCNuU"

      emailjs
        .send(serviceID, templateID, templateParams, publicKey)
        .then(async () => {
          toast.success("Email send with success ")
          const { data, error } = await supabase
          .from("Email")
          .insert([
            { brancheId: localStorage.getItem("BranchId") ?? 1,
              title: values.from_name,
              attachment: values.to_name,
              email: values.message.blocks[0].text,
            },
          ])
          .select()

        if (error) {
          console.log("ez", error)
          toast.error("Email send Failed", { autoClose: 2000 })
        } else {
          toast.success("Email send -_-", { autoClose: 2000 })

          validation.resetForm()
        }
          setLoading(false)
        })
        .catch(res => {
          console.error("error mail", res)
          setLoading(false)
        })

      
    },
  })

  useEffect(() => {
    props.setBreadcrumbItems("Send Email", breadcrumbItems)
  }, [])

  return (
    <React.Fragment>
    
          {/* Render Email SideBar */}
   

          <div className="">
            <Card>
              <Form
                ref={formRef}
                className="form-horizontal mt-4"
                onSubmit={validation.handleSubmit}
              >
                <div className="card-body " >
                  {loading && (
                       <div
                       style={{
                         position: 'absolute',
                         top: '50%',
                         left: '50%',
                         transform: 'translate(-50%, -50%)',
                       }}
                       >
                       <l-metronome
                       size="45"
                       bg-opacity=".1"
                       speed="1.6" 
                       color="black"  />
                     </div>
                  ) }
                    <div>
                      <div className="mb-3">
                        <Label htmlFor="from_name">Your Name</Label>
                        <Input
                          id="from_name"
                          name="from_name"
                          className="form-control"
                          placeholder="Enter your name"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.from_name || ""}
                          invalid={
                            validation.touched.from_name &&
                            !!validation.errors.from_name
                          }
                        />
                        {validation.touched.from_name &&
                          validation.errors.from_name && (
                            <FormFeedback type="invalid">
                              {validation.errors.from_name}
                            </FormFeedback>
                          )}
                      </div>
                      <div className="mb-3">
                        <Label htmlFor="to_name">Recipient's Name</Label>
                        <Input
                          id="to_name"
                          name="to_name"
                          className="form-control"
                          placeholder="Enter recipient's name"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.to_name || ""}
                          invalid={
                            validation.touched.to_name &&
                            !!validation.errors.to_name
                          }
                        />
                        {validation.touched.to_name &&
                          validation.errors.to_name && (
                            <FormFeedback type="invalid">
                              {validation.errors.to_name}
                            </FormFeedback>
                          )}
                      </div>
               
                      <div className="mb-3">
                        <Label htmlFor="email">Message</Label>
                        <Editor
                          toolbarClassName="toolbarClassName"
                          wrapperClassName="wrapperClassName"
                          editorClassName="editorClassName"
                          onChange={content =>
                            validation.setFieldValue("message", content)
                          }
                          onBlur={validation.handleBlur}
                          value={validation.values.message || ""}
                          invalid={
                            validation.touched.message &&
                            !!validation.errors.message
                          }
                        />
                        {validation.touched.message &&
                          validation.errors.message && (
                            <FormFeedback type="invalid">
                              {validation.errors.message}
                            </FormFeedback>
                          )}
                      </div>
                    
                      <div className="btn-toolbar form-group mb-0">
                        <div className="col-12 text-end">
                          <Button
                            color="primary"
                            className="w-md waves-effect waves-light"
                            type="submit"
                          >
                            <span>Submit</span>
                          </Button>
                        </div>
                      </div>
                    </div>
             
                </div>
              </Form>
            </Card>
          </div>
    

      <ToastContainer />
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(SendEmail)
