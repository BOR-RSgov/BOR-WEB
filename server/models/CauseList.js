// server/models/CauseList.js
import mongoose from "mongoose";
import fileSchema from "../utils/fileSchema.js";

const causeListSchema = new mongoose.Schema(
  {
    member: {
      type: String,
      required: true,
      enum: ["Member-II", "Member-III", "Member-V"],
    },
    division: {
      type: String,
      required: true,
      enum: ["Peshawar", "Mardan", "Hazara", "Bannu", "Malakand", "Kohat", "D.I. Khan"],
    },
    venue: { type: String, trim: true, default: "" },     // e.g. "At Abbottabad"
    note: { type: String, trim: true, default: "" },       // e.g. "Two days camp court"
    hearingDate: { type: Date, required: true },
    file: { type: fileSchema, default: () => ({}) },       // empty = "Not Uploaded" on the frontend
    isDeleted: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  },
  { timestamps: true }
);

causeListSchema.statics.searchFields = ["venue", "note"];

const CauseList = mongoose.model("CauseList", causeListSchema);
export default CauseList;