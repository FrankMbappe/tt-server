import Joi from "joi";

const userPocketValidator = Joi.object({
  posts: Joi.array().items(Joi.objectId()),
  // TODO Implement 'notes' property
});

export default userPocketValidator;
