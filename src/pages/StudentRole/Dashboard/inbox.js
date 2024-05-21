import React, { Component } from 'react';
import { Card, CardBody ,Button} from "reactstrap";
import { Link } from "react-router-dom";

//Import Images
import user1 from "../../../assets/images/users/user-1.jpg";
import user2 from "../../../assets/images/users/user-2.jpg";
import user3 from "../../../assets/images/users/user-3.jpg";
import user4 from "../../../assets/images/users/user-4.jpg";
import user5 from "../../../assets/images/users/user-5.jpg";
import user6 from "../../../assets/images/users/user-6.jpg";

class Inbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [
                { imgUrl: user1, title: "Misty", desc: "20% concetrated last week", time: "13:40 PM" },
                { imgUrl: user2, title: "Melissa", desc: "23% concetrated last week", time: "13:34 PM" },
                { imgUrl: user3, title: "Dwayne", desc: "25% concetrated last week", time: "13:17 PM" },
                { imgUrl: user4, title: "Martin", desc: "27% concetrated last week", time: "12:20 PM" },
                { imgUrl: user5, title: "Vincent", desc: "28% concetrated last week", time: "11:47 AM" },
                
            ],
        }
    }

    render() {
        return (
            <React.Fragment>
                <Card>
                    <CardBody>
                        <h4 className="card-title mb-3">Worst behavior Students</h4>
                        <div className="inbox-wid">
                            {
                                this.state.messages.map((message, key) =>
                                    <Link key={key} to="#" className="text-dark">
                                        <div className="inbox-item">
                                            <div className="inbox-item-img float-start me-3"><img src={message.imgUrl} className="avatar-sm rounded-circle" alt="" /></div>
                                            <h6 className="inbox-item-author mb-1 font-size-16">{message.title}</h6>
                                            <p className="inbox-item-text text-muted mb-0">{message.desc}</p>
                                        </div>
                                    </Link>
                                )
                            }
                        </div>
                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }
}

export default Inbox;