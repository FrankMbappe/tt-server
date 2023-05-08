import Joi from "joi";
import { ClassromMemberRoleEnum } from "@/enums";
import ClassroomMember from "../interfaces/ClassroomMember";
import { basicUserProfileValidator } from "./userProfile";
import joiObjectId from "@/libs/joi";

const classroomMemberValidator =
  basicUserProfileValidator.append<ClassroomMember>({
    joinedAt: Joi.date().required(),
    userId: joiObjectId().required(),
    role: Joi.string()
      .valid(...Object.values(ClassromMemberRoleEnum))
      .required(),
  });

export default classroomMemberValidator;
