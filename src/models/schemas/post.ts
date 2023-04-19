import mongoose from "mongoose";
import commentSchema from "./comment";
import fileSchema from "./file";
import likeSchema from "./like";
import topicSchema from "./topic";
import { DbModelEnum, PostTypeEnum } from "@/enums";

const postSchema = new mongoose.Schema({
  creationDate: { type: Date, default: Date.now },
  author: {
    type: mongoose.Types.ObjectId,
    ref: DbModelEnum.User,
    required: true,
  },
  _type: {
    type: String,
    enum: Object.values(PostTypeEnum),
    default: PostTypeEnum.Normal,
  },
  text: { type: String, maxlength: 3000 },
  likes: { type: [likeSchema], default: [] },
  comments: { type: [commentSchema], default: [] },
  file: fileSchema,
  topics: { type: [topicSchema], default: [] },
  haveSeen: {
    type: [mongoose.Types.ObjectId],
    ref: DbModelEnum.User,
    default: [],
  },
});

export const PostModel = mongoose.model(DbModelEnum.Post, postSchema);

export default postSchema;
