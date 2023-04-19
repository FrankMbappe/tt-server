import { DbModelEnum } from "@/enums";
import mongoose from "mongoose";

const tutorialStepSchema = new mongoose.Schema({
  creationDate: { type: Date, default: Date.now },
  position: { type: Number, required: true },
  title: { type: String, minlength: 1, maxlength: 255, required: true },
  description: { type: String, maxlength: 255 },
  videoUri: { type: String, required: true },
  videoCloudPublicId: String,
  haveWatched: { type: [mongoose.Types.ObjectId], default: [] },
});

export const TutorialStepModel = mongoose.model(
  DbModelEnum.TutorialStep,
  tutorialStepSchema
);

export default tutorialStepSchema;
