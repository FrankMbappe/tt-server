import Joi from "joi";
import qaAnswerValidator from "./qaAnswer";

const quizSessionValidator = Joi.object({
  isCorrect: Joi.boolean().required(),
  submittedAnswers: Joi.array().items(qaAnswerValidator),
  remainingTime: Joi.number(),
});

export default quizSessionValidator;
