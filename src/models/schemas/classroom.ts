import { Schema, model } from "mongoose";
import classroomMemberSchema from "./classroomMember";
import postSchema from "./post";
import topicSchema from "./topic";
import tutorialSchema from "./tutorial";
import quizSchema from "./quiz";
import { DbModelEnum } from "@/enums";
import baseSchema from "./base";
import Classroom from "../interfaces/Classroom";

const classroomSchema = new Schema<Classroom>({
  ...baseSchema.obj,
  name: {
    type: String,
    minlength: 3,
    maxlength: 255,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    maxlength: 255,
    trim: true,
  },
  teacher: classroomMemberSchema,
  members: { type: [classroomMemberSchema], default: [] },
  topics: { type: [topicSchema], default: [] },
});

export const ClassroomModel = model<Classroom>(
  DbModelEnum.Classroom,
  classroomSchema
);

export default classroomSchema;
