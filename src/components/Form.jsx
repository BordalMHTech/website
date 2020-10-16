import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  // InputGroup,
  Row,
  Col,
  ProgressBar,
  Modal,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import municipalities from "data/municipalities";
import vehicles from "data/vehicles";
import Feedback from "components/Feedback";
import Visualization from "components/Visualization";
import preprocess from "functions/preprocess.js";
import Policies from "components/Policies";
import useFetch from "use-http";
import useTimer from "hooks/useTimer";
import Dots from "components/Dots";
import ReactJson from "react-json-view";

const vehiclesType = [
  "personbiler",
  "varebiler",
  "letteLastebiler",
  "tyngreLastebiler",
];

export default (props) => {
  const { register, handleSubmit, errors } = useForm();
  const { get, response, loading, error } = useFetch(
    "http://44.242.138.218:8080"
  );

  const [advanced, setAdvanced] = useState(false);
  const [vehicle, setVehicle] = useState(vehiclesType[0]);
  const [policies, setPolicies] = useState({});

  const [data, setData] = useState();
  const [previewData, setPreviewData] = useState(false);

  const onSubmit = (values) => {
    handleStart();

    const getPath = (values) =>
      [
        "/prediction",
        values.percentElRenewablePersonbiler,
        values.percentBensinOfFossilePersonbiler,
        values.ntpGoalPersonbiler,
        values.growthRatePersonbiler,
        values.percentElRenewableVarebiler,
        values.percentBensinOfFossileVarebiler,
        values.ntpGoalVarebiler,
        values.growthRateVarebiler,
        values.percentElRenewableLetteLastebiler,
        values.percentBensinOfFossileLetteLastebiler,
        values.ntpGoalLetteLastebiler,
        values.growthRateLetteLastebiler,
        values.percentElRenewableTyngreLastebiler,
        values.percentBensinOfFossileTyngreLastebiler,
        values.ntpGoalTyngreLastebiler,
        values.growthRateTyngreLastebiler,
        values.municipality,
        values.m2025Varebiler,
        values.m2025LetteLastebiler,
        values.m2025TyngreLastebiler,
      ].join("/");

    async function api(path) {
      const result = await get(path);
      if (response.ok) {
        setData(result);
        handlePause();
        handleReset();
      } else {
        handlePause();
        handleReset();
      }
    }

    // kalkulering om det er avhuking
    if (!advanced) {
      const path = getPath({
        ...values,
        ...preprocess(vehiclesType, policies),
      });
      api(path);
    } else {
      const path = getPath({
        ...values,
      });
      api(path);
    }
  };

  const { timer, isActive, handleStart, handlePause, handleReset } = useTimer(
    0
  );

  const progress = (timer * 100) / (60 * 0.5);

  useEffect(() => {
    if (progress > 100 && isActive) {
      handlePause();
    }
  }, [timer, progress, isActive, handlePause]);

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
                    key={`municipality-${municipality.value}-${index}`}
                    value={municipality.value}
                  >
                    {municipality.label}
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
        {vehiclesType.map((vehicleType, index) => {
          return (
            <Policies
              key={index}
              advanced={advanced}
              hidden={vehicle === "alle" ? false : vehicle !== vehicleType}
              vehicle={vehicleType}
              register={register}
              setPolicies={setPolicies}
              policies={policies}
              errors={errors}
            />
          );
        })}

        <Row>
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

        {loading && (
          <div className="mt-5 w-100 text-center">
            <Dots>Regner ut</Dots>
            <ProgressBar animated now={progress} />
          </div>
        )}
        {error && (
          <div className="mt-5 w-100 text-center text-secondary">
            <p>
              Noe gikk galt.{" "}
              <span role="img" aria-label="sad-emoji">
                😢
              </span>
            </p>
            <p>
              Prøv igjen eller{" "}
              <a href="http://www.mhtech.no/ContactUs.html">kontakt MHTech</a>.
            </p>
            <div>Feilmelding:</div>
            <div>"{error.message}"</div>
          </div>
        )}

        <Visualization data={data} vehicle={vehicle} className="mb-3" />

        {data && (
          <>
            <Row className="mt-3">
              <Col xs={12} sm={6}>
                <Button
                  variant="light"
                  className="border w-100"
                  type="button"
                  onClick={() => setPreviewData(true)}
                >
                  {`Se rådata`}
                </Button>
              </Col>
              <Col xs={12} sm={6} className="mt-1 mt-sm-0">
                <Button
                  variant="light"
                  className="border w-100"
                  type="button"
                  href={`data:text/json;charset=utf-8,${encodeURIComponent(
                    JSON.stringify(data)
                  )}`}
                  download="data.json"
                >
                  {`Last ned rådata`}
                </Button>
              </Col>
            </Row>
            <Modal
              show={previewData}
              centered
              onHide={() => setPreviewData(false)}
            // onClose={() => setPreviewData(false)}
            >
              <Modal.Body style={{ backgroundColor: "" }}>
                <div
                  className="d-flex justify-content-end"
                  style={{ height: 0 }}
                >
                  <div style={{ zIndex: 1 }}>
                    <Button
                      variant="light"
                      className="border px-1 py-0 text-muted"
                      onClick={() => setPreviewData(false)}
                    // style={{ zIndex: 1 }}
                    >
                      <b style={{ padding: 2 }}>✕</b>
                    </Button>
                  </div>
                </div>
                <div style={{ zIndex: 0 }}>
                  <ReactJson src={data} collapsed={1} />
                </div>
              </Modal.Body>
            </Modal>
          </>
        )}
      </Form>
    </div>
  );
};
