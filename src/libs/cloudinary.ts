import { ConfigEntryEnum } from "@/enums";
import { v2 as cloudinary } from "cloudinary";
import config from "config";

cloudinary.config({
  cloud_name: config.get(ConfigEntryEnum.CloudinaryCloudName),
  api_key: config.get(ConfigEntryEnum.CloudinaryApiKey),
  api_secret: config.get(ConfigEntryEnum.CloudinaryApiSecret),
});

export default cloudinary;
