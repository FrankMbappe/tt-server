import mongoose from "mongoose";
import Base from "./Base";

export default interface UserFile extends Base {
  authorId: typeof mongoose.Types.ObjectId;
  mimeType: string;
  uri: string;
  name: string;
  size: number;
  extension: string;
  publicCloudId: string;
}
