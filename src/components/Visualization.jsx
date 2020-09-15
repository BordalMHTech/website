import React from "react";
import Title from "components/Title";
import exampleData from "data/example.json";
import "styles/semiotic.css";

import { ResponsiveLine } from "@nivo/line";
// Gives depreciation warning, but fixes are hopefully on the way:
// https://github.com/plouc/nivo/issues/884

const getData = (input) => {
  const colors = {
    El: "#23CE6B",
    Fossil: "#566363",
    Hybrid: "#F06449",
    Hydrogen: "#5C80BC",
  };

  let output = [];

  const vehicles = Object.keys(input);

  vehicles.forEach((vehicle, vehicleIndex) => {
    let data = [];
    input[vehicle].forEach((value, valueIndex) => {
      data.push({ x: exampleData["Year"][valueIndex], y: value });
    });
    output.push({
      id: vehicles[vehicleIndex],
      color: colors[vehicle],
      data,
    });
  });

  console.log(output);

  return output;
};

export default ({ data, ...props }) => {
  data = data && [
    {
      title: "Bilbestand",
      unit: "[biler]",
      data: getData(data["Bilbestand"]),
    },
    {
      title: "Nybilsalg",
      unit: "[biler]",
      data: getData(data["Nybilsalg"]),
    },
    { title: "CO2", unit: "[tonn]", data: getData(data["CO2"]) },
  ];

  console.log(data);

  return (
    <div {...props}>
      <Title>Utregninger</Title>
      {data &&
        data.map((d, index) => {
          return (
            <div
              className="mt-3"
              style={{ width: "100%", height: 400 }}
              key={`graph-${index}`}
            >
              <div style={{ height: 0 }}>
                <h5
                  // className="text-center"
                  style={{ position: "relative", top: 10, left: 70 }}
                >
                  {d.title}
                </h5>
              </div>
              <ResponsiveLine
                data={d.data}
                margin={{ top: 50, right: 110, bottom: 60, left: 70 }}
                xScale={{ type: "point" }}
                yScale={{
                  type: "linear",
                  min: "auto",
                  max: "auto",
                  reverse: false,
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  orient: "bottom",
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 45,
                  legend: "År",
                  legendOffset: 50,
                  legendPosition: "middle",
                }}
                axisLeft={{
                  orient: "left",
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 45,
                  legend: `${d.title}${d.unit && ` ${d.unit}`}`,
                  legendOffset: -60,
                  legendPosition: "middle",
                }}
                colors={(e) => e["color"]}
                pointSize={10}
                pointColor={{ theme: "background" }}
                pointBorderWidth={2}
                pointBorderColor={{ from: "serieColor" }}
                pointLabel="y"
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                  {
                    anchor: "bottom-right",
                    direction: "column",
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: "left-to-right",
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: "circle",
                    symbolBorderColor: "rgba(0, 0, 0, .5)",
                    effects: [
                      {
                        on: "hover",
                        style: {
                          itemBackground: "rgba(0, 0, 0, .03)",
                          itemOpacity: 1,
                        },
                      },
                    ],
                  },
                ]}
              />
            </div>
          );
        })}
    </div>
  );
};
