import React, { useState } from "react";
import Cell from "./Cell";
import '../styles/templates/loader.styles.templates';

/*
 *   0 | 1 | 2
 *  ---+---+---
 *   3 | 4 | 5
 *  ---+---+---
 *   6 | 7 | 8
 */

const Board = () => {
  const CELLNUMBER: number = 9;
  const BoardSide: number = Math.sqrt(CELLNUMBER);
  const [cellsState, setCellsState] = useState(Array(CELLNUMBER).fill(""));
  const [clickState, setClickState] = useState(true);

  const handlePlayer = (whichCell: number) => {
    const cells = cellsState.slice();
    const xPlayer = clickState;

    cells[whichCell] = xPlayer ? "X" : "O";
    setCellsState(cells);
    setClickState(!clickState);
  };

  const createCell = (whichCell: number) => {
    return (
      <Cell
        key={whichCell}
        player={cellsState[whichCell]}
        onClick={() => {
          handlePlayer(whichCell);
        }}
      />
    );
  };

  const createBoard = (rows: number, cols: number) => {
    const board = [];

    for (let currentRow = 0; currentRow < rows; currentRow++) {
      let columns = [];
      for (let currentCol = 0; currentCol < cols; currentCol++) {
        let oneDPosition: number = currentCol * cols + (currentRow % rows);
        columns.push(createCell(oneDPosition));
      }
      board.push(
        <div key={currentRow} className="board-row">
          {columns}
        </div>,
      );
    }
    return board;
  };

  return (
    <div className="container">
      <div className="container-main">
      <div className="container-title">TIC TAC T🎅E!</div>
        <div className="players-status">
          <button
            className="players-status"
            id={clickState ? "active-x-player" : "inactive-x-player"}
          >
            X
          </button>
          <button
            className="players-status"
            id={!clickState ? "active-o-player" : "inactive-o-player"}
          >
            O
          </button>
        </div>
        <div
          className="board"
          id={BoardSide === 3 ? "board-3x3" : "board-4x4"}
        >
          {createBoard(BoardSide, BoardSide)}
        </div>
      </div>
    </div>
  );
};

export default Board;
