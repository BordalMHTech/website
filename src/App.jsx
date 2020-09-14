import React from "react";
import "styles/styles.css";
import "styles/bootstrap.scss";
import Form from "components/Form";
import Background from "components/Background";
import Hero from "components/Hero";
import { Container, Card } from "react-bootstrap";
import traffic from "images/traffic.jpg";

export default () => {
  return (
    <>
      <Background image={traffic} />
      <Container>
        <Card className="my-3 shadow bg-light">
          <Card.Body>
            <Hero />
            <Form />
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};
