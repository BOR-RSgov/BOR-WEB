import { body } from "express-validator";

export const resourceValidator = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("category")
    .isIn(["download", "causelist", "act", "rule", "policy", "ait"])
    .withMessage("Invalid category"),
  body("file.url").notEmpty().withMessage("File is required"),
];