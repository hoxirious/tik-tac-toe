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

export default Cell;
