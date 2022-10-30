import { isDevEnv } from "@utils/config";
import { fileLogger, logger } from "@utils/logger";
import { IErrCode, IExpressMiddlewareFn, TAsyncRequestHandler } from "@utils/middlewares.d";
import { ErrorRequestHandler, NextFunction, Request, RequestHandler, Response } from "express";

import ApiError from "./error/apiError";

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handleError: ErrorRequestHandler = (err: ApiError, _req, res, _next) => {
  const message = `[ERROR] ${err.message} ${err.stack}`;
  if (isDevEnv) {
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
      middleware(req, res, next);
      return;
    } catch (err) {
      return next(new ApiError(err, statusCodeIfErr.code));
    }
  }.bind(statusCodeIfErr);
};

export const asyncBindApiErrCode: IExpressMiddlewareFn = (
  middleware: TAsyncRequestHandler,
  statusCodeIfErr: IErrCode
): RequestHandler => {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      await middleware(req, res, next);
      return;
    } catch (err) {
      const apiError = new ApiError(err, statusCodeIfErr.code);
      return next(apiError);
    }
  }.bind(statusCodeIfErr);
};
