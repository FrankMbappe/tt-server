import mongoose from "mongoose";
import { ClassromMemberRoleEnum, DbModelEnum } from "@/enums";
import ClassroomMember from "../interfaces/ClassroomMember";

const classroomMemberSchema = new mongoose.Schema<ClassroomMember>({
  joinedAt: { type: Date, default: Date.now },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: DbModelEnum.User,
    required: true,
  },
  role: {
    type: String,
    enum: Object.values(ClassromMemberRoleEnum),
    required: true,
  },
});

export default classroomMemberSchema;
