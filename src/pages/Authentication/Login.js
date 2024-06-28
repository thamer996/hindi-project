import React, { useState } from "react"
import { Link } from "react-router-dom"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Label,
  Form,
  Alert,
  Input,
  FormFeedback,
} from "reactstrap"
import logoDark from "../../assets/images/logo-dark.png"
import logoLight from "../../assets/images/logo-dark.png"
import { useSelector, useDispatch } from "react-redux"
import { createSelector } from "reselect"
import PropTypes from "prop-types"

// Formik validation
import * as Yup from "yup"
import { useFormik } from "formik"
import withRouter from "../../components/Common/withRouter"

// actions
import { loginUser } from "../../store/actions"
import { createClient } from "@supabase/supabase-js"
import { ToastContainer, toast } from "react-toastify"
const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)
const Login = props => {
  document.title = "Login | Lexa - Responsive Bootstrap 5 Admin Dashboard"

  const dispatch = useDispatch()

  const [userType, setUserType] = useState("student") // Initial user type

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "" || "",
      password: "" || "",
      userType: userType,
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
      userType: Yup.string().required("Please Select User Type"),
    }),
    onSubmit: async values => {
      const { data, error } = await supabase
        .from("Users")
        .select("*")
        .eq("email", values.email)
        .eq("password", values.password)
        .eq("isDisabled", true)
        .single()

      if (!error) {
        let path
        switch (data?.role) {
          case "Student":
            path = "/student-dashboard"
            break
          case "Admin":
            path = "/admin-dashboard"
            break
          case "Librarian":
            path = "/Librarian-dashboard"
            break
          case "Receptionist":
            path = "/Receptionist-dashboard"
            break
          case "SuperAdmin":
            path = "/dashboard"
            break
          case "Teacher":
            path = "/teacher-dashboard"
            break
          case "Parent":
            path = "/student-dashboard"
            break

          default:
            path = "/"
        }

        props.router.navigate(path)
        localStorage.setItem("authUser", JSON.stringify(data))
        localStorage.setItem("BranchId", data.brancheId ?? 1)
        localStorage.setItem("role", data.role ?? 1)

        if (data?.role === "Parent") {
          localStorage.setItem("ParentId", data.id ?? 0)
        } else if (data?.role === "Student") {
          localStorage.setItem("StudentId", data.id ?? 0)
        }

        toast.success("Login success !")
      } else {
        toast.error("UserName Or Password are wrong !")
      }
    },
  })

  const selectLoginState = state => state.Login
  const LoginProperties = createSelector(selectLoginState, login => ({
    error: login.error,
  }))

  const { error } = useSelector(LoginProperties)

  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <CardBody className="pt-0">
                  <div className="p-3">
                    <h4 className="text-muted font-size-18 mb-1 text-center">
                      Welcome Back !
                    </h4>
                    <Form
                      className="form-horizontal mt-4"
                      onSubmit={e => {
                        e.preventDefault()
                        validation.handleSubmit()
                        return false
                      }}
                    >
                      {error ? <Alert color="danger">{error}</Alert> : null}
                      <div className="mb-3">
                        <Label htmlFor="username">Username</Label>
                        <Input
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
                      <div className="mb-3">
                        <Label htmlFor="userpassword">Password</Label>
                        <Input
                          name="password"
                          value={validation.values.password || ""}
                          type="password"
                          placeholder="Enter Password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          invalid={
                            validation.touched.password &&
                            validation.errors.password
                              ? true
                              : false
                          }
                        />
                        {validation.touched.password &&
                        validation.errors.password ? (
                          <FormFeedback type="invalid">
                            {validation.errors.password}
                          </FormFeedback>
                        ) : null}
                      </div>

                      {/*                       
                      <div className="mb-3">
                        <Label></Label>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            id="userTypeSuperAdmin"
                            name="userType"
                            value="superadmin"
                            checked={userType === 'superadmin'}
                            onChange={(e) => setUserType(e.target.value)}
                          />
                          <label className="form-check-label" htmlFor="userTypeSuperAdmin">Super Admin</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            id="userTypeAdmin"
                            name="userType"
                            value="admin"
                            checked={userType === 'admin'}
                            onChange={(e) => setUserType(e.target.value)}
                          />
                          <label className="form-check-label" htmlFor="userTypeAdmin">Admin</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            id="userTypeStudent"
                            name="userType"
                            value="student"
                            checked={userType === 'student'}
                            onChange={(e) => setUserType(e.target.value)}
                          />
                          <label className="form-check-label" htmlFor="userTypeStudent">Student</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            id="userTypeTeacher"
                            name="userType"
                            value="teacher"
                            checked={userType === 'teacher'}
                            onChange={(e) => setUserType(e.target.value)}
                          />
                          <label className="form-check-label" htmlFor="userTypeTeacher">Teacher</label>
                        </div>

                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            id="userTypeLibrary"
                            name="userType"
                            value="Librarian"
                            checked={userType === 'Librarian'}
                            onChange={(e) => setUserType(e.target.value)}
                          />
                          <label className="form-check-label" htmlFor="userTypeLibrary">Librarian</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            id="userType"
                            name="userTypeParent"
                            value="parent"
                            checked={userType === "parent"}
                            onChange={e => setUserType(e.target.value)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="userTypeLibrary"
                          >
                            Parent
                          </label>

                        </div>
                       <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            id="userType"
                            name="userTypeReceptionist"
                            value="Receptionist"
                            checked={userType === 'Receptionist'}
                            onChange={(e) => setUserType(e.target.value)}
                          />
                          <label className="form-check-label" htmlFor="userTypeLibrary">Receptionist</label>
                        </div>
                      </div>

                       */}

                      <Row className="mb-3 mt-4">
                        <div className="col-6">
                          {/* <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="customControlInline"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="customControlInline"
                            >
                              Remember me
                            </label>
                          </div> */}
                        </div>
                        <div className="col-6 text-end">
                          <button className="btn btn-primary w-md waves-effect ">
                            Log In
                          </button>
                        </div>
                      </Row>
                      {/* <Row className="form-group mb-0">
                        <Link to="/forgot-password" className="text-muted">
                          <i className="mdi mdi-lock"></i> Forgot your password?
                        </Link>
                      </Row> */}
                    </Form>
                  </div>
                </CardBody>
              </Card>

              <div className="mt-5 text-center"></div>
            </Col>
          </Row>
        </Container>
      </div>
      <ToastContainer />
    </React.Fragment>
  )
}

export default withRouter(Login)

Login.propTypes = {
  history: PropTypes.object,
}
