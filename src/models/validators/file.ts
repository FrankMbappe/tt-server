import Joi from "joi";
import { MAX_FILE_SIZE } from "@/enums";

const fileValidator = Joi.object({
  mimetype: Joi.string().required(),
  uri: Joi.string().required(),
  name: Joi.string().max(255).required(),
  size: Joi.number().max(MAX_FILE_SIZE).required(),
  extension: Joi.string().required(),
  cloudPublicId: Joi.string(),
});

export default fileValidator;
