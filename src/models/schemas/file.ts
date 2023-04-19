import mongoose from "mongoose";
import { DbModelEnum, MAX_FILE_SIZE } from "@/enums";

const fileSchema = new mongoose.Schema({
  mimetype: { type: String, required: true },
  uri: { type: String, required: true },
  name: { type: String, maxlength: 255, required: true },
  size: { type: Number, max: MAX_FILE_SIZE, required: true },
  extension: { type: String, required: true },
  cloudPublicId: String,
});

export const FileModel = mongoose.model(DbModelEnum.File, fileSchema);

export default fileSchema;
