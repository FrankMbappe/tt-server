import Joi from "joi";

const likeValidator = Joi.object({
  author: Joi.objectId().required(),
});

export default likeValidator;
