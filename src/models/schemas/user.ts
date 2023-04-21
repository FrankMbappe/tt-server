import mongoose from "mongoose";
import config from "config";
import jwt from "jsonwebtoken";
import startCase from "lodash/startCase";
import capitalize from "lodash/capitalize";
import { DbModelEnum, UserCategoryEnum } from "@/enums";
import userProfileSchema from "./userProfile";
import baseSchema from "./base";
import User from "../interfaces/User";

const studentAttrs = {
  fieldOfStudy: {
    type: String,
    minlength: 3,
    maxlength: 255,
    trim: true,
  },
  // TODO: reportCard: [{ Results }]
};
const consultantAttrs = {
  expertIn: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 255,
  },
  otherDomainsOfExpertise: [
    {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 255,
    },
  ],
  yearsOfExperience: { type: Number, default: 0 },
  companyName: String,
  proPhoneNumber: {
    type: String,
    trim: true,
  },
  proEmail: { type: String },
};
const teacherAttrs = {
  lecturesIn: [
    {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 255,
    },
  ],
  // TODO: schools or lecturesAt: []
};

// Schema
const userSchema = new mongoose.Schema<User>({
  ...baseSchema.obj,
  category: {
    type: String,
    required: true,
    enum: Object.values(UserCategoryEnum),
    lowercase: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  classroomIds: [{ type: mongoose.Types.ObjectId, ref: DbModelEnum.Classroom }],
  profile: userProfileSchema,
  attributesAs: {
    student: { type: studentAttrs },
    consultant: { type: consultantAttrs },
    teacher: { type: teacherAttrs },
  },
});

// Adds the token generation directly to the User object
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      _type: this._type,
      phone: this.phone,
      ...(this.profile && {
        profile: {
          honorific: this.profile.honorific,
          firstName: this.profile.firstName,
          lastName: this.profile.lastName,
          fullName:
            capitalize(this.profile.honorific + ". " ?? " ") +
            startCase(
              `${this.profile.firstName} ${this.profile.lastName}`.trim()
            ),
          picUri: this.profile.picUri,
          birthDate: this.profile.birthDate,
          gender: this.profile.gender,
        },
      }),
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

export const UserModel = mongoose.model(DbModelEnum.User, userSchema);

export default userSchema;
