import mongoose from "mongoose";
import { DbModelEnum, UserTypeEnum } from "@/enums";

const participationSchema = new mongoose.Schema({
  joiningDate: { type: Date, default: Date.now },
  user: {
    type: mongoose.Types.ObjectId,
    ref: DbModelEnum.User,
    required: true,
  },
  role: {
    type: String,
    enum: {
      values: Object.values(UserTypeEnum).filter(
        (t) => t != UserTypeEnum.Teacher
      ), // Any other type except Teacher
      message:
        "A classroom can only have one teacher. {VALUE} is not supported.",
    },
    required: true,
  },
});

export default participationSchema;
