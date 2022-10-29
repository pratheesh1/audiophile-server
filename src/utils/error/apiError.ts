export const UNKNOWN_ERROR = "Unknown error";
class ApiError extends Error {
  public httpStatusCode: number;

  constructor(err: unknown, httpStatusCode: number, message?: string) {
    if (ApiError.isError(err)) {
      super(message ?? err.message ?? UNKNOWN_ERROR);
      this.stack = err.stack;
    } else {
      super(message ?? UNKNOWN_ERROR);
    }
    this.httpStatusCode = httpStatusCode;
  }

  private static isError(err: unknown): err is Error {
    return err instanceof Error;
  }
}

export default ApiError;
