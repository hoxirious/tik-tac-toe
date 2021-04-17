import React from "react";
import Board from "./Board";
import './PlayGround.css';
import { Link } from 'react-router-dom';

const PlayGround = () => {
    const calculateWinner = (squares: Array<9>) => {
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

    return (
        <>
        <nav className="nav">
            <div className="nav-container">
                <ul className="nav-menu">
                    <li className="nav-item">
                        <Link to="/home" className="nav-links">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/3x3" className="nav-links">
                            3x3
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/4x4" className="nav-links">
                            4x4
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
        <div>
            <Board calculateWinner={calculateWinner} />
        </div>
        </>
    )
}

export default PlayGround;