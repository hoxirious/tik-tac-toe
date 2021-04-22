import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/*
 *   0 | 1 | 2
 *  ---+---+---
 *   3 | 4 | 5
 *  ---+---+---
 *   6 | 7 | 8
 */
/**
 * 
 * @param props 
 * @returns 
 */
function Board(props: any) {
  const { size } = props;
  const CELLNUMBER: number = 9;
  const [cellsState, setCellsState] = useState(Array(CELLNUMBER).fill(""));
  const [clickState, setClickState] = useState(true);

  /**
   * 
   * @param whichCell 
   * @returns 
   */
  const handlePlayer = (whichCell: number) => {
    const cells = cellsState.slice();
    const xPlayer = clickState;
    if (props.calculateWinner(cells) || cells[whichCell]) {
      return;
    }
    cells[whichCell] = xPlayer ? "X" : "O";
    setCellsState(cells);
    setClickState(!clickState);
  };

  const createCell = (whichCell: number) => {
    return (
      <Cell
        player={cellsState[whichCell]}
        onClick={() => {
          handlePlayer(whichCell);
        }}
      />
    );
  };
  const createBoard = (rows: number, cols: number) => {
    const board = [];
    let counter = 0;
    for (let currentRow = 0; currentRow < rows; currentRow++) {
      let columns = [];
      for (let currentCol = 0; currentCol < cols; currentCol++) {
        columns.push(createCell(counter));
        counter++;
      }
      board.push(
        <div key={currentRow} className="board-row">
          {columns}
        </div>
      );
    }
    return board;
  };

  return (
    <div className="container">
      <div className="container-title">TIC TAC T🎅E!</div>
      <div className="container-main">
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

        <div className="board" id={size === 3 ? "board-3x3" : "board-4x4"}>
          {createBoard(size, size)}
        </div>
      </div>
    </div>
  );
}

export default Board;
