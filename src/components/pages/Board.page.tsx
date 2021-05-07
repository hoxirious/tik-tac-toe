import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { useStoreActions, useStoreState } from "../../store/hooks.store";
import "../styles/pages/loader.styles.pages";
import Cell from "./Cell.page";

/**
 *
 * @returns A board game with given size
 */
const Board = () => {
  const db = firebase.firestore();

  //Initialize store states, actions and thunks
  const { boardSide, board, isWon } = useStoreState((store) => {
    return store.boardModel;
  });

  const { boardSideP2 } = useStoreState((store) => {
    return store.joinModel;
  });

  const { thunkToSetCell, setIsWon } = useStoreActions(
    (actions) => {
      return actions.boardModel;
    },
  );

  //Initialize local states
  const localBoardSide = boardSide === 0 ? boardSideP2 : boardSide;
  const totalCells = localBoardSide * localBoardSide;

  const [cellsState, setCellsState] = useState(Array(totalCells).fill(""));
  const [clickState, setClickState] = useState(true);
  /**
   * @todos Real-time Database Listener that triggered once when gameId
   * is set or updated. Then fire to toRetrieveIsWon to update state in store.
   * @param docId is the gameId
   */
  const realtimeListener = (docId: string) => {
    db.collection("gameCollection")
      .doc(docId)
      .onSnapshot((snapshot) => {
        toRetrieveIsWon(snapshot.data());
      });
  };

  /**
   * @todos Update isWon state in store if condition satisfied
   * @param data
   */
  const toRetrieveIsWon = (
    data: firebase.firestore.SnapshotOptions | undefined,
  ) => {
    if (data === "true") {
      setIsWon(true);
    } else {
      console.error("The response of data is not isWon boolean");
    }
  };

  /**
   * UseEffect that helps trigger realtimeListener once with given gameId
   */
  useEffect(() => {
    // setUpBoardData(localBoardSide);
    
    // realtimeListener(gameId);
  }, []);

  /**
   *
   * @param whichCell given cell's position
   * @todo This will add played value into cellsState array and
   * use thunk to update state in store
   */
  const handlePlayer = (whichCell: number) => {
    if (isWon) {
      return;
    }
    const cells = cellsState.slice();
    const xPlayer = clickState;

    cells[whichCell] = xPlayer ? "X" : "O";
    setCellsState(cells);
    thunkToSetCell({
      oneDPosition: whichCell,
      currentPlayer: cells[whichCell],
    });
    setClickState((prev) => !prev);
  };

  /**
   *
   * @param whichCell given cell's position
   * @returns a Cell at given position
   */
  const createCell = (whichCell: number) => {
    return (
      <Cell
        key={whichCell}
        oneDPosition={whichCell}
        currentPlayer={board[whichCell].currentPlayer}
        onClick={() => {
          handlePlayer(whichCell);
        }}
      />
    );
  };

  /**
   *
   * @param rows row size
   * @param cols column size
   * @returns Array of Cells for the UI
   */
  const createBoardUI = (rows: number, cols: number) => {
    const BoardUI = [];
    for (let currentRow = 0; currentRow < rows; currentRow++) {
      let columns = [];

      for (let currentCol = 0; currentCol < cols; currentCol++) {
        const oneDPosition = currentCol * cols + (currentRow % rows);
        columns.push(createCell(oneDPosition));
      }
      BoardUI.push(
        <div key={currentRow} className="board-row">
          {columns}
        </div>,
      );
    }
    return BoardUI;
  };
  // if (board == null) {
  //   return null;
  // } else
    return (
      <div className="container">
        <div className="container-main">
          <div className="container-title">TIC TAC T🎅E!</div>
          <div className="players-status">
            <button
              className="players-status"
              id={clickState ? "active-x-player" : "inactive-x-player"}
            >
              X
            </button>
            <button
              className="players-status"
              id={!clickState ? "active-o-player" : "inactive-o-player"}
            >
              O
            </button>
          </div>
          <div
            className="board"
            id={localBoardSide === 3 ? "board-3x3" : "board-4x4"}
          >
            {createBoardUI(localBoardSide, localBoardSide)}
          </div>

          {/* <Row className="justify-content-md-center">
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </Row> */}
        </div>
      </div>
    );
};

export default Board;
