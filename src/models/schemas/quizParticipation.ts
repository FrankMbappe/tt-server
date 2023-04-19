import mongoose from "mongoose";
import { DbModelEnum } from "@/enums";
import quizSessionSchema from "./quizSession";

const quizParticipationSchema = new mongoose.Schema({
  author: { type: mongoose.Types.ObjectId, ref: DbModelEnum.User },
  quizSessions: { type: [quizSessionSchema], default: [] },
});

export const QuizParticipationModel = mongoose.model(
  DbModelEnum.QuizParticipation,
  quizParticipationSchema
);

export default quizParticipationSchema;
