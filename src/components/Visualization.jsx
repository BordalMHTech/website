import React from "react";
import Title from "components/Title";
import ResponsiveXYFrame from "semiotic/lib/ResponsiveXYFrame";
import exampleData from "data/example.json";
import "styles/semiotic.css";

const data = [
  {
    vehicle: "El",
    coordinates: [
      {
        year: 2028,
        amount: Math.random() * 1000,
        sold: Math.random() * 1000,
        co2: Math.random() * 1000,
      },
      {
        year: 2029,
        amount: Math.random() * 1000,
        sold: Math.random() * 1000,
        co2: Math.random() * 1000,
      },
      {
        year: 2030,
        amount: Math.random() * 1000,
        sold: Math.random() * 1000,
        co2: Math.random() * 1000,
      },
    ],
  },
  {
    vehicle: "Hydrogen",
    coordinates: [
      {
        year: 2028,
        amount: Math.random() * 1000,
        sold: Math.random() * 1000,
        co2: Math.random() * 1000,
      },
      {
        year: 2029,
        amount: Math.random() * 1000,
        sold: Math.random() * 1000,
        co2: Math.random() * 1000,
      },
      {
        year: 2030,
        amount: Math.random() * 1000,
        sold: Math.random() * 1000,
        co2: Math.random() * 1000,
      },
    ],
  },
];

// const formatData = (input) => {
//   input.map((category, index) => {
//     category.map(())
//   })
// }

const theme = [
  "#ac58e5",
  "#E0488B",
  "#9fd0cb",
  "#e0d33a",
  "#7566ff",
  "#533f82",
  "#7a255d",
  "#365350",
  "#a19a11",
  "#3f4482",
];

const frameProps = {
  lines: data,
  size: [, 400],
  margin: { left: 100, bottom: 90, right: 100, top: 40 },
  xAccessor: "year",
  yAccessor: "amount",
  yExtent: [0],
  lineStyle: (d, i) => ({
    stroke: theme[i],
    strokeWidth: 3,
  }),
  title: <text textAnchor="middle">Title</text>,
  axes: [
    {
      orient: "left",
      label: "Y",
      tickFormat: function (e) {
        return e / 1e3 + "k";
      },
    },
    {
      orient: "bottom",
      label: { name: "Year", locationDistance: 55 },
      ticks: 3 - 1, // TODO: Length - 1
    },
  ],
};

export default ({ data = exampleData, ...props }) => {
  return (
    <div {...props}>
      <Title>Utregninger</Title>

      <ResponsiveXYFrame responsiveWidth={true} {...frameProps} />
    </div>
  );
};
