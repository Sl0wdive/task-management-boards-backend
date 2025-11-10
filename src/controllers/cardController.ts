import { Request, Response } from "express";
import * as cardService from "../services/cardService";

export const createCard = async (req: Request, res: Response) => {
  try {
    const { board_id, title, description, status, order } = req.body;

    if (!board_id || !title || !description) {
      return res
        .status(400)
        .json({ message: "Board ID, title, and description are required" });
    }

    const card = await cardService.createCard(
      board_id,
      title,
      description,
      status,
      order
    );

    res.status(201).json({ message: "Card created successfully", card });
  } catch (error: any) {
    console.error("Error creating card:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: "Internal server error" });
  }
};
export const getCard = async (req: Request, res: Response) => {
  try {
    const { card_id } = req.params;

    if (!card_id) {
      return res.status(400).json({ message: "Card ID is required" });
    }

    const card = await cardService.getCard(card_id);
    res.status(200).json(card);
  } catch (error: any) {
    console.error("Error getting card:", error);

    if (error.status === 404) {
      return res.status(404).json({ message: error.message });
    }

    res.status(500).json({ message: "Internal server error" });
  }
};
export const getCardsByBoard = async (req: Request, res: Response) => {
  try {
    const { board_id } = req.params;

    if (!board_id) {
      return res.status(400).json({ message: "Board ID is required" });
    }

    const cards = await cardService.getCardsByBoard(board_id);
    res.status(200).json(cards);
  } catch (error) {
    console.error("Error getting cards by board:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const updateCard = async (req: Request, res: Response) => {
  try {
    const { card_id } = req.params;
    const { title, description, status, order } = req.body;

    if (!card_id) {
      return res.status(400).json({ message: "Card ID is required" });
    }

    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (status !== undefined) updateData.status = status;
    if (order !== undefined) updateData.order = order;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No fields to update" });
    }
    const updatedCard = await cardService.updateCard(card_id, updateData);
    res
      .status(200)
      .json({ message: "Card updated successfully", card: updatedCard });
  } catch (error: any) {
    console.error("Error updating card:", error);

    if (error.status === 404) {
      return res.status(404).json({ message: error.message });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: "Internal server error" });
  }
};
export const deleteCard = async (req: Request, res: Response) => {
  try {
    const { card_id } = req.params;

    if (!card_id) {
      return res.status(400).json({ message: "Card ID is required" });
    }

    await cardService.deleteCard(card_id);
    res.status(200).json({ message: "Card deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting card:", error);

    if (error.status === 404) {
      return res.status(404).json({ message: error.message });
    }

    res.status(500).json({ message: "Internal server error" });
  }
};
export const updateCardOrder = async (req: Request, res: Response) => {
  try {
    const { card_id } = req.params;
    const { order, status } = req.body;

    if (!card_id) {
      return res.status(400).json({ message: "Card ID is required" });
    }

    if (order === undefined) {
      return res.status(400).json({ message: "Order is required" });
    }

    const updatedCard = await cardService.updateCardOrder(
      card_id,
      order,
      status
    );
    res
      .status(200)
      .json({ message: "Card order updated successfully", card: updatedCard });
  } catch (error: any) {
    console.error("Error updating card order:", error);

    if (error.status === 404) {
      return res.status(404).json({ message: error.message });
    }

    res.status(500).json({ message: "Internal server error" });
  }
};
export const reorderCards = async (req: Request, res: Response) => {
  try {
    const { board_id } = req.params;
    const { cardOrders } = req.body;

    if (!board_id) {
      return res.status(400).json({ message: "Board ID is required" });
    }

    if (!Array.isArray(cardOrders) || cardOrders.length === 0) {
      return res.status(400).json({
        message: "cardOrders array is required and must not be empty",
      });
    }

    await cardService.reorderCards(board_id, cardOrders);
    res.status(200).json({ message: "Cards reordered successfully" });
  } catch (error) {
    console.error("Error reordering cards:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
