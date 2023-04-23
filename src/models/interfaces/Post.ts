import { PostCategoryEnum } from "@/enums";
import Base from "./Base";
import Like from "./Like";
import Comment from "./Comment";
import UserFile from "./UserFile";
import Topic from "./Topic";
import { Types } from "mongoose";

type PostCategory = `${PostCategoryEnum}`;

export default interface Post extends Base {
  authorId: Types.ObjectId;
  category: PostCategory;
  text?: string;
  likes: Like[];
  comments: Comment[];
  file: UserFile;
  topics: Topic[];
  viewerIds: Types.ObjectId[];
}
