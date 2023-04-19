import mongoose from "mongoose";
import qaAnswerSchema from "./qaAnswer";
import { DbModelEnum } from "@/enums";

const quizSessionSchema = new mongoose.Schema({
  isCorrect: { type: Boolean, required: true, default: false },
  submittedAnswers: { type: [qaAnswerSchema], default: [] },
  remainingTime: Number,
});

export const QuizSessionModel = mongoose.model(
  DbModelEnum.QuizSession,
  quizSessionSchema
);

export default quizSessionSchema;
