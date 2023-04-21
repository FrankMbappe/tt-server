import mongoose from "mongoose";
import qaAnswerSchema from "./qaAnswer";
import { DbModelEnum } from "@/enums";
import baseSchema from "./base";
import QaAttempt from "../interfaces/QaAttempt";

const qaAttemptSchema = new mongoose.Schema<QaAttempt>({
  ...baseSchema.obj,
  isCorrect: { type: Boolean, required: true, default: false },
  submittedAnswers: { type: [qaAnswerSchema], default: [] },
  timeRemainingInSeconds: Number,
});

export const QaAttemptModel = mongoose.model(
  DbModelEnum.QaAttempt,
  qaAttemptSchema
);

export default qaAttemptSchema;
