import React, { useEffect } from 'react';
import {
    Col,
    Row,
    Card,
    CardBody
} from "reactstrap";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions";

//Import Images
import img1 from "../../assets/images/small/img-1.jpg";
import img2 from "../../assets/images/small/img-2.jpg";

const Behavior = (props) => {
    document.title = "Timeline | Lexa - Responsive Bootstrap 5 Admin Dashboard";

    const breadcrumbItems = [
        { title: "Lexa", link: "#" },
        { title: "Pages", link: "#" },
        { title: "Timeline", link: "#" },
    ]

    useEffect(() => {
        props.setBreadcrumbItems('Behavior', breadcrumbItems)
    })

    return (
        <React.Fragment>
            <Row>
                <Col xs="12">
                    <Card>
                        <CardBody>
                            <section id="cd-timeline" className="cd-container" dir="ltr">
                                <div className="cd-timeline-block timeline-right">
                                    <div className="cd-timeline-img bg-success">
                                        <i className="mdi mdi-adjust"></i>
                                    </div>


                                    <div className="cd-timeline-content">
                                        <h3>70% Focused</h3>
                                        <p className="mb-0 text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, optio, dolorum provident rerum aut hic quasi placeat iure tempora laudantium ipsa ad debitis unde? Iste voluptatibus minus veritatis qui ut.</p>
                                        <span className="cd-date">May 28</span>
                                    </div>

                                </div>


                                <div className="cd-timeline-block timeline-left">
                                    <div className="cd-timeline-img bg-danger">
                                        <i className="mdi mdi-adjust"></i>
                                    </div>


                                    <div className="cd-timeline-content">
                                        <h3> 30 % Focused</h3>
                                        <p className="mb-4 text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, optio, dolorum provident rerum aut hic quasi placeat iure tempora laudantium</p>


                                        <span className="cd-date me-2">May 27 </span>
                                    </div>
                                </div>

                                <div className="cd-timeline-block timeline-right">
                                    <div className="cd-timeline-img bg-info">
                                        <i className="mdi mdi-adjust"></i>
                                    </div>


                                    <div className="cd-timeline-content">
                                        <h3> 70% Focused</h3>
                                        <p className="mb-0 text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi, obcaecati, quisquam id molestias eaque error assumenda delectus. Odit, itaque, deserunt corporis vero ipsum nisi eius odio natus ullam provident pariatur temporibus quia eos repellat ... <Link to="#" className="text-primary">Read more</Link></p>
                                        <span className="cd-date"> May 26</span>
                                    </div>
                                </div>

                                <div className="cd-timeline-block timeline-left">
                                    <div className="cd-timeline-img bg-pink">
                                        <i className="mdi mdi-adjust"></i>
                                    </div>

                                    <div className="cd-timeline-content">
                                        <h3> 60% Focused</h3>
                                        <p className="mb-4 text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, optio, dolorum provident rerum aut.</p>
                                        <div className="d-flex flex-wrap gap-3">
                                        
                                        </div>
                                        <span className="cd-date">May 25</span>
                                    </div>
                                </div>
                                <div className="cd-timeline-block timeline-right">
                                    <div className="cd-timeline-img bg-warning">
                                        <i className="mdi mdi-adjust"></i>
                                    </div>

                                    <div className="cd-timeline-content">
                                        <h3> 50% Focused</h3>
                                        <p className="mb-4 text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, optio, dolorum provident rerum.</p>
                                        
                                        <span className="cd-date me-2">May 24</span>
                                    </div>
                                </div>

                                <div className="cd-timeline-block">

                                    <div className="cd-timeline-img bg-primary d-xl-none">
                                        <i className="mdi mdi-adjust"></i>
                                    </div>

                                    
                                </div>

                            </section>


                        </CardBody>
                    </Card>
                </Col>

            </Row>

        </React.Fragment>
    );
}

export default connect(null, { setBreadcrumbItems })(Behavior);