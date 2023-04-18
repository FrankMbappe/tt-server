import morgan from "morgan"; // Incoming requests logging
import debugFactory from "debug";
import { Express } from "express";

const debug = debugFactory("ns:startup");

const sayHello = (app: Express) => {
  /* If we are in development mode */
  if (app.get("env") === "development") {
    app.use(morgan("combined", { skip: false, immediate: true }));
    if (!process.env.DEBUG)
      debug(
        "'DEBUG' environment variable is not yet set. Debugger logs cannot be displayed."
      );
  }
};

export default sayHello;
