import React from "react"
import { Navigate } from "react-router-dom"

// Profile
import UserProfile from "../pages/Authentication/user-profile"
import DashboardStudent from "../pages/StudentRole/Dashboard/index"
import Fees from "../pages/StudentRole/Fees"

// Pages Calendar
import Calendar from "../pages/Calendar/index"

//Email
import EmailInbox from "../pages/Email/email-inbox"
import EmailRead from "../pages/Email/email-read"
import EmailCompose from "../pages/Email/email-compose"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"

// Inner Authentication
import Login1 from "../pages/AuthenticationInner/Login"
import Register1 from "../pages/AuthenticationInner/Register"
import Recoverpw from "../pages/AuthenticationInner/Recoverpw"
import LockScreen from "../pages/AuthenticationInner/auth-lock-screen"

// Dashboard
import Dashboard from "../pages/Dashboard/index"

//Charts
import ChartsAppex from "../pages/Charts/charts-appex";
import ChartsJs from "../pages/Charts/charts-chartjs";
import ChartsKnob from "../pages/Charts/charts-knob";
import ChartsC3 from "../pages/Charts/charts-c3";
import ChartsSparkLine from "../pages/Charts/charts-sparkline";

// Maps
import MapsGoogle from "../pages/Maps/MapsGoogle"
import MapsVector from "../pages/Maps/MapsVector"

//Icons
import IconMaterialdesign from "../pages/Icons/IconMaterialdesign"
import Iconion from "../pages/Icons/Iconion"
import IconFontawesome from "../pages/Icons/IconFontawesome"
import IconThemify from "../pages/Icons/IconThemify"
import IconDripicons from "../pages/Icons/IconDripicons"
import IconTypicons from "../pages/Icons/IconTypicons"

//Tables
import ResponsiveTables from "../pages/Students/ResponsiveTables"
import EditableTables from "../pages/Students/EditableTables"

// Forms
import FormElements from "../pages/Students/StudentsAttendance"
import FormAdvanced from "../pages/Forms/FormAdvanced"
import FormEditors from "../pages/Forms/FormEditors"
import FormValidations from "../pages/Forms/FormValidations"
import FormUpload from "../pages/Forms/FormUpload"
import FormXeditable from "../pages/Forms/FormXeditable"

//Ui
import UiAlert from "../pages/Ui/UiAlert"
import UiButtons from "../pages/Ui/UiButtons"
import UiBadge from "../pages/Ui/UiBadge"
import UiCards from "../pages/Ui/UiCards"
import UiCarousel from "../pages/Ui/UiCarousel"
import UiDropdown from "../pages/Ui/UiDropdown"
import UiGrid from "../pages/Ui/UiGrid"
import UiImages from "../pages/Ui/UiImages"
import UiLightbox from "../pages/Ui/UiLightbox"
import UiModal from "../pages/Ui/UiModal"
import UiPagination from "../pages/Ui/UiPagination"
import UiPopoverTooltips from "../pages/Ui/UiPopoverTooltips"
import UiProgressbar from "../pages/Ui/UiProgressbar"
import UiTabsAccordions from "../pages/Ui/UiTabsAccordions"
import UiTypography from "../pages/Ui/UiTypography"
import UiVideo from "../pages/Ui/UiVideo"
import UiSessionTimeout from "../pages/Ui/UiSessionTimeout"
import UiRangeSlider from "../pages/Ui/UiRangeSlider"

//Extra Pages

import StudentProfile from "../pages/Students/StudentProfile";
import PagesDirectory from "../pages/Extra Pages/pages-directory";
import PagesBlank from "../pages/Extra Pages/pages-blank";
import Pages404 from "../pages/Extra Pages/pages-404";
import Pages500 from "../pages/Extra Pages/pages-500";
import UiUtilities from "../pages/Ui/UiUtilities"
import UiColors from "../pages/Ui/UiColors"
import UiOffcanvas from "../pages/Ui/UiOffcanvas"
import Chat from "../pages/Chat/Chat";
import Kanban from "../pages/Kanban"
import AddStudents from "../pages/Students/AddStudents"
import AllStudents from "../pages/Students/AllStudents"
import AllTeachers from "../pages/Teachers/AllTeachers"
import Classes from "../pages/Classes/Classes"
import Behavior from "../pages/Students/Behavior"
import AddTeachers from "../pages/Teachers/AddTeachers"
import StudentsAttendance from "../pages/Students/StudentsAttendance"
import AssignIncident from "../pages/Students/AssignIncident"
import AddHomework from "../pages/homework/AddHomework"
import Homework from "../pages/homework/Homework"
import AddClass from "../pages/Classes/AddClass"
import Hostle from "../pages/hostles/Hostle"
import AddHostle from "../pages/hostles/AddHostle";
import TeacherAttendance from "../pages/Teachers/TeacherAttendance"

import ListBooks from "../pages/library/ListBooks"
import AddBook from "../pages/library/AddBook"
import IssueReturn from "../pages/library/IssueReturn"
import AddStudent from "../pages/library/AddStudent"
import AddStaffMember from "../pages/library/AddStaffMember"
import ExamGroup from "../pages/examinations/ExamGroup"
import AddExamGroup from "../pages/examinations/AddExamGroup"
import ExamShedule from "../pages/examinations/ExamShedule"
import ExamResult from "../pages/examinations/ExamResult"
import DesignAdmitCard from "../pages/examinations/DesignAdmitCard"
import AddAdmitCard from "../pages/examinations/AddAdmitCard"
import PrintAdmitCard from "../pages/examinations/PrintAdmitCard"
import DesignMarksheet from "../pages/examinations/DesignMarksheet"
import AddMarksheet from "../pages/examinations/AddMarksheet"
import PrintMarksheet from "../pages/examinations/PrintMarksheet"
import MarksGrade from "../pages/examinations/MarksGrade"
import AddMarks from "../pages/examinations/AddMarks"
import MarksDevision from "../pages/examinations/MarksDevision"
import AddMarkDivision from "../pages/examinations/AddMarkDivision"
import AdmissionEnquiry from "../pages/frontoffice/AdmissionEnquiry"
import AddAdmissionEnquiry from "../pages/frontoffice/AddAdmissionEnquiry"
import VisitorBook from "../pages/frontoffice/VisitorBook"
import AddVisitorBook from "../pages/frontoffice/AddVisitorBook"
import PhoneCallLog from "../pages/frontoffice/PhoneCallLog"
import AddPhoneCallLog from "../pages/frontoffice/AddPhoneCallLog"
import PostalDispatch from "../pages/frontoffice/PostalDispatch"
import AddPostalDispatch from "../pages/frontoffice/AddPostalDispatch"
import PostalRecieve from "../pages/frontoffice/PostalRecieve"
import AddPostalReceive from "../pages/frontoffice/AddPostalReceive"
import Complain from "../pages/frontoffice/Complain"
import AddComplain from "../pages/frontoffice/AddComplain"
import Purpose from "../pages/frontoffice/setupfrontoffice/Purpose"
import AddPurpose from "../pages/frontoffice/setupfrontoffice/AddPurpose"
import ComplaintType from "../pages/frontoffice/setupfrontoffice/ComplaintType"
import AddComplaintType from "../pages/frontoffice/setupfrontoffice/AddComplaintType"
import Source from "../pages/frontoffice/setupfrontoffice/Source"
import AddSource from "../pages/frontoffice/setupfrontoffice/AddSource"
import Reference from "../pages/frontoffice/setupfrontoffice/Reference"
import AddReference from "../pages/frontoffice/setupfrontoffice/AddReference"

import SearchDueFees from "../pages/feescollection/SearchDueFees"
import FeesMaster from "../pages/feescollection/FeesMaster"
import AddFeesMaster from "../pages/feescollection/AddFeesMaster"
import FeesGroup from "../pages/feescollection/FeesGroup"
import AddFeesGroup from "../pages/feescollection/AddFeesGroup"
import FeesType from "../pages/feescollection/FeesType"
import AddFeesType from "../pages/feescollection/AddFeesType"
import FeesDiscount from "../pages/feescollection/FeesDiscount"
import AddFeesDiscount from "../pages/feescollection/AddFeesDiscount"
import FeesCarryForward from "../pages/feescollection/FeesCarryForward"
import FeesReminder from "../pages/feescollection/FeesReminder"
import PickupPoint from "../pages/transport/PickupPoint"
import AddPickupPoint from "../pages/transport/AddPickupPoint"
import RoutesTransport from "../pages/transport/RoutesTransport"
import AddRoute from "../pages/transport/AddRoute"
import Vehicles from "../pages/transport/Vehicles"
import AddVehicle from "../pages/transport/AddVehicle"
import AssignVehicle from "../pages/transport/AssignVehicle"
import AddAssignVehicle from "../pages/transport/AddAssignVehicle"
import RoutePickUpPoint from "../pages/transport/RoutePickUpPoint"
import AddRoutePickUpPoint from "../pages/transport/AddRoutePickUpPoint"
import StudentTransportFees from "../pages/transport/StudentTransportFees"
import StaffDirectory from "../pages/HumanRessource/StaffDirectory"
import AddStaff from "../pages/HumanRessource/AddStaff"
import StaffAttendance from "../pages/HumanRessource/StaffAttendance"
import IssueItem from "../pages/Inventory/IssueItem"
import AddIssueItem from "../pages/Inventory/AddIssueItem"
import ItemStock from "../pages/Inventory/ItemStock"
import AddItemStock from "../pages/Inventory/AddItemStock"
import Item from "../pages/Inventory/Item"
import AddItem from "../pages/Inventory/AddItem"
import ItemCategory from "../pages/Inventory/ItemCategory"
import AddItemCategory from "../pages/Inventory/AddItemCategory"
import ItemStore from "../pages/Inventory/ItemStore"
import AddItemStore from "../pages/Inventory/AddItemStore"
import ItemSupplier from "../pages/Inventory/ItemSupplier"
import AddItemSupplier from "../pages/Inventory/AddItemSupplier"
import ContentType from "../pages/downloadcenter/ContentType"
import AddContentType from "../pages/downloadcenter/AddContentType"
import ContentShareList from "../pages/downloadcenter/ContentShareList"
import UploadShareContent from "../pages/downloadcenter/UploadShareContent"
import VideoTutorial from "../pages/downloadcenter/VideoTutorial"
import AddVideoTutorial from "../pages/downloadcenter/AddVideoTutorial"
import Overview from "../pages/multi branch/Overview"
import DailyCollectionReport from "../pages/multi branch/report/DailyCollectionReport"
import PayrollReport from "../pages/multi branch/report/PayrollReport"
import IncomeReport from "../pages/multi branch/report/IncomeReport"
import ExpenseReport from "../pages/multi branch/report/ExpenseReport"
import UserLogReport from "../pages/multi branch/report/UserLogReport"
import Setting from "../pages/multi branch/Setting"
import AddNew from "../pages/multi branch/AddNew"
import CopyOldLessons from "../pages/lessonplan/CopyOldLessons"
import ManageLessonPlan from "../pages/lessonplan/ManageLessonPlan"
import ManageSyllabusStatus from "../pages/lessonplan/ManageSyllabusStatus"
import Lesson from "../pages/lessonplan/Lesson"
import AddLesson from "../pages/lessonplan/AddLesson"
import Topic from "../pages/lessonplan/Topic"
import AddTopic from "../pages/lessonplan/AddTopic"
import SendEmail from "../pages/communicate/SendEmail"
import Attendance from "../pages/reports/Attendance"
import RolesPermissions from "../pages/settings/RolesPermissions"
import AddRole from "../pages/settings/AddRole"
import Users from "../pages/settings/Users"
import Teacherspace from "../pages/TeacherSpace"
import ViewClasses from "../pages/teacherclasses/ViewClasses"
import AddClasses from "../pages/teacherclasses/AddClasses"
import TeacherAttendanceSpace from "../pages/teacherattendance/TeacherAttendanceSpace"
import BehaviourAssign from "../pages/teacherbehaviour/BehaviourAssign"
import HomeworkTeacher from "../pages/TeacherHomework/HomeworkTeacher"
import AddTeacherHomework from "../pages/TeacherHomework/AddTeacherHomework"
import StudentDetails from "../pages/StudentDetails/StudentDetails"
import StudentAdmission from "../pages/StudentDetails/StudentAdmission"
import DisabledStudents from "../pages/StudentDetails/DisabledStudents"
import MultiClassStudent from "../pages/StudentDetails/MultiClassStudent"
import BulkDelete from "../pages/StudentDetails/BulkDelete"
import StudentCategorie from "../pages/StudentDetails/StudentCategorie"
import AddCategory from "../pages/StudentDetails/AddCategory"
import StudentHouse from "../pages/StudentDetails/StudentHouse"
import AddSchoolHouse from "../pages/StudentDetails/AddSchoolHouse"
import DisabledReason from "../pages/StudentDetails/DisabledReason"
import AddDisableReason from "../pages/StudentDetails/AddDisableReason"
import Incidents from "../pages/teacherbehaviour/Incidents"
import AddIncident from "../pages/teacherbehaviour/AddIncident"
import Reports from "../pages/teacherbehaviour/Reports"
import SettingBehaviour from "../pages/teacherbehaviour/SettingBehaviour"
import ExamGroupTeacher from "../pages/teacherexaminations/ExamGroupTeacher"
import AddExamGroupTeacher from "../pages/teacherexaminations/AddExamGroupTeacher"
import ExamResultTeacher from "../pages/teacherexaminations/ExamResultTeacher"
import DesignAdmitCardTeacher from "../pages/teacherexaminations/DesignAdmitCardTeacher"
import AddAdmitCardTeacher from "../pages/teacherexaminations/AddAdmitCardTeacher"
import PrintAdmitCardTeacher from "../pages/teacherexaminations/PrintAdmitCardTeacher"
import DesignMarksheetTeacher from "../pages/teacherexaminations/DesignMarksheetTeacher"
import AddMarksheetTeacher from "../pages/teacherexaminations/AddMarksheetTeacher"
import PrintMarksheetTeacher from "../pages/teacherexaminations/PrintMarksheetTeacher"
import MarksGradeTeacher from "../pages/teacherexaminations/MarksGradeTeacher"
import AddMarksGradeTeacher from "../pages/teacherexaminations/AddMarksGradeTeacher"
import StaffDirectoryTeacher from "../pages/HumanResourceTeacher/StaffDirectoryTeacher"
import AddLeave from "../pages/HumanResourceTeacher/AddLeave"
import ManageSyllabusTeacher from "../pages/LessonPlanTeacher/ManageSyllabusTeacher"
import LessonTeacher from "../pages/LessonPlanTeacher/LessonTeacher"
import AddLessonTeacher from "../pages/LessonPlanTeacher/AddLessonTeacher"
import TopicTeacher from "../pages/LessonPlanTeacher/TopicTeacher"
import AddTopicTeacher from "../pages/LessonPlanTeacher/AddTopicTeacher"
import ContentShareListTeacher from "../pages/DownloadCenterTeacher.js/ContentShareListTeacher"
import UploadShareContentTeacher from "../pages/DownloadCenterTeacher.js/UploadShareContentTeacher"
import VideoTutorialTeacher from "../pages/DownloadCenterTeacher.js/VideoTutorialTeacher"
import AddVideoTutorialTeacher from "../pages/DownloadCenterTeacher.js/AddVideoTutorialTeacher"
import NoticeBoardTeacher from "../pages/CommunicateTeacher/NoticeBoardTeacher"
import SendEmailBoard from "../pages/CommunicateTeacher/SendEmailBoard"
import SendEmailTeacher from "../pages/CommunicateTeacher/SendEmailTeacher"
import SendSmsTeacher from "../pages/CommunicateTeacher/SendSmsTeacher"
import EmailSmsLogTeacher from "../pages/CommunicateTeacher/EmailSmsLogTeacher"
import StudentInformationReport from "../pages/TeacherReports/StudentInformationReport"
import ApproveLeaveTeacher from "../pages/teacherattendance/ApproveLeaveTeacher"
import AddApproveTeacher from "../pages/teacherattendance/AddApproveTeacher"
import PeriodAttendanceTeacher from "../pages/teacherattendance/PeriodAttendanceTeacher"
import ClosedHomeworkTeacher from "../pages/TeacherHomework/ClosedHomeworkTeacher"
import PeriodAttendanceReport from "../pages/TeacherReports/PeriodAttendanceReport"
import ExaminationRankReport from "../pages/TeacherReports/ExaminationRankReport"
import LessonPlanSyllabus from "../pages/TeacherReports/LessonPlanSyllabus"
import HomeworkReport from "../pages/TeacherReports/HomeworkReport"
import TransportReportTeacher from "../pages/TeacherReports/TransportReportTeacher"
import HostelReportTeacher from "../pages/TeacherReports/HostelReportTeacher"
import AlumniReportTeacher from "../pages/TeacherReports/AlumniReportTeacher"
import AdminSpace from "../pages/AdminSpace"
import ViewAdminClasses from "../pages/adminClasses/ViewAdminClasses"
import AddClassAdmin from "../pages/adminClasses/AddClassAdmin"
import AttendanceAdmin from "../pages/attendanceAdmin/AttendanceAdmin"
import ApproveLeaveAdmin from "../pages/attendanceAdmin/ApproveLeaveAdmin"
import AttendanceBydateAdmin from "../pages/attendanceAdmin/AttendanceBydateAdmin"
import StudentBehaviourRankAdmin from "../pages/adminBehaviour/StudentBehaviourRankAdmin"
import ClassRankAdmin from "../pages/adminBehaviour/ClassRankAdmin"
import ClassSectionRankAdmin from "../pages/adminBehaviour/ClassSectionRankAdmin"
import HouseRankReport from "../pages/adminBehaviour/HouseRankReport"
import WiseIncidentAdmin from "../pages/adminBehaviour/WiseIncidentAdmin"
import SettingAdmin from "../pages/adminBehaviour/SettingAdmin"
import UpcomingHomeworkAdmin from "../pages/adminHomework/UpcomingHomeworkAdmin"
import AddUpcomingAdmin from "../pages/adminHomework/AddUpcomingAdmin"
import ClosedHomeworkAdmin from "../pages/adminHomework/ClosedHomeworkAdmin"
import AddClosedAdmin from "../pages/adminHomework/AddClosedAdmin"
import StudentDetailsAdmin from "../pages/StudentDetailsAdmin/StudentDetailsAdmin"
import StudentAdmissionAdmin from "../pages/StudentDetailsAdmin/StudentAdmissionAdmin"
import DisabledStudentAdmin from "../pages/StudentDetailsAdmin/DisabledStudentAdmin"
import MultiClassStudentAdmin from "../pages/StudentDetailsAdmin/MultiClassStudentAdmin"
import BulkDeleteAdmin from "../pages/StudentDetailsAdmin/BulkDeleteAdmin"
import StudentCategoriesAdmin from "../pages/StudentDetailsAdmin/StudentCategoriesAdmin"
import AddCategoryAdmin from "../pages/StudentDetailsAdmin/AddCategoryAdmin"
import StudentHouseAdmin from "../pages/StudentDetailsAdmin/StudentHouseAdmin"
import AddSchoolAdmin from "../pages/StudentDetailsAdmin/AddSchoolAdmin"
import DisableReasonAdmin from "../pages/StudentDetailsAdmin/DisableReasonAdmin"
import AddDisableReasonAdmin from "../pages/StudentDetailsAdmin/AddDisableReasonAdmin"
import ExamGroupAdmin from "../pages/adminexaminations/ExamGroupAdmin"
import AddExamGroupAdmin from "../pages/adminexaminations/AddExamGroupAdmin"
import ExamResultAdmin from "../pages/adminexaminations/ExamResultAdmin"
import DesignAdmitCardAdmin from "../pages/adminexaminations/DesignAdmitCardAdmin"
import PrintAdmitCardAdmin from "../pages/adminexaminations/PrintAdmitCardAdmin"
import DesignMarksheetAdmin from "../pages/adminexaminations/DesignMarksheetAdmin"
import PrintMarksheetAdmin from "../pages/adminexaminations/PrintMarksheetAdmin"
import MarksGradeAdmin from "../pages/adminexaminations/MarksGradeAdmin"
import AddMarksGradeAdmin from "../pages/adminexaminations/AddMarksGradeAdmin"
import StaffDirectoryAdmin from "../pages/HumanResourceAdmin/StaffDirectoryAdmin"
import StaffAttendanceAdmin from "../pages/HumanResourceAdmin/StaffAttendanceAdmin"
import PayrollAdmin from "../pages/HumanResourceAdmin/PayrollAdmin"
import ApproveRequestAdmin from "../pages/HumanResourceAdmin/ApproveRequestAdmin"
import ApplyLeaveAdmin from "../pages/HumanResourceAdmin/ApplyLeaveAdmin"
import LeaveTypeAdmin from "../pages/HumanResourceAdmin/LeaveTypeAdmin"
import AddLeaveTypeAdmin from "../pages/HumanResourceAdmin/AddLeaveTypeAdmin"
import TeachersRatingAdmin from "../pages/HumanResourceAdmin/TeachersRatingAdmin"
import DepartmentAdmin from "../pages/HumanResourceAdmin/DepartmentAdmin"
import AddDepartment from "../pages/HumanResourceAdmin/AddDepartmentAdmin"
import AddDepartmentAdmin from "../pages/HumanResourceAdmin/AddDepartmentAdmin"
import DesignationAdmin from "../pages/HumanResourceAdmin/DesignationAdmin"
import AddDesignationAdmin from "../pages/HumanResourceAdmin/AddDesignationAdmin"
import ManageSyllabusAdmin from "../pages/LessonPlanAdmin/ManageSyllabusAdmin"
import LessonAdmin from "../pages/LessonPlanAdmin/LessonAdmin"
import AddLessonAdmin from "../pages/LessonPlanAdmin/AddLessonAdmin"
import TopicAdmin from "../pages/LessonPlanAdmin/TopicAdmin"
import AddTopicAdmin from "../pages/LessonPlanAdmin/AddTopicAdmin"
import UploadShareContentAdmin from "../pages/DownloadCenterAdmin.js/UploadShareContentAdmin"
import NoticeBoardAdmin from "../pages/CommunicateAdmin/NoticeBoardAdmin"
import SendEmailBoardAdmin from "../pages/CommunicateAdmin/SendEmailBoardAdmin"
import SendEmailAdmin from "../pages/CommunicateAdmin/SendEmailAdmin"
import SendSmsAdmin from "../pages/CommunicateAdmin/SendSmsAdmin"
import EmailSmsLogAdmin from "../pages/CommunicateAdmin/EmailSmsLogAdmin"
import HostelRoomAdmin from "../pages/HostelAdmin/HostelRoomAdmin"
import AddHostelRoomAdmin from "../pages/HostelAdmin/AddHostelRoomAdmin"
import RoomTypeAdmin from "../pages/HostelAdmin/RoomTypeAdmin"
import AddRoomType from "../pages/HostelAdmin/AddRoomType"
import HostelAdmin from "../pages/HostelAdmin/HostelAdmin"
import AddHostelAdmin from "../pages/HostelAdmin/AddHostelAdmin"
import RoutesTransportAdmin from "../pages/TransportAdmin/RoutesTransportAdmin"
import AddRouteAdmin from "../pages/TransportAdmin/AddRouteAdmin"
import VheiclsAdmin from "../pages/TransportAdmin/VheiclsAdmin"
import AddVheicleAdmin from "../pages/TransportAdmin/AddVheicleAdmin"
import AssignVheicleAdmin from "../pages/TransportAdmin/AssignVheicleAdmin"
import AddAssignVehicleAdmin from "../pages/TransportAdmin/AddAssignVehicleAdmin"
import ListBooksAdmin from "../pages/LibraryAdmin/ListBooksAdmin"
import AddBookAdmin from "../pages/LibraryAdmin/AddBookAdmin"
import IssueReturnAdmin from "../pages/LibraryAdmin/IssueReturnAdmin"
import AddStudentAdmin from "../pages/LibraryAdmin/AddStudentAdmin"
import AddStaffMemberAdmin from "../pages/LibraryAdmin/AddStaffMemberAdmin"
import IssueItemAdmin from "../pages/InventoryAdmin/IssueItemAdmin"
import AddIssueItemAdmin from "../pages/InventoryAdmin/AddIssueItemAdmin"
import ItemStockAdmin from "../pages/InventoryAdmin/ItemStockAdmin"
import AddItemStockAdmin from "../pages/InventoryAdmin/AddItemStockAdmin"
import ItemAdmin from "../pages/InventoryAdmin/ItemAdmin"
import AddItemAdmin from "../pages/InventoryAdmin/AddItemAdmin"
import ItemCategoryAdmin from "../pages/InventoryAdmin/ItemCategoryAdmin"
import AddItemCategoryAdmin from "../pages/InventoryAdmin/AddItemCategoryAdmin"
import ItemStoreAdmin from "../pages/InventoryAdmin/ItemStoreAdmin"
import AddItemStoreAdmin from "../pages/InventoryAdmin/AddItemStoreAdmin"
import ItemSupplierAdmin from "../pages/InventoryAdmin/ItemSupplierAdmin"
import AddItemSupplierAdmin from "../pages/InventoryAdmin/AddItemSupplierAdmin"
import CollectFessAdmin from "../pages/FeesCollectionAdmin/CollectFessAdmin"
import SearchFeesPaymentsAdmin from "../pages/FeesCollectionAdmin/SearchFeesPaymentsAdmin"
import SearchDueFeesAdmin from "../pages/FeesCollectionAdmin/SearchDueFeesAdmin"
import FeesMasterAdmin from "../pages/FeesCollectionAdmin/FeesMasterAdmin"
import AddFeesMasterAdmin from "../pages/FeesCollectionAdmin/AddFeesMasterAdmin"
import FeesGroupAdmin from "../pages/FeesCollectionAdmin/FeesGroupAdmin"
import AddFeesGroupAdmin from "../pages/FeesCollectionAdmin/AddFeesGroupAdmin"
import FeesTypeAdmin from "../pages/FeesCollectionAdmin/FeesTypeAdmin"
import AddFeesTypeAdmin from "../pages/FeesCollectionAdmin/AddFeesTypeAdmin"
import FeesDiscountAdmin from "../pages/FeesCollectionAdmin/FeesDiscountAdmin"
import AddFeesDiscountAdmin from "../pages/FeesCollectionAdmin/AddFeesDiscountAdmin"
import FeesCarryForwardAdmin from "../pages/FeesCollectionAdmin/FeesCarryForwardAdmin"
import FeesReminderAdmin from "../pages/FeesCollectionAdmin/FeesReminderAdmin"
import AdmissionEnquiryAdmin from "../pages/FrontOfficeAdmin/AdmissionEnquiryAdmin"
import AddAdmissionEnquiryAdmin from "../pages/FrontOfficeAdmin/AddAdmissionEnquiryAdmin"
import VisitorBookAdmin from "../pages/FrontOfficeAdmin/VisitorBookAdmin"
import AddVisitorBookAdmin from "../pages/FrontOfficeAdmin/AddVisitorBookAdmin"
import PhoneCallLogAdmin from "../pages/FrontOfficeAdmin/PhoneCallLogAdmin"
import AddPhoneCallLogAdmin from "../pages/FrontOfficeAdmin/AddPhoneCallLogAdmin"
import PostalDispatchAdmin from "../pages/FrontOfficeAdmin/PostalDispatchAdmin"
import AddPostalDispatchAdmin from "../pages/FrontOfficeAdmin/AddPostalDispatchAdmin"
import PostalReceiveAdmin from "../pages/FrontOfficeAdmin/PostalReceiveAdmin"
import AddPostalReceiveAdmin from "../pages/FrontOfficeAdmin/AddPostalReceiveAdmin"
import ComplainAdmin from "../pages/FrontOfficeAdmin/ComplainAdmin"
import AddComplainAdmin from "../pages/FrontOfficeAdmin/AddComplainAdmin"
import PurposeAdmin from "../pages/FrontOfficeAdmin/setupfrontofficeadmin/PurposeAdmin"
import AddPurposeAdmin from "../pages/FrontOfficeAdmin/setupfrontofficeadmin/AddPurposeAdmin"
import ComplainTypeAdmin from "../pages/FrontOfficeAdmin/setupfrontofficeadmin/ComplainTypeAdmin"
import AddComplaintTypeAdmin from "../pages/FrontOfficeAdmin/setupfrontofficeadmin/AddComplaintTypeAdmin"
import SourceAdmin from "../pages/FrontOfficeAdmin/setupfrontofficeadmin/SourceAdmin"
import AddSourceAdmin from "../pages/FrontOfficeAdmin/setupfrontofficeadmin/AddSourceAdmin"
import ReferenceAdmin from "../pages/FrontOfficeAdmin/setupfrontofficeadmin/ReferenceAdmin"
import AddReferenceAdmin from "../pages/FrontOfficeAdmin/setupfrontofficeadmin/AddReferenceAdmin"
import StudentInformationReportAdmin from "../pages/ReportAdmin/StudentInformationReportAdmin"
import PeriodAttendanceReportAdmin from "../pages/ReportAdmin/PeriodAttendanceReportAdmin"
import ExaminationRankReportAdmin from "../pages/ReportAdmin/ExaminationRankReportAdmin"
import LessonPlanSyllabusAdmin from "../pages/ReportAdmin/LessonPlanSyllabusAdmin"
import HumanResourceStaffAdmin from "../pages/ReportAdmin/HumanResourceStaffAdmin"
import HomeworkReportAdmin from "../pages/ReportAdmin/HomeworkReportAdmin"
import BookIssueReportAdmin from "../pages/ReportAdmin/BookIssueReportAdmin"
import InventoryReportAdmin from "../pages/ReportAdmin/InventoryReportAdmin"
import TransportReportAdmin from "../pages/ReportAdmin/TransportReportAdmin"
import HostelReportAdmin from "../pages/ReportAdmin/HostelReportAdmin"
import OverviewAdmin from "../pages/MultiBranchAdmin/OverviewAdmin"
import DailyCollectionReportAdmin from "../pages/MultiBranchAdmin/reportadmin/DailyCollectionReportAdmin"
import PayrollReportAdmin from "../pages/MultiBranchAdmin/reportadmin/PayrollReportAdmin"
import IncomeReportAdmin from "../pages/MultiBranchAdmin/reportadmin/IncomeReportAdmin"
import ExpenseReportAdmin from "../pages/MultiBranchAdmin/reportadmin/ExpenseReportAdmin"
import UserLogReportAdmin from "../pages/MultiBranchAdmin/reportadmin/UserLogReportAdmin"
import SettingMultibranchAdmin from "../pages/MultiBranchAdmin/SettingMultibranchAdmin"
import UersSettingAdmin from "../pages/AdminSettings/UersSettingAdmin"
import AssignClassTeacherAdmin from "../pages/AcademicsAdmin/AssignClassTeacherAdmin"
import AddClassTeacherAdmin from "../pages/AcademicsAdmin/AddClassTeacherAdmin"
import SubjectGroupAdmin from "../pages/AcademicsAdmin/SubjectGroupAdmin"
import AddSubjectGroupAdmin from "../pages/AcademicsAdmin/AddSubjectGroupAdmin"
import SubjectsAdmin from "../pages/AcademicsAdmin/SubjectsAdmin"
import AddSubjectAdmin from "../pages/AcademicsAdmin/AddSubjectAdmin"
import ClassAcademicAdmin from "../pages/AcademicsAdmin/ClassAcademicAdmin"
import AddClassAcademicAdmin from "../pages/AcademicsAdmin/AddClassAcademicAdmin"
import SectionsAdmin from "../pages/AcademicsAdmin/SectionsAdmin"
import AddSectionAdmin from "../pages/AcademicsAdmin/AddSectionAdmin"
import PromoteStudentsAdmin from "../pages/AcademicsAdmin/PromoteStudentsAdmin"
import AssignClassTeacher from "../pages/academics/AssignClassTeacher"
import AddClassTeacher from "../pages/academics/AddClassTeacher"
import PromoteStudents from "../pages/academics/PromoteStudents"
import SubjectGroup from "../pages/academics/SubjectGroup"
import AddSubjectGroup from "../pages/academics/AddSubjectGroup"
import Subjects from "../pages/academics/Subjects"
import AddSubject from "../pages/academics/AddSubject"
import ClassAcademic from "../pages/academics/ClassAcademic"
import AddClassAcademic from "../pages/academics/AddClassAcademic"
import Sections from "../pages/academics/Sections"
import AddSection from "../pages/academics/AddSection"
import StudentInformationReportSuper from "../pages/reports/StudentInformationReportSuper"
import ExaminationRankReportSuper from "../pages/reports/ExaminationRankReportSuper"
import LessonPlanSyllabusSuper from "../pages/reports/LessonPlanSyllabusSuper"
import HumanResourceStaffSuper from "../pages/reports/HumanResourceStaffSuper"
import HomeworkReportSuper from "../pages/reports/HomeworkReportSuper"
import BookIssueReportSuper from "../pages/reports/BookIssueReportSuper"
import InventoryReportSuper from "../pages/reports/InventoryReportSuper"
import TransportReportSuper from "../pages/reports/TransportReportSuper"
import HostelReportSuper from "../pages/reports/HostelReportSuper"
import AssignClassTeacherTeach from "../pages/AcademicsTeacher/AssignClassTeacherTeach"
import AddClassTeacherTeach from "../pages/AcademicsTeacher/AddClassTeacherTeach"
import PromoteStudentTeacher from "../pages/AcademicsTeacher/PromoteStudentTeacher"
import SubjectGroupTeacher from "../pages/AcademicsTeacher/SubjectGroupTeacher"
import AddSubjectGroupTeacher from "../pages/AcademicsTeacher/AddSubjectGroupTeacher"
import SubjectsTeacher from "../pages/AcademicsTeacher/SubjectsTeacher"
import AddSubjectTeacher from "../pages/AcademicsTeacher/AddSubjectTeacher"
import ClassAcademicTeacher from "../pages/AcademicsTeacher/ClassAcademicTeacher"
import AddClassAcademicTeacher from "../pages/AcademicsTeacher/AddClassAcademicTeacher"
import SectionsTeacher from "../pages/AcademicsTeacher/SectionsTeacher"
import AddSectionTeacher from "../pages/AcademicsTeacher/AddSectionTeacher"
import LibrarianSpace from "../pages/LibrarianSpace"
import IncidentsLibrarien from "../pages/librarianbehaviour/IncidentsLibrarien"
import AddIncidentLibrarien from "../pages/librarianbehaviour/AddIncidentLibrarien"
import BehaviourAssignLibrarian from "../pages/librarianbehaviour/BehaviourAssignLibrarian"
import ReportsLibrarian from "../pages/librarianbehaviour/ReportsLibrarian"
import SettingBehaviourLibrarian from "../pages/librarianbehaviour/SettingBehaviourLibrarian"
import StaffDirectoryLibrarien from "../pages/HumanResourceLibrarien/StaffDirectoryLibrarien"
import NoticeBoardLibrarian from "../pages/CommunicateLibrarian/NoticeBoardLibrarian"
import SendEmailBoardLibrarian from "../pages/CommunicateLibrarian/SendEmailBoardLibrarian"
import SendEmailLibrarian from "../pages/CommunicateLibrarian/SendEmailLibrarian"
import SendSmsLibrarian from "../pages/CommunicateLibrarian/SendSmsLibrarian"
import EmailSmsLogLibrarian from "../pages/CommunicateLibrarian/EmailSmsLogLibrarian"
import ListBooksLibrarian from "../pages/LibraryLibrarian/ListBooksLibrarian"
import IssueReturnLibrarian from "../pages/LibraryLibrarian/IssueReturnLibrarian"
import AddBookLibrarian from "../pages/LibraryLibrarian/AddBookLibrarian"
import AddStudentLibrarian from "../pages/LibraryLibrarian/AddStudentLibrarian"
import StudentsLibrarian from "../pages/LibraryLibrarian/StudentsLibrarian"
import AddStaffMemberLibrarian from "../pages/LibraryLibrarian/AddStaffMemberLibrarian"
import BookIssueReportLibrarian from "../pages/ReportsLibrarian/BookIssueReportLibrarian"
import ManageLessonPlanAdmin from "../pages/LessonPlanAdmin/ManageLessonPlanAdmin"
import ManageLessonPlanTeacher from "../pages/LessonPlanTeacher/ManageLessonPlanTeacher"
import ClassTimeTableTeacher from "../pages/AcademicsTeacher/ClassTimeTableTeacher"
import TeachersTimeTableTeacher from "../pages/AcademicsTeacher/TeachersTimeTableTeacher"
import ClassTimeTableAdmin from "../pages/AcademicsAdmin/ClassTimeTableAdmin"
import TeachersTimeTableAdmin from "../pages/AcademicsAdmin/TeachersTimeTableAdmin"
import DashboardCopy from "../pages/Dashboard copy"
import Dashboardteacher from "../pages/Dashboardteacher"
import Dashboardlibrarian from "../pages/Dashboardlibrarian"
import DashboardReceptionist from "../pages/DashboardReceptionist"
import dashstudent from "../pages/StudentRole/Dashboard/index"
import ClassTimetable from "../pages/StudentRole/ClassTimetable"
import LessonPlan from "../pages/StudentRole/LessonPlan"
import SyllabusStatus from "../pages/StudentRole/SyllabusStatus"

import Homeworkstudent from "../pages/StudentRole/Homeworkstudent"
import ApplyLeave from "../pages/StudentRole/ApplyLeave"
import VisitorBookStudent from "../pages/StudentRole/VisitorBook"
import Content from "../pages/StudentRole/content"
import Video from "../pages/StudentRole/Video"
import AttendanceStudent from "../pages/StudentRole/Attendance"
import ExamResultStudent from "../pages/StudentRole/examresult"
import ExamScheduleStudent from "../pages/StudentRole/examschedule"
import ExaminationResultStudent from "../pages/StudentRole/examinationresult"
import ExaminationScheduleStudent from "../pages/StudentRole/examinationschedule"
import Nboard from "../pages/StudentRole/NoticeBoard"
import Treview from "../pages/StudentRole/TeacherReview"
import BookList from "../pages/StudentRole/BookList"
import Transportroutes from "../pages/StudentRole/TransportRoutes"
import Hostels from "../pages/StudentRole/Hostels"
import StudentProf from "../pages/StudentRole/StudentProf"
import ReceptionistSpace from "../pages/ReceptionistSpace"
import AdmissionEnquiryReceptionist from "../pages/frontofficereceptionist/AdmissionEnquiryReceptionist"
import AddAdmissionEnquiryReceptionist from "../pages/frontofficereceptionist/AddAdmissionEnquiryReceptionist"
import VisitorBookReceptionist from "../pages/frontofficereceptionist/VisitorBookReceptionist"
import AddVisitorBookReceptionist from "../pages/frontofficereceptionist/AddVisitorBookReceptionist"
import PhoneCallLogReceptionist from "../pages/frontofficereceptionist/PhoneCallLogReceptionist"
import AddPhoneCallLogReceptionist from "../pages/frontofficereceptionist/AddPhoneCallLogReceptionist"
import PostalDispatchReceptionist from "../pages/frontofficereceptionist/PostalDispatchReceptionist"
import AddPostalDispatchReceptionist from "../pages/frontofficereceptionist/AddPostalDispatchReceptionist"
import PostalReceiveReceptionist from "../pages/frontofficereceptionist/PostalReceiveReceptionist"
import AddPostalReceiveReceptionist from "../pages/frontofficereceptionist/AddPostalReceiveReceptionist"
import ComplainReceptionist from "../pages/frontofficereceptionist/ComplainReceptionist"
import AddComplainReceptionist from "../pages/frontofficereceptionist/AddComplainReceptionist"
import PurposeReceptionist from "../pages/frontofficereceptionist/setupfrontofficereceptionist/PurposeReceptionist"
import AddPurposeReceptionist from "../pages/frontofficereceptionist/setupfrontofficereceptionist/AddPurposeReceptionist"
import StudentDetailsReceptionist from "../pages/StudentDetailsReceptionist.js/StudentDetailsReceptionist"
import ClassTimeTableReceptionist from "../pages/academicsReceptionist/ClassTimeTableReceptionist"
import AssignClassTeacherReceptionist from "../pages/academicsReceptionist/AssignClassTeacherReceptionist"
import SubjectGroupReceptionist from "../pages/academicsReceptionist/SubjectGroupReceptionist"
import SubjectsReceptionist from "../pages/academicsReceptionist/SubjectsReceptionist"
import ClassReceptionist from "../pages/academicsReceptionist/ClassReceptionist"
import SectionsReceptionist from "../pages/academicsReceptionist/SectionsReceptionist"
import StaffDirectoryReceptionist from "../pages/HumanResourceReceptionist.js/StaffDirectoryReceptionist"
import NoticeBoardReceptionist from "../pages/communicateReceptionist/NoticeBoardReceptionist"
import SendEmailBoardReceptionist from "../pages/communicateReceptionist/SendEmailBoardReceptionist"
import SendEmailReceptionist from "../pages/communicateReceptionist/SendEmailReceptionist"
import SendSmsReceptionist from "../pages/communicateReceptionist/SendSmsReceptionist"
import EmailSmsLogReceptionist from "../pages/communicateReceptionist/EmailSmsLogReceptionist"
import GeneralSetting from "../pages/settings/generalsetting/GeneralSetting"
import StudentDetailsSuper from "../pages/StudentDetailsSuperAdmin/StudentDetailsSuper"
import StudentAdmissionSuper from "../pages/StudentDetailsSuperAdmin/StudentAdmissionSuper"
import DisabledStudentsSuper from "../pages/StudentDetailsSuperAdmin/DisabledStudentsSuper"
import MultiClassStudentSuper from "../pages/StudentDetailsSuperAdmin/MultiClassStudentSuper"
import BulkDeleteSuper from "../pages/StudentDetailsSuperAdmin/BulkDeleteSuper"
import StudentCategorieSuper from "../pages/StudentDetailsSuperAdmin/StudentCategorieSuper"
import AddCategorySuper from "../pages/StudentDetailsSuperAdmin/AddCategorySuper"
import StudentHouseSuper from "../pages/StudentDetailsSuperAdmin/StudentHouseSuper"
import DisabledReasonSuper from "../pages/StudentDetailsSuperAdmin/DisabledReasonSuper"
import AddSchoolHouseSuper from "../pages/StudentDetailsSuperAdmin/AddSchoolHouseSuper"
import AddDisableReasonSuper from "../pages/StudentDetailsSuperAdmin/AddDisableReasonSuper"
import HostelRoom from "../pages/hostles/HostelRoom"
import AddHostelRoom from "../pages/hostles/AddHostelRoom"
import RoomType from "../pages/hostles/RoomType"
import AddRoomTypeSuper from "../pages/hostles/AddRoomTypeSuper"
import Payroll from "../pages/HumanRessource/Payroll"
import ApproveRequest from "../pages/HumanRessource/ApproveRequest"
import AddLeaveRequest from "../pages/HumanRessource/AddLeaveRequest"
import ApplyLeaveSuper from "../pages/HumanRessource/ApplyLeaveSuper"
import AddApplyLeave from "../pages/HumanRessource/AddApplyLeave"
import LeaveType from "../pages/HumanRessource/LeaveType"
import AddLeaveType from "../pages/HumanRessource/AddLeaveType"
import TeachersRating from "../pages/HumanRessource/TeachersRating"
import DepartmentSuper from "../pages/HumanRessource/DepartmentSuper"
import AddDepartmentSuper from "../pages/HumanRessource/AddDepartmentSuper"
import DesignationSuper from "../pages/HumanRessource/DesignationSuper"
import AddDesignationSuper from "../pages/HumanRessource/AddDesignationSuper"



import FeesSettingsSuper from "../pages/settings/generalsetting/FeesSettingsSuper"
import IdAutoGeneration from "../pages/settings/generalsetting/IdAutoGeneration"
import AttendanceType from "../pages/settings/generalsetting/AttendanceType"
import MaintenanceType from "../pages/settings/generalsetting/MaintenanceType"
import Miscellaneous from "../pages/settings/generalsetting/Miscellaneous"
import SessionSetting from "../pages/settings/SessionSetting"
import AddSessionSetting from "../pages/settings/AddSessionSetting"
import NotificationSetting from "../pages/settings/NotificationSetting"
import SmsSetting from "../pages/settings/SmsSetting"
import EmailSetting from "../pages/settings/EmailSetting"
import PaymentMethods from "../pages/settings/PaymentMethods"
import PrintHeader from "../pages/settings/PrintHeader"
import BackupRestore from "../pages/settings/BackupRestore"
import LanguagesSetting from "../pages/settings/LanguagesSetting"
import Currency from "../pages/settings/Currency"

import CustomFields from "../pages/settings/CustomFields"
import AddCustomSetting from "../pages/settings/AddCustomSetting"
import CaptchaSetting from "../pages/settings/CaptchaSetting"
import SystemFields from "../pages/settings/SystemFields"
import StudentProfilUpdate from "../pages/settings/StudentProfilUpdate"
import FileTypes from "../pages/settings/FileTypes"
import SideBarMenuSetting from "../pages/settings/SideBarMenuSetting"
import GeneralSettingAdmin from "../pages/settingsAdmin/generalsettingAdmin/GeneralSettingAdmin"
import LogoAdmin from "../pages/settingsAdmin/generalsettingAdmin/LogoAdmin"
import LoginPageBackgroundAdmin from "../pages/settingsAdmin/generalsettingAdmin/LoginPageBackgroundAdmin"
import BackendThemeAdmin from "../pages/settingsAdmin/generalsettingAdmin/BackendThemeAdmin"
import MobileAppAdmin from "../pages/settingsAdmin/generalsettingAdmin/MobileAppAdmin"
import GuardianPanelAdmin from "../pages/settingsAdmin/generalsettingAdmin/GuardianPanelAdmin"
import FeesSettingsSuperAdmin from "../pages/settingsAdmin/generalsettingAdmin/FeesSettingsSuperAdmin"
import IdAutoGenerationAdmin from "../pages/settingsAdmin/generalsettingAdmin/IdAutoGenerationAdmin"
import AttendanceTypeAdmin from "../pages/settingsAdmin/generalsettingAdmin/AttendanceTypeAdmin"
import MaintenanceTypeAdmin from "../pages/settingsAdmin/generalsettingAdmin/MaintenanceTypeAdmin"
import MiscellaneousAdmin from "../pages/settingsAdmin/generalsettingAdmin/MiscellaneousAdmin"
import NotificationSettingAdmin from "../pages/settingsAdmin/NotificationSettingAdmin"
import SmsSettingAdmin from "../pages/settingsAdmin/SmsSettingAdmin"
import EmailSettingAdmin from "../pages/settingsAdmin/EmailSettingAdmin"
import PaymentMethodsAdmin from "../pages/settingsAdmin/PaymentMethodsAdmin"
import PrintHeaderAdmin from "../pages/settingsAdmin/PrintHeaderAdmin"
import BackupRestoreAdmin from "../pages/settingsAdmin/BackupRestoreAdmin"
import UsersAdmin from "../pages/settingsAdmin/UsersAdmin"
import SystemFieldsAdmin from "../pages/settingsAdmin/SystemFieldsAdmin"
import StudentProfilUpdateAdmin from "../pages/settingsAdmin/StudentProfilUpdateAdmin"
import SessionSettingAdminAdmin from "../pages/settingsAdmin/SessionSettingAdminAdmin"
import NoticeBoard from "../pages/communicate/NoticeBoard"
import SendSms from "../pages/communicate/SendSms"
import EmailSmsLog from "../pages/communicate/EmailSmsLog"
import StudentBehaviourRankSuperAdmin from "../pages/superadminBehaviourv2/StudentBehaviourRankSuperAdmin"
import ClassRankSuperAdmin from "../pages/superadminBehaviourv2/ClassRankSuperAdmin"
import ClassSectionRankSuperAdmin from "../pages/superadminBehaviourv2/ClassSectionRankSuperAdmin"
import HouseRankReportSuper from "../pages/superadminBehaviourv2/HouseRankReportSuper"
import WiseIncidentSuperAdmin from "../pages/superadminBehaviourv2/WiseIncidentSuperAdmin"
import SettingSuperAdmin from "../pages/superadminBehaviourv2/SettingSuperAdmin"
import ApproveLeaveSuperAdmin from "../pages/attendanceSuperAdminv2/ApproveLeaveSuperAdmin"
import AttendanceSuperAdmin from "../pages/attendanceSuperAdminv2/AttendanceSuperAdmin"

import AddClosedSuperAdmin from "../pages/SuperadminHomework/AddClosedSuperAdmin"
import ClosedHomeworkSuperAdmin from "../pages/SuperadminHomework/ClosedHomeworkSuperAdmin"
import UpcomingHomeworkASuperdmin from "../pages/SuperadminHomework/UpcomingHomeworkASuperdmin"
import AddUpcomingSuperAdmin from "../pages/SuperadminHomework/AddUpcomingSuperAdmin"

import AssignIncidentSuperAdminBehaviour from "../pages/superadminBehaviourv2/AssignIncidentSuperAdminBehaviour"
import IncidentsSuperAdminBehaviour from "../pages/superadminBehaviourv2/IncidentsSuperAdminBehaviour"
import AddIncidentSuperAdminBehaviour from "../pages/superadminBehaviourv2/AddIncidentSuperAdminBehaviour"


const userRoutes = [
  { path: "/dashboard", component: <Dashboard /> },
  
  // //calendar
  { path: "/calendar", component: <Calendar /> },

  { path: "/chat", component: <Chat /> },
  { path: "/kanbanboard", component: <Kanban /> },

  // // //profile
  { path: "/profile", component: <UserProfile /> },

  // //Email
  { path: "/email-inbox", component: <EmailInbox /> },
  { path: "/email-read", component: <EmailRead /> },
  { path: "/email-compose", component: <EmailCompose /> },

  // //Charts
  { path: "/apex-charts", component: <ChartsAppex /> },
  { path: "/charts-chartjs", component: <ChartsJs /> },
  { path: "/charts-knob", component: <ChartsKnob /> },
  { path: "/charts-c3", component: <ChartsC3 /> },
  { path: "/sparkline-charts", component: <ChartsSparkLine /> },

  // // Icons
  { path: "/icons-materialdesign", component: <IconMaterialdesign /> },
  { path: "/icons-ion", component: <Iconion /> },
  { path: "/icons-fontawesome", component: <IconFontawesome /> },
  { path: "/icons-themify", component: <IconThemify /> },
  { path: "/icons-dripicons", component: <IconDripicons /> },
  { path: "/icons-typicons", component: <IconTypicons /> }, 
  
  // // Tables
  { path: "/students", component: <AllStudents /> },
  { path: "/add-students", component: <AddStudents /> },
  { path: "/tables-responsive", component: <ResponsiveTables /> },
  { path: "/tables-editable", component: <EditableTables /> },
  { path: "/teachers", component: <AllTeachers /> },
  { path: "/classes", component: <Classes /> },
  { path: "/addteacher", component: <AddTeachers /> },
  { path: "/StudentAttendance", component: <StudentsAttendance /> },
  { path: "/AssignInsident", component: <AssignIncident/> },
  { path: "/addhomework", component: <AddHomework/> },
  { path: "/homework", component: <Homework/> },
  { path: "/addclass", component: <AddClass/> },
  { path: "/hostles", component: <Hostle/> },
 
  { path: "/TeacherAttendance", component: <TeacherAttendance/> },
  { path: "/books-list", component: <ListBooks/> },
  { path: "/add-book", component: <AddBook /> },
  { path: "/issue-return", component: <IssueReturn /> },
  { path: "/add-student", component: <AddStudent /> },
  { path: "/add-staff", component: <AddStaffMember /> },
  { path: "/exam-group", component: <ExamGroup /> },
  { path: "/add-exam-group", component: <AddExamGroup /> },
  { path: "/exam-shedule", component: <ExamShedule /> },
  { path: "/exam-result", component: <ExamResult /> },
  { path: "/design-admit-card", component: <DesignAdmitCard /> },
  { path: "/add-design-admit-card", component: <AddAdmitCard /> },
  // { path: "/print-admit-card", component: <PrintAdmitCard /> },
  { path: "/design-marksheet", component: <DesignMarksheet /> },
  { path: "/add-design-marksheet", component: <AddMarksheet /> },
  { path: "/print-marksheet", component: <PrintMarksheet /> },
  { path: "/marks-grade", component: <MarksGrade /> },
  { path: "/add-marks-grade", component: <AddMarks /> },
  { path: "/marks-division", component: <MarksDevision /> },
  { path: "/add-marks-division", component: <AddMarkDivision /> },
  { path: "/admission-enquiry", component: <AdmissionEnquiry /> },
  { path: "/add-admission-enquiry", component: <AddAdmissionEnquiry /> },
  { path: "/visitor-books", component: <VisitorBook /> },
  { path: "/add-visitor-book", component: <AddVisitorBook /> },
  { path: "/phone-call-log", component: <PhoneCallLog /> },
  { path: "/add-phone-call-log", component: <AddPhoneCallLog /> },
  { path: "/postal-dispatch", component: <PostalDispatch/> },
  { path: "/add-postal-dispatch", component: <AddPostalDispatch/> },
  { path: "/postal-receive", component: <PostalRecieve/> },
  { path: "/add-postal-receive", component: <AddPostalReceive/> },
  { path: "/complaint", component: <Complain/> },
  { path: "/add-complain", component: <AddComplain/> },
  { path: "/setup-purpose", component: <Purpose/> },
  { path: "/setup-add-purpose", component: <AddPurpose/> },
  { path: "/setup-complaint-type", component: <ComplaintType/> },
  { path: "/setup-add-complaint-type", component: <AddComplaintType/> },
  { path: "/setup-source", component: <Source/> },
  { path: "/setup-add-source", component: <AddSource/> },
  { path: "/setup-reference", component: <Reference/> },
  { path: "/setup-add-reference", component: <AddReference/> },

  { path: "/search-due-fees", component: <SearchDueFees/> },
  { path: "/fees-master", component: <FeesMaster/> },
  { path: "/add-fees-master", component: <AddFeesMaster/> },
  { path: "/fees-group", component: <FeesGroup/> },
  { path: "/add-fees-group", component: <AddFeesGroup/> },
  { path: "/fees-type", component: <FeesType/> },
  { path: "/add-fees-type", component: <AddFeesType/> },
  { path: "/fees-discount", component: <FeesDiscount/> },
  { path: "/add-fees-discount", component: <AddFeesDiscount/> },
  { path: "/fees-carry-forward", component: <FeesCarryForward/> },
  { path: "/fees-reminder", component: <FeesReminder/> },
  { path: "/transport-pickup-point", component: <PickupPoint/> },
  { path: "/add-transport-pickup-point", component: <AddPickupPoint/> },
  { path: "/routes", component: <RoutesTransport/> },
  { path: "/add-route", component: <AddRoute/> },
  { path: "/vehicles", component: <Vehicles/> },
  { path: "/add-vehicle", component: <AddVehicle/> },
  { path: "/assign-vehicle", component: <AssignVehicle/> },
  { path: "/add-assign-vehicle", component: <AddAssignVehicle/> },
  { path: "/route-pickup-point", component: <RoutePickUpPoint/> },
  { path: "/add-route-pickup-point", component: <AddRoutePickUpPoint /> },
  { path: "/student-transport-fees", component: <StudentTransportFees /> },
  { path: "/staff-directory", component: <StaffDirectory /> },
  { path: "/add-staff-directory", component: <AddStaff /> },
  { path: "/staff-attendance", component: <StaffAttendance /> },
  { path: "/payroll", component: <Payroll /> },
  { path: "/hr-approve-leave-request", component: <ApproveRequest /> },
  { path: "/add-leave-request", component: <AddLeaveRequest /> },
  { path: "/apply-leave-super", component: <ApplyLeaveSuper /> },
  { path: "/add-apply-leave-super", component: <AddApplyLeave /> },
  { path: "/leave-type", component: <LeaveType /> },
  { path: "/add-leave-type-super", component: <AddLeaveType /> },
  { path: "/teachers-rating-super", component: <TeachersRating /> },
  { path: "/department-super", component: <DepartmentSuper /> },
  { path: "/add-department-super", component: <AddDepartmentSuper /> },
  { path: "/designation-super", component: <DesignationSuper /> },
  { path: "/add-designation-super", component: <AddDesignationSuper /> },
  { path: "/issue-item", component: <IssueItem /> },
  { path: "/add-issue-item", component: <AddIssueItem/> },
  { path: "/item-stock", component: <ItemStock/> },
  { path: "/add-item-stock", component: <AddItemStock/> },
  { path: "/item", component: <Item/> },
  { path: "/add-item", component: <AddItem/> },
  { path: "/item-category", component: <ItemCategory/> },
  { path: "/add-item-category", component: <AddItemCategory/> },
  { path: "/item-store", component: <ItemStore/> },
  { path: "/add-item-store", component: <AddItemStore/> },
  { path: "/item-supplier", component: <ItemSupplier/> },
  { path: "/add-item-supplier", component: <AddItemSupplier/> },
  { path: "/content-type", component: <ContentType/> },
  // { path: "/add-content-type", component: <AddContentType/> },
  // { path: "/content-share-list", component: <ContentShareList/> },
  // { path: "/upload-share-content", component: <UploadShareContent/> },
  { path: "/video-tutorial", component: <VideoTutorial/> },
  { path: "/add-video-tutorial", component: <AddVideoTutorial/> },
  { path: "/multi-branch-overview", component: <Overview/> },
  { path: "/daily-collection-report", component: <DailyCollectionReport/> },
  { path: "/payroll-report", component: <PayrollReport/> },
  { path: "/income-report", component: <IncomeReport/> },
  { path: "/expense-report", component: <ExpenseReport/> },
  { path: "/user-log-report", component: <UserLogReport/> },
  { path: "/multi-branch-setting", component: <Setting/> },
  { path: "/multi-branch-add-new", component: <AddNew/> },
  // { path: "/copy-old-lesson", component: <CopyOldLessons/> },
  { path: "/manage-lesson-plan", component: <ManageLessonPlan/> },
  // { path: "/manage-syllabus-status", component: <ManageSyllabusStatus/> },
  { path: "/lesson-plan-lesson", component: <Lesson/> },
  { path: "/add-lesson", component: <AddLesson/> },
  { path: "/lesson-plan-topic", component: <Topic/> },
  { path: "/lesson-plan-add-topic", component: <AddTopic/> },
  { path: "/communicate-send-email", component: <SendEmail/> },
  { path: "/reports-attendance-super", component: <Attendance/> },
  { path: "/roles-permissions", component: <RolesPermissions/> },
  { path: "/add-role", component: <AddRole/> },
  { path: "/settings-users", component: <Users/> },
  { path: "/academics-assign-class-teacher", component: <AssignClassTeacher/> },
  { path: "/add-assign-class-teacher", component: <AddClassTeacher/> },
  { path: "/promote-students", component: <PromoteStudents/> },
  { path: "/academic-subject-group", component: <SubjectGroup/> },
  { path: "/add-subject-group", component: <AddSubjectGroup/> },
  { path: "/subjects", component: <Subjects/> },
  { path: "/add-subject", component: <AddSubject/> },
  { path: "/class-academic", component: <ClassAcademic/> },
  { path: "/add-class-academic", component: <AddClassAcademic/> },
  { path: "/sections", component: <Sections/> },
  { path: "/add-section", component: <AddSection/> },
  { path: "/student-information-reports-super", component: <StudentInformationReportSuper/> },
  { path: "/examinations-rank-report-super", component: <ExaminationRankReportSuper/> },
  { path: "/lesson-syllabus-report-super", component: <LessonPlanSyllabusSuper/> },
  { path: "/human-resource-staff-super", component: <HumanResourceStaffSuper/> },
  { path: "/homework-report-super", component: <HomeworkReportSuper/> },
  { path: "/book-issue-report-super", component: <BookIssueReportSuper/> },
  { path: "/inventory-report-super", component: <InventoryReportSuper/> },
  // { path: "/transport-report-super", component: <TransportReportSuper/> },
  // { path: "/hostel-report-super", component: <HostelReportSuper/> },
  { path: "/settings-general-setting", component: <GeneralSetting/> },
  { path: "/student-student-details", component: <StudentDetailsSuper/> },
  { path: "/student-student-admission", component: <StudentAdmissionSuper/> },
  { path: "/student-disabled-student", component: <DisabledStudentsSuper/> },
  // { path: "/student-multiclass-student", component: <MultiClassStudentSuper/> },
  // { path: "/student-bulkdelete-student", component: <BulkDeleteSuper/> },
  { path: "/student-categorie-student", component: <StudentCategorieSuper/> },
  { path: "/student-add-categorie-student", component: <AddCategorySuper/> },
  { path: "/student-house-student", component: <StudentHouseSuper/> },
  { path: "/student-disable-reason-student", component: <DisabledReasonSuper/> },
  { path: "/student-add-school-house-student", component: <AddSchoolHouseSuper/> },
  { path: "/student-add-disable-reason-student", component: <AddDisableReasonSuper/> },
  { path: "/hostel-add-hostel", component: <AddHostle/> },
  { path: "/hostel-room", component: <HostelRoom/> },
  { path: "/add-hostel-room", component: <AddHostelRoom/> },
  { path: "/room-type", component: <RoomType/> },
  { path: "/hostel-add-room-type", component: <AddRoomTypeSuper/> },


 

  // { path: "/general-settings-fees", component: <FeesSettingsSuper/> },
  // { path: "/general-settings-id-auto", component: <IdAutoGeneration/> },
  // { path: "/general-settings-attendance-type", component: <AttendanceType/> },
  // { path: "/general-settings-maintenance", component: <MaintenanceType/> },
  // { path: "/general-settings-miscellaneous", component: <Miscellaneous/> },
  { path: "/settings-session", component: <SessionSetting/> },
  { path: "/add-settings-session", component: <AddSessionSetting/> },
  { path: "/setting-notification", component: <NotificationSetting/> },
  // { path: "/setting-sms", component: <SmsSetting/> },
  // { path: "/setting-email", component: <EmailSetting/> },
  // { path: "/payment-methods", component: <PaymentMethods/> },
  // { path: "/print-setting-header", component: <PrintHeader/> },
  { path: "/backup-restore", component: <BackupRestore/> },
  // { path: "/languages-setting", component: <LanguagesSetting/> },
  // { path: "/currency-setting", component: <Currency/> },

  // { path: "/custom-fields-settings", component: <CustomFields/> },
  { path: "/add-fields-settings", component: <AddCustomSetting/> },
  // { path: "/captcha-settings", component: <CaptchaSetting/> },
  // { path: "/system-fields-settings", component: <SystemFields/> },
  // { path: "/student-profil-update-settings", component: <StudentProfilUpdate/> },
  // { path: "/file-types-settings", component: <FileTypes/> },
  // { path: "/side-bar-menu-settings", component: <SideBarMenuSetting/> },
  // { path: "/notice-board-super-admin", component: <NoticeBoard/> },
  { path: "/send-sms-super-admin", component: <SendSms/> },
  { path: "/email-sms-log-super-admin", component: <EmailSmsLog/> },
  


  ///behaviour
  
  { path: "/assign-incident-super-admin", component: <StudentBehaviourRankSuperAdmin/> },
  { path: "/class-rank-super-admin", component: <ClassRankSuperAdmin/> },
  { path: "/class-section-sms-super-admin", component: <ClassSectionRankSuperAdmin/> },
  { path: "/house-smranks-super-admin", component: <HouseRankReportSuper/> },
  { path: "/wise-incident-super-admin", component: <WiseIncidentSuperAdmin/> },
  { path: "/settings-super-admin", component: <SettingSuperAdmin/> },
  { path: "/behaviour-assign-incident-super-admin", component: <AssignIncidentSuperAdminBehaviour/> },
  { path: "/behaviour-incidents-super-admin", component: <IncidentsSuperAdminBehaviour/> },
  { path: "/behaviour-add-incident-super-admin", component: <AddIncidentSuperAdminBehaviour/> },
  


  ///// attendance
  { path: "/approve-leave-super-admin", component: < ApproveLeaveSuperAdmin/> },
  { path: "/attendance-super-admin", component: <AttendanceSuperAdmin/> },




  ///// homwerok

  { path: "/add-upcoming-super-admin", component: < AddUpcomingSuperAdmin/> },
  { path: "/add-closed-super-admin", component: < AddClosedSuperAdmin/> },
  { path: "/closed-super-admin", component: < ClosedHomeworkSuperAdmin/> },
  { path: "/upcoming-leave-super-admin", component: < UpcomingHomeworkASuperdmin/> },

  
  
  


  
  
  







  // // Maps
  { path: "/maps-google", component: <MapsGoogle /> },
  { path: "/maps-vector", component: <MapsVector /> },

  // // Forms
  
  { path: "/form-advanced", component: <FormAdvanced /> },
  { path: "/form-editors", component: <FormEditors /> },
  { path: "/form-uploads", component: <FormUpload /> },
  { path: "/form-validation", component: <FormValidations /> },
  { path: "/form-xeditable", component: <FormXeditable /> },

  // // Ui
  { path: "/ui-alerts", component: <UiAlert /> },
  { path: "/ui-buttons", component: <UiButtons /> },
  { path: "/ui-badge", component: <UiBadge /> },
  { path: "/ui-cards", component: <UiCards /> },
  { path: "/ui-carousel", component: <UiCarousel /> },
  { path: "/ui-dropdowns", component: <UiDropdown /> },
  { path: "/ui-grid", component: <UiGrid /> },
  { path: "/ui-images", component: <UiImages /> },
  { path: "/ui-lightbox", component: <UiLightbox /> },
  { path: "/ui-modals", component: <UiModal /> },
  { path: "/ui-pagination", component: <UiPagination /> },
  { path: "/ui-popover-tooltip", component: <UiPopoverTooltips /> },
  { path: "/ui-progressbars", component: <UiProgressbar /> },
  { path: "/ui-tabs-accordions", component: <UiTabsAccordions /> },
  { path: "/ui-typography", component: <UiTypography /> },
  { path: "/ui-video", component: <UiVideo /> },
  { path: "/ui-session-timeout", component: <UiSessionTimeout /> },
  { path: "/ui-rangeslider", component: <UiRangeSlider /> },
  { path: "/ui-utilities", component: <UiUtilities /> },
  { path: "/ui-colors", component: <UiColors /> },
  { path: "/ui-offcanvas", component: <UiOffcanvas /> },

  // //Extra Pages
  { path: "/behavior", component: <Behavior /> },
  { path: "/students-profile", component: <StudentProfile /> },
  { path: "/pages-directory", component: <PagesDirectory /> },
  { path: "/pages-blank", component: <PagesBlank /> },

  // this route should be at the end of all other routes
  {
    path: "/",
    exact: true,
    component: <Navigate to="/login" />,
  },
]
const studentRoutes=[
  { path: "/profile", component: <UserProfile /> },
  { path: "/student-dashboard", component: <DashboardStudent/> },
  { path: "/students-prof", component: <StudentProf/> },
  { path: "/fees", component: <Fees/> },
  { path: "/classtimetable", component: <ClassTimetable/> },
  { path: "/lessonplan", component: <LessonPlan/> },
  { path: "/syllabusStatus", component: <SyllabusStatus/> },
  { path: "/homeworkstudent", component: <Homeworkstudent/> },
  { path: "/applyleave", component: <ApplyLeave/> },
  { path: "/visitorbook", component: <VisitorBookStudent/> },
  { path: "/content", component: <Content/> },
  { path: "/video", component: <Video/> },
  { path: "/attendance", component: <AttendanceStudent/> },
  { path: "/examresultstudent", component: <ExamResultStudent/> },
  { path: "/examschedule", component: <ExamScheduleStudent/> },
  { path: "/examinationresult", component: <ExaminationResultStudent/> },
  { path: "/examinationschedule", component: <ExaminationScheduleStudent/> },
  { path: "/noticeBoard", component: <Nboard/> },
  // { path: "/Treview", component: <Treview/> },
  { path: "/booklist", component: <BookList/> },
  { path: "/transportroutes", component: <Transportroutes/> },
  { path: "/Hostels", component: <Hostels/> },
  
]
const teacherRoutes = [
 
  { path: "/teacher-dashboard", component: <Dashboardteacher /> },
  { path: "/teacher-classes", component: <ViewClasses/> },
  { path: "/add-classes", component: <AddClasses/> },
  { path: "/attendances", component: <TeacherAttendanceSpace/> },
  { path: "/behaviour-assign", component: <BehaviourAssign/> },
  { path: "/incidents", component: <Incidents/> },
  { path: "/add-incident", component: <AddIncident/> },
  { path: "/reports", component: <Reports/> },
  { path: "/setting", component: <SettingBehaviour/> },
  { path: "/teacher-homework", component: <HomeworkTeacher/> },
  { path: "/add-teacher-homework", component: <AddTeacherHomework/> },
  { path: "/students-details", component: <StudentDetails/> },
  { path: "/students-Admission", component: <StudentAdmission/> },
  { path: "/disabled-students", component: <DisabledStudents/> },
  { path: "/multiclass-student", component: <MultiClassStudent/> },
  { path: "/bulk-delete", component: <BulkDelete/> },
  { path: "/student-categories", component: <StudentCategorie/> },
  { path: "/add-categorie", component: <AddCategory/> },
  { path: "/student-house", component: <StudentHouse/> },
  { path: "/add-school-house", component: <AddSchoolHouse/> },
  { path: "/disable-reason", component: <DisabledReason/> },
  { path: "/add-disable-reason", component: <AddDisableReason/> },
  { path: "/exam-group-teacher", component: <ExamGroupTeacher/> },
  { path: "/add-exam-group-teacher", component: <AddExamGroupTeacher/> },
  { path: "/exam-result-teacher", component: <ExamResultTeacher/> },
  { path: "/design-admit-card-teacher", component: <DesignAdmitCardTeacher/> },
  { path: "/add-admit-card-teacher", component: <AddAdmitCardTeacher/> },
  // { path: "/print-admit-card-teacher", component: <PrintAdmitCardTeacher/> },
  { path: "/design-Marksheet-teacher", component: <DesignMarksheetTeacher/> },
  { path: "/add-Marksheet-teacher", component: <AddMarksheetTeacher/> },
  { path: "/print-Marksheet-teacher", component: <PrintMarksheetTeacher/> },
  { path: "/marks-grade-teacher", component: <MarksGradeTeacher/> },
  { path: "/add-marks-grade-teacher", component: <AddMarksGradeTeacher/> },
  { path: "/approve-leave-teacher", component: <ApproveLeaveTeacher/> },
  { path: "/add-approve-leave-teacher", component: <AddApproveTeacher/> },
  // { path: "/period-attendance-teacher", component: <PeriodAttendanceTeacher/> },
  { path: "/manage-syllabus-teacher", component: <ManageSyllabusTeacher/> },
  { path: "/lesson-teacher", component: <LessonTeacher/> },
  { path: "/add-lesson-teacher", component: <AddLessonTeacher/> },
  { path: "/topic-teacher", component: <TopicTeacher/> },
  { path: "/add-topic-teacher", component: <AddTopicTeacher/> },
  { path: "/staff-directory-teacher", component: <StaffDirectoryTeacher/> },
  { path: "/apply-leave-teacher", component: <ApplyLeave/> },
  { path: "/add-leave-teacher", component: <AddLeave/> },
  { path: "/content-sharelist-teacher", component: <ContentShareListTeacher/> },
  { path: "/upload-sharecontent-teacher", component: <UploadShareContentTeacher/> },
  { path: "/video-tutorial-teacher", component: <VideoTutorialTeacher/> },
  { path: "/add-video-tutorial-teacher", component: <AddVideoTutorialTeacher/> },
  { path: "/notice-board-teacher", component: <NoticeBoardTeacher/> },
  { path: "/notice-board-teacher-send", component: <SendEmailBoard/> },
  { path: "/send-email", component: <SendEmailTeacher/> },
  { path: "/send-sms", component: <SendSmsTeacher/> },
  { path: "/send-sms-log", component: <EmailSmsLogTeacher/> },
  { path: "/closed-homework-teacher", component: <ClosedHomeworkTeacher/> },
  { path: "/student-information-report", component: <StudentInformationReport/> },
  { path: "/period-attendance-report", component: <PeriodAttendanceReport/> },
  { path: "/examinations-report", component: <ExaminationRankReport/> },
  { path: "/lessonplan-syllabus-report", component: <LessonPlanSyllabus/> },
  { path: "/homework-report", component: <HomeworkReport/> },
  { path: "/transport-report", component: <TransportReportTeacher/> },
  { path: "/hostel-report", component: <HostelReportTeacher/> },
  { path: "/alumini-report", component: <AlumniReportTeacher/> },
  { path: "/assign-class-teacher-teach", component: <AssignClassTeacherTeach/> },
  { path: "/add-class-teacher-teach", component: <AddClassTeacherTeach/> },
  { path: "/promote-student-teacher", component: <PromoteStudentTeacher/> },
  { path: "/subject-group-teacher", component: <SubjectGroupTeacher/> },
  { path: "/add-subject-group-teacher", component: <AddSubjectGroupTeacher/> },
  { path: "/subjects-teacher", component: <SubjectsTeacher/> },
  { path: "/add-subject-teacher", component: <AddSubjectTeacher/> },
  { path: "/class-academic-teacher", component: <ClassAcademicTeacher/> },
  { path: "/add-class-academic-teacher", component: <AddClassAcademicTeacher/> },
  { path: "/sections-teacher", component: <SectionsTeacher/> },
  { path: "/add-sections-teacher", component: <AddSectionTeacher/> },
  { path: "/manage-lesson-plan-teacher", component: <ManageLessonPlanTeacher/> },
  { path: "/class-time-table-teacher", component: <ClassTimeTableTeacher/> },
  { path: "/teachers-time-table-teacher", component: <TeachersTimeTableTeacher/> },


]

const adminRoutes=[
  { path: "/admin-dashboard", component: <DashboardCopy /> },
  
  { path: "/admin-view-classes", component: <ViewAdminClasses /> },
  { path: "/add-class-admin", component: <AddClassAdmin /> },
  { path: "/attendance-admin", component: <AttendanceAdmin /> },
  { path: "/approve-leave-admin", component: <ApproveLeaveAdmin /> },
  { path: "/attendance-by-date-admin", component: <AttendanceBydateAdmin /> },
  { path: "/behaviour-Rank-admin", component: <StudentBehaviourRankAdmin /> },
  { path: "/class-Rank-admin", component: <ClassRankAdmin /> },
  { path: "/class-section-Rank-admin", component: <ClassSectionRankAdmin /> },
  { path: "/House-Rank-admin", component: <HouseRankReport /> },
  { path: "/wise-incident-admin", component: <WiseIncidentAdmin /> },
  { path: "/setting-admin", component: <SettingAdmin /> },
  { path: "/upcoming-homework-admin", component: <UpcomingHomeworkAdmin /> },
  { path: "/add-upcoming-admin", component: <AddUpcomingAdmin /> },
  { path: "/closed-homework-admin", component: <ClosedHomeworkAdmin /> },
  { path: "/add-closed-admin", component: <AddClosedAdmin /> },
  { path: "/student-details-admin", component: <StudentDetailsAdmin /> },
  { path: "/student-admission-admin", component: <StudentAdmissionAdmin /> },
  { path: "/student-disabled-admin", component: <DisabledStudentAdmin /> },
  { path: "/multi-student-admin", component: <MultiClassStudentAdmin /> },
  { path: "/bulk-delete-admin", component: <BulkDeleteAdmin /> },
  { path: "/student-categories-admin", component: <StudentCategoriesAdmin /> },
  { path: "/add-categorie-admin", component: <AddCategoryAdmin /> },
  { path: "/student-house-admin", component: <StudentHouseAdmin /> },
  { path: "/add-school-admin", component: <AddSchoolAdmin /> },
  { path: "/disable-reason-admin", component: <DisableReasonAdmin /> },
  { path: "/add-disable-reason-admin", component: <AddDisableReasonAdmin /> },
  { path: "/exam-group-admin", component: <ExamGroupAdmin /> },
  { path: "/add-exam-group-admin", component: <AddExamGroupAdmin /> },
  { path: "/exam-result-admin", component: <ExamResultAdmin /> },
  { path: "/design-admit-card-admin", component: <DesignAdmitCardAdmin /> },
  // { path: "/print-admit-card-admin", component: <PrintAdmitCardAdmin /> },
  { path: "/design-marksheet-admin", component: <DesignMarksheetAdmin /> },
  { path: "/print-marksheet-admin", component: <PrintMarksheetAdmin /> },
  { path: "/marks-grade-admin", component: <MarksGradeAdmin /> },
  { path: "/add-marks-grade-admin", component: <AddMarksGradeAdmin /> },
  { path: "/staff-directory-admin", component: <StaffDirectoryAdmin /> },
  { path: "/staff-attendance-admin", component: <StaffAttendanceAdmin /> },
  { path: "/payroll-admin", component: <PayrollAdmin /> },
  { path: "/approve-request-admin", component: <ApproveRequestAdmin/> },
  { path: "/apply-leave-admin", component: <ApplyLeaveAdmin/> },
  { path: "/leave-type-admin", component: <LeaveTypeAdmin/> },
  { path: "/add-leave-type-admin", component: <AddLeaveTypeAdmin/> },
  { path: "/teacher-rating-admin", component: <TeachersRatingAdmin/> },
  { path: "/departments-admin", component: <DepartmentAdmin/> },
  { path: "/add-department-admin", component: <AddDepartmentAdmin/> },
  { path: "/designation-admin", component: <DesignationAdmin/> },
  { path: "/add-designation-admin", component: <AddDesignationAdmin/> },
  // { path: "/manage-syllabus-admin", component: <ManageSyllabusAdmin/> },
  { path: "/lesson-admin", component: <LessonAdmin/> },
  { path: "/add-lesson-admin", component: <AddLessonAdmin/> },
  { path: "/topic-admin", component: <TopicAdmin/> },
  { path: "/add-topic-admin", component: <AddTopicAdmin/> },
  // { path: "/upload-share-content-admin", component: <UploadShareContentAdmin/> },
  // { path: "/notice-board-admin", component: <NoticeBoardAdmin/> },
  { path: "/notice-board-admin-send", component: <SendEmailBoardAdmin/> },
  { path: "/send-email-admin", component: <SendEmailAdmin/> },
  { path: "/send-sms-admin", component: <SendSmsAdmin/> },
  { path: "/email-smslog-admin", component: <EmailSmsLogAdmin/> },
  { path: "/hostel-room-admin", component: <HostelRoomAdmin/> },
  { path: "/add-hostel-room-admin", component: <AddHostelRoomAdmin/> },
  { path: "/room-type-admin", component: <RoomTypeAdmin/> },
  { path: "/add-room-type-admin", component: <AddRoomType/> },
  { path: "/hostel-admin", component: <HostelAdmin/> },
  { path: "/add-hostel-admin", component: <AddHostelAdmin/> },
  { path: "/routes-admin", component: <RoutesTransportAdmin/> },
  { path: "/add-routes-admin", component: <AddRouteAdmin/> },
  { path: "/vheicles-admin", component: <VheiclsAdmin/> },
  { path: "/add-vheicles-admin", component: <AddVheicleAdmin/> },
  { path: "/assign-vheicle-admin", component: <AssignVheicleAdmin/> },
  { path: "/add-assign-vheicle-admin", component: <AddAssignVehicleAdmin/> },
  { path: "/books-admin", component: <ListBooksAdmin/> },
  { path: "/add-book-admin", component: <AddBookAdmin/> },
  { path: "/issue-return-admin", component: <IssueReturnAdmin/> },
  { path: "/add-student-admin", component: <AddStudentAdmin/> },
  { path: "/add-staff-admin", component: <AddStaffMemberAdmin/> },
  { path: "/issue-item-admin", component: <IssueItemAdmin/> },
  { path: "/add-issue-item-admin", component: <AddIssueItemAdmin/> },
  { path: "/item-stock-admin", component: <ItemStockAdmin/> },
  { path: "/add-item-stock-admin", component: <AddItemStockAdmin/> },
  { path: "/item-admin", component: <ItemAdmin/> },
  { path: "/add-item-admin", component: <AddItemAdmin/> },
  { path: "/item-category-admin", component: <ItemCategoryAdmin/> },
  { path: "/add-item-category-admin", component: <AddItemCategoryAdmin/> },
  { path: "/item-store-admin", component: <ItemStoreAdmin/> },
  { path: "/add-item-store-admin", component: <AddItemStoreAdmin/> },
  { path: "/item-supplier-admin", component: <ItemSupplierAdmin/> },
  { path: "/add-item-supplier-admin", component: <AddItemSupplierAdmin/> },
  // { path: "/collect-fees-admin", component: <CollectFessAdmin/> },
  // { path: "/search-fees-payments-admin", component: <SearchFeesPaymentsAdmin/> },
  // { path: "/search-due-fees-admin", component: <SearchDueFeesAdmin/> },
  { path: "/fees-master-admin", component: <FeesMasterAdmin/> },
  { path: "/add-fees-master-admin", component: <AddFeesMasterAdmin/> },
  { path: "/fees-group-admin", component: <FeesGroupAdmin/> },
  { path: "/add-fees-group-admin", component: <AddFeesGroupAdmin/> },
  { path: "/fees-type-admin", component: <FeesTypeAdmin/> },
  { path: "/add-fees-type-admin", component: <AddFeesTypeAdmin/> },
  { path: "/fees-discount-admin", component: <FeesDiscountAdmin/> },
  { path: "/add-fees-discount-admin", component: <AddFeesDiscountAdmin/> },
  { path: "/fees-carryforward-admin", component: <FeesCarryForwardAdmin/> },
  { path: "/fees-reminder-admin", component: <FeesReminderAdmin/> },
  { path: "/admission-enquiry-admin", component: <AdmissionEnquiryAdmin/> },
  { path: "/add-admission-enquiry-admin", component: <AddAdmissionEnquiryAdmin/> },
  { path: "/visitor-book-admin", component: <VisitorBookAdmin/> },
  { path: "/add-visitor-book-admin", component: <AddVisitorBookAdmin/> },
  { path: "/phone-call-admin", component: <PhoneCallLogAdmin/> },
  { path: "/add-phone-call-admin", component: <AddPhoneCallLogAdmin/> },
  { path: "/postal-dispatch-admin", component: <PostalDispatchAdmin/> },
  { path: "/add-postal-dispatch-admin", component: <AddPostalDispatchAdmin/> },
  { path: "/postal-recieve-admin", component: <PostalReceiveAdmin/> },
  { path: "/add-postal-receive-admin", component: <AddPostalReceiveAdmin/> },
  { path: "/complain-admin", component: <ComplainAdmin/> },
  { path: "/add-complain-admin", component: <AddComplainAdmin/> },
  { path: "/purpose-admin", component: <PurposeAdmin/> },
  { path: "/add-purpose-admin", component: <AddPurposeAdmin/> },
  { path: "/complaint-type-admin", component: <ComplainTypeAdmin/> },
  { path: "/add-complaint-type-admin", component: <AddComplaintTypeAdmin/> },
  { path: "/source-admin", component: <SourceAdmin/> },
  { path: "/add-source-admin", component: <AddSourceAdmin/> },
  { path: "/reference-admin", component: <ReferenceAdmin/> },
  { path: "/add-reference-admin", component: <AddReferenceAdmin/> },
  { path: "/student-report-admin", component: <StudentInformationReportAdmin/> },
  { path: "/attendance-report-admin", component: <PeriodAttendanceReportAdmin/> },
  { path: "/examination-report-admin", component: <ExaminationRankReportAdmin/> },
  { path: "/lesson-syllabus-report-admin", component: <LessonPlanSyllabusAdmin/> },
  { path: "/staff-report-admin", component: <HumanResourceStaffAdmin/> },
  { path: "/homework-report-admin", component: <HomeworkReportAdmin/> },
  { path: "/book-issuereturn-report-admin", component: <BookIssueReportAdmin/> },
  { path: "/inventory-report-admin", component: <InventoryReportAdmin/> },
  { path: "/transport-report-admin", component: <TransportReportAdmin/> },
  { path: "/hostel-report-admin", component: <HostelReportAdmin/> },
  { path: "/multibranch-overview-admin", component: <OverviewAdmin/> },
  { path: "/daily-collection-report-admin", component: <DailyCollectionReportAdmin/> },
  { path: "/payroll-report-admin", component: <PayrollReportAdmin/> },
  { path: "/income-report-admin", component: <IncomeReportAdmin/> },
  { path: "/expense-report-admin", component: <ExpenseReportAdmin/> },
  { path: "/user-log-report-admin", component: <UserLogReportAdmin/> },
  { path: "/multibranch-setting-admin", component: <SettingMultibranchAdmin/> },
  { path: "/user-setting-admin", component: <UersSettingAdmin/> },
  { path: "/academics-assignteacher-admin", component: <AssignClassTeacherAdmin/> },
  { path: "/add-assignteacher-admin", component: <AddClassTeacherAdmin/> },
  { path: "/subject-group-admin", component: <SubjectGroupAdmin/> },
  { path: "/add-subject-group-admin", component: <AddSubjectGroupAdmin/> },
  { path: "/subjects-admin", component: <SubjectsAdmin/> },
  { path: "/add-subject-admin", component: <AddSubjectAdmin/> },
  { path: "/class-admin", component: <ClassAcademicAdmin/> },
  { path: "/add-class-academic-admin", component: <AddClassAcademicAdmin/> },
  { path: "/academic-sections-admin", component: <SectionsAdmin/> },
  { path: "/add-section-admin", component: <AddSectionAdmin/> },
  { path: "/promote-student-admin", component: <PromoteStudentsAdmin/> },
  { path: "/manage-lesson-plan-admin", component: <ManageLessonPlanAdmin/> },
  { path: "/class-time-table-admin", component: <ClassTimeTableAdmin/> },
  { path: "/teachers-time-table-admin", component: <TeachersTimeTableAdmin/> },

////admin settings

  { path: "/generalsettings-admin", component: <GeneralSettingAdmin/> },
  // { path: "/logo-admin", component: <LogoAdmin/> },
  // { path: "/login-admin", component: <LoginPageBackgroundAdmin/> },
  // { path: "/backend-admin", component: <BackendThemeAdmin/> },
  // { path: "/mobile-admin", component: <MobileAppAdmin/> },
  // { path: "/guardien-admin", component: <GuardianPanelAdmin/> },
  // { path: "/fees-admin", component: <FeesSettingsSuperAdmin/> },
  // { path: "/id-admin", component: <IdAutoGenerationAdmin/> },
  // { path: "/attendance-type-admin", component: <AttendanceTypeAdmin/> },
  // { path: "/mainetnance-admin", component: <MaintenanceTypeAdmin/> },
  // { path: "/Miscellanous-admin", component: <MiscellaneousAdmin/> },
  { path: "/notification-admin", component: <NotificationSettingAdmin/> },
  // { path: "/sms-admin", component: <SmsSettingAdmin/> },
  // { path: "/email-admin", component: <EmailSettingAdmin/> },
  // { path: "/payment-admin", component: <PaymentMethodsAdmin/> },
  // { path: "/print-admin", component: <PrintHeaderAdmin/> },
  { path: "/backup-admin", component: <BackupRestoreAdmin/> },
  { path: "/users-admin", component: <UsersAdmin/> },
  // { path: "/systemfield-admin", component: <SystemFieldsAdmin/> },
  // { path: "/student-profile-admin", component: <StudentProfilUpdateAdmin/> },
  { path: "/settings-session-admin-admin", component: <SessionSettingAdminAdmin/> },
]
const librarianRoutes=[
  { path: "/Librarian-dashboard", component: <Dashboardlibrarian /> },
  { path: "/behaviour-incidents-librarian", component: <IncidentsLibrarien /> },
  { path: "/behaviour-add-incidents-librarian", component: <AddIncidentLibrarien /> },
  { path: "/behaviour-assign-librarian", component: <BehaviourAssignLibrarian /> },
  { path: "/behaviour-incident-report-librarian", component: <ReportsLibrarian /> },
  { path: "/behaviour-setting-librarian", component: <SettingBehaviourLibrarian /> },
  { path: "/humanresource-staff-librarian", component: <StaffDirectoryLibrarien /> },
  { path: "/communicate-notice-board-librarian", component: <NoticeBoardLibrarian /> },
  { path: "/communicate-add-notice-board-librarian", component: <SendEmailBoardLibrarian /> },
  { path: "/communicate-send-email-librarian", component: <SendEmailLibrarian /> },
  { path: "/communicate-send-sms-librarian", component: <SendSmsLibrarian /> },
  { path: "/email-log-sms-librarian", component: <EmailSmsLogLibrarian /> },
  { path: "/list-books-librarian", component: <ListBooksLibrarian /> },
  { path: "/add-books-librarian", component: <AddBookLibrarian /> },
  { path: "/issue-return-books-librarian", component: <IssueReturnLibrarian /> },
  { path: "/students-librarian", component: <StudentsLibrarian /> },
  { path: "/add-student-librarian", component: <AddStudentLibrarian /> },
  { path: "/add-staff-librarian", component: <AddStaffMemberLibrarian /> },
  { path: "/book-issue-report-librarian", component: <BookIssueReportLibrarian /> },
]
const receptionistRoutes=[
  { path: "/Receptionist-dashboard", component: <DashboardReceptionist /> },
  { path: "/admission-enquiry-receptionist", component: <AdmissionEnquiryReceptionist /> },
  { path: "/add-admission-enquiry-receptionist", component: <AddAdmissionEnquiryReceptionist /> },
  { path: "/Visitor-book-receptionist", component: <VisitorBookReceptionist /> },
  { path: "/add-Visitor-book-receptionist", component: <AddVisitorBookReceptionist /> },
  { path: "/phone-call-log-receptionist", component: <PhoneCallLogReceptionist /> },
  { path: "/add-phone-call-log-receptionist", component: <AddPhoneCallLogReceptionist /> },
  { path: "/Postal-dispatch-receptionist", component: <PostalDispatchReceptionist /> },
  { path: "/add-Postal-dispatch-receptionist", component: <AddPostalDispatchReceptionist /> },
  { path: "/Postal-receive-receptionist", component: <PostalReceiveReceptionist /> },
  { path: "/add-Postal-receive-receptionist", component: <AddPostalReceiveReceptionist /> },
  { path: "/complain-receptionist", component: <ComplainReceptionist /> },
  { path: "/add-complain-receptionist", component: <AddComplainReceptionist /> },
  { path: "/purpose-receptionist", component: <PurposeReceptionist /> },
  { path: "/add-purpose-receptionist", component: <AddPurposeReceptionist /> },
  { path: "/student-details-receptionist", component: <StudentDetailsReceptionist /> },
  { path: "/class-time-table-receptionist", component: <ClassTimeTableReceptionist /> },
  { path: "/assign-class-teacher-receptionist", component: <AssignClassTeacherReceptionist /> },
  { path: "/subject-group-receptionist", component: <SubjectGroupReceptionist /> },
  { path: "/subjects-receptionist", component: <SubjectsReceptionist/> },
  { path: "/class-receptionist", component: <ClassReceptionist/> },
  { path: "/sections-receptionist", component: <SectionsReceptionist/> },
  { path: "/staff-directory-receptionist", component: <StaffDirectoryReceptionist/> },
  { path: "/notice-board-receptionist", component: <NoticeBoardReceptionist/> },
  { path: "/send-notice-board-receptionist", component: <SendEmailBoardReceptionist/> },
  { path: "/send-email-receptionist", component: <SendEmailReceptionist/> },
  { path: "/send-sms-receptionist", component: <SendSmsReceptionist/> },
  { path: "/send-sms-log-receptionist", component: <EmailSmsLogReceptionist/> },
]

const authRoutes = [
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPwd /> },
  { path: "/register", component: <Register /> },

  { path: "/pages-404", component: <Pages404 /> },
  { path: "/pages-500", component: <Pages500 /> },

  // Authentication Inner
  { path: "/pages-login", component: <Login1 /> },
  
  
  
  









  { path: "/pages-register", component: <Register1 /> },
  { path: "/page-recoverpw", component: <Recoverpw /> },
  { path: "/auth-lock-screen", component: <LockScreen /> },
]

export { userRoutes, authRoutes,teacherRoutes,adminRoutes,librarianRoutes,studentRoutes,receptionistRoutes}