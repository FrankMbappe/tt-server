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
  teacherId: { type: Schema.Types.ObjectId, ref: DbModelEnum.User },
  members: { type: [classroomMemberSchema], default: [] },
  posts: { type: [postSchema], default: [] },
  quizzes: { type: [quizSchema], default: [] },
  tutorials: { type: [tutorialSchema], default: [] },
  topics: { type: [topicSchema], default: [] },
});

export const ClassroomModel = model<Classroom>(
  DbModelEnum.Classroom,
  classroomSchema
);

export default classroomSchema;
