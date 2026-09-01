// server/routes/upload.routes.js
import express from "express";
import upload from "../middleware/upload.middleware.js";
import { uploadFile, deleteFile } from "../controllers/upload.controller.js";
import { protect, authorize } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, authorize("super-admin", "editor"), upload.single("file"), uploadFile);
router.delete("/", protect, authorize("super-admin", "editor"), deleteFile);

export default router;