import Joi from "joi";
import { ClassromMemberRoleEnum } from "@/enums";
import ClassroomMember from "../interfaces/ClassroomMember";
import { basicUserProfileValidator } from "./userProfile";

const classroomMemberValidator =
  basicUserProfileValidator.append<ClassroomMember>({
    joinedAt: Joi.date().required(),
    userId: Joi.objectId().required(),
    role: Joi.string()
      .valid(...Object.values(ClassromMemberRoleEnum))
      .required(),
  });

export default classroomMemberValidator;
