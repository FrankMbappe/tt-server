import Joi from "joi";
import UserProfilePocket from "../interfaces/UserProfilePocket";
import { Types } from "mongoose";
import joiObjectId from "@/libs/joi";

const userProfilePocketValidator = Joi.object<UserProfilePocket>({
  postIds: Joi.array<Types.ObjectId>().items(joiObjectId()),
});

export default userProfilePocketValidator;
