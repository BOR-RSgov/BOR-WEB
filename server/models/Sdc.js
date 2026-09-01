import mongoose from "mongoose";
import fileSchema from "../utils/fileSchema.js";

const sdcSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    district: { type: String, trim: true, default: "" },
    phone: { type: String, trim: true, default: "" },
    inCharge: { type: String, trim: true, default: "" },
    mapUrl: { type: String, trim: true, default: "" }, // Google Maps link
    image: { type: fileSchema, default: () => ({}) },
    order: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  },
  { timestamps: true }
);

sdcSchema.statics.searchFields = ["name", "address", "district"];

const Sdc = mongoose.model("Sdc", sdcSchema);
export default Sdc;