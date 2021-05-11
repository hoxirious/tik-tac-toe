import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useStoreActions, useStoreState } from "../store/hooks.store";
import { iCell } from "../store/interfaces.store";

/**
 *
 * @returns A board-size-request page which allow users to enter
 * and be prompted to the desired board game
 */
function PlayGround() {
  const { setBoardSide, createBoardData, setYourMove } = useStoreActions(
    (actions) => {
      return actions.boardModel;
    },
  );
  const { thunkSendCreateGame } = useStoreActions((actions) => {
    return actions.joinModel;
  });
  const { userId } = useStoreState((store) => {
    return store.joinModel;
  });

  const simulateNetworkRequest = () => {
    return new Promise((resolve) => setTimeout(resolve, 2000));
  };

  const [isLoading, setLoading] = useState(false);

  /**
   *
   * @param boardSideLength length of the side of the board
   * @todo set state of board side length in store and create board's data
   */
  const handleSetBoardSide = (boardSideLength: string) => {
    const intBoardSide = parseInt(boardSideLength);
    setYourMove("X");
    setBoardSide(intBoardSide);
    thunkSendCreateGame({
      boardSideLength: intBoardSide,
      userId: userId,
    });
    handleCreateBoardData(intBoardSide);
  };

  const [boardSideEntry, setBoardSideEntry] = useState("");
  /**
   *
   * @param boardSideLength
   * @todo Initialize the data of Board
   */
  const handleCreateBoardData = (boardSideLength: number) => {
    const BoardData = [];
    const numEntry = boardSideLength * boardSideLength;
    for (let position = 0; position < numEntry; position++) {
      const initialCell: iCell = {
        oneDPosition: position,
        currentPlayer: "",
      };
      BoardData.push(initialCell);
    }
    createBoardData(BoardData);
  };

  useEffect(() => {
    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center">
      <Row>
        <Col className="container-title">tic-tac-toe</Col>
      </Row>

      <Row>
        <Form>
          <Form.Group
            className="d-flex  flex-column justify-content-center"
            controlId="formGetBoardSideLength"
          >
            <Form.Label style={{ textAlign: "center" }}>Board Size</Form.Label>
            <Form.Control
              type="number"
              value={boardSideEntry}
              onChange={(e) => {
                setBoardSideEntry(e.target.value);
              }}
              placeholder="Choose your board size"
            />
          </Form.Group>
        </Form>
      </Row>

      <Row className="justify-content-center">
        <Link to="/board">
          <Button
            variant="primary"
            onClick={() => handleSetBoardSide(boardSideEntry)}
            className="btn btn-primary"
          >
            Play
          </Button>
        </Link>
      </Row>
    </Container>
  );
}

export default PlayGround;
