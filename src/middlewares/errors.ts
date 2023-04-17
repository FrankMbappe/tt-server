import winston from "winston";
import { ErrorRequestHandler } from "express";

const handleErrors: ErrorRequestHandler = (err, _req, res) => {
  /* This is how all promise rejections of our routes
    will be handled */

  // Log errors
  winston.error(err.message, err);

  // Reply with an Internal server error
  res
    .status(500)
    .send("An internal error occurred while executing the request.");
};

export default handleErrors;
