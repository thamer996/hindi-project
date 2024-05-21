import React, { useEffect } from 'react';
import { Row } from "reactstrap";

import { connect } from "react-redux";

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions";

//Import Components
import CardUser from "./card-user";

//Import Images
import user2 from "../../assets/images/users/user-2.jpg";
import user3 from "../../assets/images/users/user-3.jpg";
import user4 from "../../assets/images/users/user-4.jpg";
import user5 from "../../assets/images/users/user-5.jpg";
import user6 from "../../assets/images/users/user-6.jpg";
import user7 from "../../assets/images/users/user-7.jpg";

const Class = (props) => {
    document.title = "Directory | Lexa - Responsive Bootstrap 5 Admin Dashboard";

    const breadcrumbItems = [
        { title: "Lexa", link: "#" },
        { title: "Pages", link: "#" },
        { title: "Directory", link: "#" },
    ]

    useEffect(() => {
        props.setBreadcrumbItems('Directory', breadcrumbItems)
    })

    const users = [
        {
            id: 1, designation: "30 Students", name: "Grade 1 A ", desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium",
           
        },
        {
            id: 2, designation: "35 Students", name: "Grade 1 B ", desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium",
           
        },
        {
            id: 3, designation: "32 Students", name: "Grade 1 C", desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium",
           
        },
        {
            id: 4,  designation: "36 Students", name: "Grade 2 A", desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium",
           
        },
        {
            id: 5, designation: "37 Students", name: "Grade 2 B ", desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium",
            
        },
        {
            id: 6,designation: "23", name: "Grade 2 C", desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium",
          
        }
    ]

    return (
        <React.Fragment>

            <Row>
                <CardUser users={users} />
            </Row>
        </React.Fragment>
    );
}

export default connect(null, { setBreadcrumbItems })(Class);