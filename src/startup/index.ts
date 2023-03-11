import { Express } from "express";
import setupLogger from "./logger";

const startup = (app: Express) => {
  setupLogger();
};

export default startup;
