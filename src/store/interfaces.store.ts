export interface Cell{
    oneDPosition: number,
    isPlayerOne: boolean
};

export interface CellProps {
    player: string;
    onClick: () => void;
  }