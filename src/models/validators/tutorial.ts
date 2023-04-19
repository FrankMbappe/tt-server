import Joi from "joi";
import postValidator from "./post";
import tutorialStepValidator from "./tutorialStep";

// Inherit from Joi postValidator schema, as a tutorial is a kind of post
const tutorialValidator = postValidator.keys({
  title: Joi.string().min(1).max(255).required(),
  description: Joi.string().max(255),
  steps: Joi.array().items(tutorialStepValidator).min(2),
});

export default tutorialValidator;
