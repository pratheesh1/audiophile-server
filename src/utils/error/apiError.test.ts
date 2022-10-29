import ApiError, { UNKNOWN_ERROR } from "./apiError";

describe("Test ApiError class", () => {
  const err = new Error("Test error");
  const ERR_MSG = "Error message";
  const STATUS_CODE = 500;
  const apiError = new ApiError(err, STATUS_CODE, ERR_MSG);

  it("is an instance of Error", () => {
    expect(apiError).toBeInstanceOf(Error);
  });

  it("should return the correct message", () => {
    expect(apiError.message).toEqual(ERR_MSG);
  });

  it("should return the correct http status code", () => {
    expect(apiError.httpStatusCode).toEqual(STATUS_CODE);
  });

  it("should return the correct stack trace", () => {
    expect(apiError.stack).toBeDefined();
    expect(apiError.stack).toEqual(err.stack);
  });

  it("should return default message if no error is passed", () => {
    let apiError = new ApiError(undefined, STATUS_CODE);
    expect(apiError.message).toEqual(UNKNOWN_ERROR);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - Brute force to test the default message
    err.message = null;
    apiError = new ApiError(err, STATUS_CODE, ERR_MSG);
    expect(apiError.message).toEqual(ERR_MSG);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - Brute force properties to test the default message
    err.message = undefined;
    apiError = new ApiError(err, STATUS_CODE);
    expect(apiError.message).toEqual(UNKNOWN_ERROR);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - Use wrong type to test the default message
    apiError = new ApiError("Test", STATUS_CODE);
    expect(apiError.message).toEqual(UNKNOWN_ERROR);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - Use wrong type to test the default message
    apiError = new ApiError(123, STATUS_CODE, ERR_MSG);
    expect(apiError.message).toEqual(ERR_MSG);
  });
});
