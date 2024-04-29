// import React from "react";
import { Chart } from "react-google-charts";

const data = [
  ["Aulas", "Reservas", { role: "style" }],
  ["Aula X", 35, "#b87333"], // RGB value
  ["Aula Y", 18, "silver"], // English color name
  ["Aula Z", 30, "gold"],
  ["Aula A", 11.45, "color: red"], // CSS-style declaration
  
];

// Ordenar los países por User Count en orden descendente
data.sort((a, b) => b[1] - a[1]);

const options = {
  chart: {
    title: "Card",
  },
  bars: "horizontal",
  vAxis: {
    title: "A u l a s",
  },

  // Establecer barras horizontales
};

const Geo = () => {
  return (
    <Chart
      chartType="BarChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
};

export default Geo;
