import Joi from "joi";
import { UserGenderEnum, UserHonorificEnum } from "@/enums";
import userProfilePocketValidator from "./userProfilePocket";
import UserProfile, { BasicUserProfile } from "../interfaces/UserProfile";

export const basicUserProfileValidator = Joi.object<BasicUserProfile>({
  firstName: Joi.string().min(1).max(255).required(),
  lastName: Joi.string().min(1).max(255).required(),
  picUrl: Joi.string(),
});

const userProfileValidator = basicUserProfileValidator.append<UserProfile>({
  honorific: Joi.string().valid(...Object.values(UserHonorificEnum)),
  birthDate: Joi.date().less("now"),
  email: Joi.string().email(),
  gender: Joi.string().valid(...Object.values(UserGenderEnum)),
  pocket: userProfilePocketValidator,
});

export default userProfileValidator;
