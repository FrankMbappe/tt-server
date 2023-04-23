import Joi from "joi";
import Like from "../interfaces/Like";

const likeValidator = Joi.object<Like>({
  authorId: Joi.objectId().required(),
});

export default likeValidator;
