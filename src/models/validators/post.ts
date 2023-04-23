import Joi from "joi";
import { PostCategoryEnum } from "@/enums";
import commentValidator from "./comment";
import fileValidator from "./file";
import likeValidator from "./like";
import topicValidator from "./topic";
import Post from "../interfaces/Post";
import Like from "../interfaces/Like";
import Comment from "../interfaces/Comment";
import Topic from "../interfaces/Topic";
import { Types } from "mongoose";

const postValidator = Joi.object<Post>({
  authorId: Joi.objectId().required(),
  category: Joi.string()
    .valid(...Object.values(PostCategoryEnum))
    .required(),
  text: Joi.string().max(3000),
  file: fileValidator,
  likes: Joi.array<Like>().items(likeValidator),
  comments: Joi.array<Comment>().items(commentValidator),
  topics: Joi.array<Topic>().items(topicValidator),
  viewerIds: Joi.array<Types.ObjectId>().items(Joi.objectId()),
}).or("text", "file"); // At least file if no text

export default postValidator;
