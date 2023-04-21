import mongoose from "mongoose";
import Base from "./Base";

export default interface Like extends Base {
  authorId: typeof mongoose.Types.ObjectId;
}
