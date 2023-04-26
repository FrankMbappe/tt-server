import { UserGenderEnum, UserHonorificEnum } from "@/enums";
import UserProfilePocket from "./UserProfilePocket";

export type UserHonorific = `${UserHonorificEnum}`;
export type UserGender = `${UserGenderEnum}`;

export default interface UserProfile {
  honorific: UserHonorific;
  firstName: string;
  lastName: string;
  picUrl?: string;
  birthDate: Date;
  email?: string;
  gender: UserGender;
  pocket: UserProfilePocket;
}

export type BasicUserProfile = Pick<
  UserProfile,
  "firstName" | "lastName" | "picUrl"
>;
