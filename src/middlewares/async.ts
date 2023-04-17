import { Handler } from "express";

type AsyncHandler = (
  req: Parameters<Handler>[0],
  res: Parameters<Handler>[1],
  next: Parameters<Handler>[2]
) => Promise<unknown>;

function handleAsync(handler: AsyncHandler): AsyncHandler {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (exception) {
      next(exception);
    }
  };
}

export default handleAsync;
