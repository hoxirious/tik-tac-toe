import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useStoreActions, useStoreState } from "../../store/hooks.store";

function Lobby() {
  const { thunkSendJoinGame } = useStoreActions((actions) => {
    return actions.joinModel;
  });
  const { userId } = useStoreState((store) => {
    return store.joinModel;
  });
  const [gameIdEntry, setGameIdEntry] = useState("");

  const handlerJoinGame = async (gameIdEntry: string) => {
    await thunkSendJoinGame({
      userId: userId,
      gameId: gameIdEntry,
    });
  };

  return (
    <Container>
      <Row>
        <Col xs={3}>
          <Link
            to="/board-size" ///SHOULD GO TO
            className="btn btn-primary"
          >
            New Game
          </Link>
        </Col>

        <Col xs={9}>
          <Form>
            <Form.Group controlId="formGroupEmail">
              <Form.Label>Enter Game ID</Form.Label>
              <Col xs={9}>
                <Form.Control
                  type="text"
                  value={gameIdEntry}
                  placeholder="Enter Game ID"
                  onChange={(e) => {
                    setGameIdEntry(e.target.value);
                  }}
                />
              </Col>
            </Form.Group>
          </Form>
        </Col>

        <Col xs={3}>
          {
            <Link to="/waiting-room">
              <Button
                className="btn btn-primary"
                onClick={() => {
                  handlerJoinGame(gameIdEntry);
                }}
              >
                Join Game
              </Button>
            </Link>
          }
        </Col>
      </Row>
    </Container>
  );
}

export default Lobby;
