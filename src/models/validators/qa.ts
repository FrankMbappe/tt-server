import Joi from "joi";
import qaAnswerValidator from "./qaAnswer";
import Qa from "../interfaces/Qa";
import QaAnswer from "../interfaces/QaAnswer";

const qaValidator = Joi.object<Qa>({
  index: Joi.number().required(),
  topic: Joi.string().max(255),
  question: Joi.string().min(1).max(255).required(),
  answers: Joi.array<QaAnswer>().items(qaAnswerValidator).min(2).required(),
  rightAnswerIds: Joi.array<number>().items(Joi.number()).required(),
  timerInSeconds: Joi.number().min(10),
});

export default qaValidator;
