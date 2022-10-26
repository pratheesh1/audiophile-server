import { createServer } from "./createServer";

describe("createServer function", () => {
  it("should return an express app", () => {
    const app = createServer();
    expect(app).toBeDefined();

    //TODO: add more tests
  });
});
