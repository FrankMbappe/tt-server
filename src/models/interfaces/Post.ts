import { PostCategoryEnum } from "@/enums";
import Base from "./Base";
import UserFile from "./UserFile";
import Topic from "./Topic";
import { Types } from "mongoose";
import { BasicUserProfile } from "./UserProfile";

export type PostCategory = `${PostCategoryEnum}`;
export type PostAuthor = BasicUserProfile;

export default interface Post extends Base {
  authorId: Types.ObjectId;
  author: PostAuthor;
  category: PostCategory;
  text?: string;
  file?: UserFile;
  likesCount: number;
  commentsCount: number;
  topics: Topic[];
  viewerIds: Types.ObjectId[];
}
