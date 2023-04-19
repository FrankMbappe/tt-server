import mongoose from "mongoose";
import qaAnswerSchema from "./qaAnswer";
import { DbModelEnum } from "@/enums";

const qaSchema = new mongoose.Schema({
  position: { type: Number, required: true },
  topic: { type: String, minlength: 1, maxlength: 255 },
  question: { type: String, minlength: 1, maxlength: 255, required: true },
  answers: { type: [qaAnswerSchema], required: true },
  rightAnswers: { type: [Number], required: true },
  timer: { type: Number, min: 5 },
});

export const QaModel = mongoose.model(DbModelEnum.Qa, qaSchema);

export default qaSchema;
