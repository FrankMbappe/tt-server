import Joi from "joi";
import { UserTypeEnum } from "@/enums";
import userProfileValidator from "./userProfile";

export const userTypeValidator = Joi.string()
  .valid(...Object.values(UserTypeEnum))
  .required();

const userValidator = Joi.object({
  _type: userTypeValidator,
  phone: Joi.string().min(5).max(255).required(),
  classrooms: Joi.array().items(Joi.objectId().required()),
  profile: userProfileValidator,

  // Student
  studentProps: Joi.object({
    field: Joi.string().min(3).max(255).required(),
  }),

  // Consultant
  consultantProps: Joi.object({
    company: Joi.string(),
    proPhone: Joi.string().max(255),
    proEmail: Joi.string().email(),
    mainDomain: Joi.string().min(3).max(255).required(),
    additDomains: Joi.array().items(Joi.string().min(3).max(255)),
    yearsOfExperience: Joi.number().positive().max(100).required(),
  }),

  // Teacher
  teacherProps: Joi.object({
    lectures: Joi.array().required(),
  }),
});

export default userValidator;
