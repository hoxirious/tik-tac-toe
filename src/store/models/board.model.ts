import axios from "axios";
import { action, Action, Thunk, thunk } from "easy-peasy";
import { iCell, iMakeMove } from "../interfaces.store";
import { Model } from "../../loader/model.loader";

interface BoardState {
  board: iCell[];
  boardSide: number;
  isWon: boolean;
}

interface BoardActions {
  setBoardSide: Action<this, number>;
  createBoardData: Action<this, iCell[]>;
  setCell: Action<this, iCell>;
  pushCell: Action<this, iCell>;
  setIsWon: Action<this, boolean>;
}

interface BoardThunk {
  thunkToSetCell: Thunk<this, iCell, undefined, Model>;
  thunkSendMakeMove: Thunk<this, iMakeMove, undefined, Model>;
}

export interface BoardModel extends BoardState, BoardActions, BoardThunk {}

/**
 * Initialization of boardModel
 */
export const boardModel: BoardModel = {
  board: [],
  boardSide: 0,
  isWon: false,

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

  setIsWon: action((state, payload) => {
    state.isWon = payload;
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

  thunkSendMakeMove: thunk(async (actions, payload) => {
    await axios
      .post(
        "(http://localhost:5001/tic-tac-toe-90fde/us-central1/makeMove).",
        payload,
      )
      .then((response) => {
        actions.setIsWon(response.data);
      })
      .catch((error) => {
        console.error("Cannot make love");
      });
  }),
};
