import { Schema, model } from "mongoose";
import { DbModelEnum } from "@/enums";
import baseSchema from "./base";
import Like, { LikeAuthor } from "../interfaces/Like";
import { basicUserProfileSchema } from "./userProfile";

export const likeAuthorSchema = new Schema<LikeAuthor>({
  ...basicUserProfileSchema.obj,
});

const likeSchema = new Schema<Like>({
  ...baseSchema.obj,
  authorId: { type: Schema.Types.ObjectId, ref: DbModelEnum.User },
  postId: { type: Schema.Types.ObjectId, ref: DbModelEnum.Post },
  commentId: { type: Schema.Types.ObjectId, ref: DbModelEnum.Comment },
  author: { type: likeAuthorSchema },
});

export const LikeModel = model<Like>(DbModelEnum.Like, likeSchema);

export default likeSchema;
