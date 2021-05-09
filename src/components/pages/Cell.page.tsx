import { useStoreState } from "../../store/hooks.store";
import { iCellProps } from "../../store/interfaces.store";

function Cell(props: iCellProps) {
  const { oneDPosition, currentPlayer, onClick } = props;

  const { userId, currPlayerId } = useStoreState((store) => {
    return store.joinModel;
  });

  const { board } = useStoreState((store) => {
    return store.boardModel;
  });

  const decidePlayer = (player: string) => {
    return player === "X" ? true : false;
  };

  const handlerCellOnClick = () => {
    console.log("Call here");
    onClick();
  };

  const isYourTurn = () => {
    return userId === currPlayerId;
  };

  return (
    <div>
      {isYourTurn() && (
        <button
          className="square"
          onClick={() => handlerCellOnClick()}
          id={decidePlayer(currentPlayer) ? "square-xplayer" : "square-oplayer"}
        >
          {board[oneDPosition].currentPlayer}
        </button>
      )}

      {!isYourTurn() && (
        <button
          className="square"
          id={decidePlayer(currentPlayer) ? "square-xplayer" : "square-oplayer"}
        >
          {/* {oneDPosition} */}
          {board[oneDPosition].currentPlayer}
        </button>
      )}
    </div>
  );
}

export default Cell;
