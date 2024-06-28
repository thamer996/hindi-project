import React, { useState, useEffect } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Button,
  Label,
  Input,
  FormFeedback,
  Form,
} from "reactstrap"

// Formik Validation
import * as Yup from "yup"
import { useFormik } from "formik"

//redux
import { useSelector, useDispatch } from "react-redux"
import { createSelector } from "reselect"
import withRouter from "../../components/Common/withRouter"

import user1 from "../../assets/images/users/user-1.jpg"
// actions
import { editProfile, resetProfileFlag } from "../../store/actions"
import { createClient } from "@supabase/supabase-js"
import { ToastContainer, toast } from "react-toastify"
import { isEmpty } from "lodash"

const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)

const UserProfile = () => {
  //meta title
  document.title = "Profile | Skote - React Admin & Dashboard Template"

  const dispatch = useDispatch()

  const [email, setemail] = useState("")
  const [name, setname] = useState("")
  const [idx, setidx] = useState(1)
  const [role, setrole] = useState("")
  const [password, setpassword] = useState("")

  const selectProfileState = state => state.Profile
  const ProfileProperties = createSelector(selectProfileState, profile => ({
    error: profile.error,
    success: profile.success,
  }))

  const { error, success } = useSelector(ProfileProperties)

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser"))
      setname(obj.userName)
      setemail(obj.email)
      setidx(obj.id)
      setrole(obj.role)
      setpassword(obj.password)
    }
  }, [dispatch, success])

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      username: name || "",
      email: email || "",
      password: "",
      OLdpassword: "",
    },
    validationSchema: Yup.object({}),
    onSubmit: async values => {
      if (values.OLdpassword == password) {
        const { data, error } = await supabase
          .from("Users")
          .update([
            {
              userName: values.username,
              email: values.email,
              password: isEmpty(values.password) ? password : values.password,
            },
          ])
          .eq("id", idx)
          .eq(
            "password",
            isEmpty(values.password) ? password : values.OLdpassword,
          )
          .select()

        if (error) {
          toast.error("Updated Failed", { autoClose: 2000 })
        } else {
          toast.success("Updated", { autoClose: 2000 })
          localStorage.setItem("authUser", JSON.stringify(data[0]))
          setname(data[0].userName)
          setemail(data[0].email)
          setidx(data[0].id)
          setrole(data[0].role)
          setpassword(data[0].password)
          // validation.setFieldValue("OLdpassword", "")
          // validation.setFieldValue("password", "")
        }
      } else {
        toast.error("Updated Failed : Old pass is Uncorrect", {
          autoClose: 2000,
        })
      }
    },
  })

  return (
    <React.Fragment>
      <div className="page-content p-0">
        <Container fluid>
          <Row>
            <Col lg="12">
              {error && error ? <Alert color="danger">{error}</Alert> : null}
              {success ? <Alert color="success">{success}</Alert> : null}

              <Card>
                <CardBody>
                  <div className="d-flex">
                    <div className="ms-3">
                      <img
                        src={`https://ypduxejepwdmssduohpi.supabase.co/storage/v1/object/public/uploads/${JSON.parse(localStorage.getItem("authUser"))?.img}`}
                        alt=""
                        className="avatar-md rounded-circle img-thumbnail"
                      />
                    </div>

                    <div className="flex-grow-1 align-self-center ms-5">
                      <div className="text-muted">
                        <h5>{name}</h5>
                        <p className="mb-1">{email}</p>
                        <p className="mb-1">{role}</p>
                        <p className="mb-0">Id no: #{idx}</p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <h4 className="card-title mb-4">Change User Name</h4>

          <Card>
            <CardBody>
              <Form
                className="form-horizontal"
                onSubmit={e => {
                  e.preventDefault()
                  validation.handleSubmit()
                  return false
                }}
              >
                <div className="form-group">
                  <Label className="form-label">User Name</Label>
                  <Input
                    name="username"
                    // value={name}
                    className="form-control"
                    placeholder="Enter User Name"
                    type="text"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.username || ""}
                    invalid={
                      validation.touched.username && validation.errors.username
                        ? true
                        : false
                    }
                  />
                  {validation.touched.username && validation.errors.username ? (
                    <FormFeedback type="invalid">
                      {validation.errors.username}
                    </FormFeedback>
                  ) : null}
                  <Input name="idx" value={idx} type="hidden" />
                </div>
                <div className="form-group mt-2">
                  <Label className="form-label">Email</Label>
                  <Input
                    name="email"
                    // value={name}
                    className="form-control"
                    placeholder="Enter User Email"
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
                  <Input name="idx" value={idx} type="hidden" />
                </div>
                <div className="form-group mt-2">
                  <Label className="form-label">Old password</Label>
                  <Input
                    name="OLdpassword"
                    // value={name}
                    className="form-control"
                    placeholder="Enter User OLdpassword"
                    type="OLdpassword"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.OLdpassword || ""}
                    invalid={
                      validation.touched.OLdpassword &&
                      validation.errors.OLdpassword
                        ? true
                        : false
                    }
                  />
                  {validation.touched.OLdpassword &&
                  validation.errors.OLdpassword ? (
                    <FormFeedback type="invalid">
                      {validation.errors.OLdpassword}
                    </FormFeedback>
                  ) : null}
                  <Input name="idx" value={idx} type="hidden" />
                </div>
                <div className="form-group mt-2">
                  <Label className="form-label">New password</Label>
                  <Input
                    name="password"
                    // value={name}
                    className="form-control"
                    placeholder="Enter User password"
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
                  <Input name="idx" value={idx} type="hidden" />
                </div>

                <div className="text-center mt-4">
                  <Button type="submit" color="danger">
                    Update
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Container>
        <ToastContainer />
      </div>
    </React.Fragment>
  )
}

export default withRouter(UserProfile)
