import { createServer } from "./createServer";

describe("createServer function", () => {
  it("should return an express app", () => {
    const app = createServer(Object.freeze({ staticDirs: [], rootDir: "" }));
    expect(app).toBeDefined();

    //TODO: add more tests
  });
});
