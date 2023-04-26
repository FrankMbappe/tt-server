import Base from "./Base";
import ClassroomMember from "./ClassroomMember";
import Topic from "./Topic";

export default interface Classroom extends Base {
  name: string;
  description?: string;
  teacher: ClassroomMember;
  members: ClassroomMember[];
  topics: Topic[];
}
