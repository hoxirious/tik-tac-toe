import { Cell } from "../interfaces.store";
 
interface BoardState {
    cells: Cell[]; 
    boardSide: number;
}

export interface BoardModel extends BoardState {}

export const boardModel:BoardModel = {
    cells: [],
    boardSide: 3  

}