import debugFactory from "debug";
import jwt from "jsonwebtoken";
import config from "config";
import { Handler, Request } from "express";
import { ConfigEntryEnum } from "@/enums";

const debug = debugFactory("ns:middleware");

const authHandler: Handler = (req: Request, res, next) => {
  debug("Authenticating...");

  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    req.user = jwt.verify(token, config.get(ConfigEntryEnum.JwtPrivateKey));
    next();
  } catch (error) {
    res.status(400).send("Invalid token.");
  }
};

export default authHandler;
