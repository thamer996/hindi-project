import React, { useState } from "react"
import PropTypes from "prop-types"
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
// Redux
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import withRouter from "../../Common/withRouter"

// users
import user1 from "../../../assets/images/7309703.jpg"
import UserProfile from "../../../pages/Authentication/user-profile"

const ProfileMenu = props => {
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
          {/* <DropdownItem tag="a" href="#">
            <i className="mdi mdi-wallet font-size-17 text-muted align-middle me-1" />
            {props.t("My Wallet")}
          </DropdownItem>
          <DropdownItem className="d-flex align-items-center" to="#">
            <i className="mdi mdi-cog font-size-17 text-muted align-middle me-1"></i>
            {props.t("Settings")}
            <span className="badge bg-success ms-auto">11</span>
          </DropdownItem> */}
          {/* <DropdownItem tag="a" href="auth-lock-screen">
            <i className="mdi mdi-lock-open-outline font-size-17 text-muted align-middle me-1" />
            {props.t("Lock screen")}
          </DropdownItem> */}

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

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any,
}

const mapStatetoProps = state => {
  const { error, success } = state.Profile
  return { error, success }
}

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(ProfileMenu)),
)
