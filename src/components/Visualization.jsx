import React, { useState } from "react";
import Title from "components/Title";
import exampleData from "data/example.json";
import "styles/semiotic.css";
import { Button, ButtonGroup, Col, Row, Table } from "react-bootstrap";
import _, { forEach } from "lodash";

import { ResponsiveLine } from "@nivo/line";
// Gives depreciation warning, but fixes are hopefully on the way:
// https://github.com/plouc/nivo/issues/884

const stdLegend = {
  El: "#23CE6B",
  Bensin: "#566363",
  Diesel: "#F06449",
  Hydrogen: "#5C80BC",
  Gass: "#6CC7F6",
};

const getStdData = (input, vehicle, dataKey) => {
  const vehicleKeys = {
    personbiler: "Personbiler",
    varebiler: "Tyngre lastebiler",
    letteLastebiler: "Varebiler",
    tyngreLastebiler: "Lettere lastebiler",
  };

  if (Object.keys(vehicleKeys).includes(vehicle)) {
    let output = [];
    const key = vehicleKeys[vehicle];
    const category = input[key][dataKey];
    const categoryKeys = Object.keys(category);
    const years = input[key]["Year"];

    categoryKeys.forEach((categoryKey, categoryIndex) => {
      let data = [];
      category[categoryKey].forEach((yearCount, yearCountIndex) => {
        data.push({ x: Number(years[yearCountIndex]), y: Number(yearCount) });
      });
      output.push({
        id: categoryKey,
        color: stdLegend[categoryKey],
        data,
      });
    });

    return output;
  } else if (vehicle === "alle") {
    let sumValues = {};
    Object.keys(vehicleKeys).forEach((vehicleKey) => {
      const key = vehicleKeys[vehicleKey];
      const category = input[key][dataKey];
      const categoryKeys = Object.keys(category);
      const years = input[key]["Year"];

      categoryKeys.forEach((categoryKey) => {
        category[categoryKey].forEach((yearValue, yearValueIndex) => {
          if (!sumValues[categoryKey]) {
            sumValues[categoryKey] = {};
          }

          if (sumValues[categoryKey][years[yearValueIndex]]) {
            sumValues[categoryKey][years[yearValueIndex]] += yearValue;
          } else {
            sumValues[categoryKey][years[yearValueIndex]] = yearValue;
          }
        });
      });
    });

    let output = [];

    Object.keys(sumValues).forEach((categoryKey, categoryIndex) => {
      let data = [];
      Object.keys(sumValues[categoryKey]).forEach((year, yearIndex) => {
        data.push({ x: Number(year), y: Number(sumValues[categoryKey][year]) });
      });
      output.push({
        id: Object.keys(sumValues)[categoryIndex],
        color: stdLegend[categoryKey],
        data,
      });
    });

    return output;
  }
  return [];
};

const co2Legend = {
  Bensin: "#23CE6B",
  "Personbiler (Diesel)": "#566363",
  "Varebiler (Diesel)": "#F06449",
  "Lette lastebiler (Diesel)": "#5C80BC",
  "Tunge lastebiler (Diesel)": "#6CC7F6",
};

const getCo2 = (input, vehicle) => {
  const parentKeys = ["CO2fromFuelSold", "CO2fromOwnedVeichles"];
  const vehicleKeys = {
    personbiler: ["CO2DieselPersonbiler"],
    varebiler: ["CO2DieselVarebiler"],
    letteLastebiler: ["CO2DieselLettereLastebiler"],
    tyngreLastebiler: ["CO2DieselTyngreLastebiler"],
    alle: [
      "CO2Bensin",
      "CO2DieselPersonbiler",
      "CO2DieselVarebiler",
      "CO2DieselLettereLastebiler",
      "CO2DieselTyngreLastebiler",
    ],
  };

  const vehicleNames = {
    CO2Bensin: "Bensin",
    CO2DieselPersonbiler: "Personbiler (Diesel)",
    CO2DieselVarebiler: "Varebiler (Diesel)",
    CO2DieselLettereLastebiler: "Lette lastebiler (Diesel)",
    CO2DieselTyngreLastebiler: "Tunge lastebiler (Diesel)",
  };

  let sumValues = {};

  if (Object.keys(vehicleKeys).includes(vehicle)) {
    parentKeys.forEach((parentKey) => {
      const categoryKeys = vehicleKeys[vehicle];
      const years = input["Personbiler"]["Year"];
      // Years shouldn't be dependent on other data, but will do for now

      categoryKeys.forEach((categoryKey, categoryIndex) => {
        const values = input[parentKey][categoryKey];

        values.forEach((yearValue, yearValueIndex) => {
          if (!sumValues[categoryKey]) {
            sumValues[categoryKey] = {};
          }

          if (sumValues[categoryKey][years[yearValueIndex]]) {
            sumValues[categoryKey][years[yearValueIndex]] += yearValue;
          } else {
            sumValues[categoryKey][years[yearValueIndex]] = yearValue;
          }
        });
      });
    });

    let output = [];

    Object.keys(sumValues).forEach((categoryKey, categoryIndex) => {
      let data = [];
      Object.keys(sumValues[categoryKey]).forEach((year, yearIndex) => {
        data.push({ x: Number(year), y: Number(sumValues[categoryKey][year]) });
      });
      output.push({
        id: Object.keys(sumValues)[categoryIndex],
        color: co2Legend[vehicleNames[categoryKey]],
        data,
      });
    });

    return output;
  }

  return [];
};

export default ({ data, vehicle, ...props }) => {
  if (!data) {
    return null;
  }

  data = data && [
    {
      title: "Bilbestand",
      unit: "biler",
      data: getStdData(data, vehicle, "Bilbestand"),
      legend: stdLegend,
    },
    {
      title: "Nybilsalg",
      unit: "biler",
      data: getStdData(data, vehicle, "Nybilsalg"),
      legend: stdLegend,
    },
    {
      title: "CO₂",
      unit: "tonn",
      data: getCo2(data, vehicle),
      legend: co2Legend,
    },
  ];

  const FinalTable = ({ ...props }) => {
    // let vehicles = [];

    // data.forEach((d) => {
    //   d.data.forEach((vehicle) => {
    //     if (!vehicles.includes(vehicle.id)) {
    //       vehicles.push(vehicle.id);
    //     }
    //   });
    // });

    const vehicles = [
      "Personbiler",
      "Tunge lastebiler",
      "Varebiler",
      "Lette lastebiler",
    ];

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
              const value =
                d[dIndex]["data"][d[dIndex]["data"].length - 1]["y"];
              return value;
            };
            return (
              <tr key={`table-value-${vehicle}-${index}`}>
                <td>{vehicle}</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                {/* <td>{getValue(0)}</td> */}
                {/* <td>{getValue(1)}</td> */}
                {/* <td>{getValue(2)}</td> */}
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  };

  const Graphs = () => {
    const Legend = (legend) => {
      // const vehicles =
      //   input.data.data && input.data.data.map((vehicle) => vehicle.id);

      legend = legend.data;

      return (
        <div
          className="d-flex flex-wrap justify-content-center"
          style={{ position: "relative", bottom: 20 }}
        >
          {Object.keys(legend).map((name, index) => {
            return (
              <div
                key={`legend-${name}-${index}`}
                className={`d-flex align-items-center mx-2`}
              >
                <div
                  style={{
                    backgroundColor: legend[name],
                    width: 9,
                    height: 9,
                    borderRadius: "100%",
                    position: "relative",
                    top: 1,
                  }}
                ></div>
                <small className="ml-1">{name}</small>
              </div>
            );
          })}
        </div>
      );
    };

    const Graph = ({ d, index }) => {
      // Percentage calculations
      // _____________________________________________________
      const [percent, setPercent] = useState(false);
      let dPercent = {};
      let years = [];
      // let vehicles = [];

      d.data.forEach((vehicle) => {
        // vehicles.push(vehicle.id);
        vehicle.data.forEach((pair) => {
          years.push(pair.x);
        });
      });

      if (percent) {
        // Find totals
        let totals = {};
        years.forEach((year) => {
          let total = 0;

          d.data.forEach((vehicle) => {
            total +=
              vehicle.data[vehicle.data.findIndex((pair) => pair.x === year)].y;
          });
          totals[year] = total;
        });

        // Fill dPercent with y-values as percentages
        dPercent = _.cloneDeep(d);
        d.data.forEach((vehicle, vehicleIndex) => {
          vehicle.data.forEach((pair, pairIndex) => {
            // console.log(pair.y / totals[pair.x]);
            dPercent.data[vehicleIndex].data[pairIndex].y =
              pair.y / totals[pair.x];
          });
        });
      }
      // _____________________________________________________

      return (
        <Col xs="12" lg="6">
          <div
            className="pb-5"
            style={{ width: "100%", height: 350, maxHeight: "50vh" }}
          >
            {/* <pre>{JSON.stringify(dPercent, 0, 2)}</pre> */}
            <div
              className="d-flex w-100 justify-content-between"
              style={{ position: "relative", top: 10 }}
            >
              <div
                className="d-flex align-items-center w-100"
                style={{ position: "relative", left: 38 }}
              >
                <h6 className="text-center my-0 py-0">{d.title}</h6>
                {/* Big screen */}
                <span
                  className="d-none d-sm-inline"
                  style={{ position: "relative", top: 1 }}
                >
                  <span className="ml-1 text-muted"> per år</span>
                  <span className="ml-1 text-muted">
                    [{percent ? "%" : d["unit"]}]
                  </span>
                </span>
                {/* Small screen */}
                <span
                  className="d-inline d-sm-none"
                  style={{ position: "relative", top: 1 }}
                >
                  <span className="text-muted">/år</span>
                </span>
              </div>
              <ButtonGroup
                className="ml-3"
                size="sm"
                aria-label="Percent/total toggle"
                style={{ zIndex: 1 }}
              >
                <Button
                  variant="light"
                  className="border"
                  onClick={() => setPercent(true)}
                  disabled={percent}
                >
                  <span className="d-none d-sm-inline">Prosent</span>
                  <span className="d-inline d-sm-none">%</span>
                </Button>
                <Button
                  variant="light"
                  className="border"
                  onClick={() => setPercent(false)}
                  disabled={!percent}
                >
                  <span className="d-none d-sm-inline">Antall</span>
                  <span className="d-inline d-sm-none">#</span>
                </Button>
              </ButtonGroup>
            </div>
            <ResponsiveLine
              motionStiffness={110}
              motionDamping={17}
              data={percent ? dPercent.data : d.data}
              margin={{ top: 20, right: 5, bottom: 60, left: 50 }}
              xScale={{ type: "point" }}
              yScale={{
                type: "linear",
                min: "auto",
                max: "auto",
                reverse: false,
              }}
              yFormat={
                percent ? (y) => `${Math.floor(y * 100 + 0.5)}%` : (y) => y
              }
              axisTop={null}
              axisRight={null}
              axisBottom={{
                orient: "bottom",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: -45,
              }}
              axisLeft={{
                format: percent
                  ? (y) => `${Math.floor(y * 100 + 0.5)}%`
                  : (y) => y,
                orient: "left",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: -45,
                legendOffset: -45,
                legendPosition: "middle",
              }}
              colors={(e) => e["color"]}
              enablePoints={false}
              // enableArea={true}
              // areaOpacity={0.05}
              curve="monotoneX"
              useMesh={true}
            />
            <Legend data={d.legend} />
          </div>
        </Col>
      );
    };

    return (
      data &&
      data.map((d, index) => (
        <Graph key={`graph-${index}`} d={d} index={index} />
      ))
    );
  };

  return (
    <div {...props}>
      <Title>Resultat</Title>
      <Row className="align-items-center">
        <Col xs="12" lg="6">
          {/* Big screen table */}
          <FinalTable
            className="d-none d-sm-table w-100"
            style={{ fontSize: 14 }}
          />
          {/* Small screen table */}
          <FinalTable
            className="d-table d-sm-none w-100"
            style={{ fontSize: 9.5 }}
          />
        </Col>
        <Graphs />
      </Row>
    </div>
  );
};
