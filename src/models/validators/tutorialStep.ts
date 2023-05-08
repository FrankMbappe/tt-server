import Joi from "joi";
import TutorialStep from "../interfaces/TutorialStep";
import userFileValidator from "./userFile";
import { Types } from "mongoose";

const tutorialStepValidator = Joi.object<TutorialStep>({
  index: Joi.number().required(),
  title: Joi.string().min(1).max(255).required(),
  description: Joi.string().max(255),
  video: userFileValidator,
  viewerIds: Joi.array<Types.ObjectId>().items(Joi.objectId()),
});

export default tutorialStepValidator;
