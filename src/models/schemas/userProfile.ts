import { Schema, model } from "mongoose";
import { DbModelEnum, UserGenderEnum, UserHonorificEnum } from "@/enums";
import userProfilePocketSchema from "./userProfilePocket";
import UserProfile, { BasicUserProfile } from "../interfaces/UserProfile";

const userProfileSchema = new Schema<UserProfile>({
  firstName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255,
    trim: true,
  },
  picUrl: String,
  honorific: {
    type: String,
    enum: Object.values(UserHonorificEnum),
  },
  birthDate: Date,
  email: { type: String },
  gender: {
    type: String,
    enum: Object.values(UserGenderEnum),
    lowercase: true,
  },
  pocket: { type: userProfilePocketSchema, required: true },
});

export const basicUserProfileSchema = new Schema<BasicUserProfile>({
  firstName: userProfileSchema.obj.firstName,
  lastName: userProfileSchema.obj.lastName,
  picUrl: userProfileSchema.obj.picUrl,
});

export const UserProfileModel = model<UserProfile>(
  DbModelEnum.UserProfile,
  userProfileSchema
);

export default userProfileSchema;
