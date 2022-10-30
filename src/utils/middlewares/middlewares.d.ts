import { StatusCodes } from "http-status-codes";

// Extend the Express Request type to include a code to be used in the error handler
export interface IExpressMiddlewareFn extends Function {
  bind<T, AX, R>(
    this: (this: T, ...args: AX[]) => R,
    thisArg: T,
    ...args: AX[]
  ): (...args: AX[]) => R;
}

export interface IErrCode {
  code: StatusCodes;
}
