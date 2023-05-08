import Joi from "joi";
import { MAX_FILE_SIZE } from "@/enums";
import UserFile from "../interfaces/UserFile";

const userFileValidator = Joi.object<UserFile>({
  authorId: Joi.objectId().required(),
  mimeType: Joi.string().required(),
  url: Joi.string().required(),
  name: Joi.string().max(255).required(),
  size: Joi.number().max(MAX_FILE_SIZE).required(),
  extension: Joi.string().required(),
  publicCloudId: Joi.string(),
});

export default userFileValidator;
