import { Router } from "express";
import {
  createCard,
  getCard,
  getCardsByBoard,
  updateCard,
  deleteCard,
  updateCardOrder,
  reorderCards,
} from "../controllers/cardController";
import {
  validateBoardIdParam,
  validateCardId,
  validateCreateCard,
  validateReorderCards,
  validateUpdateCard,
  validateUpdateCardOrder,
} from "../middleware/validation";

const router = Router();

router.post("/", validateCreateCard, createCard);
router.get("/:card_id", validateCardId, getCard);
router.put("/:card_id", validateUpdateCard, updateCard);
router.delete("/:card_id", validateCardId, deleteCard);

router.get("/board/:board_id", validateCardId, getCardsByBoard);
router.patch("/:card_id/order", validateUpdateCardOrder, updateCardOrder);
router.patch("/board/:board_id/reorder", validateReorderCards, reorderCards);

export default router;
