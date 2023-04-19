import Joi from "joi";
import qaAnswerValidator from "./qaAnswer";

const qaValidator = Joi.object({
  position: Joi.number().required(),
  topic: Joi.string().max(255),
  question: Joi.string().min(1).max(255).required(),
  answers: Joi.array().items(qaAnswerValidator).min(2).required(),
  rightAnswers: Joi.array().items(Joi.number()).required(),
  timer: Joi.number().min(10),
});

export default qaValidator;
