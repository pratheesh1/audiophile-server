import { isDevEnv } from "@utils/config";
import { fileLogger, logger } from "@utils/logger";
import { RequestHandler } from "express";

export const logRequest: RequestHandler = (req, _res, next) => {
  const message = `[REQUEST] ${req.method} ${req.url} ${req.ip}`;
  if (isDevEnv) {
    logger.info(message);
    // logger.info(req);
  } else {
    fileLogger.info(message);
  }
  return next();
};
