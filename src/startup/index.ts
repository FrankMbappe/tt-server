import { Express } from "express";
import setupLogger from "./logger";
import setupConfig from "./config";
import setupDb from "./database";
import setupRoutes from "./routes";
import sayHello from "./hello";

const startUp = async (app: Express) => {
  setupLogger(); // Error handling and logging
  setupConfig(); // Check environment variables
  await setupDb(); // Database connection
  setupRoutes(app); // Routes and middlewares
  sayHello(app); // Say hello :)
};

export default startUp;
