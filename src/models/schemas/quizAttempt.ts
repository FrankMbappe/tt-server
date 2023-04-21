import mongoose from "mongoose";
import { DbModelEnum } from "@/enums";
import qaAttemptSchema from "./qaAttempt";
import baseSchema from "./base";
import QuizAttempt from "../interfaces/QuizAttempt";

const quizAttemptSchema = new mongoose.Schema<QuizAttempt>({
  ...baseSchema.obj,
  authorId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: DbModelEnum.User,
  },
  qaAttempts: { type: [qaAttemptSchema], default: [] },
});

export const QuizAttemptModel = mongoose.model(
  DbModelEnum.QuizAttempt,
  quizAttemptSchema
);

export default quizAttemptSchema;
