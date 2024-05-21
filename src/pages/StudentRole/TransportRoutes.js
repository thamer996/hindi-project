import React from "react"
import { connect } from "react-redux"
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle } from "reactstrap"
import { Map, Marker, InfoWindow } from "google-maps-react"

import { setBreadcrumbItems } from "../../store/actions"


const Fees = ({ google, selectedPlace }) => {
  return (
    <React.Fragment>
      <div className="container mt-5">
        <Row>
          <Col lg={6}>
            <Card>
              <CardBody>
                <CardTitle>Markers</CardTitle>
                <CardSubtitle className="mb-3">
                  Example of google maps.
                </CardSubtitle>
                <div
                  id="gmaps-markers"
                  className="gmaps"
                  style={{ position: "relative" }}
                >
                  <Map
                    google={google}
                    style={{ width: "100%", height: "100%" }}
                    zoom={14}
                  >
                    <Marker
                      title={"The marker`s title will appear as a tooltip."}
                      name={"SOMA"}
                      position={{ lat: 37.778519, lng: -122.40564 }}
                    />
                    <Marker name={"Dolores park"} />
                    <InfoWindow>
                      <div>
                        <h1>{selectedPlace?.name}</h1>
                      </div>
                    </InfoWindow>
                  </Map>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  )
}

// mapStateToProps and mapDispatchToProps can be added here if needed

export default connect(null, { setBreadcrumbItems })(Fees)
