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


export const readyStatus = {
    result: "joined",
    message: "success"
}