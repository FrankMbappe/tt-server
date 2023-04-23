import Joi from "joi";
import { ClassromMemberRoleEnum } from "@/enums";
import ClassroomMember from "../interfaces/ClassroomMember";

const classroomMemberValidator = Joi.object<ClassroomMember>({
  userId: Joi.objectId().required(),
  role: Joi.string()
    .valid(...Object.values(ClassromMemberRoleEnum))
    .required(),
});

export default classroomMemberValidator;
