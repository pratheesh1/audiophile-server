import { createServer } from "./createServer";

describe("createServer function", () => {
  it("should return an express app", async () => {
    const app = await createServer(Object.freeze({ staticDirs: [], rootDir: "" }));
    expect(app).toBeDefined();
    expect(typeof app).toEqual("function");
  });

  it("should use the correct middleware", async () => {
    const app = createServer(Object.freeze({ staticDirs: [], rootDir: "" }));
    const usedMiddlewares = [
      "query",
      "expressInit",
      "compression",
      "jsonParser",
      "urlencodedParser",
      "cookieParser",
      "bound ",
      "logRequest",
      "handleError",
    ];
    const appMiddlewares = (await app)._router.stack.map(middleware => middleware.name);
    expect(appMiddlewares).toEqual(expect.arrayContaining(usedMiddlewares));
  });
});
