import React, { useContext, useState, useEffect } from "react";
import Cell from "./Cell";
import "./Board.css";
import { SizeContext } from "../../App";
import { SizeOfBoard } from "../../App";


/*
 *   0 | 1 | 2
 *  ---+---+---
 *   3 | 4 | 5
 *  ---+---+---
 *   6 | 7 | 8
 */

const Board = () => {
  const board = useContext(SizeContext) as SizeOfBoard;
  const CELLNUMBER: number = 9;
  const [cellsState, setCellsState] = useState(Array(CELLNUMBER).fill(""));
  const [clickState, setClickState] = useState(true);



  const handlePlayer = (whichCell: number) => {
    const cells = cellsState.slice();
    const xPlayer = clickState;
    // if (props.calculateWinner(cells) || cells[whichCell]) {
    //   return;
    // }
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
        </div>,
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

      <div className="board" id={board.size === 3 ? "board-3x3" : "board-4x4"}>
        {createBoard(board.size, board.size)}
      </div>
    </div>
  </div>
);
}

// const Board =() =>{
  

//   const board = useContext(SizeContext) as SizeOfBoard;
//   const CELLNUMBER: number = board.size*board.size; 
//   const [cells,setCells] = useState<number|string>([]); 
  
  
//   // useEffect =(() => {
    
//   // });

//   const addCell = () =>{
//     setCells([...cells,{
//       id: cells.length,
//       value: 
//     }])
//   }

//   const createBoard = (size:number) => {
//     // const cellList: Array<string>;
//     const board =[] ; 
//     for(let currentCell=1; currentCell < CELLNUMBER+1; currentCell ++){
//       <Cell key={currentCell}/>}
      
//   }

//   return (
//     <div className="container">
//       <div className="container-title">TIC TAC T🎅E!</div>
//       <div className="container-main">
//         <div className="players-status">
//           <button
//             className="players-status"
//             // id={clickState ? "active-x-player" : "inactive-x-player"}
//           >
//             X
//           </button>
//           <button
//             className="players-status"
//             // id={!clickState ? "active-o-player" : "inactive-o-player"}
//           >
//             O
//           </button>
//         </div>

//         <div
//           className="board"
//           id={board.size === 3 ? "board-3x3" : "board-4x4"}
//         >
//           {createBoard(CELLNUMBER)}
//         </div>
//       </div>
//     </div>
//   );
// };

export default Board;
