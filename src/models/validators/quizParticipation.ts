import Joi from "joi";
import quizSessionValidator from "./quizSession";

const quizParticipationValidator = Joi.object({
  author: Joi.objectId().required(),
  quizSessions: Joi.array().items(quizSessionValidator),
});

export default quizParticipationValidator;
