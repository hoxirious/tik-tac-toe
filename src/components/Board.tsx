import React, { useState } from "react"
import Cell from "./Cell"
import './Board.css';


/*
*   0 | 1 | 2
*  ---+---+---
*   3 | 4 | 5
*  ---+---+---
*   6 | 7 | 8
*/

function Board(props: any) {

    const CELLNUMBER: number = 9;
    const [cellsState, setCellsState] = useState(Array(CELLNUMBER).fill(''));
    const [clickState, setClickState] = useState(true);

    const handlePlayer = (whichCell: number) => {
        const cells = cellsState.slice();
        const xPlayer = clickState;
        if (props.calculateWinner(cells) || cells[whichCell]) {
            console.log(props.calculateWinner(cells));
            return;
        }
        cells[whichCell] = xPlayer ? 'X' : 'O';
        setCellsState(cells);
        setClickState(!clickState);
    }

    const createCell = (whichCell: number) => {
        return (
            <Cell player={cellsState[whichCell]} onClick={() => { handlePlayer(whichCell) }} />
        )
    }
    const createBoard = (rows: number, cols: number) => {
        const board = [];
        let counter = 0;
        for (let currentRow = 0; currentRow < rows; currentRow++) {
            let columns = [];
            for (let currentCol = 0; currentCol < cols; currentCol++) {
                columns.push(createCell(counter));
                counter++;
            }
            board.push(<div key={currentRow} className="board-row">{columns}</div>);
        }
        return board;
    }

    return (
        <div className="container">
            <h1>TIC TAC T🎅E!</h1>

            <div className="players" >
                <button id="x-player">X</button>
                <button id="o-player">O</button>
            </div>

            <div className="board">{createBoard(3, 3)}</div>
        </div>
    )
}

export default Board
