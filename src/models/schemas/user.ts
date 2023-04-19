import mongoose from "mongoose";
import config from "config";
import jwt from "jsonwebtoken";
import startCase from "lodash/startCase";
import capitalize from "lodash/capitalize";
import { DbModelEnum, UserTypeEnum } from "@/enums";
import userProfileSchema from "./userProfile";

// Basic user properties
const basicProps = {
  creationDate: { type: Date, default: Date.now },
  phone: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  _type: {
    type: String,
    required: true,
    enum: Object.values(UserTypeEnum),
    lowercase: true,
    trim: true,
  },
  classrooms: [{ type: mongoose.Types.ObjectId, ref: DbModelEnum.Classroom }],
  profile: userProfileSchema,
};
const studentProps = {
  field: {
    type: String,
    minlength: 3,
    maxlength: 255,
    trim: true,
  },
  // TODO: reportCard: [{ Results }]
};
const consultantProps = {
  company: String,
  proPhone: {
    type: String,
    trim: true,
  },
  proEmail: { type: String },
  mainDomain: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 255,
  },
  additDomains: [
    {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 255,
    },
  ],
  yearsOfExperience: { type: Number, default: 0 },
};
const teacherProps = {
  lectures: [
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
const userSchema = new mongoose.Schema({
  ...basicProps,
  studentProps: {
    type: { ...studentProps },
  },
  consultantProps: {
    type: { ...consultantProps },
  },
  teacherProps: {
    type: { ...teacherProps },
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
