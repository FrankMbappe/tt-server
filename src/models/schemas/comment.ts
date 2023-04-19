import mongoose from "mongoose";
import likeSchema from "./like";
import { DbModelEnum } from "@/enums";

const commentSchema = new mongoose.Schema({
  creationDate: { type: Date, default: Date.now },
  author: { type: mongoose.Types.ObjectId, ref: DbModelEnum.User },
  text: { type: String, maxlength: 3000, required: true },
  likes: { type: [likeSchema], default: [] },
});

export const CommentModel = mongoose.model(DbModelEnum.Comment, commentSchema);

export default commentSchema;
