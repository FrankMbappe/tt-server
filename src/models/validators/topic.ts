import Joi from "joi";
import Topic from "../interfaces/Topic";

const topicValidator = Joi.object<Topic>({
  name: Joi.string().min(1).max(255).required(),
});

export default topicValidator;
