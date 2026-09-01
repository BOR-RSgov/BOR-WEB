import express from "express";
import Announcement from "../models/Announcement.js";
import { createBaseController } from "../controllers/base.controller.js";
import { protect, authorize } from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { announcementValidator } from "../validators/announcement.validator.js";

const router = express.Router();
const ctrl = createBaseController(Announcement, "Announcement");

// Public — website calls GET /api/v1/announcements?type=notification
router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getOne);

router.post("/", protect, authorize("super-admin", "editor"), announcementValidator, validate, ctrl.create);
router.put("/:id", protect, authorize("super-admin", "editor"), announcementValidator, validate, ctrl.update);
router.delete("/:id", protect, authorize("super-admin"), ctrl.remove);

export default router;