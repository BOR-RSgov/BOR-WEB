import mongoose from "mongoose";
import fileSchema from "../utils/fileSchema.js";

const announcementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    type: {
      type: String,
      required: true,
      enum: ["announcement", "notification", "update"],
      default: "announcement",
    },
    description: { type: String, trim: true, default: "" },
    file: { type: fileSchema, default: () => ({}) }, // optional attachment
    isPinned: { type: Boolean, default: false },
    publishDate: { type: Date, default: Date.now },
    isDeleted: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  },
  { timestamps: true }
);

announcementSchema.statics.searchFields = ["title", "description"];

const Announcement = mongoose.model("Announcement", announcementSchema);
export default Announcement;