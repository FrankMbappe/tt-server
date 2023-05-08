import { Schema, model } from "mongoose";
import { DbModelEnum, MAX_FILE_SIZE } from "@/enums";
import baseSchema from "./base";
import UserFile from "../interfaces/UserFile";

const userFileSchema = new Schema<UserFile>({
  ...baseSchema.obj,
  authorId: { type: Schema.Types.ObjectId, ref: DbModelEnum.User },
  mimeType: { type: String, required: true },
  url: { type: String, required: true },
  name: { type: String, maxlength: 255, required: true },
  size: { type: Number, max: MAX_FILE_SIZE, required: true },
  extension: { type: String, required: true },
  publicCloudId: String,
});

export const UserFileModel = model<UserFile>(DbModelEnum.File, userFileSchema);

export default userFileSchema;
