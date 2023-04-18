import debugFactory from "debug";
import { Handler } from "express";

const debug = debugFactory("ns:middleware");

const handleLogging: Handler = (_req, _res, next) => {
  debug("Logging...");

  // Nothing will be executed unless next() is called

  next();
};

export default handleLogging;
