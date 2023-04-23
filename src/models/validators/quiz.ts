import Joi from "joi";
import postValidator from "./post";
import qaValidator from "./qa";
import quizAttemptValidator from "./quizAttempt";
import Quiz from "../interfaces/Quiz";
import Qa from "../interfaces/Qa";
import QuizAttempt from "../interfaces/QuizAttempt";

const quizValidator = postValidator.append<Quiz>({
  title: Joi.string().min(1).max(255).required(),
  description: Joi.string().max(1000),
  opensAt: Joi.date().less(Joi.ref("closesAt")),
  closesAt: Joi.date(),
  text: Joi.string().forbidden(), // Remove text key from post validator
  qas: Joi.array<Qa>().items(qaValidator).required(),
  attempts: Joi.array<QuizAttempt>().items(quizAttemptValidator),
  isTimeBounded: Joi.boolean().required(),
  isDeterministic: Joi.boolean().required(),
});

export default quizValidator;
