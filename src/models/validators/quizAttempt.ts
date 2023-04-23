import Joi from "joi";
import qaAttemptValidator from "./qaAttempt";
import QuizAttempt from "../interfaces/QuizAttempt";
import QaAttempt from "../interfaces/QaAttempt";

const quizAttemptValidator = Joi.object<QuizAttempt>({
  authorId: Joi.objectId().required(),
  qaAttempts: Joi.array<QaAttempt>().items(qaAttemptValidator),
});

export default quizAttemptValidator;
