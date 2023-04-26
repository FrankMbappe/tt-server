import Joi from "joi";
import Like, { LikeAuthor } from "../interfaces/Like";
import { basicUserProfileValidator } from "./userProfile";

export const likeAuthorValidator = basicUserProfileValidator.append<LikeAuthor>(
  {}
);

const likeValidator = Joi.object<Like>({
  authorId: Joi.objectId().required(),
  author: likeAuthorValidator,
  commentId: Joi.objectId().required(),
  postId: Joi.objectId().required(),
});

export default likeValidator;
