import mongoose from "mongoose";

const baseSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
});

export default baseSchema;
