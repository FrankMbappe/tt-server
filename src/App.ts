import express from "express";
import dotenv from "dotenv";
import winston from "winston";
import startUp from "./startup";

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 3000;

startUp(app).then(() =>
  app.listen(port, () => {
    winston.info(
      `⚡️[server]: Da server is running at http://localhost:${port}`
    );
  })
);
