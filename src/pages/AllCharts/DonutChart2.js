import React, { Component } from "react"

import C3Chart from "react-c3js"
import "c3/c3.css"

const DonutChart = prop => {
  console.log(
    "eeeeeeeeeeeeeeesss",
    prop.attendance?.filter(el => el?.attendance === "Present")?.length,
  )

  const data = {
    columns: [
      [
        "Absent",
        prop.attendance
          ? prop.attendance?.filter(el => el?.attendance === "Absent")?.length
          : 0,
      ],
      [
        "Present",
        prop.attendance
          ? prop.attendance?.filter(el => el?.attendance === "Present")?.length
          : 0,
      ],
      [
        "Late",
        prop.attendance
          ? prop.attendance?.filter(el => el?.attendance === "Late")?.length
          : 0,
      ],
    ],
    type: "donut",
  }

  console.log("eeeeeeeeeeeeeee", data)

  const donut = {
    title: "Present",
    width: 30,
    label: { show: !1 },
  }

  const color = {
    pattern: ["#7a6fbe", "#28bbe3", "#28gbe3"],
  }

  const size = {
    height: 300,
  }

  return (
    <React.Fragment>
      <C3Chart data={data} donut={donut} color={color} size={size} dir="ltr" />
    </React.Fragment>
  )
}

export default DonutChart
