import mongoose from "mongoose";
import commentSchema from "./comment";
import fileSchema from "./file";
import likeSchema from "./like";
import topicSchema from "./topic";
import { DbModelEnum, PostCategoryEnum } from "@/enums";
import baseSchema from "./base";
import Post from "../interfaces/Post";

const postSchema = new mongoose.Schema<Post>({
  ...baseSchema.obj,
  authorId: {
    type: mongoose.Types.ObjectId,
    ref: DbModelEnum.User,
    required: true,
  },
  category: {
    type: String,
    enum: Object.values(PostCategoryEnum),
    default: PostCategoryEnum.Normal,
  },
  // TODO Create an enum/object for default values like maxLength '3000'
  text: { type: String, maxlength: 3000 },
  likes: { type: [likeSchema], default: [] },
  comments: { type: [commentSchema], default: [] },
  file: fileSchema,
  topics: { type: [topicSchema], default: [] },
  viewerIds: {
    type: [mongoose.Types.ObjectId],
    ref: DbModelEnum.User,
    default: [],
  },
});

export const PostModel = mongoose.model(DbModelEnum.Post, postSchema);

export default postSchema;
