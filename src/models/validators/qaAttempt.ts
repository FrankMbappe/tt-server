import Joi from "joi";
import qaAnswerValidator from "./qaAnswer";
import QaAttempt from "../interfaces/QaAttempt";
import QaAnswer from "../interfaces/QaAnswer";

const qaAttemptValidator = Joi.object<QaAttempt>({
  isCorrect: Joi.boolean().required(),
  submittedAnswers: Joi.array<QaAnswer>().items(qaAnswerValidator),
  timeRemainingInSeconds: Joi.number(),
});

export default qaAttemptValidator;
