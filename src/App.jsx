import React from "react";
import "styles/styles.css";
import "styles/bootstrap.scss";
import Form from "components/Form";
import Background from "components/Background";
import Hero from "components/Hero";
import About from "components/About";
import Footer from "components/Footer";
import { Container, Card } from "react-bootstrap";
import traffic from "images/traffic.jpg";
const Data = React.createContext();

export default () => {
  return (
    <>
      <Background image={traffic} />
      <Container>
        <Card className="my-3 shadow bg-light">
          <Card.Body>
            <Hero />
            <Form className="mb-4" />
            <About className="mb-3" />
            <Footer />
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};
