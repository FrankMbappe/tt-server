import express, { Express } from "express";
import helmet from "helmet";
import loggingHandler from "@/middlewares/logging";
import errorHandler from "@/middlewares/errors";

const setupRoutes = (app: Express) => {
  /* MIDDLEWARE */
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(helmet());
  app.use(loggingHandler);
  app.use("/uploads", express.static("uploads")); // Makes 'uploads' folder public

  // Every '/api/foo' route should be handled by the 'foo' router
  // app.use("/api/auth", auth);
  // app.use("/api/checks", checks);
  // app.use("/api/classrooms", classrooms);
  // app.use("/api/countries", countries);
  // app.use("/api/users", users);

  /* Handling routes errors */
  app.use(errorHandler);
};

export default setupRoutes;
