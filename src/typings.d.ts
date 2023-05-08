import { JwtPayload } from "jsonwebtoken";
import "express";
import "joi";
import "joi-objectid";

declare module "express" {
  export interface Request {
    user?: JwtPayload;
  }
}

declare module "joi" {
  interface Root {
    objectId(): StringSchema;
  }
}

declare module "joi-objectid";
