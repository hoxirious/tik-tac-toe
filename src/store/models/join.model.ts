import axios from "axios";
import { action, Action, thunk, Thunk } from "easy-peasy";
import firebase from "firebase/app";
import "firebase/firestore";
import { Model } from "../../loader/model.loader";
import { apiUrl, generateToken } from "../../services/firestore.service";
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
  currPlayerId: string;
}

interface JoinAction {
  setReady: Action<this, boolean>;
  setUserId: Action<this, string>;
  setGameId: Action<this, string>;
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
          getStoreActions().boardModel.setBoardSide(doc.boardSideLength);

          if (doc.id != null) {
            getStoreActions().joinModel.setGameId(doc.id);
          }

          if (doc.winnerId != null) {
            getStoreActions().boardModel.setWinner(doc.winnerId);
          }
          if (doc.player1Id != null) {
            getStoreActions().boardModel.thunkAddPlayerIds(doc.player1Id);
          }
          if (doc.player2Id != null) {
            getStoreActions().joinModel.setReady(true);
            getStoreActions().boardModel.thunkAddPlayerIds(doc.player2Id);
          }

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
    const userToken = await generateToken();
    console.log(`Create game token is ${userToken}`);
    await axios
      .post(
        `${apiUrl}createGame`,
        {
          boardSideLength: payload.boardSideLength,
          userId: payload.userId,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
      )
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
    const userToken = await generateToken();
    await axios
      .post(
        `${apiUrl}joinGame`,
        {
          userId: payload.userId,
          gameId: payload.gameId,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
      )
      .then((response) => {
        //response is message and result
        if (response.data.result === ReadyStatus.SUCCESS) {
          action.thunkOnSnapShot(getState().gameId);
        } else {
          console.error("The player is not ready");
        }
      })
      .catch((error) => {
        console.error("The response of Join Game is not fullfilled");
      });
  }),
};
