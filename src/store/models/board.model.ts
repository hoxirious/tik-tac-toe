import { action, Action, Thunk, thunk } from "easy-peasy";
import { iCell } from "../interfaces.store";
import axios from "axios";
import { Model } from "./loader.model";

interface BoardState {
  board: iCell[];
  boardSide: number;
}

interface BoardActions {
  setBoardSide: Action<this, number>;
  setCell: Action<this, iCell>;
}

interface BoardThunk {
  sendBoardSide: Thunk<this, number, undefined, Model>;
  sendCellState: Thunk<this, iCell, undefined, Model>;
  beforeSetCell: Thunk<this, iCell, undefined, Model>;
}

export interface BoardModel extends BoardState, BoardActions, BoardThunk {}

export const boardModel: BoardModel = {
  board: [{oneDPosition: 0,
    whatPlayer: "X",}],
  boardSide: 3,


  //ACTIONS
  setBoardSide: action((state, payload) => {
    state.boardSide = payload;
  }),

  setCell: action((state, payload) => {
    state.board.push(payload);
  }),


  //THUNKS
  beforeSetCell: thunk((actions, payload, { getStoreState })=>
      {const {board} = getStoreState().boardModel; 
      const cellFound = board.find((cell) => cell.oneDPosition==payload.oneDPosition)
    
      if(cellFound){
        actions.setCell(payload);
      }
    }
  ),
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
