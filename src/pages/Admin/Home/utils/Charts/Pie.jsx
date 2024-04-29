// import React from "react";
import { Chart } from "react-google-charts";
const data = [
  ["Task", "Hours per Day"],
  ["Aula X", 11],
  ["Aula Y", 2],
  ["Aula Z", 2],
  ["Aula A", 2],
  ["Aula B", 7],
];

const options = {
  title: "Estadisticas de reservas",
  is3D: true,
};
const Pie = () => {
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  );
};

export default Pie;
