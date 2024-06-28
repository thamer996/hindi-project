import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle } from "reactstrap"
import { Map, Marker, InfoWindow } from "google-maps-react"
import GoogleMapReact from "google-map-react"
import { setBreadcrumbItems } from "../../store/actions"
import './Marker.css';
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useFormik } from "formik"
import * as Yup from "yup"
import { createClient } from "@supabase/supabase-js"
const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)
const Fees = ({ google, selectedPlace }) => {
  const defaultProps = {
    center: { lat: 25.3154769684244, lng: 25.3154769684244 }, 
    zoom: 0,
  }
  const MarkerWithLabel = ({ lat, lng, text }) => (
    <div
      style={{
        position: 'relative',
        display: 'inline-block',
      }}
    >
      <img
        src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-256.png" // Replace with your marker icon if desired
        alt="Marker"
        style={{
          height: 20, 
          width: 20,
        }}
      />
      <span
        style={{
          position: 'absolute',
          top: -25, 
          left: '50%',
          transform: 'translateX(-50%)', 
          backgroundColor: 'white',
          padding: '2px 5px',
          borderRadius: 3,
          fontSize: 12,
          fontWeight: 'bold',
        }}
      >
        {text}
      </span>
    </div>
  );
  const [section, setSection] = useState([])
  async function getCountries() {
    const { data, error } = await supabase.from("PickupPoint").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    setSection(data ?? [])
  }
  console.log('section', section)


  useEffect(()=>{
    getCountries()
  },[])
  return (
    <React.Fragment>
      <div className="container mt-5">
        <Row>
      
         
            <Col md={10}>
            <Card >
              <CardBody>
                <CardTitle>Transports</CardTitle>
                <CardSubtitle className="mb-3">
                  Transport routes
                </CardSubtitle>
              <div className="mb-3" style={{ height: "90vh", width: "100%" }}>
                <GoogleMapReact
                  // bootstrapURLKeys={{ key: "" }}
                  defaultCenter={defaultProps.center}
                  defaultZoom={defaultProps.zoom}
                  // onClick={e => handelsetValues(e)}
                >
            
            {section.map((marker, index) => (
          <MarkerWithLabel
            key={index}
            lat={marker.latitude}
            lng={marker.longitude}
            text={marker.name}
          />
        ))}

                </GoogleMapReact>
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
