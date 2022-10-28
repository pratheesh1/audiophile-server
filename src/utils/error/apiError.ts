class ApiError extends Error {
  public httpStatusCode: number;

  constructor(err: unknown, httpStatusCode: number, message?: string) {
    if (ApiError.isError(err)) {
      super(message ?? err.message);
      this.stack = err.stack;
    } else {
      super("Unknown error");
    }
    this.httpStatusCode = httpStatusCode;
  }

  private static isError(err: unknown): err is Error {
    return err instanceof Error;
  }
}

export default ApiError;
