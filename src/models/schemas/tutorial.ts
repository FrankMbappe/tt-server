import mongoose from "mongoose";
import postSchema from "./post";
import tutorialStepSchema from "./tutorialStep";
import { DbModelEnum } from "@/enums";

// Inherit from post schema
const tutorialSchema = new mongoose.Schema({
  ...postSchema.obj,
  title: { type: String, minlength: 1, maxlength: 255, required: true },
  description: { type: String, maxlength: 255 },
  steps: { type: [tutorialStepSchema], required: true },
});

export const TutorialModel = mongoose.model(
  DbModelEnum.Tutorial,
  tutorialSchema
);

export default tutorialSchema;
