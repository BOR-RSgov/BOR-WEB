// server/middleware/upload.middleware.js
import multer from "multer";
import ApiError from "../utils/ApiError.js";

const ALLOWED = {
  image: ["image/jpeg", "image/png", "image/webp", "image/svg+xml"],
  document: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ],
  video: ["video/mp4", "video/webm", "video/quicktime"],
};

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = [...ALLOWED.image, ...ALLOWED.document, ...ALLOWED.video];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new ApiError(400, `Unsupported file type: ${file.mimetype}`));
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 25 * 1024 * 1024 }, // 25MB cap
});

export default upload;