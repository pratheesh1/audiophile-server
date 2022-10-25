import ApiError from "./apiError";

describe("Test ApiError class", () => {
  const ERR_MSG = "Error message";
  const STATUS_CODE = 500;
  const apiError = new ApiError(ERR_MSG, STATUS_CODE);

  it("should return the correct message", () => {
    expect(apiError.message).toEqual(ERR_MSG);
  });

  it("should return the correct http status code", () => {
    expect(apiError.httpStatusCode).toEqual(STATUS_CODE);
  });
});
