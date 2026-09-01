import { body } from "express-validator";

export const videoValidator = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("url").trim().isURL().withMessage("A valid video URL is required"),
];