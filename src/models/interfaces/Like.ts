import { Types } from "mongoose";
import Base from "./Base";

export default interface Like extends Base {
  authorId: Types.ObjectId;
}
