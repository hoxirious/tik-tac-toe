import React, { useEffect, useState } from "react";
import { Button, Container, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useStoreActions, useStoreState } from "../../store/hooks.store";
import { iCell } from "../../store/interfaces.store";

function Waiting() {
  const { boardSideP2 } = useStoreState((store) => {
    return store.joinModel;
  });

  const { createBoardData, setYourMove } = useStoreActions((actions) => {
    return actions.boardModel;
  });
  const [playerReady, setPlayerReady] = useState(false);

  const simulateNetworkRequest = () => {
    return new Promise((resolve) => setTimeout(resolve, 2000));
  };
  const [isLoading, setLoading] = useState(false);

  const handleSendJoinGame = async () => {
    setLoading(true);
    setUpBoardData(boardSideP2);
    setPlayerReady(true);
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

  useEffect(() => {
    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);
  return (
    <Container>
      {isLoading && (
        <Row className="justify-content-md-center">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </Row>
      )}

      {playerReady && !isLoading && (
        <Row className="justify-content-md-center">
          <Link to="/board">
            <Button variant="primary">Chơi đi bạn</Button>
          </Link>
        </Row>
      )}

      {!playerReady && (
        <Row className="justify-content-md-center">
          <Button
            variant="primary"
            disabled={isLoading}
            onClick={() => handleSendJoinGame()}
          >
            {"Check"}
          </Button>
        </Row>
      )}
    </Container>
  );
}

export default Waiting;
