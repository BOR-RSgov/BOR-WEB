import mongoose from "mongoose";
import fileSchema from "../utils/fileSchema.js";

const taxSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true }, // e.g. "Agricultural Income Tax"
    rate: { type: String, required: true, trim: true },  // flexible: "5%", "Rs. 500 per acre", etc.
    description: { type: String, trim: true, default: "" },
    notification: { type: fileSchema, default: () => ({}) }, // optional supporting PDF
    effectiveDate: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  },
  { timestamps: true }
);

taxSchema.statics.searchFields = ["name", "description"];

const Tax = mongoose.model("Tax", taxSchema);
export default Tax;