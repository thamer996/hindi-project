import React, { Component } from "react"

import C3Chart from "react-c3js"
import "c3/c3.css"

const DonutChart = prop => {
  console.log("eeeeeeeeeeeeeeesss", prop.ExamResult)
  const data = {
    columns: [
      [
        "Students Pass",
        prop.ExamResult
          ? prop.ExamResult?.filter(el => el?.result === "pass")?.length
          : 0,
      ],
      [
        "Students Fails",
        prop.ExamResult
          ? prop.ExamResult?.filter(el => el?.result === "fail")?.length
          : 0,
      ],
    ],
    type: "donut",
  }

  const donut = {
    title: "Focused",
    width: 30,
    label: { show: !1 },
  }

  const color = {
    pattern: ["#7a6fbe", "#28bbe3"],
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
