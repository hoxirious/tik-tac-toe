import axios from "axios";
import { action, Action, Thunk, thunk } from "easy-peasy";
import { Model } from "../../loader/model.loader";
import { iCell, iMakeMove } from "../interfaces.store";

interface BoardState {
  board: iCell[];
  boardSide: number;
  yourMove: string;
  isWon: boolean;
}

interface BoardActions {
  setBoardSide: Action<this, number>;
  createBoardData: Action<this, iCell[]>;
  setCell: Action<this, iCell>;
  pushCell: Action<this, iCell>;
  setIsWon: Action<this, boolean>;
  setYourMove: Action<this, string>;
}

interface BoardThunk {
  thunkToSetCell: Thunk<this, iCell, undefined, Model>;
  thunkSendMakeMove: Thunk<this, iMakeMove, undefined, Model, Promise<void>>;
}

export interface BoardModel extends BoardState, BoardActions, BoardThunk {}

/**
 * Initialization of boardModel
 */
export const boardModel: BoardModel = {
  board: [],
  boardSide: 0,
  isWon: false,
  yourMove: "",

  //ACTIONS
  setYourMove: action((state, payload) => {
    state.yourMove = payload;
  }),
  setBoardSide: action((state, payload) => {
    state.boardSide = payload;
  }),

  pushCell: action((state, payload) => {
    state.board.push(payload);
  }),

  setCell: action((state, payload) => {
    const atCell: number = payload.oneDPosition;
    state.board[atCell].currentPlayer = payload.currentPlayer;
  }),

  createBoardData: action((state, payload) => {
    state.board = payload;
  }),

  setIsWon: action((state, payload) => {
    state.isWon = payload;
  }),

  //THUNKS
  thunkToSetCell: thunk((actions, payload, { getStoreState }) => {
    const { board } = getStoreState().boardModel;
    const cellFound = board.some(
      (cell) => cell.oneDPosition === payload.oneDPosition,
    );

    if (!cellFound) {
      actions.pushCell(payload);
    } else {
      actions.setCell(payload);
    }
  }),

  thunkSendMakeMove: thunk(async (actions, payload) => {
    await axios
      .post(
        "http://localhost:5001/tic-tac-toe-90fde/us-central1/makeMove",
        payload,
      )
      .then((response) => {
        actions.setIsWon(response.data.isWon);
      })
      .catch((error) => {
        console.error("Cannot make love");
      });
  }),
};
