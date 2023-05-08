import Joi, { StringSchema } from "joi";
import JoiObjectId from "joi-objectid";

const joiObjectId: () => StringSchema = JoiObjectId(Joi);

export default joiObjectId;
