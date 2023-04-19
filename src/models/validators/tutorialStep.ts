import Joi from "joi";

const tutorialStepValidator = Joi.object({
  position: Joi.number().required(),
  title: Joi.string().min(1).max(255).required(),
  description: Joi.string().max(255),
  videoUri: Joi.string(),
  videoCloudPublicId: Joi.string(),
  haveWatched: Joi.array().items(Joi.objectId()),
});

export default tutorialStepValidator;
