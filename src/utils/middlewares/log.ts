import { isDevEnv } from "@utils/config";
import { fileLogger, logger } from "@utils/logger";
import { NextFunction, Request, RequestHandler, Response } from "express";

export const logRequest: RequestHandler = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const message = `[REQUEST] ${req.method} ${req.url} ${req.ip}`;
  if (isDevEnv) {
    logger.info(message);
    // logger.info(req);
    // logger.info(req.session);
  } else {
    fileLogger.info(message);
  }
  return next();
};
