import Joi from "joi";
import QaAnswer from "../interfaces/QaAnswer";

const qaAnswerValidator = Joi.object<QaAnswer>({
  id: Joi.number().required(),
  value: Joi.string().min(1).max(255).required(),
});

export default qaAnswerValidator;
