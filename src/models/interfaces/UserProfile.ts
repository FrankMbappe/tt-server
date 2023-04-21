import { UserGenderEnum, UserHonorificEnum } from "@/enums";
import UserProfilePocket from "./UserProfilePocket";

export default interface UserProfile {
  honorific: `${UserHonorificEnum}`;
  firstName: string;
  lastName: string;
  birthDate: Date;
  email?: string;
  gender: `${UserGenderEnum}`;
  picUri: string;
  pocket: UserProfilePocket;
}
