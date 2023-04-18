import { Express } from "express";
import setupLogger from "./logger";
import setupConfig from "./config";
import setupDb from "./database";
import setupRoutes from "./routes";

const startUp = async (app: Express) => {
  setupLogger();
  setupConfig();
  await setupDb();
  setupRoutes(app);
};

export default startUp;
