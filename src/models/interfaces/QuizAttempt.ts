import mongoose from "mongoose";
import Base from "./Base";
import QaAttempt from "./QaAttempt";

export default interface QuizAttempt extends Base {
  authorId: typeof mongoose.Types.ObjectId;
  qaAttempts: QaAttempt[];
}
