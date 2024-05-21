import PropTypes from 'prop-types'
import React from "react"

import { Route, Routes } from "react-router-dom"
import { connect } from "react-redux"

// Import Routes all
import { userRoutes, authRoutes, teacherRoutes, adminRoutes, librarianRoutes, studentRoutes, receptionistRoutes, } from "./routes/allRoutes"

// Import all middleware
import Authmiddleware from "./routes/middleware/Authmiddleware"

// layouts Format
import VerticalLayout from "./components/VerticalLayout/"
import HorizontalLayout from "./components/HorizontalLayout/"


import NonAuthLayout from "./components/NonAuthLayout"

// Import scss
import "./assets/scss/theme.scss"

// Import Firebase Configuration file
// import { initFirebaseBackend } from "./helpers/firebase_helper"

import fakeBackend from "./helpers/AuthType/fakeBackend"
import TeacherLayout from './components/HorizontalLayoutTeacher/TeacherLayout'
import AdminLayout from './components/HorizontalLayoutAdmin/AdminLayout'
import LibrarianLayout from './components/HorizontalLayoutLibrarian/LibrarianLayout'
import LayoutStudent from './components/HorizontalLayoutStudent/LayoutStudent'
import ReceptionistLayout from './components/HorizontalLayoutReceptionist.js/ReceptionistLayout'

// Activating fake backend
fakeBackend()

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_APIKEY,
//   authDomain: process.env.REACT_APP_AUTHDOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASEURL,
//   projectId: process.env.REACT_APP_PROJECTID,
//   storageBucket: process.env.REACT_APP_STORAGEBUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
//   appId: process.env.REACT_APP_APPID,
//   measurementId: process.env.REACT_APP_MEASUREMENTID,
// }

// init firebase backend
// initFirebaseBackend(firebaseConfig)

const App = props => {


  // {alert('hiii')}
  //   useEffect(() => {
  //     alert('hii')
  //     document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
  //   }, [])

  function getLayout() {
    let layoutCls = VerticalLayout
    switch (props.layout.layoutType) {
      case "horizontal":
        layoutCls = HorizontalLayout
        break
      default:
        layoutCls = HorizontalLayout
        break
    }

    return layoutCls
  }


  const Layout = getLayout()
  return (
    <React.Fragment>
      <Routes>
        {/* Non-authenticated routes */}
        {authRoutes.map((route, idx) => (
          <Route
            key={idx}
            path={route.path}
            element={
              <NonAuthLayout>
                {route.component}
              </NonAuthLayout>
            }
          />
        ))}

        {/* Authenticated routes */}
        {userRoutes.map((route, idx) => (
          <Route
            key={idx}
            path={route.path}
            element={
              <Authmiddleware>
                <Layout>{route.component}</Layout>
              </Authmiddleware>
            }
          />
        ))}
        {teacherRoutes.map((route, idx) => (
          <Route
            key={idx}
            path={route.path}
            element={
              <Authmiddleware>
                <TeacherLayout>{route.component}</TeacherLayout>
              </Authmiddleware>
            }
          />
        ))}
        {adminRoutes.map((route, idx) => (
          <Route
            key={idx}
            path={route.path}
            element={
              <Authmiddleware>
                <AdminLayout>{route.component}</AdminLayout>
              </Authmiddleware>
            }
          />
        ))}
        {librarianRoutes.map((route, idx) => (
          <Route
            key={idx}
            path={route.path}
            element={
              <Authmiddleware>
                <LibrarianLayout>{route.component}</LibrarianLayout>
              </Authmiddleware>
            }
          />
        ))}
        {receptionistRoutes.map((route, idx) => (
          <Route
            key={idx}
            path={route.path}
            element={
              <Authmiddleware>
                <ReceptionistLayout>{route.component}</ReceptionistLayout>
              </Authmiddleware>
            }
          />
        ))}

        {studentRoutes.map((route, idx) => (
          <Route
            key={idx}
            path={route.path}
            element={
              <Authmiddleware>
                <LayoutStudent>{route.component}</LayoutStudent>
              </Authmiddleware>
            }
          />
        ))}



      </Routes>
    </React.Fragment>
  )
}

App.propTypes = {
  layout: PropTypes.any
}

const mapStateToProps = state => {
  return {
    layout: state.Layout,
  }
}

export default connect(mapStateToProps, null)(App)


