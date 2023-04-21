import mongoose from "mongoose";
import qaAnswerSchema from "./qaAnswer";
import { DbModelEnum } from "@/enums";
import baseSchema from "./base";
import Qa from "../interfaces/Qa";

const qaSchema = new mongoose.Schema<Qa>({
  ...baseSchema.obj,
  index: { type: Number, required: true },
  topic: { type: String, minlength: 1, maxlength: 255 },
  question: { type: String, minlength: 1, maxlength: 255, required: true },
  answers: { type: [qaAnswerSchema], required: true },
  rightAnswerIds: { type: [Number], required: true },
  timerInSeconds: { type: Number, min: 5 },
});

export const QaModel = mongoose.model(DbModelEnum.Qa, qaSchema);

export default qaSchema;
