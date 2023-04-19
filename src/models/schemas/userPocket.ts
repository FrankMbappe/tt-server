import mongoose from "mongoose";
import { DbModelEnum } from "@/enums";

const userPocketSchema = new mongoose.Schema({
  posts: { type: [mongoose.Types.ObjectId], ref: DbModelEnum.Post },
  // TODO Implement 'notes' property
});

export default userPocketSchema;
