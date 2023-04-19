import Joi from "joi";
import likeValidator from "./like";

const commentValidator = Joi.object({
  author: Joi.objectId().required(),
  text: Joi.string().min(1).max(500).required(),
  likes: Joi.array().items(likeValidator),
});

export default commentValidator;
