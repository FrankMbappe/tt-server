import Joi from "joi";
import participationValidator from "./participation";
import postValidator from "./post";
import quizValidator from "./quiz";
import topicValidator from "./topic";
import tutorialValidator from "./tutorial";

const classroomValidator = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  description: Joi.string().max(255),
  teacher: Joi.objectId().required(),
  participations: Joi.array().items(participationValidator),
  posts: Joi.array().items(postValidator),
  quizzes: Joi.array().items(quizValidator),
  tutorials: Joi.array().items(tutorialValidator),
  topics: Joi.array().items(topicValidator),
});

export default classroomValidator;
