import React, { useState } from "react";
import { Col, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useStoreActions } from "../../store/hooks.store";
import "../styles/pages/loader.styles.pages";

function Home() {
  const { setUserId } = useStoreActions((actions) => {
    return actions.joinModel;
  });
  const [emailAddress, setEmailAddress] = useState("");

  return (
    <Container>
      {/* <Row className="justify-content-md-center"> */}
        <Form>
          <Form.Group controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Col xs={5}>
              <Form.Control
                type="email"
                value={emailAddress}
                placeholder="Enter email"
                onChange={(e) => {
                  setEmailAddress(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
        </Form>
      {/* </Row> */}

      {/* <Row className="justify-content-md-center"> */}
        <Col xs={5}>
          <Link
            to="/lobby" ///SHOULD GO TO
            onClick={() => {
              setUserId(emailAddress);
            }}
            className="btn btn-primary"
          >
            Login
          </Link>
        </Col>
      {/* </Row> */}
    </Container>
  );
}

export default Home;
