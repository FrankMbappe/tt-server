import Joi from "joi";
import { UserTypeEnum } from "@/enums";

const participationValidator = Joi.object({
  user: Joi.objectId().required(),
  role: Joi.string()
    .valid(
      ...Object.values(UserTypeEnum).filter((t) => t != UserTypeEnum.Teacher)
    )
    .required(),
});

export default participationValidator;
