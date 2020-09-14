import React from "react";
import "styles/styles.css";
import "styles/bootstrap.scss";
import Form from "components/Form";
import Background from "components/Background";
import { Container, Card } from "react-bootstrap";
import traffic from "images/traffic.jpg";
import logo from "images/logo.png";

export default () => {
  return (
    <>
      <Background image={traffic} />
      <Container>
        <Card className="my-3 shadow bg-light">
          <Card.Body>
            <div className="d-flex w-100">
              <img
                src={logo}
                alt="MHTech logo"
                className="mx-auto"
                style={{
                  maxWidth: "75%",
                  width: 300,
                }}
              />
            </div>
            <h1 className="text-center" style={{ fontWeight: "bold" }}>
              CARCULATOR
            </h1>
            <hr className="" />
            <Form />
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};
