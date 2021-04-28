import { CellProps } from "../../store/interfaces.store";


function Cell(props: CellProps) {
  const { player, onClick } = props;

  const decidePlayer = (player:string) => {
    return player === "X" ? true : false;
  };

  return (
    <div>
      <button
        className="square"
        onClick={onClick}
        id={decidePlayer(player) ? "square-xplayer" : "square-oplayer"}
      >
        {player}
      </button>
    </div>
  );
}
export default Cell;
