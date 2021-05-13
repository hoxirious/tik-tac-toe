import React, { useState } from "react";
import {
  Button, Card, Col,
  Container,
  Form,
  Row
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useStoreActions } from "../../store/hooks.store";
import "../styles/pages/loader.styles.pages";
import "../styles/global/font.css";

function Home() {
  const { setUserId } = useStoreActions((actions) => {
    return actions.joinModel;
  });
  const [userName, setUserName] = useState("");

  return (
    <Container className=" d-flex align-items-center">
      <Row
        className="d-flex align-items-center w-100"
      >
        <Col md={{ span: 6, offset: 0 }}>
          <h1
            style={{
              fontFamily: "Pangolin",
              fontSize: "3.5em",
              color: "var(--red)",
              textAlign: "center",
              marginBottom: "-5px",
            }}
          >
            tic-tac-toe
          </h1>
          <p
            style={{
              textAlign: "center",
              fontFamily: "Itim",
            }}
          >
            If you <strong>LOSE</strong>, you die <strong>IRL</strong>.
          </p>
        </Col>
        <Col md={{ span: 5, offset: 0 }} style={{ height: "150px" }}>
          <Card className="card h-100 d-flex flex-column">
            <Card.Body className="w-100">
              <Card.Text className="d-flex flex-column align-items-center justify-content-center">
                <Form.Control
                  type="text"
                  value={userName}
                  placeholder="Enter your username"
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />
              </Card.Text>
              <Card.Text className="w-100">
                <Link
                  to="/lobby"
                  onClick={() => {
                    setUserId(userName);
                  }}
                  className="btn btn-primary"
                >
                  <Button variant="primary" size="sm">
                    Guess login
                  </Button>
                </Link>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
