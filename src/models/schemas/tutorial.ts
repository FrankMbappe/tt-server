import { Schema, model } from "mongoose";
import postSchema from "./post";
import tutorialStepSchema from "./tutorialStep";
import { DbModelEnum } from "@/enums";
import Tutorial from "../interfaces/Tutorial";

// Inherit from post schema
const tutorialSchema = new Schema<Tutorial>({
  ...postSchema.obj,
  title: { type: String, minlength: 1, maxlength: 255, required: true },
  description: { type: String, maxlength: 255 },
  steps: { type: [tutorialStepSchema], required: true },
});

export const TutorialModel = model<Tutorial>(
  DbModelEnum.Tutorial,
  tutorialSchema
);

export default tutorialSchema;
