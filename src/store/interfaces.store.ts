export interface iCell{
    oneDPosition: number,
    whatPlayer: string
};

export interface iCellProps {
    player: string;
    onClick: () => void;
  }