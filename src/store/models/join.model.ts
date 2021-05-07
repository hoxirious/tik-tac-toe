import axios from "axios";
import { action, Action, thunk, Thunk } from "easy-peasy";
import { iCreateGame, iJoinGame, readyStatus } from "../interfaces.store";

interface JoinStatus {
  userId: string;
  isReady: boolean;
  gameId: string;
  boardSideP2: number;
}

interface JoinAction {
  setReady: Action<this, boolean>;
  setUserId: Action<this, string>;
  setGameId: Action<this, string>;
  setBoardSideP2: Action<this, number>;
}
interface JoinThunk {
  thunkSendCreateGame: Thunk<this, iCreateGame>;
  thunkSendJoinGame: Thunk<this, iJoinGame,any,any,Promise<void>>;
}

export interface JoinModel extends JoinStatus, JoinAction, JoinThunk {}

export const joinModel: JoinModel = {
  isReady: false,
  userId: "",
  gameId: "",
  boardSideP2: 0, 

  //ACTION
  setReady: action((state) => {
    state.isReady = true;
  }),

  setUserId: action((state, payload) => {
    state.userId = payload;
  }),

  setGameId: action((state, payload) => {
    state.gameId = payload;
  }),

  setBoardSideP2: action((state,payload)=> {
    state.boardSideP2 = payload; 
  }),

  thunkSendCreateGame: thunk(async (action, payload) => {
    await axios
      .post("http://localhost:5001/tic-tac-toe-90fde/us-central1/createGame", {
        boardSideLength: payload.boardSideLength,
        userId: payload.userId,
      })
      .then((response) => {
        //response is gameID
        action.setGameId(response.data.gameId);
      })
      .catch((error) => {
        console.error("The response of gameId is not fullfilled");
      });
  }),

  thunkSendJoinGame: thunk(async (action, payload) => {
    await axios
      .post("http://localhost:5001/tic-tac-toe-90fde/us-central1/joinGame", {
        userId: payload.userId,
        gameId: payload.gameId,
      })
      .then((response) => {
        //response is message and result
        if (
          response.data.result === readyStatus.result &&
          response.data.message === readyStatus.message
        ) {
          action.setReady(true);
          action.setBoardSideP2(response.data.game.boardSideLength);
          console.log(response.data.game.boardSideLength);
        } else {
          console.error("The player is not ready");
        }
      })
      .catch((error) => {
        console.error("The response of Join Game is not fullfilled");
      });
  }),
};
