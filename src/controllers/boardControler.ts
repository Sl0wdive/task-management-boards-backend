import { Request, Response } from "express";

import * as boardService from "../services/boardService";

export const createBoard = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Board name is required" });
    }

    const board = await boardService.createBoard(name);
    res.status(201).json({ message: "Board created successfully", board });
  } catch (error: any) {
    console.error("error creating board", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getBoard = async (req: Request, res: Response) => {
  try {
    const { board_id } = req.params;

    if (!board_id) {
      return res.status(400).json({ message: "Board ID is required" });
    }

    const board = await boardService.getBoard(board_id);
    res.status(200).json(board);
  } catch (error: any) {
    console.error("Error getting board", error);

    if (error.status === 404) {
      return res.status(404).json({ message: error.message });
    }

    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateBoard = async (req: Request, res: Response) => {
  try {
    const { board_id } = req.params;
    const { name } = req.body;

    if (!board_id) {
      return res.status(400).json({ message: "Board ID is required" });
    }

    if (!name) {
      return res.status(400).json({ message: "Board name is required" });
    }

    const updateBoard = await boardService.updateBoard(board_id, name);
    res.status(200).json({
      message: "Board updated successfully",
      updateBoard,
    });
  } catch (error: any) {
    console.error("Error updating board:", error);

    if (error.status === 404) {
      return res.status(404).json({ message: error.message });
    }

    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteBoard = async (req: Request, res: Response) => {
  try {
    const { board_id } = req.params;

    if (!board_id) {
      return res.status(400).json({ message: "Board ID is required" });
    }

    await boardService.deleteBoard(board_id);
    res.status(200).json({ message: "Board deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting board:", error);

    if (error.status === 404) {
      return res.status(404).json({ message: error.message });
    }

    res.status(500).json({ message: "Internal server error" });
  }
};
