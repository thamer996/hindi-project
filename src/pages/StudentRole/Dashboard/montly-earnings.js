import React from "react"
import { Card, CardBody, Row,  CardTitle } from "reactstrap"
import DonutChart from '../../AllCharts/DonutChart';

const MonthlyEarnings = props => {
    return (
        <React.Fragment>
            <Card>
                <CardBody>
                    <CardTitle className="h4 mb-4">Students Analyse</CardTitle>

                    <Row className="text-center mt-4">
                        <div className="col-6">
                            <h5 className="font-size-20">890</h5>
                            <p className="text-muted">Students </p>
                        </div>
                        <div className="col-6">
                            <h5 className="font-size-20">50</h5>
                            <p className="text-muted">Teachers</p>
                        </div>
                    </Row>
                    <div dir="ltr">
                        <DonutChart />
                    </div>

                </CardBody>
            </Card>
        </React.Fragment>
    )

}

export default MonthlyEarnings
