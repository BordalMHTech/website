import React, { useState } from "react";
import { Form, Button, InputGroup, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import _ from "lodash";
import municipalities from "data/municipalities";
import vehicles from "data/vehicles";
import Feedback from "components/Feedback";
import Visualization from "components/Visualization";
import api from "functions/api.js";
import calculator from "data/calculator.js";
import formula from "data/formula.js";
import Policies from "components/Policies";

const vehiclesType = [
  "personbiler",
  "varebiler",
  "letteLastebiler",
  "tyngreLastebiler",
];

export default (props) => {
  const { register, handleSubmit, errors } = useForm();

  const [advanced, setAdvanced] = useState(false);
  const [vehicle, setVehicle] = useState(vehiclesType[0]);
  const [policies, setPolicies] = useState({});

  const [data, setData] = useState();

  const onSubmit = (values) => {
    // kalkulering om det er avhuking
    if (!advanced) {
      setData(
        calculator(vehicle === "alle" ? vehiclesType : [vehicle], policies)
      );
      console.log(
        calculator(vehicle === "alle" ? vehiclesType : [vehicle], policies)
      );
    } else {
      setData(api(values));
    }
  };

  return (
    <div {...props}>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col xs="12" sm="6">
            <Form.Group>
              <Form.Label>Kommune</Form.Label>
              <Form.Control
                as="select"
                custom
                ref={register({ required: true })}
                name="municipality"
                isInvalid={errors["municipality"]}
              >
                {municipalities.map((municipality, index) => (
                  <option
                    key={`municipality-${municipality}-${index}`}
                    value={municipality}
                  >
                    {municipality}
                  </option>
                ))}
              </Form.Control>
              <Feedback>
                {errors["municipality"] && `Én kommune må velges`}
              </Feedback>
            </Form.Group>
          </Col>{" "}
          <Col xs="12" sm="6">
            <Form.Group>
              <Form.Label>Kjøretøy</Form.Label>
              <Form.Control
                as="select"
                custom
                ref={register({ required: true })}
                name="vehicle"
                isInvalid={errors["vehicle"]}
                onChange={(e) => {
                  setPolicies({});
                  setVehicle(e.target.value);
                }}
              >
                {Object.keys(vehicles).map((vehicle, index) => (
                  <option key={`vehicle-${vehicle}-${index}`} value={vehicle}>
                    {vehicles[vehicle]}
                  </option>
                ))}
              </Form.Control>
              <Feedback>
                {errors["vehicle"] && `Én eller flere typer kjøretøy må velges`}
              </Feedback>
            </Form.Group>
          </Col>
        </Row>
        {vehicle === "alle" ? (
          vehiclesType.map((vehicleType, index) => {
            return (
              <Policies
                key={index}
                advanced={advanced}
                vehicle={vehicleType}
                register={register}
                setPolicies={setPolicies}
                policies={policies}
                errors={errors}
              />
            );
          })
        ) : (
          <Policies
            advanced={advanced}
            vehicle={vehicle}
            register={register}
            setPolicies={setPolicies}
            policies={policies}
            errors={errors}
          />
        )}
        {advanced && (
          <>
            <span>Alle</span>
            <hr className="mt-1 mb-4" />
            <Form.Group>
              <Form.Label>2025</Form.Label>
              <InputGroup>
                <Form.Control type="number" name={`m2025`} defaultValue={0} />
              </InputGroup>
            </Form.Group>
          </>
        )}

        <Row className="">
          <Col xs={12} sm={6}>
            <Button
              variant="light"
              className="border w-100"
              type="button"
              onClick={() => setAdvanced(!advanced)}
            >
              {advanced ? "Tiltak" : "Avansert"}{" "}
            </Button>
          </Col>
          <Col xs={12} sm={6} className="mt-1 mt-sm-0">
            <Button className="w-100" type="submit">
              Kalkuler
            </Button>
          </Col>
        </Row>

        {/* <Visualization data={data} className="mb-3" /> */}
      </Form>
    </div>
  );
};
