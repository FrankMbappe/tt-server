import Base from "./Base";
import UserFile from "./UserFile";

export default interface TutorialStep extends Base {
  index: number;
  title: string;
  description?: string;
  video: UserFile;
  viewerIds: string[];
}
