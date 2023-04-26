import { ClassromMemberRoleEnum } from "@/enums";
import { Types } from "mongoose";
import { BasicUserProfile } from "./UserProfile";

export type ClassroomMemberRole = `${ClassromMemberRoleEnum}`;

export default interface ClassroomMember extends BasicUserProfile {
  joinedAt: Date;
  userId: Types.ObjectId;
  role: ClassroomMemberRole;
}
