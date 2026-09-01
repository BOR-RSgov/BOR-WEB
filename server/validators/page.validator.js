import { body } from "express-validator";

export const pageValidator = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("content").trim().notEmpty().withMessage("Content is required"),
  body("status").optional().isIn(["draft", "published"]).withMessage("Invalid status"),
];