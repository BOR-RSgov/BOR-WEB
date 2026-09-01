import mongoose from "mongoose";
import fileSchema from "../utils/fileSchema.js";

const resourceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ["download", "act", "rule", "policy", "ait", "career"],
    },
    file: { type: fileSchema, required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: "Department", default: null },
    description: { type: String, trim: true, default: "" },
    publishDate: { type: Date, default: Date.now },
    isDeleted: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  },
  { timestamps: true }
);

resourceSchema.statics.searchFields = ["title", "description"];

const Resource = mongoose.model("Resource", resourceSchema);
export default Resource;