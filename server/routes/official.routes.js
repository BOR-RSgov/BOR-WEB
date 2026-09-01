import express from "express";
import Official from "../models/Official.js";
import { createBaseController } from "../controllers/base.controller.js";
import { protect, authorize } from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import upload from "../middleware/upload.middleware.js";
import { attachUploadedFile } from "../middleware/cloudinaryUpload.middleware.js";
import { officialValidator } from "../validators/official.validator.js";

const router = express.Router();
const ctrl = createBaseController(Official, "Official", "department");

router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getOne);

router.post(
  "/",
  protect, authorize("super-admin", "editor"),
  upload.single("photo"), attachUploadedFile("photo", "officials", "image"),
  officialValidator, validate,
  ctrl.create
);

router.put(
  "/:id",
  protect, authorize("super-admin", "editor"),
  upload.single("photo"), attachUploadedFile("photo", "officials", "image"),
  officialValidator, validate,
  ctrl.update
);

router.delete("/:id", protect, authorize("super-admin"), ctrl.remove);

export default router;