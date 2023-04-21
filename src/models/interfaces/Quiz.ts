import Post from "./Post";
import Qa from "./Qa";
import QuizAttempt from "./QuizAttempt";

export default interface Quiz extends Post {
  title: string;
  description?: string;
  opensAt: Date;
  closesAt: Date;
  qas: Qa[];
  attempts: QuizAttempt[];
  isTimeBounded: boolean;
  isDeterministic: boolean;
}
