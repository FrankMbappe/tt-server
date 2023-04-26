import Joi from "joi";
import classroomMemberValidator from "./classroomMember";
import topicValidator from "./topic";
import Classroom from "../interfaces/Classroom";
import ClassroomMember from "../interfaces/ClassroomMember";
import Topic from "../interfaces/Topic";

const classroomValidator = Joi.object<Classroom>({
  name: Joi.string().min(3).max(255).required(),
  description: Joi.string().max(255),
  teacher: classroomMemberValidator,
  members: Joi.array<ClassroomMember>().items(classroomMemberValidator),
  topics: Joi.array<Topic>().items(topicValidator),
});

export default classroomValidator;
