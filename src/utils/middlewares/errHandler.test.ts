import ApiError from "../error/apiError";
import * as middlewares from "./errHandler";

describe("middleware", () => {
  const next = jest.fn();
  const testErr = new Error("test error");

  describe("syncBindApiErrCode middleware", () => {
    it("should call next with ApiError if middleware throws error", () => {
      const middleware = jest.fn(() => {
        throw testErr;
      });
      const boundMiddleware = middlewares.syncBindApiErrCode(middleware, 500);
      boundMiddleware(null, null, next);

      expect(next).toHaveBeenCalledWith(new ApiError(testErr, 500));
    });

    it("should not be called if middleware does not throw error", () => {
      const middleware = jest.fn();
      const boundMiddleware = middlewares.syncBindApiErrCode(middleware, 500);
      boundMiddleware(null, null, next);

      expect(next).not.toHaveBeenCalled();
    });
  });

  describe("asyncBindApiErrCode middleware", () => {
    it("should call next with ApiError if an async middleware throws error", async () => {
      const middleware = jest.fn(async () => {
        throw testErr;
      });
      const boundMiddleware = middlewares.asyncBindApiErrCode(middleware, 800);
      await boundMiddleware(null, null, next);

      expect(next).toHaveBeenCalledWith(new ApiError(testErr, 800));
    });

    it("should call next with ApiError if an async middleware rejects", async () => {
      const middleware = jest.fn(async () => {
        return Promise.reject(testErr);
      });
      const boundMiddleware = middlewares.asyncBindApiErrCode(middleware, 800);
      await boundMiddleware(null, null, next);

      expect(next).toHaveBeenCalledWith(new ApiError(testErr, 800));
    });

    it("should not be called if an async middleware resolves", async () => {
      const middleware = jest.fn(async () => {
        return Promise.resolve();
      });
      const boundMiddleware = middlewares.asyncBindApiErrCode(middleware, 800);
      await boundMiddleware(null, null, next);

      expect(next).not.toHaveBeenCalled();
    });
  });
});
