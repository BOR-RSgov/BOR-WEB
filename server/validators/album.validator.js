import { body } from "express-validator";

export const albumValidator = [
  body("title").trim().notEmpty().withMessage("Album title is required"),
];