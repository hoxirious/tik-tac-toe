import axios from "axios";
import { action, Action, Thunk, thunk } from "easy-peasy";
import { Model } from "../../loader/model.loader";
import {apiUrl, generateToken } from "../../services/firestore.service";
import { iCell, iMakeMove } from "../interfaces.store";

interface BoardState {
  board: iCell[];
  boardSide: number;
  yourMove: string;
  isWon: boolean;
  playerIds: string[];
  winner: string;
}

interface BoardActions {
  setBoardSide: Action<this, number>;
  createBoardData: Action<this, iCell[]>;
  setCell: Action<this, iCell>;
  pushCell: Action<this, iCell>;
  addPlayerIds: Action<this, string>;
  setIsWon: Action<this, boolean>;
  setYourMove: Action<this, string>;
  setWinner: Action<this, string>;
}

interface BoardThunk {
  thunkToSetCell: Thunk<this, iCell, undefined, Model>;
  thunkAddPlayerIds: Thunk<this, string, undefined, Model>;
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
  playerIds: [],
  winner: "",

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
  addPlayerIds: action((state, payload) => {
    state.playerIds.push(payload);
  }),

  setWinner: action((state, payload) => {
    state.winner = payload;
  }),

  //THUNKS
  thunkAddPlayerIds: thunk((actions, payload, { getState }) => {
    const playerIds = getState().playerIds;
    if (playerIds != null) {
      const userFound = playerIds.some((eachUser) => eachUser === payload);
      if (!userFound) {
        actions.addPlayerIds(payload);
      }
    } else {
      actions.addPlayerIds(payload);
    }
  }),

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
    const userToken = await generateToken();
    await axios
      .post(`${apiUrl}makeMove`, payload, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        actions.setIsWon(response.data.isWon);
      })
      .catch((error) => {
        console.error("Cannot make love");
      });
  }),
};
