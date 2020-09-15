import React, { useState } from "react";
import { Form, Button, InputGroup, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import _ from "lodash";
import defaultPolicies from "data/policies";
import defaultPercentages from "data/percentages";
import municipalities from "data/municipalities";
import vehicles from "data/vehicles";
import Title from "components/Title";

export default (props) => {
  const { register, handleSubmit } = useForm();

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

  const [data, setData] = useState({});

  const onSubmit = (values) => {
    setData(values);
  };

  return (
    <div {...props}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col xs="12" sm="6">
            <Form.Group>
              <Form.Label>Kommune</Form.Label>
              <Form.Control
                as="select"
                custom
                ref={register({ required: true })}
                name="municipality"
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
              >
                {vehicles.map((vehicle, index) => (
                  <option key={`vehicle-${vehicle}-${index}`} value={vehicle}>
                    {vehicle}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Title
          append={
            <Button
              variant="light"
              size="lg"
              className="px-2 pb-1 py-0 mb-1 border"
              type="button"
              onClick={() => resetPolicies()}
            >
              &#10226;
              <small>
                Tilbakestill <span className="d-none d-sm-inline">tiltak</span>
              </small>
            </Button>
          }
        >
          Tiltak
        </Title>

        <div className="mb-3">
          {policies.map((policy, index) => (
            <Form.Check
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
          ))}
        </div>

        <Row>
          {percentages.map((percentage, index) => (
            <Col
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
                    ref={register({ required: true })}
                  />
                  <InputGroup.Append>
                    <InputGroup.Text>%</InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
              </Form.Group>
            </Col>
          ))}
        </Row>
        <div className="w-100 d-flex">
          <Button className="mt-3 mx-auto" type="submit">
            Kalkuler
          </Button>
        </div>

        {/* <Title>Data</Title>
        <pre className="mt-3">{JSON.stringify(data, 0, 2)}</pre>

        <Title>Tiltak</Title>
        <pre className="mt-3">{JSON.stringify(policies, 0, 2)}</pre> */}
      </Form>
    </div>
  );
};
