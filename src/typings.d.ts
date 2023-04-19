import { JwtPayload } from "jsonwebtoken";
import "express";
import "joi";

declare module "express" {
  export interface Request {
    user?: string | JwtPayload;
  }
}

declare module "joi" {
  interface Root {
    objectId(): StringSchema;
  }
}
