import Joi from "joi";
import Comment, { CommentAuthor } from "../interfaces/Comment";
import { basicUserProfileValidator } from "./userProfile";
import joiObjectId from "@/libs/joi";

export const commentAuthorValidator =
  basicUserProfileValidator.append<CommentAuthor>({});

const commentValidator = Joi.object<Comment>({
  authorId: joiObjectId().required(),
  postId: joiObjectId().required(),
  text: Joi.string().min(1).max(500).required(),
  likesCount: Joi.number().positive().required(),
  author: commentAuthorValidator,
});

export default commentValidator;
