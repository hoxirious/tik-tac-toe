import React, { useState } from "react";
import { Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useStoreActions } from "../store/hooks.store";
import { iCell } from "../store/interfaces.store";

/**
 *
 * @returns A board-size-request page which allow users to enter
 * and be prompted to the desired board game
 */
function PlayGround() {
  const { setBoardSide, createBoardData } = useStoreActions(
    (actions) => {
      return actions.boardModel;
    },
  );

  const [boardSideEntry, setBoardSideEntry] = useState("");

  /**
   *
   * @param boardSideLength length of the side of the board
   * @todo set state of board side length in store and create board's data
   */
  const handleSetBoardSide = (boardSideLength: string) => {
    const intBoardSide = parseInt(boardSideLength);
    setBoardSide(intBoardSide);
    handleCreateBoardData(intBoardSide);
  };

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

  return (
    <Container>
      <Row className="justify-content-lg-center">
        <div className="container-title">TIC TAC T🎅E!</div>
      </Row>

      <Row className="justify-content-md-center">
        <Form>
          <Form.Group controlId="formGetBoardSideLength">
            <Form.Label>Board Size</Form.Label>
            <Form.Control
              type="number"
              value={boardSideEntry}
              onChange={(e) => {
                setBoardSideEntry(e.target.value);
              }}
              placeholder="Choose your board size i.e. 3 or 4"
            />
          </Form.Group>
        </Form>
      </Row>

      <Row className="justify-content-md-center">
        <Link
          to="/board"
          onClick={() => {
            handleSetBoardSide(boardSideEntry);
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
