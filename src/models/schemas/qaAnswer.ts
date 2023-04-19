import mongoose from "mongoose";

const qaAnswerSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  value: { type: String, maxlength: 255, required: true },
});

export default qaAnswerSchema;
