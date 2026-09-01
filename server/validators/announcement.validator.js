import { body } from "express-validator";

export const announcementValidator = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("type").isIn(["announcement", "notification", "update"]).withMessage("Invalid type"),
];