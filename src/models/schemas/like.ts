import mongoose from "mongoose";
import { DbModelEnum } from "@/enums";
import baseSchema from "./base";
import Like from "../interfaces/Like";

const likeSchema = new mongoose.Schema<Like>({
  ...baseSchema.obj,
  authorId: { type: mongoose.Types.ObjectId, ref: DbModelEnum.User },
});

export default likeSchema;
