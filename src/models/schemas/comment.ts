import { Schema, model } from "mongoose";
import likeSchema from "./like";
import { DbModelEnum } from "@/enums";
import baseSchema from "./base";
import Comment from "../interfaces/Comment";

const commentSchema = new Schema<Comment>({
  ...baseSchema.obj,
  authorId: { type: Schema.Types.ObjectId, ref: DbModelEnum.User },
  text: { type: String, maxlength: 3000, required: true },
  likes: { type: [likeSchema], default: [] },
});

export const CommentModel = model<Comment>(DbModelEnum.Comment, commentSchema);

export default commentSchema;
