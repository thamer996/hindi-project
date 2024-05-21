import React, { useEffect, useState, useRef } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { isEmpty } from "lodash"
import { setBreadcrumbItems } from "../../store/actions"
import { Link } from "react-router-dom"

import {
  Button,
  Card,
  CardBody,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap"
import { AvField, AvForm } from "availity-reactstrap-validation"

import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin, { Draggable } from "@fullcalendar/interaction"
import BootstrapTheme from "@fullcalendar/bootstrap"
import listPlugin from "@fullcalendar/list"

import {
  addNewEvent,
  deleteEvent,
  getCategories,
  getEvents,
  updateEvent,
} from "../../store/actions"
import DeleteModal from "../lessonplan/DeleteModal"
import DataTable from "react-data-table-component"

const ManageLessonPlan = props => {
  document.title = "Calendar | Lexa - Responsive Bootstrap 5 Admin Dashboard"

  const { events, categories, onGetCategories, onGetEvents } = props
  const [setCalenderView, updatedCalenderView] = useState("dayGridMonth")
  const [modal, setModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [modalcategory, setModalcategory] = useState(false)
  const [event, setEvent] = useState({})
  const [selectedDay, setSelectedDay] = useState(0)
  const [isEdit, setIsEdit] = useState(false)

  const calendarRef = useRef()
  const getApi = () => {
    const { current: calendarDom } = calendarRef

    return calendarDom ? calendarDom.getApi() : null
  }

  const changeView = (view, API) => {
    API && API.changeView(view)
  }

  useEffect(() => {
    onGetCategories()
    onGetEvents()
    new Draggable(document.getElementById("external-events"), {
      itemSelector: ".external-event",
    })

    getInitialView()
    const api = getApi()
    changeView(setCalenderView, api)
  }, [onGetCategories, onGetEvents, setCalenderView])

  useEffect(() => {
    if (!modal && !isEmpty(event) && !!isEdit) {
      setTimeout(() => {
        setEvent({})
        setIsEdit(false)
      }, 500)
    }
  }, [modal, event, isEdit])

  /**
   * Handling the modal state
   */
  const toggle = () => {
    setModal(!modal)
  }

  const toggleCategory = () => {
    setModalcategory(!modalcategory)
  }

  /**
   * Handling date click on calendar
   */
  const handleDateClick = arg => {
    setSelectedDay(arg)
    toggle()
  }

  /**
   * Handling click on event on calendar
   */
  const handleEventClick = arg => {
    const event = arg.event
    setEvent({
      id: event.id,
      title: event.title,
      title_category: event.title_category,
      start: event.start,
      className: event.classNames,
      category: event.classNames[0],
      event_category: event.classNames[0],
    })
    setIsEdit(true)
    toggle()
  }

  /**
   * Handling submit event on event form
   */
  const handleValidEventSubmit = (e, values) => {
    const { onAddNewEvent, onUpdateEvent } = props
    if (isEdit) {
      const updateEvent = {
        id: event.id,
        title: values.title,
        classNames: values.category + " text-white",
        start: event.start,
      }
      // update event
      onUpdateEvent(updateEvent)
    } else {
      const newEvent = {
        id: Math.floor(Math.random() * 100),
        title: values["title"],
        start: selectedDay ? selectedDay.date : new Date(),
        className: values.category + " text-white",
      }
      // save new event
      onAddNewEvent(newEvent)
    }
    setSelectedDay(null)
    toggle()
  }

  const handleValidEventSubmitcategory = values => {
    const { onAddNewEvent } = props

    const newEvent = {
      id: Math.floor(Math.random() * 100),
      title: values["title_category"],
      start: selectedDay ? selectedDay.date : new Date(),
      className: values.event_category + " text-white",
    }
    // save new event

    onAddNewEvent(newEvent)
    toggleCategory()
  }

  /**
   * On delete event
   */
  const handleDeleteEvent = () => {
    const { onDeleteEvent } = props
    onDeleteEvent(event)
    setDeleteModal(false)
    toggle()
  }

  /**
   * On category darg event
   */
  const onDrag = event => {
    event.preventDefault()
  }

  /**
   * On calendar drop event
   */
  const onDrop = event => {
    const { onAddNewEvent } = props
    const draggedEl = event.draggedEl
    const newEvent = {
      id: Math.floor(Math.random() * 100),
      title: draggedEl.innerText,
      start: event.date,
      className: draggedEl.className,
    }
    onAddNewEvent(newEvent)
  }

  const getInitialView = () => {
    if (window.innerWidth >= 768 && window.innerWidth < 1200) {
      updatedCalenderView("dayGridWeek")
    } else if (window.innerWidth <= 768) {
      updatedCalenderView("listWeek")
    } else {
      updatedCalenderView("dayGridMonth")
    }
  }

  //BreadCrumd add
  const breadcrumbItems = [
    { title: "Lexa", link: "#" },
    { title: "Manage Lesson Plan", link: "#" },
  ]

  useEffect(() => {
    props.onSetBreadCrumbs("Lesson Plan", breadcrumbItems)
  })
  const lessonPlans = [
    {
      date: "2024-05-21",
      teacherName: "John Doe",
      subject: "Mathematics",
      class: "Grade 10",
      time: "09:00 AM - 10:30 AM",
      room: "Room 101",
    },
    {
      date: "2024-05-21",
      teacherName: "Alice Smith",
      subject: "History",
      class: "Grade 8",
      time: "10:45 AM - 12:15 PM",
      room: "Room 102",
    },
    {
      date: "2024-05-22",
      teacherName: "Emily Johnson",
      subject: "Science",
      class: "Grade 9",
      time: "09:00 AM - 10:30 AM",
      room: "Room 201",
    },
    {
      date: "2024-05-22",
      teacherName: "Michael Brown",
      subject: "English",
      class: "Grade 7",
      time: "10:45 AM - 12:15 PM",
      room: "Room 202",
    },
    // Add more data as needed
  ]

  // Define your columns configuration
  const columns1 = [
    {
      name: "Date",
      selector: row => row?.date,
      sortable: true,
      center: true,
      minWidth: "230px",
    },
    {
      name: "Teacher name",
      selector: row => row?.teacherName,
      sortable: true,
      center: true,
      minWidth: "230px",
    },
    {
      name: "Subject",
      selector: row => row?.subject,
      sortable: true,
      center: true,
      minWidth: "230px",
    },
    {
      name: "Class",
      selector: row => row?.class,
      sortable: true,
      center: true,
      minWidth: "230px",
    },
    {
      name: "Time",
      selector: row => row?.time,
      sortable: true,
      center: true,
      minWidth: "430px",
    },
    {
      name: "Room",
      selector: row => row?.room,
      sortable: true,
      center: true,
      minWidth: "230px",
    },
  ]
  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteEvent}
        onCloseClick={() => setDeleteModal(false)}
      />

      <Row className="mb-4">
        <Col xl={3}>
          <Card>
            <CardBody className="d-grid">
              <div className="d-grid">
                <Button
                  color="primary"
                  className="btn-block"
                  onClick={toggleCategory}
                >
                  <i className="mdi mdi-plus-circle-outline" /> Create New Event
                </Button>
              </div>
              <div id="external-events">
                <br />
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col>
          <div className="table-responsive">
            <DataTable
              noHeader
              pagination
              subHeader
              selectableRowsHighlight={true}
              highlightOnHover={true}
              columns={columns1}
              className="react-dataTable"
              paginationDefaultPage={1}
              data={lessonPlans}
            />
          </div>
        </Col>
      </Row>
    </React.Fragment>
  )
}

ManageLessonPlan.propTypes = {
  events: PropTypes.array,
  categories: PropTypes.array,
  className: PropTypes.string,
  onGetEvents: PropTypes.func,
  onAddNewEvent: PropTypes.func,
  onUpdateEvent: PropTypes.func,
  onDeleteEvent: PropTypes.func,
  c: PropTypes.func,
  onSetBreadCrumbs: PropTypes.func,
}

const mapStateToProps = ({ calendar }) => ({
  events: calendar.events,
  categories: calendar.categories,
})

const mapDispatchToProps = dispatch => ({
  onGetEvents: () => dispatch(getEvents()),
  onGetCategories: () => dispatch(getCategories()),
  onAddNewEvent: event => dispatch(addNewEvent(event)),
  onUpdateEvent: event => dispatch(updateEvent(event)),
  onDeleteEvent: event => dispatch(deleteEvent(event)),
  onSetBreadCrumbs: (title, breadcrumbItems) =>
    dispatch(setBreadcrumbItems(title, breadcrumbItems)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ManageLessonPlan)
