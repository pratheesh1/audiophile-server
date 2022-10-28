import { config } from "@utils/config";
import { fileLogger, logger } from "@utils/logger";
import { IErrCode, IExpressMiddlewareFn, TAsyncRequestHandler } from "@utils/middlewares.d";
import { ErrorRequestHandler, NextFunction, Request, RequestHandler, Response } from "express";

import ApiError from "./error/apiError";

export const logRequest: RequestHandler = (req, _res, next) => {
  const message = `[REQUEST] ${req.method} ${req.url} ${req.ip}`;
  if (config.NODE_ENV === "development") {
    logger.info(message);
    // logger.info(req);
  } else {
    fileLogger.info(message);
  }

  next();
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const logError: ErrorRequestHandler = (err: ApiError, _req, res, _next) => {
  const message = `[ERROR] ${err.message} ${err.stack}`;
  if (config.NODE_ENV === "development") {
    logger.error(err);
  } else {
    logger.error(message);
    fileLogger.error(message);
  }

  return res.status(err.httpStatusCode).json({
    status: "error",
    message: err.message,
  });
};

export const syncBindApiErrCode: IExpressMiddlewareFn = (
  middleware: RequestHandler,
  statusCodeIfErr: IErrCode
): RequestHandler => {
  return function (req: Request, res: Response, next: NextFunction) {
    try {
      return middleware(req, res, next);
    } catch (err) {
      next(new ApiError(err, statusCodeIfErr.code));
    }
  }.bind(statusCodeIfErr);
};

export const asyncBindApiErrCode: IExpressMiddlewareFn = (
  middleware: TAsyncRequestHandler,
  statusCodeIfErr: IErrCode
): RequestHandler => {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      return middleware(req, res, next);
    } catch (err) {
      const apiError = new ApiError(err, statusCodeIfErr.code);
      next(apiError);
    }
  }.bind(statusCodeIfErr);
};
