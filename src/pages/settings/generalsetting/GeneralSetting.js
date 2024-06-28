import React, { useEffect, useState } from "react"

import {
  Card,
  CardBody,
  Col,
  Row,
  CardTitle,
  FormGroup,
  Form,
  FormFeedback,
  Label,
} from "reactstrap"

import { connect } from "react-redux"

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../../store/actions"
import { createClient } from "@supabase/supabase-js"
import { useFormik } from "formik"
import * as Yup from "yup"
import { ToastContainer, toast } from "react-toastify"
import { isEmpty, isNil } from "lodash"

const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)

const GeneralSetting = props => {
  document.title =
    "Form Elements | Lexa - Responsive Bootstrap 5 Admin Dashboard"

  const breadcrumbItems = [
    { title: "Smart school", link: "#" },
    { title: "General Setting", link: "#" },
  ]

  const [section, setSection] = useState({})
  const [type, settype] = useState("new")

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      schoolName: "",
      schoolCode: "",

      address: "",
      phone: "",
      email: "",
      academicSession: "",
      session: "",
      sessionStartMonth: "",
      dateTime: "",

      dateFormat: "",
      timeZone: "",

      startDayOfWeek: "",
      currency: "",
      currencyFormat: "",

      fileUploadPath: "",
      baseURL: "",
    },

    validationSchema: Yup.object({}),

    onSubmit: async values => {
      if (type === "new") {
        const { data, error } = await supabase
          .from("GeneralSetting")
          .insert([
            { brancheId: localStorage.getItem("BranchId") ?? 1,
              schoolName: values.schoolName,
              schoolCode: values.schoolCode,

              address: values.address,
              phone: values.phone,
              email: values.email,
              academicSession: values.academicSession,
              session: values.session,
              sessionStartMonth: values.sessionStartMonth,
              dateTime: values.dateTime,

              dateFormat: values.dateFormat,
              timeZone: values.timeZone,

              startDayOfWeek: values.startDayOfWeek,
              currency: values.currency,
              currencyFormat: values.currencyFormat,

              fileUploadPath: values.fileUploadPath,
              baseURL: values.baseURL,
            },
          ])
          .select()

        if (error) {
          toast.error("General Setting Inserted Failed", { autoClose: 2000 })
        } else {
          toast.success("General Setting Inserted", { autoClose: 2000 })
          getCountries()
          validation.resetForm()
        }
      } else {
        const { data, error } = await supabase
          .from("GeneralSetting")
          .update([
            {
              schoolName: values.schoolName,
              schoolCode: values.schoolCode,

              address: values.address,
              phone: values.phone,
              email: values.email,
              academicSession: values.academicSession,
              session: values.session,
              sessionStartMonth: values.sessionStartMonth,
              dateTime: values.dateTime,

              dateFormat: values.dateFormat,
              timeZone: values.timeZone,

              startDayOfWeek: values.startDayOfWeek,
              currency: values.currency,
              currencyFormat: values.currencyFormat,

              fileUploadPath: values.fileUploadPath,
              baseURL: values.baseURL,
            },
          ])
          .eq("id", values.id)
          .select()

        if (error) {
          toast.error("General Setting Updated Failed", { autoClose: 2000 })
        } else {
          toast.success("General Setting Updated", { autoClose: 2000 })
          getCountries()
          validation.resetForm()
        }
      }
    },
  })

  async function getCountries() {
    const { data, error } = await supabase
      .from("GeneralSetting")
      .select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
      .single()
    setSection(data ?? {})

    if (!isEmpty(data) || !isNil(data)) {
      settype("edit")

      validation.setFieldValue("id", data.id)

      validation.setFieldValue("id", data.id)
      validation.setFieldValue("schoolName", data.schoolName)
      validation.setFieldValue("schoolCode", data.schoolCode)
      validation.setFieldValue("address", data.address)
      validation.setFieldValue("phone", data.phone)
      validation.setFieldValue("email", data.email)
      validation.setFieldValue("academicSession", data.academicSession)

      validation.setFieldValue("session", data.session)
      validation.setFieldValue("sessionStartMonth", data.sessionStartMonth)

      validation.setFieldValue("dateTime", data.dateTime)
      validation.setFieldValue("dateFormat", data.dateFormat)
      validation.setFieldValue("timeZone", data.timeZone)
      validation.setFieldValue("startDayOfWeek", data.startDayOfWeek)
      validation.setFieldValue("currency", data.currency)

      validation.setFieldValue("currencyFormat", data.currencyFormat)
      validation.setFieldValue("fileUploadPath", data.fileUploadPath)

      validation.setFieldValue("baseURL", data.baseURL)
    } else {
      settype("new")
    }
  }

  useEffect(() => {
    ;(async () => {
      props.setBreadcrumbItems("General Setting", breadcrumbItems)
      await getCountries()
    })()
  }, [])

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <CardBody>
              {/* ************************************* Form  **************************************/}
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
                    <Label htmlFor="useremail">School Name</Label>
                    <input
                      id="schoolName"
                      name="schoolName"
                      className="form-control"
                      placeholder="Enter schoolName"
                      type="schoolName"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.schoolName || ""}
                      invalid={
                        validation.touched.schoolName &&
                        validation.errors.schoolName
                          ? true
                          : false
                      }
                    />

                    {validation.touched.schoolName &&
                    validation.errors.schoolName ? (
                      <FormFeedback type="invalid">
                        {validation.errors.schoolName}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Row>

                <Row>
                  <div className="mb-3">
                    <Label htmlFor="useremail">School Code</Label>
                    <input
                      id="schoolCode"
                      name="schoolCode"
                      className="form-control"
                      placeholder="Enter schoolCode"
                      type="schoolCode"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.schoolCode || ""}
                      invalid={
                        validation.touched.schoolCode &&
                        validation.errors.schoolCode
                          ? true
                          : false
                      }
                    />

                    {validation.touched.schoolCode &&
                    validation.errors.schoolCode ? (
                      <FormFeedback type="invalid">
                        {validation.errors.schoolCode}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Row>

                <Row>
                  <div className="mb-3">
                    <Label htmlFor="useremail">Address</Label>
                    <input
                      id="address"
                      name="address"
                      className="form-control"
                      placeholder="Enter address"
                      type="address"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.address || ""}
                      invalid={
                        validation.touched.address && validation.errors.address
                          ? true
                          : false
                      }
                    />

                    {validation.touched.address && validation.errors.address ? (
                      <FormFeedback type="invalid">
                        {validation.errors.address}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Row>

                <Row>
                  <div className="mb-3">
                    <Label htmlFor="useremail">phone</Label>
                    <input
                      id="phone"
                      name="phone"
                      className="form-control"
                      placeholder="Enter phone"
                      type="text"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.phone || ""}
                      invalid={
                        validation.touched.phone && validation.errors.phone
                          ? true
                          : false
                      }
                    />

                    {validation.touched.phone && validation.errors.phone ? (
                      <FormFeedback type="invalid">
                        {validation.errors.phone}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Row>

                <Row>
                  <div className="mb-3">
                    <Label htmlFor="useremail">Email</Label>
                    <input
                      id="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter email"
                      type="text"
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
                </Row>

                <Row>
                  <div className="mb-3">
                    <Label htmlFor="useremail">Academic Session</Label>
                    <input
                      id="academicSession"
                      name="academicSession"
                      className="form-control"
                      placeholder="Enter academicSession"
                      type="academicSession"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.academicSession || ""}
                      invalid={
                        validation.touched.academicSession &&
                        validation.errors.academicSession
                          ? true
                          : false
                      }
                    />

                    {validation.touched.academicSession &&
                    validation.errors.academicSession ? (
                      <FormFeedback type="invalid">
                        {validation.errors.academicSession}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Row>

                <Row>
                  <div className="mb-3">
                    <Label htmlFor="useremail">Session</Label>
                    <select
                      id="session"
                      name="session"
                      className="form-control"
                      placeholder="Enter session"
                      type="session"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.session || ""}
                      invalid={
                        validation.touched.session && validation.errors.session
                          ? true
                          : false
                      }
                    >
                      <option value={""}> Select </option>
                      <option value={"2025-24"}>2025-24 </option>
                      <option value={"2026-25"}>2026-25 </option>
                      <option value={"2027-26"}>2027-26 </option>
                    </select> 

                    {validation.touched.session && validation.errors.session ? (
                      <FormFeedback type="invalid">
                        {validation.errors.session}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Row>

                <Row>
                  <div className="mb-3">
                    <Label htmlFor="useremail">Session Start Month</Label>
                    <select
                      id="sessionStartMonth"
                      name="sessionStartMonth"
                      className="form-control"
                      placeholder="Enter sessionStartMonth"
                      type="sessionStartMonth"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.sessionStartMonth || ""}
                      invalid={
                        validation.touched.sessionStartMonth &&
                        validation.errors.sessionStartMonth
                          ? true
                          : false
                      }
                    >
                      <option value={""}> Select </option>
                      <option value={"January"}>January </option>
                      <option value={"February"}> February </option>
                      <option value={"March"}> March </option>
                    </select> 

                    {validation.touched.sessionStartMonth &&
                    validation.errors.sessionStartMonth ? (
                      <FormFeedback type="invalid">
                        {validation.errors.sessionStartMonth}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Row>

                <Row>
                  <div className="mb-3">
                    <Label htmlFor="useremail">Date Time</Label>
                    <input
                      id="dateTime"
                      name="dateTime"
                      className="form-control"
                      placeholder="Enter dateTime"
                      type="dateTime"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.dateTime || ""}
                      invalid={
                        validation.touched.dateTime &&
                        validation.errors.dateTime
                          ? true
                          : false
                      }
                    />

                    {validation.touched.dateTime &&
                    validation.errors.dateTime ? (
                      <FormFeedback type="invalid">
                        {validation.errors.dateTime}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Row>

                <Row>
                  <div className="mb-3">
                    <Label htmlFor="useremail">Date Format</Label>
                    <select
                      id="dateFormat"
                      name="dateFormat"
                      className="form-control"
                      placeholder="Enter dateFormat"
                      type="dateFormat"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.dateFormat || ""}
                      invalid={
                        validation.touched.dateFormat &&
                        validation.errors.dateFormat
                          ? true
                          : false
                      }
                    >
                      <option value={""}> Select </option>
                      <option value={"mm/dd/yyyy"}> mm/dd/yyyy </option>
                      <option value={"mm-dd-yyyy"}> mm-dd-yyyy</option>
                    </select> 

                    {validation.touched.dateFormat &&
                    validation.errors.dateFormat ? (
                      <FormFeedback type="invalid">
                        {validation.errors.dateFormat}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Row>

                <Row>
                  <div className="mb-3">
                    <Label htmlFor="useremail">Time Zone</Label>
                    <select
                      id="timeZone"
                      name="timeZone"
                      className="form-control"
                      placeholder="Enter timeZone"
                      type="timeZone"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.timeZone || ""}
                      invalid={
                        validation.touched.timeZone &&
                        validation.errors.timeZone
                          ? true
                          : false
                      }
                    >
                      <option value={"(GMT+05:30)Asia,Kolkata"}>
                        (GMT+05:30)Asia,Kolkata
                      </option>
                    </select> 

                    {validation.touched.timeZone &&
                    validation.errors.timeZone ? (
                      <FormFeedback type="invalid">
                        {validation.errors.timeZone}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Row>

                <Row>
                  <div className="mb-3">
                    <Label htmlFor="useremail">Start Day Of Week</Label>
                    <select
                      id="startDayOfWeek"
                      name="startDayOfWeek"
                      className="form-control"
                      placeholder="Enter startDayOfWeek"
                      type="startDayOfWeek"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.startDayOfWeek || ""}
                      invalid={
                        validation.touched.startDayOfWeek &&
                        validation.errors.startDayOfWeek
                          ? true
                          : false
                      }
                    >
                      <option value={"Monday"}>Monday</option>
                      <option value={"Tuesday"}>Tuesday</option>
                      <option value={"Wednesday"}>Wednesday</option>
                    </select> 

                    {validation.touched.startDayOfWeek &&
                    validation.errors.startDayOfWeek ? (
                      <FormFeedback type="invalid">
                        {validation.errors.startDayOfWeek}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Row>

                <Row>
                  <div className="mb-3">
                    <Label htmlFor="useremail">Currency</Label>
                    <input
                      id="currency"
                      name="currency"
                      className="form-control"
                      placeholder="Enter currency"
                      type="currency"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.currency || ""}
                      invalid={
                        validation.touched.currency &&
                        validation.errors.currency
                          ? true
                          : false
                      }
                    />

                    {validation.touched.currency &&
                    validation.errors.currency ? (
                      <FormFeedback type="invalid">
                        {validation.errors.currency}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Row>

                <Row>
                  <div className="mb-3">
                    <Label htmlFor="useremail">Currency Format</Label>
                    <select
                      id="currencyFormat"
                      name="currencyFormat"
                      className="form-control"
                      placeholder="Enter currencyFormat"
                      type="currencyFormat"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.currencyFormat || ""}
                      invalid={
                        validation.touched.currencyFormat &&
                        validation.errors.currencyFormat
                          ? true
                          : false
                      }
                    >
                      <option value={"1,23,45,678,00"}>1,23,45,678,00</option>
                    </select> 

                    {validation.touched.currencyFormat &&
                    validation.errors.currencyFormat ? (
                      <FormFeedback type="invalid">
                        {validation.errors.currencyFormat}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Row>

                <Row>
                  <div className="mb-3">
                    <Label htmlFor="useremail">File Upload Path</Label>
                    <input
                      id="fileUploadPath"
                      name="fileUploadPath"
                      className="form-control"
                      placeholder="Enter fileUploadPath"
                      type="fileUploadPath"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.fileUploadPath || ""}
                      invalid={
                        validation.touched.fileUploadPath &&
                        validation.errors.fileUploadPath
                          ? true
                          : false
                      }
                    />

                    {validation.touched.fileUploadPath &&
                    validation.errors.fileUploadPath ? (
                      <FormFeedback type="invalid">
                        {validation.errors.fileUploadPath}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Row>

                <Row>
                  <div className="mb-3">
                    <Label htmlFor="useremail">Base URL</Label>
                    <input
                      id="baseURL"
                      name="baseURL"
                      className="form-control"
                      placeholder="Enter baseURL"
                      type="baseURL"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.baseURL || ""}
                      invalid={
                        validation.touched.baseURL && validation.errors.baseURL
                          ? true
                          : false
                      }
                    />

                    {validation.touched.baseURL && validation.errors.baseURL ? (
                      <FormFeedback type="invalid">
                        {validation.errors.baseURL}
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
              {/* ************************************* Form  **************************************/}
            </CardBody>
          </Card>
        </Col>
      </Row>

      <ToastContainer />
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(GeneralSetting)
