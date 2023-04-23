import debugFactory from "debug";
import jwt from "jsonwebtoken";
import config from "config";
import { Handler, Request } from "express";
import { ConfigEntryEnum } from "@/enums";
import { StatusCodes } from "http-status-codes";

const debug = debugFactory("ns:middleware");

const authHandler: Handler = (req: Request, res, next) => {
  debug("Authenticating...");

  const token = req.header("x-auth-token");
  if (!token)
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send("Access denied. No token provided.");

  try {
    const jwtPayload = jwt.verify(
      token,
      config.get(ConfigEntryEnum.JwtPrivateKey)
    );
    req.user = typeof jwtPayload !== "string" ? jwtPayload : undefined;
    next();
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send("Invalid token.");
  }
};

export default authHandler;
