import mongoose from "mongoose";
import fileSchema from "../utils/fileSchema.js";

const officialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    designation: {
      type: String,
      required: true,
      enum: ["SMBR", "Chairman", "Minister", "DLR", "Officer"],
    },
    department: { type: mongoose.Schema.Types.ObjectId, ref: "Department", default: null },
    photo: { type: fileSchema, default: () => ({}) },    // Cloudinary URL, wired up next
    message: { type: String, default: "" },   // e.g. "Chairman's Message"
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  },
  { timestamps: true }
);

officialSchema.statics.searchFields = ["name", "designation"];

const Official = mongoose.model("Official", officialSchema);
export default Official;