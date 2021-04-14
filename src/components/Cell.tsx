import React, { useState } from 'react';
import './Style.css';

function Cell() {
    const [player,setPlayer] = useState('');

    const playerHandle = (click:boolean) =>{
        if(click === true)
        {
            return 'X';
        } 
        else return 'O';
    }

    return (
        <div>            
            <button className="square" onClick={() =>setPlayer(playerHandle(false))}>{player}</button>
        </div>
    )
}

export default Cell

