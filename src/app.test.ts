import { createServer } from "@utils/createServer";
import request from "supertest";

describe("GET /", () => {
  it("should return 200 OK", () => {
    const app = createServer();
    return request(app).get("/").expect(404);
  });
});
