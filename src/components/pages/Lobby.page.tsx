import React, { useState } from "react";
import { Button, Card, Col, Row, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useStoreActions, useStoreState } from "../../store/hooks.store";

function Lobby() {
  const { thunkSendJoinGame, setGameId } = useStoreActions((actions) => {
    return actions.joinModel;
  });
  const { userId } = useStoreState((store) => {
    return store.joinModel;
  });
  const [gameIdEntry, setGameIdEntry] = useState("");

  const handlerJoinGame = async (gameIdEntry: string) => {
    setGameId(gameIdEntry);
    await thunkSendJoinGame({
      userId: userId,
      gameId: gameIdEntry,
    });
  };

  return (
    <Container className="d-flex align-items-center justify-content-center">
      <Row
        className="d-flex align-items-center w-100"
        style={{ height: "200px" }}
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
        <Col md={{ span: 6, offset: 0 }} style={{ height: "180px" }}>
          <Card className="w-100">
            <Card.Body className="d-flex flex-column">
              <Col className="mb-2">
                <Link to="/board-size">
                  <Button variant="primary" size="sm">
                    New Game
                  </Button>
                </Link>
              </Col>
              <Col>
                <hr
                  style={{
                    color: "#dbdbdb",
                    backgroundColor: "#dbdbdb",
                    height: "0.5px",
                    borderColor: "#dbdbdb",
                  }}
                />
              </Col>
              <Col>
                <Form>
                  <Form.Group controlId="formGroupEmail">
                    <Form.Control
                      type="text"
                      value={gameIdEntry}
                      placeholder="Enter Game ID"
                      onChange={(e) => {
                        setGameIdEntry(e.target.value);
                      }}
                    />
                  </Form.Group>
                </Form>
                <Link to="/waiting-room">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      handlerJoinGame(gameIdEntry);
                    }}
                  >
                    Join Game
                  </Button>
                </Link>
              </Col>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Lobby;
