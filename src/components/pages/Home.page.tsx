import React, { useState } from "react";
import { Col, Container, Form, Row, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useStoreActions } from "../../store/hooks.store";
import "../styles/pages/loader.styles.pages";

function Home() {
  const { setUserId } = useStoreActions((actions) => {
    return actions.joinModel;
  });
  const [userName, setUserName] = useState("");

  return (
    <Container className="d-flex align-items-center bd-highlight mb-2 w-100">
      <Row
        className="d-flex align-items-center w-100 "
        style={{ height: "667px" }}
      >
        <Col md={{ span: 6 }} >Tic Tac Toe</Col>
        <Col md={{ span: 6 }} className="">
          <Card>
            <Card.Body>
              <Card.Text>
                <Form>
                  <Form.Label>Enter your username</Form.Label>
                  <Form.Control
                    type="text"
                    value={userName}
                    placeholder="Enter username"
                    onChange={(e) => {
                      setUserName(e.target.value);
                    }}
                  />
                  <Form.Group controlId="formGroupEmail"></Form.Group>
                </Form>
              </Card.Text>
              <Link
                to="/lobby" ///SHOULD GO TO
                onClick={() => {
                  setUserId(userName);
                }}
                className="btn btn-primary"
              >
                <Button variant="primary" size="sm">
                  Guess login
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
