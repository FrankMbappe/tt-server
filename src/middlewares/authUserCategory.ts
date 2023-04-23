import { UserCategoryEnum } from "@/enums";
import { Handler, Request } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

const authUserCategory =
  (userCategory: UserCategoryEnum): Handler =>
  (req: Request, res, next) => {
    if (req.user?._type !== userCategory)
      return res.status(StatusCodes.FORBIDDEN).send(ReasonPhrases.FORBIDDEN);
    next();
  };

export default authUserCategory;
