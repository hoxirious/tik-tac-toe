import React, { useState } from "react";
import { useStoreState, useStoreActions } from "../../store/hooks.store";
import { iCell } from "../../store/interfaces.store";
import "../styles/pages/loader.styles.pages";
import Cell from "./Cell.page";

/*
 *   0 | 1 | 2
 *  ---+---+---
 *   3 | 4 | 5
 *  ---+---+---
 *   6 | 7 | 8
 */

// const Board = () => {
//   const { boardSide } = useStoreState((store) => {
//     return store.boardModel;
//   });
//   const totalCells = boardSide*boardSide;
//   const [cellsState, setCellsState] = useState(Array(totalCells).fill(""));

//   const [clickState, setClickState] = useState(true);

//   const handlePlayer = (whichCell: number) => {
//     const cells = cellsState.slice();
//     const xPlayer = clickState;

//     cells[whichCell] = xPlayer ? "X" : "O";
//     setCellsState(cells);
//     setClickState(!clickState);
//   };

//   const createCell = (whichCell: number) => {
//     return (
//       <Cell
//         key={whichCell}
//         player={cellsState[whichCell]}
//         onClick={() => {
//           handlePlayer(whichCell);
//         }}
//       />
//     );
//   };

//   const createBoard = (rows: number, cols: number) => {
//     const board = [];

//     for (let currentRow = 0; currentRow < rows; currentRow++) {
//       let columns = [];
//       for (let currentCol = 0; currentCol < cols; currentCol++) {
//         let oneDPosition: number = currentCol * cols + (currentRow % rows);
//         columns.push(createCell(oneDPosition));
//       }
//       board.push(
//         <div key={currentRow} className="board-row">
//           {columns}
//         </div>,
//       );
//     }
//     return board;
//   };

//   return (
//     <div className="container">
//       <div className="container-main">
//       <div className="container-title">TIC TAC T🎅E!</div>
//         <div className="players-status">
//           <button
//             className="players-status"
//             id={clickState ? "active-x-player" : "inactive-x-player"}
//           >
//             X
//           </button>
//           <button
//             className="players-status"
//             id={!clickState ? "active-o-player" : "inactive-o-player"}
//           >
//             O
//           </button>
//         </div>
//         <div
//           className="board"
//           id={boardSide === 3 ? "board-3x3" : "board-4x4"}
//         >
//           {createBoard(boardSide, boardSide)}
//         </div>
//       </div>
//     </div>
//   );
// };

const Board = () => {
  const { boardSide, board } = useStoreState((store) => {
    return store.boardModel;
  });

  const { beforeSetCell } = useStoreActions((actions) => {
    return actions.boardModel;
  });
  const totalCells = boardSide * boardSide;

  const [curCell, setCurCell] = useState<iCell>({
    oneDPosition: 0,
    whatPlayer: "X",
  });
  const [clickState, setClickState] = useState(true);

  const handlePlayer = (whichCell: number) => {
    const xPlayer = clickState;
    const newCell: iCell = {
      oneDPosition: whichCell,
      whatPlayer: xPlayer ? "X" : "O",
    };
    setCurCell(newCell);
    beforeSetCell(curCell);
    setClickState(!clickState);
  };

  const createCell = (whichCell: number) => {
    return (
      <Cell
        key={whichCell}
        player={curCell.whatPlayer}
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
        <div className="board" id={boardSide === 3 ? "board-3x3" : "board-4x4"}>
          {createBoard(boardSide, boardSide)}
        </div>
      </div>
    </div>
  );
};
export default Board;
