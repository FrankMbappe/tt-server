import { PostCategoryEnum } from "@/enums";
import Base from "./Base";
import Like from "./Like";
import Comment from "./Comment";
import UserFile from "./UserFile";
import Topic from "./Topic";
import mongoose from "mongoose";

type PostCategory = `${PostCategoryEnum}`;

export default interface Post extends Base {
  authorId: typeof mongoose.Types.ObjectId;
  category: PostCategory;
  text?: string;
  likes: Like[];
  comments: Comment[];
  file: UserFile;
  topics: Topic[];
  viewerIds: (typeof mongoose.Types.ObjectId)[];
}
