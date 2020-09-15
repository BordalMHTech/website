import React from "react";
import Title from "components/Title";
import exampleData from "data/example.json";
import "styles/semiotic.css";

import { Line, ResponsiveLine } from "@nivo/line";
// Gives depreciation warning, but fixes are hopefully on the way:
// https://github.com/plouc/nivo/issues/884

const colors = {
  El: "#23CE6B",
  Fossil: "#566363",
  Hybrid: "#F06449",
  Hydrogen: "#5C80BC",
};

const getData = (input) => {
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

  return output;
};

export default ({ data, ...props }) => {
  data = data && [
    {
      title: "Bilbestand",
      unit: "biler",
      data: getData(data["Bilbestand"]),
    },
    {
      title: "Nybilsalg",
      unit: "biler",
      data: getData(data["Nybilsalg"]),
    },
    { title: "CO2", unit: "tonn", data: getData(data["CO2"]) },
  ];

  if (!data) {
    return null;
  }

  const Legend = (input) => {
    console.log(input.data.data);

    const vehicles =
      input.data.data && input.data.data.map((vehicle) => vehicle.id);

    return (
      <div
        className="d-flex flex-wrap justify-content-center"
        style={{ position: "relative", bottom: 20 }}
      >
        {vehicles.map((vehicle, index) => {
          return (
            <div className={`d-flex align-items-center mx-2`}>
              <div
                style={{
                  backgroundColor: colors[vehicle],
                  width: 9,
                  height: 9,
                  borderRadius: "100%",
                  position: "relative",
                  top: 1,
                }}
              ></div>
              <small className="ml-1">{vehicle}</small>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div {...props}>
      <Title>Resultat</Title>
      {data &&
        data.map((d, index) => {
          return (
            <div
              className="mt-3 pb-3"
              style={{ width: "100%", height: 400, maxHeight: "50vh" }}
              key={`graph-${index}`}
            >
              <div style={{ height: 0 }}>
                <div
                  className="d-flex align-items-center"
                  style={{ position: "relative", top: 20, left: 38 }}
                >
                  <h6 className="text-center my-0 py-0">{d.title}</h6>
                  <span className="ml-1 text-muted"> per år</span>
                  <span className="ml-1 text-muted">[{d.unit}]</span>
                </div>
              </div>
              <ResponsiveLine
                // animate={false} // Uncomment to remove componentWillReceiveProps-warning
                motionStiffness={110}
                motionDamping={17}
                data={d.data}
                margin={{ top: 50, right: 5, bottom: 60, left: 40 }}
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
                  tickRotation: -45,
                  // legend: "År",
                  // legendOffset: 50,
                  // legendPosition: "middle",
                }}
                axisLeft={{
                  orient: "left",
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: -45,
                  // legend: `${d.title}${d.unit && ` ${d.unit}`}`,
                  legendOffset: -45,
                  legendPosition: "middle",
                }}
                colors={(e) => e["color"]}
                enablePoints={false}
                enableArea={true}
                areaOpacity={0.05}
                curve="natural"
                // pointSize={1}
                // pointColor={{ theme: "background" }}
                // pointBorderWidth={2}
                // pointBorderColor={{ from: "serieColor" }}
                // pointLabel={d.unit}
                // pointLabelYOffset={-12}
                useMesh={true}
                // legends={
                //   index === 0
                //     ? [
                //         {
                //           anchor: "top",
                //           direction: "column",
                //           justify: false,
                //           translateX: 45,
                //           // translateY: -100,
                //           itemsSpacing: 0,
                //           itemDirection: "left-to-right",
                //           itemWidth: 80,
                //           itemHeight: 20,
                //           itemOpacity: 1,
                //           symbolSize: 12,
                //           symbolShape: "circle",
                //           symbolBorderColor: "rgba(0, 0, 0, .5)",
                //           // effects: [
                //           //   {
                //           //     on: "hover",
                //           //     style: {
                //           //       itemBackground: "rgba(0, 0, 0, .03)",
                //           //       itemOpacity: 1,
                //           //     },
                //           //   },
                //           // ],
                //         },
                //       ]
                //     : []
                // }
              />
              <Legend data={d} />
            </div>
          );
        })}
    </div>
  );
};
