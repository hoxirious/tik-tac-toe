import React, { useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import { Link, Route, BrowserRouter as Router } from "react-router-dom";
import { useStoreActions } from "../store/hooks.store";

function PlayGround() {
  const { setBoardSide } = useStoreActions((actions) => {
    return actions.boardModel;
  });

  const [boardSideState, setBoardSideState] = useState("");
  const [isPlayButtonClicked, setIsPlayButtonClicked] = useState(false);

  const handleSetBoardSide = (boardSide: string) => {
    setBoardSide(parseInt(boardSide));
    setIsPlayButtonClicked((prev) => !prev);
  };

  return (
    <Container>
      <Row className="justify-content-lg-center">
        <div className="container-title">TIC TAC T🎅E!</div>
      </Row>
      <Row className="justify-content-md-center">
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Board Size</Form.Label>
            <Form.Control
              type="number"
              value={boardSideState}
              onChange={(e) => {
                setBoardSideState(e.target.value);
              }}
              placeholder="Choose your board size i.e. 3 or 4"
            />
          </Form.Group>
        </Form>
      </Row >
      <Row className="justify-content-md-center">
        <Link
          to="/board"
          onClick={() => {
            handleSetBoardSide(boardSideState);
          }}
          className="btn btn-primary"
        >
          Play
        </Link>
      </Row>
    </Container>
  );
}

export default PlayGround;
