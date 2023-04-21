import Post from "./Post";
import TutorialStep from "./TutorialStep";

export default interface Tutorial extends Post {
  title: string;
  description?: string;
  steps: TutorialStep[];
}
