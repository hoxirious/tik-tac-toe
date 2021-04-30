import axios from "axios";
import { action, Action, Thunk, thunk } from "easy-peasy";
import { iCell } from "../interfaces.store";
import { Model } from "./loader.model";

interface BoardState {
  board: iCell[];
  boardSide: number;
}

interface BoardActions {
  setBoardSide: Action<this, number>;
  createBoardData: Action<this, iCell[]>;
  setCell: Action<this, iCell>;
  pushCell: Action<this, iCell>;
}

interface BoardThunk {
  sendBoardSide: Thunk<this, number, undefined, Model>;
  sendCellState: Thunk<this, iCell, undefined, Model>;
  thunkToSetCell: Thunk<this, iCell, undefined, Model>;
}

export interface BoardModel extends BoardState, BoardActions, BoardThunk {}

/**
 * Initialization of boardModel  
 */
export const boardModel: BoardModel = {
  board: [],
  boardSide: 0,

  //ACTIONS
  setBoardSide: action((state, payload) => {
    state.boardSide = payload;
  }),

  pushCell: action((state, payload) => {
    state.board.push(payload);
  }),

  setCell: action((state, payload) => {
    const atCell: number = payload.oneDPosition;
    state.board[atCell] = payload;
  }),

  createBoardData: action((state, payload) => {
    state.board = payload;
  }),

  //THUNKS
  thunkToSetCell: thunk((actions, payload, { getStoreState }) => {
    const { board } = getStoreState().boardModel;
    const cellFound = board.find(
      (cell) => cell.oneDPosition === payload.oneDPosition,
    );

    if (!cellFound) {
      actions.pushCell(payload);
    } else {
      actions.setCell(payload);
    }
  }),

  sendBoardSide: thunk((actions, payload, { getStoreState }) => {
    axios
      .post("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });
  }),

  sendCellState: thunk((actions, payload, { getStoreState }) => {
    axios
      .post("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });
  }),
};
