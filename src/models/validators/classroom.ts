import Joi from "joi";
import classroomMemberValidator from "./classroomMember";
import postValidator from "./post";
import quizValidator from "./quiz";
import topicValidator from "./topic";
import tutorialValidator from "./tutorial";
import Classroom from "../interfaces/Classroom";
import ClassroomMember from "../interfaces/ClassroomMember";
import Post from "../interfaces/Post";
import Quiz from "../interfaces/Quiz";
import Tutorial from "../interfaces/Tutorial";
import Topic from "../interfaces/Topic";

const classroomValidator = Joi.object<Classroom>({
  name: Joi.string().min(3).max(255).required(),
  description: Joi.string().max(255),
  teacherId: Joi.objectId().required(),
  members: Joi.array<ClassroomMember>().items(classroomMemberValidator),
  posts: Joi.array<Post>().items(postValidator),
  quizzes: Joi.array<Quiz>().items(quizValidator),
  tutorials: Joi.array<Tutorial>().items(tutorialValidator),
  topics: Joi.array<Topic>().items(topicValidator),
});

export default classroomValidator;
