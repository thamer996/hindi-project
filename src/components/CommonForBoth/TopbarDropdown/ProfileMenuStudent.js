import React, { useState } from "react"
import PropTypes from "prop-types"
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import withRouter from "../../Common/withRouter"

// users
import user9 from "../../../assets/images/users/user-9.jpg"
import UserProfile from "../../../pages/Authentication/user-profile"

const ProfileMenuStudent = props => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false)
  const [show, setshow] = useState(false)

  const handelLogout = () => {
    props.router.navigate("/login")
    localStorage.removeItem("authUser")
    localStorage.removeItem("BranchId")
    localStorage.removeItem("role")
  }

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item waves-effect"
          id="page-header-user-dropdown"
          tag="button"
        >
          <img
            className="rounded-circle header-profile-user"
            src={`https://ypduxejepwdmssduohpi.supabase.co/storage/v1/object/public/uploads/${JSON.parse(localStorage.getItem("authUser"))?.img}`}
            alt={JSON.parse(localStorage.getItem("authUser"))?.img}
          />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownItem>
            <div onClick={() => setshow(!show)}>
              <i className="mdi mdi-account-circle font-size-17 text-muted align-middle me-1" />
              {props.t("Profile")}
            </div>
          </DropdownItem>

          <div className="dropdown-divider" />
          <Link
            to=""
            className="dropdown-item text-danger"
            onClick={() => handelLogout()}
          >
            <i className="mdi mdi-power font-size-17 text-muted align-middle me-1 text-danger" />
            <span>{props.t("Logout")}</span>
          </Link>
        </DropdownMenu>
      </Dropdown>

      <Modal isOpen={show} toggle={() => setshow(!show)} centered={true}>
        <ModalHeader>Profile</ModalHeader>
        <ModalBody className="py-3 px-5">
          <UserProfile />
        </ModalBody>
      </Modal>

    </React.Fragment>
  )
}

ProfileMenuStudent.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any,
}

const mapStatetoProps = state => {
  const { error, success } = state.Profile
  return { error, success }
}

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(ProfileMenuStudent)),
)
