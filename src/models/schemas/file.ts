import mongoose from "mongoose";
import { DbModelEnum, MAX_FILE_SIZE } from "@/enums";
import baseSchema from "./base";
import UserFile from "../interfaces/UserFile";

const fileSchema = new mongoose.Schema<UserFile>({
  ...baseSchema.obj,
  authorId: { type: mongoose.Types.ObjectId, ref: DbModelEnum.User },
  mimeType: { type: String, required: true },
  uri: { type: String, required: true },
  name: { type: String, maxlength: 255, required: true },
  size: { type: Number, max: MAX_FILE_SIZE, required: true },
  extension: { type: String, required: true },
  publicCloudId: String,
});

export const FileModel = mongoose.model(DbModelEnum.File, fileSchema);

export default fileSchema;
