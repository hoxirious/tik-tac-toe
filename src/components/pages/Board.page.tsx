import React, { useState } from "react";
import { useStoreActions, useStoreState } from "../../store/hooks.store";
import "../styles/pages/loader.styles.pages";
import Cell from "./Cell.page";

/**
 *
 * @returns A board game with given size
 */
const Board = () => {
  //Initialize store states, actions and thunks
  const { boardSide, board, isWon, yourMove } = useStoreState((store) => {
    return store.boardModel;
  });

  const { boardSideP2, gameId, userId } = useStoreState((store) => {
    return store.joinModel;
  });

  const { thunkToSetCell, thunkSendMakeMove } = useStoreActions((actions) => {
    return actions.boardModel;
  });

  //Initialize local states
  const localBoardSide = boardSide === 0 ? boardSideP2 : boardSide;
  const totalCells = localBoardSide * localBoardSide;

  const [cellsState, setCellsState] = useState(Array(totalCells).fill(""));

  /**
   *
   * @param whichCell given cell's position
   * @todo This will add played value into cellsState array and
   * use thunk to update state in store
   */
  const handlePlayer = async (whichCell: number) => {
    if (isWon) {
      return;
    }

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
    <div className="container">
      <div className="container-main">
        <div className="container-title">TIC TAC T🎅E!</div>
        <div className="players-status">
          <button
            className="players-status"
            // id={clickState ? "active-x-player" : "inactive-x-player"}
          >
            X
          </button>
          <button
            className="players-status"
            // id={!clickState ? "active-o-player" : "inactive-o-player"}
          >
            O
          </button>
        </div>
        <div
          className="board"
          id={localBoardSide === 3 ? "board-3x3" : "board-4x4"}
        >
          {console.log(gameId)}
          {createBoardUI(localBoardSide, localBoardSide)}
        </div>
      </div>
    </div>
  );
};

export default Board;
