import mongoose from "mongoose";
import fileSchema from "../utils/fileSchema.js";

const sliderSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, default: "" },
    subtitle: { type: String, trim: true, default: "" },
    image: { type: fileSchema, required: true },
    link: { type: String, trim: true, default: "" },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  },
  { timestamps: true }
);

sliderSchema.statics.searchFields = ["title", "subtitle"];

const Slider = mongoose.model("Slider", sliderSchema);
export default Slider;