import express, { Express } from "express";
import helmet from "helmet";
import loggingHandler from "@/middlewares/logging";
import promiseRejectionsHandler from "@/middlewares/promiseRejections";
import authRouter from "@/routes/auth";
import checksRouter from "@/routes/checks";
import classroomsRouter from "@/routes/classrooms";
import countriesRouter from "@/routes/countries";
import usersRouter from "@/routes/users";

const setupRoutes = (app: Express) => {
  // Setup middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(helmet());
  app.use(loggingHandler);
  app.use("/uploads", express.static("uploads")); // Makes 'uploads' folder public

  // Every '/api/foo' route should be handled by the 'foo' router
  app.use("/api/auth", authRouter);
  app.use("/api/checks", checksRouter);
  app.use("/api/classrooms", classroomsRouter);
  app.use("/api/countries", countriesRouter);
  app.use("/api/users", usersRouter);

  // Handle thrown errors
  app.use(promiseRejectionsHandler);
};

export default setupRoutes;
