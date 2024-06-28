import React, { Component } from "react"
import { Table, Card, CardBody, Button } from "reactstrap"

const LatestTransactions = props => {
  let transactions = props.Staff

  console.log("transactions", transactions)

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <h4 className="card-title mb-4">Best Teachers</h4>

          <div className="table-wrapper">
            <Table className="align-middle table-centered table-vertical table-nowrap">
              <tbody>
                {props.Staff &&
                  props.Staff.slice(0, 5).map((transaction, key) => (
                    <tr key={key}>
                      <td>
                        {transaction.firstName} {transaction.lastName}
                      </td>
                      <td>
                        <i
                          className={
                            "mdi mdi-checkbox-blank-circle  text-success"
                          }
                        ></i>{" "}
                        {transaction.department}
                      </td>
                      {/* <td>
                        <Button
                          color="secondary"
                          size="sm"
                          className="waves-effect waves-light"
                        >
                          View
                        </Button>
                      </td> */}
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default LatestTransactions
