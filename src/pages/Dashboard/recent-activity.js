/* eslint-disable array-callback-return */
import React, { Component } from "react"
import { Card, CardBody } from "reactstrap"
import { Link } from "react-router-dom"
import _, { isEmpty, sumBy } from "lodash"

const RecentActivity = props => {
  let grouped_data = _.groupBy(props.Student, "class")

  let dataconverted = []

  Object.keys(grouped_data)?.map(el => {
    dataconverted.push({
      name: isEmpty(el) ? "NONE" : el,
      pickupPoint: sumBy(grouped_data[el], function (o) {
        return Number(o?.pickupPoint)
      }),
    })
  })

  console.log("grouped_data", dataconverted)

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <h4 className="card-title mb-4">Best Classes behavior</h4>
          <ol className="activity-feed mb-0">
            {_.sortBy(dataconverted, "pickupPoint")?.reverse().map((el, i) => {
              return (
                <li className="feed-item" key={i}>
                  <div className="feed-item-list">
                    <span className="date">{el.pickupPoint} Points</span>
                    <span className="activity-text">{el.name}</span>
                  </div>
                </li>
              )
            })}
          </ol>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default RecentActivity
