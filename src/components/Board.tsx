import React, { useState } from "react"
import Cell from "./Cell"


/*
*   0 | 1 | 2
*  ---+---+---
*   3 | 4 | 5
*  ---+---+---
*   6 | 7 | 8
*/

function calculateWinner(squares:Array<9>) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          console.log(squares[a]);
        return squares[a];
      }
    }
    return null;
  }
function Board() {
    const CELLNUMBER:number = 9; 
    const [cellsState, setCellsState] = useState(Array(CELLNUMBER).fill(''));
    const [clickState, setClickState] = useState(true);

    const handlePlayer = (whichCell:number) => {
        
            const cells = cellsState.slice();
            const xPlayer = clickState; 
            if (calculateWinner(cells) || cells[whichCell]) {   
                console.log(calculateWinner(cells));
                return;
            }
            cells[whichCell] = xPlayer ? 'X' : 'O';         
            setCellsState(cells);
            setClickState(!clickState);
        }
    
    const createCell = (whichCell:number) =>{
        // console.log(cellsState);
        return(
            <Cell player={cellsState[whichCell]} onClick={() => {handlePlayer(whichCell)}}/>
        )
    }

    
    
    // const createRow = (row:number) => {
    //     // console.log(cellsState);
    //     let rows =[]; 
    //     for (var whichCell = row*3; whichCell < (row+1)*3; whichCell++) {
    //             rows.push(<Cell player={whichCell} onClick={() => {handlePlayer(whichCell)}}/>)
    //         }
    //         // cellsState[whichCell]
    //     return rows; 
    // }

    return (
        <div>
            <h1>TIC TAC TOE!</h1>
            
            <div className="board-row">
                {createCell(0)}
                {createCell(1)}
                {createCell(2)}
            </div>
            <div className="board-row">
                {createCell(3)}
                {createCell(4)}
                {createCell(5)}
            </div>
            <div className="board-row">
                {createCell(6)}
                {createCell(7)}
                {createCell(8)}
            </div>
            
        </div>
    )
}

export default Board
/*
r tipe16 tục thêm tí style
r hiển thị bên phải ai đang chơi này nọ xem
sau đó thử dùng useEffect hay gì để theo dõi xem ai thắng thử
 */