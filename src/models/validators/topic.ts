import Joi from "joi";

const topicValidator = Joi.object({
  name: Joi.string().min(1).max(255).required(),
});

export default topicValidator;
