import React, { Component } from "react"
import { Card, CardBody, Button } from "reactstrap"
import { Link } from "react-router-dom"

//Import Images
import user1 from "../../assets/images/users/user-1.jpg"
import user2 from "../../assets/images/users/user-2.jpg"
import user3 from "../../assets/images/users/user-3.jpg"
import user4 from "../../assets/images/users/user-4.jpg"
import user5 from "../../assets/images/users/user-5.jpg"
import user6 from "../../assets/images/users/user-6.jpg"
import _ from "lodash"

const Inbox = props => {
  console.log("Student", props?.Student)
  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <h4 className="card-title mb-3">Worst behavior Students</h4>
          <div className="inbox-wid">
            {_.sortBy(props?.Student, "pickupPoint")
              .slice(0, 10)
              ?.map((std, key) => (
                <Link key={key} to="#" className="text-dark">
                  <div className="inbox-item">
                    <h6 className="inbox-item-author mb-1 font-size-16">
                      {std.firstName} {std.lastName}
                    </h6>
                    <p className="inbox-item-text text-muted mb-0">
                      Total Point : {std.pickupPoint}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default Inbox
