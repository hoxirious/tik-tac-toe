function Cell(props: any) {
  const { player, onClick } = props;

  const decidePlayer = () => {
    return player === "X" ? true : false;
  };
  return (
    <div>
      <button
        className="square"
        onClick={onClick}
        id={decidePlayer() ? "square-xplayer" : "square-oplayer"}
      >
        {" "}
        {player}{" "}
      </button>
    </div>
  );
}
// import React, { useState } from "react";

// const Cell = (props: { key: number }) => {
//   type PLAYER = "X" | "O";
//   const [whichPlayer, setWhichPlayer] = useState<PLAYER>("X");
//   const { key } = props;

//   const handleClick = () => {
//     setWhichPlayer("X" ? "O" : "X");
//   };

//   return (
//     <div>
//       <button
//         className="square"
//         onClick={() => handleClick()}
//         id={whichPlayer == "X" ? "square-xplayer" : "square-oplayer"}
//       >
//         {whichPlayer}
//       </button>
//     </div>
//   );
// };

export default Cell;
