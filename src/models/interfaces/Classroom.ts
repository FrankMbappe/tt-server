import mongoose from "mongoose";
import Base from "./Base";
import ClassroomMember from "./ClassroomMember";
import Post from "./Post";
import Quiz from "./Quiz";
import Tutorial from "./Tutorial";
import Topic from "./Topic";

export default interface Classroom extends Base {
  name: string;
  description?: string;
  teacherId: typeof mongoose.Types.ObjectId;
  members: ClassroomMember[];
  posts: Post[];
  quizzes: Quiz[];
  tutorials: Tutorial[];
  topics: Topic[];
}
