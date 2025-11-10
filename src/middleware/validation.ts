import { body } from "express-validator";
import { param } from "express-validator";

export const validateCreateBoard = [
  body("name", "Board name must be between 1 and 100 characters.")
    .trim()
    .isLength({ min: 1, max: 100 })
    .escape(),
];

export const validateBoardId = [
  param("board_id", "Invalid board ID format.").isMongoId(),
];

export const validateUpdateBoard = [
  param("board_id", "Invalid board ID format.").isMongoId(),
  body("name", "Board name must be between 1 and 100 characters.")
    .trim()
    .isLength({ min: 1, max: 100 })
    .escape(),
];

export const validateCardId = [
  param("card_id", "Invalid card ID format.").isMongoId(),
];

export const validateBoardIdParam = [
  param("board_id", "Invalid board ID format.").isMongoId(),
];

export const validateCreateCard = [
  body("board_id", "Invalid board ID format.").isMongoId(),
  body("title", "Title must be between 1 and 200 characters.")
    .trim()
    .isLength({ min: 1, max: 200 })
    .escape(),
  body("description", "Description must be less than 1000 characters.")
    .trim()
    .isLength({ max: 1000 })
    .escape(),
  body("status", "Status must be one of: To do, In progress, Done.")
    .optional()
    .isIn(["To do", "In progress", "Done"]),
  body("order", "Order must be a positive integer.")
    .optional()
    .isInt({ min: 0 }),
];

export const validateUpdateCard = [
  param("card_id", "Invalid card ID format.").isMongoId(),
  body("title", "Title must be between 1 and 200 characters.")
    .optional()
    .trim()
    .isLength({ min: 1, max: 200 })
    .escape(),
  body("description", "Description must be less than 1000 characters.")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .escape(),
  body("status", "Status must be one of: To do, In progress, Done.")
    .optional()
    .isIn(["To do", "In progress", "Done"]),
  body("order", "Order must be a positive integer.")
    .optional()
    .isInt({ min: 0 }),
];

export const validateUpdateCardOrder = [
  param("card_id", "Invalid card ID format.").isMongoId(),
  body("order", "Order must be a positive integer.").isInt({ min: 0 }),
  body("status", "Status must be one of: To do, In progress, Done.")
    .optional()
    .isIn(["To do", "In progress", "Done"]),
];

export const validateReorderCards = [
  param("board_id", "Invalid board ID format.").isMongoId(),
  body("cardOrders", "cardOrders must be an array.").isArray(),
  body("cardOrders.*.card_id", "Invalid card ID in cardOrders.").isMongoId(),
  body(
    "cardOrders.*.order",
    "Order must be a positive integer in cardOrders."
  ).isInt({ min: 0 }),
];
