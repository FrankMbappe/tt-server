import mongoose from "mongoose";
import participationSchema from "./participation";
import postSchema from "./post";
import topicSchema from "./topic";
import tutorialSchema from "./tutorial";
import quizSchema from "./quiz";
import { DbModelEnum } from "@/enums";

const classroomSchema = new mongoose.Schema({
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
  teacher: { type: mongoose.Types.ObjectId, ref: DbModelEnum.User },
  participations: { type: [participationSchema], default: [] },
  posts: { type: [postSchema], default: [] },
  quizzes: { type: [quizSchema], default: [] },
  tutorials: { type: [tutorialSchema], default: [] },
  topics: { type: [topicSchema], default: [] },
});

export const ClassroomModel = mongoose.model(
  DbModelEnum.Classroom,
  classroomSchema
);

export default classroomSchema;
