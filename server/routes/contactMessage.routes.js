import express from "express";
import ContactMessage from "../models/ContactMessage.js";
import { createBaseController } from "../controllers/base.controller.js";
import { protect, authorize } from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { contactMessageValidator } from "../validators/contactMessage.validator.js";

const router = express.Router();
const ctrl = createBaseController(ContactMessage, "Message");

// Public — anyone can submit the contact form, no login required
router.post("/", contactMessageValidator, validate, ctrl.create);

// Admin only — reading other people's messages needs auth
router.get("/", protect, authorize("super-admin", "editor"), ctrl.getAll);
router.get("/:id", protect, authorize("super-admin", "editor"), ctrl.getOne);
router.put("/:id", protect, authorize("super-admin", "editor"), ctrl.update); // e.g. mark isRead: true
router.delete("/:id", protect, authorize("super-admin"), ctrl.remove);

export default router;