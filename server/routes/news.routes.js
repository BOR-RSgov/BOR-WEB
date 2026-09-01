import express from "express";
import { newsBaseCtrl, getPublicNews, getPublicNewsBySlug } from "../controllers/news.controller.js";
import { protect, authorize } from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { newsValidator } from "../validators/news.validator.js";
import upload from "../middleware/upload.middleware.js";
import { attachUploadedFile } from "../middleware/cloudinaryUpload.middleware.js";

const router = express.Router();

// Public
router.get("/public", getPublicNews);
router.get("/public/:slug", getPublicNewsBySlug);

// Admin
router.get("/", protect, authorize("super-admin", "editor"), newsBaseCtrl.getAll);
router.get("/:id", protect, authorize("super-admin", "editor"), newsBaseCtrl.getOne);
router.post("/", protect, authorize("super-admin", "editor"),upload.single("photo"), attachUploadedFile("photo", "officials", "image"), newsValidator, validate, newsBaseCtrl.create);
router.put("/:id", protect, authorize("super-admin", "editor"),upload.single("photo"), attachUploadedFile("photo", "officials", "image"), newsValidator, validate, newsBaseCtrl.update);
router.delete("/:id", protect, authorize("super-admin"), newsBaseCtrl.remove);

export default router;