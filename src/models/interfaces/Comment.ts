import { Types } from "mongoose";
import Base from "./Base";
import Like from "./Like";

export default interface Comment extends Base {
  authorId: Types.ObjectId;
  text: string;
  likes: Like[];
}
