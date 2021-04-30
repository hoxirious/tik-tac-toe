/**
 * Global Cell Interface 
 */
export interface iCell{
    oneDPosition: number,
    currentPlayer: string
};

/**
 * Global Cell Interface with function
 */
export interface iCellProps extends iCell{
    onClick: () => void
  }