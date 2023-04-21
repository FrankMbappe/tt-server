import Joi from "joi";
import { UserCategoryEnum } from "@/enums";

const participationValidator = Joi.object({
  user: Joi.objectId().required(),
  role: Joi.string()
    .valid(
      ...Object.values(UserCategoryEnum).filter(
        (t) => t != UserCategoryEnum.Teacher
      )
    )
    .required(),
});

export default participationValidator;
