import mongoose from "mongoose";
import fileSchema from "../utils/fileSchema.js";

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    excerpt: { type: String, trim: true, default: "" },
    content: { type: String, required: true },
    coverImage: { type: fileSchema, default: () => ({}) },
    category: { type: String, trim: true, default: "General" },
    status: { type: String, enum: ["draft", "scheduled", "published"], default: "draft" },
    publishDate: { type: Date, default: Date.now },
    views: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  },
  { timestamps: true }
);

newsSchema.statics.searchFields = ["title", "excerpt", "category"];

newsSchema.pre("validate", function (next) {
  if (!this.slug && this.title) {
    this.slug = this.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }
  next();
});

const News = mongoose.model("News", newsSchema);
export default News;