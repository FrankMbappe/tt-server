import { Schema } from "mongoose";
import { DbModelEnum } from "@/enums";
import UserProfilePocket from "../interfaces/UserProfilePocket";

const userProfilePocketSchema = new Schema<UserProfilePocket>({
  postIds: { type: [Schema.Types.ObjectId], ref: DbModelEnum.Post },
});

export default userProfilePocketSchema;
