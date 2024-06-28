import React, { useEffect, useState } from "react"

import { connect } from "react-redux"
import {
  Row,
  Col,
  Card,
  CardBody,
  Table,
  Input,
  Button,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  CardTitle,
} from "reactstrap"
import _, { isEmpty } from "lodash"
import { setBreadcrumbItems } from "../../store/actions"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useFormik } from "formik"
import * as Yup from "yup"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)
const Fees = () => {
  const [hostelRoom, sethostelRoom] = useState([])
  async function getHostelRoom() {
    const { data, error } = await supabase.from("HostelRoom").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    if (data) {
      let grouped_data = _.groupBy(data, "Hostel")
      let dataconverted = []
      Object.keys(grouped_data)?.map(e => {
        dataconverted.push({
          Hostel: e,
          list: grouped_data[e],
        })
      })

      sethostelRoom(dataconverted ?? [])
    }
  }

  console.log("hostelRoom", hostelRoom)

  const [searchTerm, setSearchTerm] = useState("")
  const filteredData = hostelRoom.filter(item =>
    Object.values(item).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  )
  console.log("filteredData", filteredData)
  useEffect(() => {
    getHostelRoom()
  }, [])
  return (
    <React.Fragment>
      <div className="container mt-5">
        <Row>
          <Card>
            <CardBody>
              <CardTitle className="h4">Hostel List</CardTitle>
              <div className="d-flex mb-2">
                <label className="col-form-label">Search hostel</label>
                <div className="col-md-2 ms-2">
                  <Input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <Row>
                <Col lg={12}>
                  <div className="table-responsive">
                    <Table hover responsive striped>
                      <thead>
                        <tr>
                          <th>Hostel</th>
                          <th>Room Type</th>
                          <th>Room Number / Name</th>
                          <th>No Of Bed</th>
                          <th>Cost Per Bed</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredData.map((item, index) => (
                          <tr key={index}>
                            <td>{item.Hostel}</td>
                            <td>
                              <ul className="mt-4">
                                {item?.list.map((el, index) => (
                                  <li className="mb-2" key={index}>{el.RoomType}</li>
                                ))}
                              </ul>
                            </td>
                            <td>
                              <ul className="mt-4">
                                {item?.list.map((el, index) => (
                                  <li className="mb-2" key={index}>{el.RoomName}</li>
                                ))}
                              </ul>
                            </td>
                            <td>
                              <ul className="mt-4">
                                {item?.list.map((e, index) => (
                                  <li className="mb-2" key={index}>{e.NumberOfBed}</li>
                                ))}
                              </ul>
                            </td>
                            <td>
                              <ul className="mt-4">
                                {item?.list.map((e, index) => (
                                  <li className="mb-2" key={index}>{e.CoastPerBed}</li>
                                ))}
                              </ul>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Row>
      </div>
    </React.Fragment>
  );
}
export default connect(null, { setBreadcrumbItems })(Fees)
