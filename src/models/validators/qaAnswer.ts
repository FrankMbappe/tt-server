import Joi from "joi";

const qaAnswerValidator = Joi.object({
  id: Joi.number().required(),
  value: Joi.string().min(1).max(255).required(),
});

export default qaAnswerValidator;
