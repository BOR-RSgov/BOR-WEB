import mongoose from "mongoose";
import fileSchema from "../utils/fileSchema.js";

const albumSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    coverImage: { type: fileSchema, default: () => ({}) },
    images: { type: [fileSchema], default: [] },
    description: { type: String, trim: true, default: "" },
    isDeleted: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  },
  { timestamps: true }
);

albumSchema.statics.searchFields = ["title", "description"];

const Album = mongoose.model("Album", albumSchema);
export default Album;