// server/controllers/upload.controller.js
import streamifier from "streamifier";
import cloudinary from "../config/cloudinary.js";
import asyncHandler from "../middleware/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/ApiError.js";

const streamUpload = (buffer, folder, resourceType) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: `bor-cms/${folder}`, resource_type: resourceType },
      (error, result) => (result ? resolve(result) : reject(error))
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

/*
|--------------------------------------------------------------------------
| Upload Single File
| folder + resourceType come from query params, e.g.
| POST /api/v1/uploads?folder=officials&type=image
|--------------------------------------------------------------------------
*/
export const uploadFile = asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError(400, "No file provided");

  const folder = req.query.folder || "misc";
  const resourceType = req.query.type === "document" ? "raw" : req.query.type || "auto";

  const result = await streamUpload(req.file.buffer, folder, resourceType);

  res.status(200).json(
    new ApiResponse(200, "File uploaded successfully", {
      url: result.secure_url,
      publicId: result.public_id,
    })
  );
});

/*
|--------------------------------------------------------------------------
| Delete File (called when a module removes/replaces media)
|--------------------------------------------------------------------------
*/
export const deleteFile = asyncHandler(async (req, res) => {
  const { publicId } = req.body;
  if (!publicId) throw new ApiError(400, "publicId is required");

  await cloudinary.uploader.destroy(publicId, { resource_type: req.query.type === "document" ? "raw" : "image" });

  res.status(200).json(new ApiResponse(200, "File deleted successfully", null));
});