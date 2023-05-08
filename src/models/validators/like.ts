import Joi from "joi";
import Like, { LikeAuthor } from "../interfaces/Like";
import { basicUserProfileValidator } from "./userProfile";
import joiObjectId from "@/libs/joi";

export const likeAuthorValidator = basicUserProfileValidator.append<LikeAuthor>(
  {}
);

const likeValidator = Joi.object<Like>({
  authorId: joiObjectId().required(),
  author: likeAuthorValidator,
  commentId: joiObjectId().required(),
  postId: joiObjectId().required(),
});

export default likeValidator;
