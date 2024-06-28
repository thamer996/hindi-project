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
  console.log("Satff", props.Staff)
  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <h4 className="card-title mb-3">Top Staff Readers</h4>
          <div className="inbox-wid">
            {_.sortBy(props.Staff, "libraryBooksData")
              .reverse()
              .slice(0, 5)
              .map((message, key) => (
                <Link key={key} to="#" className="text-dark">
                  <div className="inbox-item">
                    <div className="inbox-item-img float-start me-3">
                      <img
                        src={`https://ypduxejepwdmssduohpi.supabase.co/storage/v1/object/public/uploads/${message?.photo}`}
                        className="avatar-sm rounded-circle"
                        alt="no img"
                      />
                    </div>
                    <h6 className="inbox-item-author mb-1 font-size-16">
                      {message.firstName} {message.lastName}
                    </h6>
                    <p className="inbox-item-text text-muted mb-0">
                      {message.role} ({message.libraryBooksData.length} books)
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
