import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useStoreActions, useStoreState } from "../../store/hooks.store";
import "../styles/global/font.css";
import "../styles/pages/loader.styles.pages";
import Cell from "./Cell.page";

/**
 *
 * @returns A board game with given size
 */
const Board = () => {
  //Initialize store states, actions and thunks

  const { currPlayerId, gameId, userId } = useStoreState((store) => {
    return store.joinModel;
  });
  const { boardSide, board, isWon, yourMove, playerIds, winner } =
    useStoreState((store) => {
      return store.boardModel;
    });

  const { thunkToSetCell, thunkSendMakeMove } = useStoreActions((actions) => {
    return actions.boardModel;
  });

  //Initialize local states
  const totalCells = boardSide * boardSide;

  const [cellsState, setCellsState] = useState(Array(totalCells).fill(""));

  const isXTurn = () => {
    return playerIds[0] === currPlayerId;
  };

  const displayUserX = () => {
    return userId === playerIds[0] ? "YOU" : playerIds[0];
  };
  const displayUserO = () => {
    return userId === playerIds[1] ? "YOU" : playerIds[1];
  };

  /**
   *
   * @param whichCell given cell's position
   * @todo This will add played value into cellsState array and
   * use thunk to update state in store
   */
  const handlePlayer = async (whichCell: number) => {
    const cells = cellsState.slice();
    ///need to triggered to re-render

    cells[whichCell] = yourMove;
    setCellsState(cells);

    await thunkSendMakeMove({
      gameId: gameId,
      userId: userId,
      move: whichCell,
    });

    thunkToSetCell({
      oneDPosition: whichCell,
      currentPlayer: cells[whichCell],
    });
    if (isWon) {
      return;
    }
  };

  /**
   *
   * @param whichCell given cell's position
   * @returns a Cell at given position
   */
  const createCell = (whichCell: number) => {
    return (
      <Cell
        key={whichCell}
        oneDPosition={whichCell}
        currentPlayer={board[whichCell].currentPlayer}
        onClick={() => {
          handlePlayer(whichCell);
        }}
      />
    );
  };

  /**
   *
   * @param rows row size
   * @param cols column size
   * @returns Array of Cells for the UI
   */
  const createBoardUI = (rows: number, cols: number) => {
    const BoardUI = [];
    for (let currentRow = 0; currentRow < rows; currentRow++) {
      let columns = [];

      for (let currentCol = 0; currentCol < cols; currentCol++) {
        const oneDPosition = currentCol * cols + (currentRow % rows);
        columns.push(createCell(oneDPosition));
      }
      BoardUI.push(
        <div key={currentRow} className="board-row">
          {columns}
        </div>,
      );
    }
    return BoardUI;
  };
  return (
    <Container className="container d-flex flex-column justify-content-center w-100">
      {winner === "" && (
        <div>
          <Row className="container-main d-flex ">
            <Col
              className="container-title"
              style={{
                fontFamily: "Pangolin",
                fontSize: "3.5em",
                color: "var(--red)",
                textAlign: "center",
                marginBottom: "-5px",
              }}
            >
              tic-tac-toe
            </Col>
          </Row>

          <Row>
            <Col className="players-status d-flex align-items-center justify-content-center">
              <div style={{ color: " var(--cyan)" }}>{displayUserX()}</div>
              <button
                className="players-status"
                id={isXTurn() ? "active-x-player" : "inactive-x-player"}
              >
                X
              </button>
              <div style={{ color: " var(--pink)" }}>{displayUserO()}</div>
              <button
                className="players-status"
                id={!isXTurn() ? "active-o-player" : "inactive-o-player"}
              >
                O
              </button>
            </Col>
          </Row>
          <Row>
            <Col
              className="board justify-content-center"
              id={boardSide === 3 ? "board-3x3" : "board-4x4"}
            >
              {createBoardUI(boardSide, boardSide)}
            </Col>
          </Row>
        </div>
      )}
      {winner && (
        <div className="d-flex flex-column align-items-center">
          <div>{`The winner is ${winner}`}</div>
          <Button variant="primary" href="/" size="sm">
            Leave
          </Button>
        </div>
      )}
    </Container>
  );
};

export default Board;
