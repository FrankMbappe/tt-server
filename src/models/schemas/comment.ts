import { Schema, model } from "mongoose";
import { DbModelEnum } from "@/enums";
import baseSchema from "./base";
import Comment, { CommentAuthor } from "../interfaces/Comment";
import { basicUserProfileSchema } from "./userProfile";

export const commentAuthorSchema = new Schema<CommentAuthor>({
  ...basicUserProfileSchema.obj,
});

const commentSchema = new Schema<Comment>({
  ...baseSchema.obj,
  authorId: { type: Schema.Types.ObjectId, ref: DbModelEnum.User },
  author: { type: commentAuthorSchema },
  postId: { type: Schema.Types.ObjectId, ref: DbModelEnum.Post },
  text: { type: String, maxlength: 3000, required: true },
  likesCount: { type: Number, required: true },
});

export const CommentModel = model<Comment>(DbModelEnum.Comment, commentSchema);

export default commentSchema;
