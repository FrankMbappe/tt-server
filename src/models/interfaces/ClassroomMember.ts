import { ClassromMemberRoleEnum } from "@/enums";
import { Types } from "mongoose";

type Role = `${ClassromMemberRoleEnum}`;

export default interface ClassroomMember {
  joinedAt: Date;
  userId: Types.ObjectId;
  role: Role;
}
