import { Schema } from "mongoose";
import { DbModelEnum } from "@/enums";
import baseSchema from "./base";
import Like from "../interfaces/Like";

const likeSchema = new Schema<Like>({
  ...baseSchema.obj,
  authorId: { type: Schema.Types.ObjectId, ref: DbModelEnum.User },
});

export default likeSchema;
