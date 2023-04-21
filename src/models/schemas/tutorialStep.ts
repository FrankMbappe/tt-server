import { DbModelEnum } from "@/enums";
import mongoose from "mongoose";
import fileSchema from "./file";
import baseSchema from "./base";
import TutorialStep from "../interfaces/TutorialStep";

const tutorialStepSchema = new mongoose.Schema<TutorialStep>({
  ...baseSchema.obj,
  index: { type: Number, required: true },
  title: { type: String, minlength: 1, maxlength: 255, required: true },
  description: { type: String, maxlength: 255 },
  video: { type: fileSchema, required: true },
  viewerIds: { type: [mongoose.Types.ObjectId], default: [] },
});

export const TutorialStepModel = mongoose.model(
  DbModelEnum.TutorialStep,
  tutorialStepSchema
);

export default tutorialStepSchema;
