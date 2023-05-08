import multer from "multer";
import { SupportedFileTypeEnum } from "./multer";

// Multer for cloudinary config
export default multer({
  storage: multer.diskStorage({}),
  fileFilter: (_, file, callback) =>
    callback(
      null,
      Object.values(SupportedFileTypeEnum).includes(
        file.mimetype as SupportedFileTypeEnum
      )
    ),
});
