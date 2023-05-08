import { MAX_FILE_SIZE } from "@/enums";
import path from "path";
import multer from "multer";

const BASE_URL = "uploads";

enum SupportedFileTypeEnum {
  Image = "image",
  Video = "video",
}

// Storage configuration
const fileStorage = multer.diskStorage({
  destination: (_, file, callback) => {
    const path = `${BASE_URL}/${
      file.mimetype.includes(SupportedFileTypeEnum.Image)
        ? "/images/"
        : file.mimetype.includes(SupportedFileTypeEnum.Video)
        ? "/videos/"
        : "/documents/"
    }`;

    callback(null, path);
  },
  filename: (req, file, callback) => {
    if (typeof req.user !== "object") return;

    const fileName =
      req.user._id +
      "_" +
      new Date().getTime() +
      path.extname(file.originalname);

    callback(null, fileName);
  },
});

// Will serve as middleware
const upload = multer({
  storage: fileStorage,
  fileFilter: (_, file, callback) =>
    callback(
      null,
      Object.values(SupportedFileTypeEnum).includes(
        file.mimetype as SupportedFileTypeEnum
      )
    ),
  limits: { fileSize: MAX_FILE_SIZE },
});

const convertMulterToUserFile = (file: Express.Multer.File) => ({
  createdAt: new Date(),
  publicCloudId: "",
  url: file.path,
  mimeType: file.mimetype,
  name: file.originalname,
  extension: path.extname(file.originalname),
  size: file.size,
});

export { upload, SupportedFileTypeEnum, convertMulterToUserFile };
