import { Schema } from "mongoose";
import QaAnswer from "../interfaces/QaAnswer";

const qaAnswerSchema = new Schema<QaAnswer>({
  id: { type: Number, required: true },
  value: { type: String, maxlength: 255, required: true },
});

export default qaAnswerSchema;
