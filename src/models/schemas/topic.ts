import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
  name: { type: String, minlength: 3, maxlength: 500, required: true },
});

export default topicSchema;
