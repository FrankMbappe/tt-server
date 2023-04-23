import winston from "winston";
import { ErrorRequestHandler } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

/**
 * Handle promise rejections from all routes
 */
const handlePromiseRejections: ErrorRequestHandler = (err, _req, res) => {
  // Log errors
  winston.error(err.message, err);

  // Reply with an Internal server error
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
};

export default handlePromiseRejections;
