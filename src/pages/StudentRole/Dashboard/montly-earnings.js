import React from "react"
import { Card, CardBody, Row, CardTitle } from "reactstrap"
import DonutChart from "../../AllCharts/DonutChart2"

const MonthlyEarnings = props => {
  return (
    <React.Fragment>
      <div dir="ltr">
        <DonutChart attendance={props.attendance} />
      </div>
    </React.Fragment>
  )
}

export default MonthlyEarnings
