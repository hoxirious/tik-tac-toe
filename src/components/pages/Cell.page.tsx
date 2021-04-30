import { iCellProps } from "../../store/interfaces.store";

function Cell(props: iCellProps) {
  const { currentPlayer, onClick } = props;

  const decidePlayer = (player: string) => {
    return player === "X" ? true : false;
  };

  return (
    <div>
      <button
        className="square"
        onClick={onClick}
        id={decidePlayer(currentPlayer) ? "square-xplayer" : "square-oplayer"}
      >
        {currentPlayer}
      </button>
    </div>
  );
}

export default Cell;
