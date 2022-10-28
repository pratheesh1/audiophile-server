import { config } from "@utils/config";
import { fileLogger, logger } from "@utils/logger";
import { IExpressMiddlewareFn, TAsyncExpressMiddleware } from "@utils/middlewares.d";
import { ErrorRequestHandler, NextFunction, Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";

import ApiError from "./error/apiError";

export const logRequest: RequestHandler = (req, _res, next) => {
  const message = `[REQUEST] ${req.method} ${req.url} ${req.ip}`;
  if (config.NODE_ENV === "development") {
    logger.info(message);
    logger.info(req);
  } else {
    fileLogger.info(message);
  }

  next();
};

export const logError: ErrorRequestHandler = (err: ApiError, _req, res) => {
  const message = `[ERROR] ${err.message} ${err.stack}`;
  if (config.NODE_ENV === "development") {
    logger.error(err);
  } else {
    logger.error(message);
    fileLogger.error(message);
  }

  return res.sendStatus(err.httpStatusCode).json({
    message: err.message,
  });
};

export const syncBindApiErrCode: IExpressMiddlewareFn = (
  middleware: RequestHandler,
  statusCodeIfErr: StatusCodes
): RequestHandler => {
  return function (req: Request, res: Response, next: NextFunction) {
    try {
      return middleware(req, res, next);
    } catch (err) {
      next(new ApiError(err, statusCodeIfErr));
    }
  }.bind(statusCodeIfErr);
};

export const asyncBindApiErrCode: IExpressMiddlewareFn = (
  middleware: TAsyncExpressMiddleware,
  statusCodeIfErr: StatusCodes
): RequestHandler => {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      return middleware(req, res, next);
    } catch (err) {
      const apiError = new ApiError(err, statusCodeIfErr);
      next(apiError);
    }
  }.bind(statusCodeIfErr);
};
