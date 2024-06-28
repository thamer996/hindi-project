import React, { Component } from "react"
import { Table, Card, Badge, Button } from "reactstrap"

//Import Images
import user1 from "../../assets/images/users/user-1.jpg"
import user2 from "../../assets/images/users/user-2.jpg"
import user3 from "../../assets/images/users/user-3.jpg"
import user4 from "../../assets/images/users/user-4.jpg"
import user5 from "../../assets/images/users/user-5.jpg"
import user6 from "../../assets/images/users/user-6.jpg"
import _, { isEmpty } from "lodash"

const LatestOrders = props => {
  let grouped_data = _.groupBy(props.StudentAttendance, "name")

  let dataconverted = []

  Object.keys(grouped_data)?.map(el => {
    dataconverted.push({
      name: isEmpty(el) ? "NONE" : el,
      nbabs: grouped_data[el]?.filter(elm => elm?.attendance === "Absent")
        ?.length,
    })
  })

  console.log("grouped_data", props.StudentAttendance)

  return (
    <React.Fragment>
      <Card>
        <div className="card-body">
          <h4 className="card-title mb-4">Most Absent Students</h4>

          <div
            className="table-responsive"
            style={{ maxHeight: "400px", overflowY: "auto" }}
          >
            <Table className="align-middle table-centered table-vertical table-nowrap mb-1">
              <tbody>
                {props.StudentAttendance &&
                  _.sortBy(dataconverted, "nbabs")
                    .reverse()
                    .slice(0, 10)
                    .map((order, key) => (
                      <tr key={key}>
                        <td>{order.name}</td>
                        <td>
                          <Badge color="danger">{order.nbabs} Absents</Badge>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </Table>
          </div>
        </div>
      </Card>
    </React.Fragment>
  )
}

export default LatestOrders
