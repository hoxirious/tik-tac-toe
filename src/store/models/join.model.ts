import axios from "axios";
import { action, Action, thunk, Thunk } from "easy-peasy";
import firebase from "firebase/app";
import "firebase/firestore";
import { Model } from "../../loader/model.loader";
import {
  GameSchema,
  iCell,
  iCreateGame,
  iJoinGame,
  ReadyStatus,
} from "../interfaces.store";

interface JoinStatus {
  userId: string;
  isReady: boolean;
  gameId: string;
  boardSideP2: number;
  currPlayerId: string;
}

interface JoinAction {
  setReady: Action<this, boolean>;
  setUserId: Action<this, string>;
  setGameId: Action<this, string>;
  setBoardSideP2: Action<this, number>;
  setCurrPlayerId: Action<this, string>;
}
interface JoinThunk {
  thunkSendCreateGame: Thunk<this, iCreateGame>;
  thunkSendJoinGame: Thunk<this, iJoinGame, any, any, Promise<void>>;
  thunkOnSnapShot: Thunk<this, string, undefined, Model, Promise<void>>;
}

export interface JoinModel extends JoinStatus, JoinAction, JoinThunk {}

export const joinModel: JoinModel = {
  isReady: false,
  userId: "",
  gameId: "",
  boardSideP2: 0,
  currPlayerId: "",

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

  setBoardSideP2: action((state, payload) => {
    state.boardSideP2 = payload;
  }),

  setCurrPlayerId: action((state, payload) => {
    state.currPlayerId = payload;
  }),

  thunkOnSnapShot: thunk(
    async (action, payload, { getState, getStoreActions }) => {
      const db = firebase.firestore();
      db.collection("gameCollection")
        .doc(payload)
        .onSnapshot((snapshot) => {
          parseSnapshot(snapshot);
        });

      const parseSnapshot = (snapshot: firebase.firestore.DocumentSnapshot) => {
        const doc = snapshot.data() as GameSchema | undefined;

        if (doc) {
          
          action.setCurrPlayerId(doc.currPlayerId);
          const isPlayerOne = getState().userId === doc.player1Id;
          const length = isPlayerOne
            ? doc.player2MoveList.length
            : doc.player1MoveList.length;
          const oneDPosition = isPlayerOne
            ? doc.player2MoveList[length - 1]
            : doc.player1MoveList[length - 1];
          const updateBoard = (responseCell: iCell) => {
            getStoreActions().boardModel.thunkToSetCell(responseCell);
          };
          if (oneDPosition != null) {
            if (isPlayerOne) {
              const responseCell: iCell = {
                oneDPosition: oneDPosition,
                currentPlayer: "O",
              };
              updateBoard(responseCell);
            } else {
              const responseCell: iCell = {
                oneDPosition: oneDPosition,
                currentPlayer: "X",
              };
              updateBoard(responseCell);
            }
          }
        }
      };
    },
  ),

  thunkSendCreateGame: thunk(async (action, payload) => {
    await axios
      .post("http://localhost:5001/tic-tac-toe-90fde/us-central1/createGame", {
        boardSideLength: payload.boardSideLength,
        userId: payload.userId,
      })
      .then((response) => {
        const responseGameId = response.data.gameId;
        //response is gameID
        action.setGameId(responseGameId);
        //function start onSnapshot
        action.thunkOnSnapShot(responseGameId);
      })
      .catch((error) => {
        console.error("The response of gameId is not fullfilled");
      });
  }),

  thunkSendJoinGame: thunk(async (action, payload, { getState }) => {
    await axios
      .post("http://localhost:5001/tic-tac-toe-90fde/us-central1/joinGame", {
        userId: payload.userId,
        gameId: payload.gameId,
      })
      .then((response) => {
        //response is message and result
        if (response.data.result === ReadyStatus.SUCCESS) {
          action.setReady(true);
          action.setBoardSideP2(response.data.game.boardSideLength);
          action.thunkOnSnapShot(getState().gameId);
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
