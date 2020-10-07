import React, { useState } from "react";
import { Form, Button, InputGroup, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import _ from "lodash";
import defaultPolicies from "data/policies";
import defaultPercentages from "data/percentages";
import municipalities from "data/municipalities";
import vehicles from "data/vehicles";
import Feedback from "components/Feedback";
import Visualization from "components/Visualization";
import calculate from "functions/api.js";
import calculator from "data/calculator.js"
import formula from "data/formula.js"

export default (props) => {
  const { register, handleSubmit, errors } = useForm();

  const [advanced, setAdvanced] = useState(false);
  const [vehicle, setVehicle] = useState("");
  const [policies, setPolicies] = useState(_.cloneDeep(defaultPolicies));
  const [percentages] = useState(defaultPercentages);
  const handlePolicyChange = (index, checked) => {
    setPolicies((policies) => {
      policies[index]["checked"] = checked;
      return [...policies];
    });
  };

  const resetPolicies = () => {
    setPolicies(_.cloneDeep(defaultPolicies));
  };

  const [data, setData] = useState();

  const onSubmit = (values) => {
    console.log(values)
    console.log(policies)
    if (!advanced) {
      let policiesDone = []
      policies.forEach(policie => {
        if (policie.checked) {
          policiesDone.push(policie.id)
        }
      })
      console.log(calculator(vehicle, policiesDone, Object.keys(formula[vehicle])))
    }
    setData(calculate(values));
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
                onChange={e => setVehicle(e.target.value)}
              >
                {vehicles.map((vehicle, index) => (
                  <option key={`vehicle-${vehicle}-${index}`} value={vehicle[0]} >
                    {vehicle[1]}
                  </option>
                ))}
              </Form.Control>
              <Feedback>
                {errors["vehicle"] && `Én eller flere typer kjøretøy må velges`}
              </Feedback>
            </Form.Group>
          </Col>
        </Row>

        {!advanced &&
          <div className="mb-4">
            <span>Tiltak</span>
            <hr className="mt-1 mb-4" />
            <div className="text-center">
              {policies.map((policy, index) => {
                if (vehicle === "" || policy.showButton.includes(vehicle)) {
                  return <Form.Check
                    key={`policy-${policy.id}-${index}`}
                    className="mb-3 unselectable"
                    custom
                    inline
                    type="switch"
                    label={policy.label}
                    checked={policy.checked}
                    onChange={(e) => {
                      handlePolicyChange(index, e.target.checked);
                    }}
                    id={policy.id}
                  />
                } else {
                  return null
                }
              })}
            </div>
            <div className="mt-1 w-100 d-flex">
              <Button
                variant="light"
                size="lg"
                className="px-2 pb-1 py-0 mb-1 border mx-auto"
                type="button"
                onClick={() => resetPolicies()}
              >
                &#10226;
              <small>
                  Tilbakestill <span className="d-none d-sm-inline">tiltak</span>
                </small>
              </Button>
            </div>
          </div>
        }
        <div className="mt-1 w-100 d-flex">
          <Button
            variant="light"
            size="lg"
            className="px-2 pb-1 py-0 mb-1 border mx-auto"
            type="button"
            onClick={() => setAdvanced(!advanced)}
          >
            &#10226;
              <small>
              {advanced ? "Tiltak" : "Avansert"} <span className="d-none d-sm-inline"></span>
            </small>
          </Button>
        </div>

        {advanced &&
          <Row>
            {percentages.map((percentage, index) => {
              if (vehicle === "" || percentage.showButton.includes(vehicle)) {
                return <Col
                  key={`percentage-${percentage.id}-${index}`}
                  xs="12"
                  sm="6"
                  lg="3"
                >
                  <Form.Group>
                    <Form.Label>{percentage.label}</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type="number"
                        name={percentage.id}
                        defaultValue={percentage.value}
                        isInvalid={errors[percentage.id]}
                        ref={register({
                          required: true,
                          min: percentage.min,
                          max: percentage.max,
                        })}
                      />
                      <InputGroup.Append>
                        <InputGroup.Text>%</InputGroup.Text>
                      </InputGroup.Append>
                    </InputGroup>
                    <Feedback>
                      {errors[percentage.id] &&
                        `Må være et tall mellom ${percentage.min} og ${percentage.max}`}
                    </Feedback>
                  </Form.Group>
                </Col>
              } else {
                return null
              }
            })}
          </Row>}
        <div className="w-100 d-flex">
          <Button className="mt-3 mx-auto" type="submit">
            Kalkuler
          </Button>
        </div>

        <Visualization data={data} className="mb-3" />

        {/* Debugging: */}
        {/* <h5>Data</h5>
        <pre className="mt-3">{JSON.stringify(data, 0, 2)}</pre>

        <h5>Tiltak</h5>
        <pre className="mt-3">{JSON.stringify(policies, 0, 2)}</pre> */}
      </Form >
    </div >
  );
};
