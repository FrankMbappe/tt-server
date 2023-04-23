import Joi from "joi";
import likeValidator from "./like";
import Comment from "../interfaces/Comment";
import Like from "../interfaces/Like";

const commentValidator = Joi.object<Comment>({
  authorId: Joi.objectId().required(),
  text: Joi.string().min(1).max(500).required(),
  likes: Joi.array<Like>().items(likeValidator),
});

export default commentValidator;
