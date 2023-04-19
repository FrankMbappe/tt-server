import mongoose from "mongoose";
import isBefore from "date-fns/isBefore";
import postSchema from "./post";
import qaSchema from "./qa";
import quizParticipationSchema from "./quizParticipation";
import { DbModelEnum } from "@/enums";

const quizSchema = new mongoose.Schema({
  ...postSchema.obj,
  title: { type: String, minlength: 3, maxlength: 255, required: true },
  description: { type: String, minlength: 1, maxlength: 1000 },
  hasTimeInterval: { type: Boolean, required: true },
  dateOpening: Date,
  dateClosing: {
    type: Date,
    validator: {
      validate: function (value: Date) {
        return this.dateOpening && isBefore(this.dateOpening, value);
      },
    },
  },
  qas: { type: [qaSchema], required: true },
  participations: { type: [quizParticipationSchema], default: [] },
  isDeterministic: { type: Boolean, default: false },
});

export const QuizModel = mongoose.model(DbModelEnum.Quiz, quizSchema);

export default quizSchema;
