import Joi from "joi";
import qaAttemptValidator from "./qaAttempt";
import QuizAttempt from "../interfaces/QuizAttempt";
import QaAttempt from "../interfaces/QaAttempt";
import joiObjectId from "@/libs/joi";

const quizAttemptValidator = Joi.object<QuizAttempt>({
  authorId: joiObjectId().required(),
  qaAttempts: Joi.array<QaAttempt>().items(qaAttemptValidator),
});

export default quizAttemptValidator;
