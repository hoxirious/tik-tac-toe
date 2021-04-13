import React from "react"
import Cell from "./Cell"

function Board() {
    return (
        <div>
            <h1>TIC TAC TOE!</h1>
            <div className="board-row">
                <Cell/>
                <Cell/>
                <Cell/>
            </div>
            <div className="board-row">
                <Cell/>
                <Cell/>
                <Cell/>
            </div>
            <div className="board-row">
                <Cell/>
                <Cell/>
                <Cell/>
            </div>
            
        </div>
    )
}

export default Board
