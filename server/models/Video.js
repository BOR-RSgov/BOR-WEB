import mongoose from "mongoose";
import fileSchema from "../utils/fileSchema.js";

const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    url: { type: String, required: true, trim: true }, // YouTube/Vimeo embed link
    thumbnail: { type: fileSchema, default: () => ({}) },
    description: { type: String, trim: true, default: "" },
    isDeleted: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  },
  { timestamps: true }
);

videoSchema.statics.searchFields = ["title", "description"];

const Video = mongoose.model("Video", videoSchema);
export default Video;