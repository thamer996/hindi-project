import React, { Component } from 'react';
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

class RecentActivity extends Component {

    render() {
        return (
            <React.Fragment>
                <Card >
                    <CardBody >
                        <div>
                        <h4 className="card-title mb-4">Best Classes behavior</h4>
                        <ol className="activity-feed mb-0">
                            <li className="feed-item">
                                <div className="feed-item-list">
                                    <span className="date">Jun 25</span>
                                    <span className="activity-text">Grade 3”</span>
                                </div>
                            </li>
                            <li className="feed-item">
                                <div className="feed-item-list">
                                    <span className="date">Jun 24</span>
                                    <span className="activity-text">Grade 5</span>
                                </div>
                            </li>

                        </ol>

                        <div className="text-center">
                            <Link to="#" className="btn btn-sm btn-primary">Load More</Link>
                        </div>
                        </div>
                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }
}

export default RecentActivity;