import { Router } from "express";
import { createBoard, getBoard, updateBoard, deleteBoard } from "../controllers/boardControler";
import { validateBoardId, validateCreateBoard, validateUpdateBoard } from "../middleware/validation";

const router = Router();

router.post("/", validateCreateBoard, createBoard);
router.get("/:board_id", validateBoardId, getBoard);
router.put("/:board_id", validateUpdateBoard, updateBoard);
router.delete("/:board_id", validateBoardId, deleteBoard);

export default router;