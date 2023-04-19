import Joi from "joi";
import { PostTypeEnum } from "@/enums";
import commentValidator from "./comment";
import fileValidator from "./file";
import likeValidator from "./like";
import topicValidator from "./topic";

const postValidator = Joi.object({
  author: Joi.objectId().required(),
  _type: Joi.string()
    .valid(...Object.values(PostTypeEnum))
    .required(),
  text: Joi.string().max(3000).when("file", {
    is: null,
    then: Joi.string().required(),
  }),
  likes: Joi.array().items(likeValidator),
  comments: Joi.array().items(commentValidator),
  file: fileValidator,
  topics: Joi.array().items(topicValidator),
  haveSeen: Joi.array().items(Joi.objectId()),
});

export default postValidator;
