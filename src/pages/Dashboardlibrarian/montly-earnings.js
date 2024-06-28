import React from "react"
import { Card, CardBody, Row, CardTitle } from "reactstrap"
import DonutChart from "../AllCharts/DonutChart"

const MonthlyEarnings = props => {
  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <CardTitle className="h4 mb-4">Student Analyse</CardTitle>

          <div dir="ltr">
            <DonutChart ExamResult={props.ExamResult} />
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default MonthlyEarnings
