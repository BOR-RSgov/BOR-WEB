// server/utils/fileSchema.js
import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    url: { type: String, default: "" },
    publicId: { type: String, default: "" },
  },
  { _id: false }
);

export default fileSchema;