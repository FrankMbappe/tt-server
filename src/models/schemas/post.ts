import { Schema, model } from "mongoose";
import userFileSchema from "./userFile";
import topicSchema from "./topic";
import { DbModelEnum, PostCategoryEnum } from "@/enums";
import baseSchema from "./base";
import Post, { PostAuthor } from "../interfaces/Post";
import { basicUserProfileSchema } from "./userProfile";

export const postAuthorSchema = new Schema<PostAuthor>({
  ...basicUserProfileSchema.obj,
});

const postSchema = new Schema<Post>({
  ...baseSchema.obj,
  classroomId: {
    type: Schema.Types.ObjectId,
    ref: DbModelEnum.Classroom,
    required: true,
  },
  authorId: {
    type: Schema.Types.ObjectId,
    ref: DbModelEnum.User,
    required: true,
  },
  author: { type: postAuthorSchema },
  category: {
    type: String,
    enum: Object.values(PostCategoryEnum),
    default: PostCategoryEnum.Normal,
  },
  // TODO Create an enum/object for default values like maxLength '3000'
  text: { type: String, maxlength: 3000 },
  file: userFileSchema,
  commentsCount: { type: Number, required: true },
  likesCount: { type: Number, required: true },
  topics: { type: [topicSchema], default: [] },
  viewerIds: {
    type: [Schema.Types.ObjectId],
    ref: DbModelEnum.User,
    default: [],
  },
});

export const PostModel = model<Post>(DbModelEnum.Post, postSchema);

export default postSchema;
