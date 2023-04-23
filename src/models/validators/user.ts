import Joi from "joi";
import { UserCategoryEnum } from "@/enums";
import userProfileValidator from "./userProfile";
import User, {
  UserCategoryAttributes,
  UserConsultantAttributes,
  UserStudentAttributes,
  UserTeacherAtrributes,
} from "../interfaces/User";
import { Types } from "mongoose";

export const userCategoryValidator = Joi.string()
  .valid(...Object.values(UserCategoryEnum))
  .required();

const userValidator = Joi.object<User>({
  category: userCategoryValidator,
  phoneNumber: Joi.string().min(5).max(255).required(),
  classroomIds: Joi.array<Types.ObjectId>().items(Joi.objectId().required()),
  profile: userProfileValidator,
  attributesAs: Joi.object<UserCategoryAttributes>({
    student: Joi.object<UserStudentAttributes>({
      fieldOfStudy: Joi.string().min(3).max(255).required(),
    }),
    consultant: Joi.object<UserConsultantAttributes>({
      companyName: Joi.string(),
      proPhoneNumber: Joi.string().max(255),
      proEmail: Joi.string().email(),
      expertIn: Joi.string().min(3).max(255).required(),
      otherDomainsOfExpertise: Joi.array<string>().items(
        Joi.string().min(3).max(255)
      ),
      yearsOfExperience: Joi.number().positive().max(100).required(),
    }),
    teacher: Joi.object<UserTeacherAtrributes>({
      lecturesIn: Joi.array<string>().required(),
    }),
  }),
});

export default userValidator;
