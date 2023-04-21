import mongoose from "mongoose";
import isBefore from "date-fns/isBefore";
import postSchema from "./post";
import qaSchema from "./qa";
import quizAttemptSchema from "./quizAttempt";
import { DbModelEnum } from "@/enums";
import Quiz from "../interfaces/Quiz";

const quizSchema = new mongoose.Schema<Quiz>({
  ...postSchema.obj,
  title: { type: String, minlength: 3, maxlength: 255, required: true },
  description: { type: String, minlength: 1, maxlength: 1000 },
  isTimeBounded: { type: Boolean, required: true },
  opensAt: Date,
  closesAt: {
    type: Date,
    validator: {
      validate: function (value: Date) {
        return this.dateOpening && isBefore(this.dateOpening, value);
      },
    },
  },
  qas: { type: [qaSchema], required: true },
  attempts: { type: [quizAttemptSchema], default: [] },
  isDeterministic: { type: Boolean, default: false },
});

export const QuizModel = mongoose.model(DbModelEnum.Quiz, quizSchema);

export default quizSchema;
