import BoardModel, { IBoard } from "../models/Board";

export const createBoard = async (name: string): Promise<IBoard> => {
  const newBoard = new BoardModel({ name });

  return await newBoard.save();
};

export const getBoard = async (board_id: string): Promise<IBoard> => {
  const board = await BoardModel.findById(board_id);

  if (!board) {
    throw { status: 404, message: "Board not found" };
  }

  return board;
};

export const updateBoard = async (board_id: string, name: string): Promise<IBoard> => {
  const board = await BoardModel.findByIdAndUpdate(
    board_id,
    { name },
    { new: true, runValidators: true },
  );

  if (!board) {
    throw { status: 404, message: "Board not found" };
  }

	return board;
};

export const deleteBoard = async(board_id: string): Promise<IBoard> => {
	const board = await BoardModel.findByIdAndDelete(board_id);

  if (!board) {
    throw { status: 404, message: "Board not found" };
  }
  
  return board;
}
