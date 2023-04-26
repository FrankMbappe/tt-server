import { Types } from "mongoose";
import Base from "./Base";
import Like from "./Like";
import { BasicUserProfile } from "./UserProfile";

export type CommentAuthor = BasicUserProfile;

export default interface Comment extends Base {
  authorId: Types.ObjectId;
  author: CommentAuthor;
  postId: Types.ObjectId;
  text: string;
  likesCount: number;
}
