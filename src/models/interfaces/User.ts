import Base from "./Base";
import UserProfile from "./UserProfile";

export type UserStudentAttributes = {
  fieldOfStudy: string; // TODO Store Fields separately
};
export type UserConsultantAttributes = {
  expertIn: string;
  otherDomainsOfExpertise: string[];
  yearsOfExperience: number;
  companyName?: string;
  proPhoneNumber?: string;
  proEmail?: string;
};
export type UserTeacherAtrributes = {
  lecturesIn: string[];
};
export type UserCategoryAttributes = {
  student?: UserStudentAttributes;
  consultant?: UserConsultantAttributes;
  teacher?: UserTeacherAtrributes;
};

export interface UserMethods {
  generateAuthToken(): string;
}

export default interface User extends Base {
  category: string;
  phoneNumber: string;
  classroomIds: string[];
  profile: UserProfile;
  attributesAs: UserCategoryAttributes;
}
