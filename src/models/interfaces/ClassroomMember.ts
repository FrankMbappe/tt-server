import { ClassromMemberRoleEnum } from "@/enums";
import mongoose from "mongoose";

type Role = `${ClassromMemberRoleEnum}`;

export default interface ClassroomMember {
  joinedAt: Date;
  userId: typeof mongoose.Types.ObjectId;
  role: Role;
}
