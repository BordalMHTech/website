import React from "react";
import Title from "components/Title";
import exampleData from "data/example.json";
import "styles/semiotic.css";
import { Table } from "react-bootstrap";
// import _ from "lodash";

import { ResponsiveLine } from "@nivo/line";
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
  // const ogData = _.cloneDeep(data);
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

  const FinalTable = ({ ...props }) => {
    let vehicles = [];

    data.forEach((d) => {
      d.data.forEach((vehicle) => {
        if (!vehicles.includes(vehicle.id)) {
          vehicles.push(vehicle.id);
        }
      });
    });

    return (
      <Table striped bordered hover size="sm" {...props}>
        <thead>
          <tr>
            <th>Kjøretøy</th>
            {data.map((d, index) => (
              <th key={`table-header-${d.title}-${index}`}>
                {`${d.title}`}
                <span
                  className="text-muted"
                  style={{ fontWeight: "normal" }}
                >{` i 2030${d["unit"] ? ` [${d["unit"]}]` : ``}`}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle, index) => {
            const getValue = (i) => {
              const d = data[i]["data"];
              const dIndex = d.findIndex((e) => e.id === vehicle);
              const value = d[dIndex]["data"][0]["y"];
              return value;
            };
            return (
              <tr key={`table-value-${vehicle}-${index}`}>
                <td>{vehicle}</td>
                <td>{getValue(0)}</td>
                <td>{getValue(1)}</td>
                <td>{getValue(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  };

  const Graphs = () => {
    const Legend = (input) => {
      const vehicles =
        input.data.data && input.data.data.map((vehicle) => vehicle.id);

      return (
        <div
          className="d-flex flex-wrap justify-content-center"
          style={{ position: "relative", bottom: 20 }}
        >
          {vehicles.map((vehicle, index) => {
            return (
              <div
                key={`legend-${vehicle}-${index}`}
                className={`d-flex align-items-center mx-2`}
              >
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
      data &&
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
                <span className="ml-1 text-muted">[{d["unit"]}]</span>
              </div>
            </div>
            <ResponsiveLine
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
              }}
              axisLeft={{
                orient: "left",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: -45,
                legendOffset: -45,
                legendPosition: "middle",
              }}
              colors={(e) => e["color"]}
              enablePoints={false}
              enableArea={true}
              areaOpacity={0.05}
              curve="natural"
              useMesh={true}
            />
            <Legend data={d} />
          </div>
        );
      })
    );
  };

  return (
    <div {...props}>
      <Title>Resultat</Title>
      <FinalTable className="d-none d-sm-table w-100" style={{}} />
      <FinalTable
        className="d-table d-sm-none w-100"
        style={{ fontSize: 9.5 }}
      />
      <Graphs />
    </div>
  );
};
