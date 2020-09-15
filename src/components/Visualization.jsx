import React from "react";
import Title from "components/Title";
import exampleData from "data/example.json";
import "styles/semiotic.css";

import { ResponsiveLine } from "@nivo/line";
// Gives depreciation warning, but fixes are hopefully on the way:
// https://github.com/plouc/nivo/issues/884

const getData = (input) => {
  console.log("getData -> input", input);

  let output = [];

  const vehicles = Object.keys(input);

  vehicles.forEach((vehicle, vehicleIndex) => {
    let data = [];
    input[vehicle].forEach((value, valueIndex) => {
      data.push({ x: exampleData["Year"][valueIndex], y: value });
    });
    output.push({
      id: vehicles[vehicleIndex],
      data,
    });
  });

  console.log(output);

  return output;
};

export default ({
  data = [
    { title: "Bilbestand", data: getData(exampleData["Bilbestand"]) },
    { title: "Nybilsalg", data: getData(exampleData["Nybilsalg"]) },
    { title: "CO2", data: getData(exampleData["CO2"]) },
  ],
  ...props
}) => {
  return (
    <div {...props}>
      <Title>Utregninger</Title>
      {data &&
        data.map((d, index) => {
          return (
            <div style={{ width: "100%", height: 400 }} key={`graph-${index}`}>
              <ResponsiveLine
                // data={example}
                data={d.data}
                margin={{ top: 50, right: 110, bottom: 50, left: 70 }}
                xScale={{ type: "point" }}
                yScale={{
                  type: "linear",
                  min: "auto",
                  max: "auto",
                  // stacked: true,
                  reverse: false,
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  orient: "bottom",
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "År",
                  legendOffset: 40,
                  legendPosition: "middle",
                }}
                axisLeft={{
                  orient: "left",
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: d.title,
                  legendOffset: -60,
                  legendPosition: "middle",
                }}
                colors={{ scheme: "nivo" }}
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
