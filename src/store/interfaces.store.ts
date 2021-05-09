
/**
 * Global Cell Interface
 */
export interface iCell {
  oneDPosition: number;
  currentPlayer: string;
}

/**
 * Global Cell Interface with function
 */
export interface iCellProps extends iCell {
  onClick: () => void;
}

/**
 * Global CreateGame Interface
 */
export interface iCreateGame {
  boardSideLength: number;
  userId: string;
}

export interface iJoinGame {
  gameId: string;
  userId: string;
}
export interface iMakeMove extends iJoinGame {
  move: number;
}

export enum ReadyStatus {
  SUCCESS = "joined",
}

export type StatusFlag = "playing" | "waiting" | "played" | "abandoned";
export interface GameSchema {
  id: string;
  boardSideLength: number;
  player1Id: string;
  player2Id: string | null;
  currPlayerId: string;
  winnerId: string | null;
  status: StatusFlag;
  player1MoveList: number[];
  player2MoveList: number[];
}
