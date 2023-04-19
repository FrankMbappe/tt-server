import Joi from "joi";
import postValidator from "./post";
import qaValidator from "./qa";
import quizParticipationValidator from "./quizParticipation";

const quizValidator = postValidator.keys({
  text: Joi.string().forbidden(),
  title: Joi.string().min(1).max(255).required(),
  description: Joi.string().max(1000),
  hasTimeInterval: Joi.boolean().required(),
  dateOpening: Joi.date().less(Joi.ref("dateClosing")),
  dateClosing: Joi.date(),
  qas: Joi.array().items(qaValidator).required(),
  participations: Joi.array().items(quizParticipationValidator),
  isDeterministic: Joi.boolean().required(),
});

export default quizValidator;
