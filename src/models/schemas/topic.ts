import mongoose from "mongoose";
import Topic from "../interfaces/Topic";

const topicSchema = new mongoose.Schema<Topic>({
  name: { type: String, minlength: 3, maxlength: 500, required: true },
});

export default topicSchema;
