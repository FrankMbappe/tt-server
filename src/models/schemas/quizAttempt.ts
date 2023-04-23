import { Schema, model } from "mongoose";
import { DbModelEnum } from "@/enums";
import qaAttemptSchema from "./qaAttempt";
import baseSchema from "./base";
import QuizAttempt from "../interfaces/QuizAttempt";

const quizAttemptSchema = new Schema<QuizAttempt>({
  ...baseSchema.obj,
  authorId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: DbModelEnum.User,
  },
  qaAttempts: { type: [qaAttemptSchema], default: [] },
});

export const QuizAttemptModel = model<QuizAttempt>(
  DbModelEnum.QuizAttempt,
  quizAttemptSchema
);

export default quizAttemptSchema;
