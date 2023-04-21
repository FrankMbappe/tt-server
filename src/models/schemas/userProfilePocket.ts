import mongoose from "mongoose";
import { DbModelEnum } from "@/enums";
import UserProfilePocket from "../interfaces/UserProfilePocket";

const userProfilePocketSchema = new mongoose.Schema<UserProfilePocket>({
  postIds: { type: [mongoose.Types.ObjectId], ref: DbModelEnum.Post },
  // TODO Implement 'notes' property
});

export default userProfilePocketSchema;
