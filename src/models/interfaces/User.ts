import Base from "./Base";
import UserProfile from "./UserProfile";

type StudentAttributes = {
  fieldOfStudy: string; // TODO Store Fields separately
};
type ConsultantAttributes = {
  expertIn: string;
  otherDomainsOfExpertise: string[];
  yearsOfExperience: number;
  companyName?: string;
  proPhoneNumber?: string;
  proEmail?: string;
};
type TeacherAtrributes = {
  lecturesIn: string[];
};

export default interface User extends Base {
  category: string;
  phoneNumber: string;
  classroomIds: string[];
  profile: UserProfile;
  attributesAs: {
    student?: StudentAttributes;
    consultant?: ConsultantAttributes;
    teacher?: TeacherAtrributes;
  };
  generateAuthToken: () => string;
}
