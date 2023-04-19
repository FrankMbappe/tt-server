import Joi from "joi";
import { UserGenderEnum, UserHonorificEnum } from "@/enums";
import userPocketValidator from "./userPocket";

const userProfileValidator = Joi.object({
  honorific: Joi.string().valid(...Object.values(UserHonorificEnum)),
  firstName: Joi.string().min(1).max(255).required(),
  lastName: Joi.string().min(1).max(255).required(),
  birthDate: Joi.date().less("now"),
  email: Joi.string().email(),
  gender: Joi.string().valid(...Object.values(UserGenderEnum)),
  picUri: Joi.string(),
  picCloudPublicId: Joi.string(),
  pocket: userPocketValidator,
});

export default userProfileValidator;
