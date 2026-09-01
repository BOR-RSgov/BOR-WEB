import { body } from "express-validator";

export const projectValidator = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("status").optional().isIn(["upcoming", "ongoing", "completed"]).withMessage("Invalid status"),
];