import { Types } from "mongoose";
import CardModel, { ICard } from "../models/Card";

export const createCard = async (
  board_id: string,
  title: string,
  description: string,
  status: "To do" | "In progress" | "Done",
  order?: number
): Promise<ICard> => {
  let cardOrder = order;
  if (cardOrder === undefined) {
    const highestOrderCard = await CardModel.findOne({ board_id })
      .sort({ order: -1 })
      .exec();
    cardOrder = highestOrderCard ? highestOrderCard.order + 1 : 0;
  }

  const newCard = new CardModel({
    board_id: new Types.ObjectId(board_id),
    title,
    description,
    status,
    order: cardOrder,
  });

  return await newCard.save();
};

export const getCard = async (card_id: string): Promise<ICard> => {
  const card = await CardModel.findById(card_id).populate("board_id");

  if (!card) {
    throw { status: 404, message: "Card not found" };
  }

  return card;
};

export const getCardsByBoard = async (board_id: string): Promise<ICard[]> => {
  const cards = await CardModel.find({ board_id })
    .populate("board_id")
    .sort({ order: 1 });

  return cards;
};

export const updateCard = async (
  card_id: string,
  updateData: Partial<{
    title: string;
    description: string;
    status: "To do" | "In progress" | "Done";
    order: number;
  }>
): Promise<ICard> => {
  const card = await CardModel.findByIdAndUpdate(card_id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!card) {
    throw { status: 404, message: "Card not found" };
  }

  return card;
};

export const deleteCard = async (card_id: string): Promise<ICard> => {
  const card = await CardModel.findByIdAndDelete(card_id);

  if (!card) {
    throw { status: 404, message: "Card not found" };
  }

  return card;
};

export const updateCardOrder = async (
  card_id: string,
  newOrder: number,
  newStatus?: "To do" | "In progress" | "Done"
): Promise<ICard> => {
  const updateData: any = { order: newOrder };
  if (newStatus) {
    updateData.status = newStatus;
  }

  const card = await CardModel.findByIdAndUpdate(card_id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!card) {
    throw { status: 404, message: "Card not found" };
  }

  return card;
};

export const reorderCards = async (
  board_id: string,
  cardOrder: { card_id: string; order: number }[]
): Promise<void> => {
  const bulkOps = cardOrder.map(({ card_id, order }) => ({
    updateOne: {
      filter: { _id: card_id, board_id },
      update: { order },
    },
  }));

  await CardModel.bulkWrite(bulkOps);
};
