import { boardModel, BoardModel } from "../store/models/board.model";
import { joinModel,JoinModel } from "../store/models/join.model";

export interface Model {
    boardModel: BoardModel;
    joinModel: JoinModel;
}

 export const model: Model = {
    boardModel: boardModel,
    joinModel: joinModel
}
