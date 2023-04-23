import Joi from "joi";
import postValidator from "./post";
import tutorialStepValidator from "./tutorialStep";
import Tutorial from "../interfaces/Tutorial";
import TutorialStep from "../interfaces/TutorialStep";

// Inherit from Joi postValidator schema, as a tutorial is a kind of post
const tutorialValidator = postValidator.append<Tutorial>({
  title: Joi.string().min(1).max(255).required(),
  description: Joi.string().max(255),
  steps: Joi.array<TutorialStep>().items(tutorialStepValidator).min(2),
});

export default tutorialValidator;
