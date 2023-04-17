import dotenv from "dotenv";
import config from "config";
import { ConfigEntries } from "@/enums";

dotenv.config();

export default function setupConfig() {
  const isEveryEnvSet = Object.values(ConfigEntries).every((entry) =>
    config.has(entry)
  );

  if (!isEveryEnvSet)
    throw new Error(
      "FATAL ERROR: Some of the required the environment variables are not set."
    );
}
