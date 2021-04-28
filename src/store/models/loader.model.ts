import { boardModel, BoardModel } from "./board.model";

export interface Model {
    boardModel: BoardModel;
}

 const model: Model = {
    boardModel: boardModel
}

export default model; 