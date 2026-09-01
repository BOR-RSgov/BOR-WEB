import mongoose from "mongoose";
import fileSchema from "../utils/fileSchema.js";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: "" },
    images: { type: [fileSchema], default: [] },
    status: { type: String, enum: ["upcoming", "ongoing", "completed"], default: "upcoming" },
    department: { type: mongoose.Schema.Types.ObjectId, ref: "Department", default: null },
    startDate: { type: Date },
    endDate: { type: Date },
    isDeleted: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  },
  { timestamps: true }
);

projectSchema.statics.searchFields = ["title", "description"];

const Project = mongoose.model("Project", projectSchema);
export default Project;