import Joi from "joi";
import { UserGenderEnum, UserHonorificEnum } from "@/enums";
import userProfilePocketValidator from "./userProfilePocket";
import UserProfile from "../interfaces/UserProfile";

const userProfileValidator = Joi.object<UserProfile>({
  honorific: Joi.string().valid(...Object.values(UserHonorificEnum)),
  firstName: Joi.string().min(1).max(255).required(),
  lastName: Joi.string().min(1).max(255).required(),
  birthDate: Joi.date().less("now"),
  email: Joi.string().email(),
  gender: Joi.string().valid(...Object.values(UserGenderEnum)),
  picUri: Joi.string(),
  pocket: userProfilePocketValidator,
});

export default userProfileValidator;
