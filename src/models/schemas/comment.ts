import mongoose from "mongoose";
import likeSchema from "./like";
import { DbModelEnum } from "@/enums";
import baseSchema from "./base";
import Comment from "../interfaces/Comment";

const commentSchema = new mongoose.Schema<Comment>({
  ...baseSchema.obj,
  authorId: { type: mongoose.Types.ObjectId, ref: DbModelEnum.User },
  text: { type: String, maxlength: 3000, required: true },
  likes: { type: [likeSchema], default: [] },
});

export const CommentModel = mongoose.model(DbModelEnum.Comment, commentSchema);

export default commentSchema;
