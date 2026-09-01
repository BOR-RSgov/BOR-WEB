// server/routes/causeList.routes.js
import express from "express";
import CauseList from "../models/CauseList.js";
import { createBaseController } from "../controllers/base.controller.js";
import { protect, authorize } from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import upload from "../middleware/upload.middleware.js";
import { attachUploadedFile } from "../middleware/cloudinaryUpload.middleware.js";
import { causeListValidator } from "../validators/causeList.validator.js";

const router = express.Router();
const ctrl = createBaseController(CauseList, "Cause List");

// Public — frontend calls ?member=Member-II&division=Mardan, sorts by hearingDate
router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getOne);

router.post(
  "/",
  protect, authorize("super-admin", "editor"),
  upload.single("file"), attachUploadedFile("file", "causelists", "raw"),
  causeListValidator, validate,
  ctrl.create
);
router.put(
  "/:id",
  protect, authorize("super-admin", "editor"),
  upload.single("file"), attachUploadedFile("file", "causelists", "raw"),
  causeListValidator, validate,
  ctrl.update
);
router.delete("/:id", protect, authorize("super-admin"), ctrl.remove);

export default router;