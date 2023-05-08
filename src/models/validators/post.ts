import Joi from "joi";
import { PostCategoryEnum } from "@/enums";
import userFileValidator from "./userFile";
import topicValidator from "./topic";
import Post, { PostAuthor } from "../interfaces/Post";
import Topic from "../interfaces/Topic";
import { Types } from "mongoose";
import { basicUserProfileValidator } from "./userProfile";

export const postAuthorValidator = basicUserProfileValidator.append<PostAuthor>(
  {}
);

const postValidator = Joi.object<Post>({
  classroomId: Joi.objectId().required(),
  authorId: Joi.objectId().required(),
  author: postAuthorValidator,
  category: Joi.string()
    .valid(...Object.values(PostCategoryEnum))
    .required(),
  text: Joi.string().max(3000),
  file: userFileValidator,
  likesCount: Joi.number().positive().required(),
  commentsCount: Joi.number().positive().required(),
  topics: Joi.array<Topic>().items(topicValidator),
  viewerIds: Joi.array<Types.ObjectId>().items(Joi.objectId()),
}).or("text", "file"); // At least file if no text

export default postValidator;
