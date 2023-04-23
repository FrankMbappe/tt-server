import Joi from "joi";
import UserProfilePocket from "../interfaces/UserProfilePocket";
import { Types } from "mongoose";

const userProfilePocketValidator = Joi.object<UserProfilePocket>({
  postIds: Joi.array<Types.ObjectId>().items(Joi.objectId()),
});

export default userProfilePocketValidator;
