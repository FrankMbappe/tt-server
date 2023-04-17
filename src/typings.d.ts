import { JwtPayload } from "jsonwebtoken";
import "express";

declare module "express" {
  export interface Request {
    user?: string | JwtPayload;
  }
}
