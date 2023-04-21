import mongoose from "mongoose";
import { DbModelEnum, UserGenderEnum, UserHonorificEnum } from "@/enums";
import userProfilePocketSchema from "./userProfilePocket";
import UserProfile from "../interfaces/UserProfile";

const userProfileSchema = new mongoose.Schema<UserProfile>({
  honorific: {
    type: String,
    enum: Object.values(UserHonorificEnum),
  },
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
  birthDate: Date,
  email: { type: String },
  gender: {
    type: String,
    enum: Object.values(UserGenderEnum),
    lowercase: true,
  },
  picUri: String,
  pocket: { type: userProfilePocketSchema, required: true },
});

export const UserProfileModel = mongoose.model(
  DbModelEnum.UserProfile,
  userProfileSchema
);

export default userProfileSchema;
