import { useStoreState } from "../../store/hooks.store";
import { iCellProps } from "../../store/interfaces.store";

function Cell(props: iCellProps) {
  const { oneDPosition, currentPlayer, onClick } = props;

  const { userId, currPlayerId, isReady } = useStoreState((store) => {
    return store.joinModel;
  });

  const { board } = useStoreState((store) => {
    return store.boardModel;
  });

  const decidePlayer = (player: string) => {
    return player === "X" ? true : false;
  };

  const handlerCellOnClick = () => {
    onClick();
  };

  const isYourTurn = () => {
    return userId === currPlayerId;
  };
  const activeBoard = () => {
    return (
      <button
        className="square"
        onClick={() => handlerCellOnClick()}
        id={decidePlayer(currentPlayer) ? "square-xplayer" : "square-oplayer"}
      >
        {board[oneDPosition].currentPlayer}
      </button>
    );
  };
  const staticBoard = () => {
    return (
      <button
        className="square"
        id={decidePlayer(currentPlayer) ? "square-xplayer" : "square-oplayer"}
      >
        {board[oneDPosition].currentPlayer}
      </button>
    );
  };

  return (
    <div>
      {isReady  && (
        <div>
          {isYourTurn() && activeBoard()}
          {!isYourTurn() && staticBoard()}
        </div>
      )}

      {!isReady  && (
        <div>
          {isYourTurn() && staticBoard()}
          {!isYourTurn() && staticBoard()}
        </div>
      )}

    </div>
  );
}
export default Cell;
