import React, { useState, useRef } from "react";
import { Form, InputGroup, Row, Col } from "react-bootstrap";
import _ from "lodash";
import defaultPolicies from "data/policies";
import defaultPercentages from "data/percentages";
import vehicles from "data/vehicles";
import Feedback from "components/Feedback";

export default (props) => {
  const policiesRef = useRef(_.cloneDeep(defaultPolicies));

  const [percentages] = useState(defaultPercentages);
  if (!props.policies[props.vehicle]) {
    props.setPolicies((prevState) => {
      prevState[props.vehicle] = {};
      policiesRef.current.forEach((policie) => {
        prevState[props.vehicle][policie.id] = false;
      });
      return { ...prevState };
    });
  }

  const handlePolicyChange = (target) => {
    props.setPolicies((prevState) => {
      prevState[props.vehicle][target.name] = target.checked;
      return { ...prevState };
    });
  };

  return (
    <div {...props}>
      <div className="mb-4">
        <span>
          {props.advanced ? "Parametere" : "Tiltak"} {vehicles[props.vehicle]}
        </span>
        <hr className="mt-1 mb-4" />
        {!props.advanced && props.vehicle && (
          <>
            {/* <div className="text-center"> */}
            <Row>
              {policiesRef.current.map((policy, index) => {
                if (policy.show.includes(props.vehicle)) {
                  return (
                    <Col key={index} xs={12} sm={6} lg={4} xl={3}>
                      <Form.Check
                        key={`policy-${policy.id}-${index}-${props.vehicle}`}
                        className="mb-3 unselectable"
                        custom
                        inline
                        name={policy.id}
                        type="switch"
                        label={policy.label}
                        checked={
                          props.policies[props.vehicle]
                            ? props.policies[props.vehicle][policy.id]
                            : false
                        }
                        onChange={(e) => handlePolicyChange(e.target)}
                        id={`policy-${policy.id}-${index}-${props.vehicle}`}
                      />
                    </Col>
                  );
                } else {
                  return null;
                }
              })}
            </Row>
            {/* </div> */}
            {/* <div className="mt-1 w-100 d-flex">
              <Button
                variant="light"
                size="lg"
                className="px-2 pb-1 py-0 mb-1 border mx-auto"
                type="button"
                onClick={() => resetPolicies()}
              >
                &#10226;
                <small>
                  Tilbakestill{" "}
                  <span className="d-none d-sm-inline">tiltak</span>
                </small>
              </Button>
            </div> */}
          </>
        )}
      </div>
      {
        props.advanced && (
          <Row className="align-items-end">
            {percentages.map((percentage, index) => {
              if (percentage.show.includes(props.vehicle)) {
                return (
                  <Col
                    key={`percentage-${percentage.id}-${index}`}
                    xs="12"
                    sm="6"
                    lg="3"
                  >
                    <Form.Group>
                      <Form.Label style={{ wordBreak: "break-word" }}>
                        {percentage.label}
                      </Form.Label>
                      <InputGroup>
                        <Form.Control
                          type="number"
                          name={`${props.vehicle}${percentage.id}`}
                          defaultValue={percentage.value}
                          isInvalid={
                            props.errors[`${props.vehicle}${percentage.id}`]
                          }
                          ref={props.register({
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
                        {props.errors[percentage.id] &&
                          `Må være et tall mellom ${percentage.min} og ${percentage.max}`}
                      </Feedback>
                    </Form.Group>
                  </Col>
                );
              } else {
                return null;
              }
            })}
          </Row>
        )
      }
    </div >
  );
};
