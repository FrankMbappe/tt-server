import { Types } from "mongoose";
import Base from "./Base";
import QaAttempt from "./QaAttempt";

export default interface QuizAttempt extends Base {
  authorId: Types.ObjectId;
  qaAttempts: QaAttempt[];
}
