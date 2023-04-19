import mongoose from "mongoose";
import { DbModelEnum, UserGenderEnum, UserHonorificEnum } from "@/enums";

const userProfileSchema = new mongoose.Schema({
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
  picCloudPublicId: String,
  pocket: {
    posts: [{ type: mongoose.Types.ObjectId, ref: DbModelEnum.Post }],
    // TODO Implement 'notes' property,
  },
});

export const UserProfileModel = mongoose.model(
  DbModelEnum.UserProfile,
  userProfileSchema
);

export default userProfileSchema;
