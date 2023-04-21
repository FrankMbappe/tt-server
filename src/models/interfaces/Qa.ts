import Base from "./Base";
import QaAnswer from "./QaAnswer";

export default interface Qa extends Base {
  index: number;
  topic: string;
  question: string;
  answers: QaAnswer[];
  rightAnswerIds: number[];
  timerInSeconds: number;
}
