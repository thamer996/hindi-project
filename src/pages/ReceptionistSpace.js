import React, { useEffect } from "react";
import NvbarTeacher from "../components/HorizontalLayoutTeacher/NvbarTeacher";
import HeaderTeacher from "../components/HorizontalLayoutTeacher/HeaderTeacher";
import { connect } from "react-redux";

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../store/actions";
import { useNavigate } from "react-router-dom";
import TeacherLayout from "../components/HorizontalLayoutTeacher/TeacherLayout";
const ReceptionistSpace=(props)=>{
    document.title = "Basic Tables | Lexa - Responsive Bootstrap 5 Admin Dashboard";


    const breadcrumbItems = [
        { title: "Smart school", link: "#" },
        { title: "Receptionist", link: "#" },
    ]
    const navigate = useNavigate();

    useEffect(() => {
        props.setBreadcrumbItems('Dashboard', breadcrumbItems)
    })
    const handleClick = () => {
        navigate('/add-role');
    };
    const handleClickProfile = () => {
        navigate('/student-profile');
    };
    const iconStyle = {
        cursor: 'pointer',
        display: 'inline-block',
        marginRight: '10px',
        fontSize: '24px',
        color: 'blue' // Change color as needed
    };

    const actionIconStyle = {
        ...iconStyle, // Inherit styles from iconStyle
        color: 'red' // Example: Change color for delete icon
    };
    const editIconStyle = {
        ...iconStyle,
        color: 'black' // Color for edit icon (black)
    };

    return(
        <div>

           
            
        </div>
        
        

    )
}
export default connect(null, { setBreadcrumbItems })(ReceptionistSpace);