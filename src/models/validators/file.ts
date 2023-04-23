import Joi from "joi";
import { MAX_FILE_SIZE } from "@/enums";
import UserFile from "../interfaces/UserFile";

const fileValidator = Joi.object<UserFile>({
  authorId: Joi.objectId().required(),
  mimeType: Joi.string().required(),
  uri: Joi.string().required(),
  name: Joi.string().max(255).required(),
  size: Joi.number().max(MAX_FILE_SIZE).required(),
  extension: Joi.string().required(),
  publicCloudId: Joi.string(),
});

export default fileValidator;
