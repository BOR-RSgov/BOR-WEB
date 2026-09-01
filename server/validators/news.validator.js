import { body } from "express-validator";

export const newsValidator = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("content").trim().notEmpty().withMessage("Content is required"),
  body("status").optional().isIn(["draft", "scheduled", "published"]).withMessage("Invalid status"),
  body("publishDate").optional().isISO8601().withMessage("Invalid publish date"),
];