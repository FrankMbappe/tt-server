import { DbModelEnum } from "@/enums";
import { Schema, model } from "mongoose";
import fileSchema from "./file";
import baseSchema from "./base";
import TutorialStep from "../interfaces/TutorialStep";

const tutorialStepSchema = new Schema<TutorialStep>({
  ...baseSchema.obj,
  index: { type: Number, required: true },
  title: { type: String, minlength: 1, maxlength: 255, required: true },
  description: { type: String, maxlength: 255 },
  video: { type: fileSchema, required: true },
  viewerIds: { type: [Schema.Types.ObjectId], default: [] },
});

export const TutorialStepModel = model<TutorialStep>(
  DbModelEnum.TutorialStep,
  tutorialStepSchema
);

export default tutorialStepSchema;
