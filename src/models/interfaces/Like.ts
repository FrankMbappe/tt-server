import { Types } from "mongoose";
import Base from "./Base";
import { BasicUserProfile } from "./UserProfile";

export type LikeAuthor = BasicUserProfile;

export default interface Like extends Base {
  authorId: Types.ObjectId;
  postId: Types.ObjectId;
  commentId: Types.ObjectId;
  author: LikeAuthor;
}
