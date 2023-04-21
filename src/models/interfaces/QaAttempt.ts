import Base from "./Base";
import QaAnswer from "./QaAnswer";

export default interface QaAttempt extends Base {
  isCorrect: boolean;
  submittedAnswers: QaAnswer[];
  timeRemainingInSeconds: number;
}
