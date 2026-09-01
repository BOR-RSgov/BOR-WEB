import streamifier from "streamifier";
import cloudinary from "../config/cloudinary.js";
import asyncHandler from "./asyncHandler.js";

const streamUpload = (buffer, folder, resourceType) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: `bor-cms/${folder}`, resource_type: resourceType },
      (error, result) => (result ? resolve(result) : reject(error))
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

/**
 * Use AFTER upload.single(fieldName). Uploads the file to Cloudinary and
 * attaches { url, publicId } to req.body[fieldName]. Skips silently if no
 * file was sent (e.g. an update where the admin didn't change the image).
 */
export const attachUploadedFile = (fieldName, folder, resourceType = "auto") =>
  asyncHandler(async (req, res, next) => {
    if (!req.file) return next();
    const result = await streamUpload(req.file.buffer, folder, resourceType);
    req.body[fieldName] = { url: result.secure_url, publicId: result.public_id };
    next();
  });

/**
 * Use AFTER upload.array(fieldName). Same idea, for multi-file fields
 * like Album.images or Project.images.
 */
export const attachUploadedFiles = (fieldName, folder, resourceType = "auto") =>
  asyncHandler(async (req, res, next) => {
    if (!req.files || req.files.length === 0) return next();
    const uploads = await Promise.all(
      req.files.map((file) => streamUpload(file.buffer, folder, resourceType))
    );
    req.body[fieldName] = uploads.map((r) => ({ url: r.secure_url, publicId: r.public_id }));
    next();
  });