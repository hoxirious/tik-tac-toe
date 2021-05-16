import React from "react";
import { Button, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useStoreActions, useStoreState } from "../../store/hooks.store";
import { iCell } from "../../store/interfaces.store";

function Waiting() {
  const { boardSide } = useStoreState((store) => {
    return store.boardModel;
  });

  const { createBoardData, setYourMove } = useStoreActions((actions) => {
    return actions.boardModel;
  });

  const handleSendJoinGame = async () => {
    setUpBoardData(boardSide);
  };

  const setUpBoardData = (boardSideLength: number) => {
    const BoardData = [];
    setYourMove("O");
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
      <Row className="justify-content-md-center">
        <Link to="/board">
          <Button variant="primary" onClick={() => handleSendJoinGame()}>
            Play
          </Button>
        </Link>
      </Row>
    </Container>
  );
}

export default Waiting;
