import { IErrCode, IExpressMiddlewareFn } from "@middlewares/middlewares";
import { isDevEnv } from "@utils/config";
import ApiError from "@utils/error/apiError";
import { fileLogger, logger } from "@utils/logger";
import { ErrorRequestHandler, NextFunction, Request, RequestHandler, Response } from "express";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handleError: ErrorRequestHandler = (err: ApiError, _req, res, _next) => {
  let errMsg: string;
  try {
    errMsg = JSON.parse(err.message);
  } catch (e) {
    errMsg = err.message;
  }

  res.status(err.httpStatusCode).json({
    status: "error",
    message: errMsg,
  });

  const message = `[RESPONSE:ERROR] ${err.httpStatusCode} ${err.message}`;
  if (isDevEnv) {
    logger.error(message);
    // logger.error(err);
  } else {
    logger.error(message);
    fileLogger.error(message);
  }
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

// To be explicit about having async middlewares
export type TAsyncRequestHandler = (
  ...a: Parameters<RequestHandler>
) => Promise<ReturnType<RequestHandler>>;

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
