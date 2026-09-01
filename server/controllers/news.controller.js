import News from "../models/News.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { createBaseController } from "./base.controller.js";

export const newsBaseCtrl = createBaseController(News, "News");

// Public: only published news whose publishDate has already passed
export const getPublicNews = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const filter = {
    isDeleted: false,
    status: "published",
    publishDate: { $lte: new Date() },
  };

  if (req.query.category) filter.category = req.query.category;
  if (req.query.search) {
    filter.$or = News.searchFields.map((f) => ({
      [f]: { $regex: req.query.search, $options: "i" },
    }));
  }

  const data = await News.find(filter).sort({ publishDate: -1 }).skip(skip).limit(limit);
  const total = await News.countDocuments(filter);

  res.status(200).json(
    new ApiResponse(200, "News fetched successfully", {
      data,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    })
  );
});

export const getPublicNewsBySlug = asyncHandler(async (req, res) => {
  const news = await News.findOneAndUpdate(
    { slug: req.params.slug, isDeleted: false, status: "published" },
    { $inc: { views: 1 } },
    { new: true }
  );
  if (!news) return res.status(404).json({ success: false, message: "News not found" });
  res.status(200).json(new ApiResponse(200, "News fetched successfully", news));
});