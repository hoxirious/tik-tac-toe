import React from 'react';
import './Style.css';

function Cell(props:any) {
    const {player,onClick} = props;
    return (
        <div>            
            <button className="square" onClick={onClick} >{player}</button>
            
        </div>
    )
}

export default Cell

