import React, { useState } from "react"
import Cell from "./Cell"

function Board() {
    const CELLNUMBER:number = 9; 
    const [cellsState, setCellsState] = useState(Array(CELLNUMBER).fill(''));
    const [clickState, setClickState] = useState(true);

    const handlePlayer = (whichCell:number) => {
             const cells = cellsState.slice();
             const xPlayer = clickState; 
             cells[whichCell] = xPlayer ? 'X' : 'O' ;         
             setClickState(!clickState);
             setCellsState(cells);
    }



    const createCell = (whichCell:number) => {
        return(
            <Cell player={cellsState[whichCell]} onClick={() => { handlePlayer(whichCell)}} />
        )
        
    }

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
