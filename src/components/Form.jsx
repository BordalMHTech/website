import React, { useState, } from "react";
import { Form, Button, InputGroup, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import _ from "lodash";
import municipalities from "data/municipalities";
import vehicles from "data/vehicles";
import Feedback from "components/Feedback";
import Visualization from "components/Visualization";
import calculate from "functions/api.js";
import calculator from "data/calculator.js"
import formula from "data/formula.js"
import Measures from "components/Measures"

const vehiclesType = ["personbiler", "varebiler", "letteLastebiler", "tyngreLastebiler"]

export default (props) => {
  const { register, handleSubmit, errors } = useForm();

  const [advanced, setAdvanced] = useState(false);
  const [vehicle, setVehicle] = useState("");
  const [policies, setPolicies] = useState({})

  const [data, setData] = useState();

  const onSubmit = (values) => {
    // kalkulering om det er avhuking
    if (!advanced) {
      setData(calculator(vehicle === "alle" ? vehiclesType : [vehicle], policies))
      console.log(calculator(vehicle === "alle" ? vehiclesType : [vehicle], policies))

    } else {
      setData(calculate(values));

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
                onChange={e => {
                  setPolicies({})
                  setVehicle(e.target.value)
                }}
              >
                {Object.keys(vehicles).map((vehicle, index) => (
                  <option key={`vehicle-${vehicle}-${index}`} value={vehicle} >
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
        {vehicle === "alle" ? vehiclesType.map((vehicleType, index) => {
          return <Measures key={index} advanced={advanced} vehicle={vehicleType} register={register} setPolicies={setPolicies} policies={policies} errors={errors} />
        }) :
          < Measures advanced={advanced} vehicle={vehicle} register={register} setPolicies={setPolicies} policies={policies} errors={errors} />
        }
        {advanced &&
          <>
            <span>Alle</span>
            <hr className="mt-1 mb-4" />
            <Form.Group>
              <Form.Label>2025</Form.Label>
              <InputGroup>
                <Form.Control
                  type="number"
                  name={`m2025`}
                  defaultValue={0}
                />
              </InputGroup>
            </Form.Group>
          </>
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
        <div className="w-100 d-flex">
          <Button className="mt-3 mx-auto" type="submit">
            Kalkuler
          </Button>
        </div>

        {/* <Visualization data={data} className="mb-3" /> */}

      </Form >
    </div >
  );
};
