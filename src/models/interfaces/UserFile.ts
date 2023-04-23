import { Types } from "mongoose";
import Base from "./Base";

export default interface UserFile extends Base {
  authorId: Types.ObjectId;
  mimeType: string;
  uri: string;
  name: string;
  size: number;
  extension: string;
  publicCloudId: string;
}
