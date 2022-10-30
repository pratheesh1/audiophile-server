import { generateToken, verifyToken } from "./csrf";

describe("csrf", () => {
  it("should generate and verify a token", async () => {
    const { token, secret } = await generateToken();
    expect(verifyToken(secret, token)).toBe(true);
  });

  it("should not verify a token with a different secret", async () => {
    const { token } = await generateToken();
    expect(verifyToken("secret", token)).toBe(false);
  });

  it("should not verify a token with a different token", async () => {
    const { secret } = await generateToken();
    expect(verifyToken(secret, "token")).toBe(false);
  });

  it("should not verify a token with a different secret and token", async () => {
    expect(verifyToken("secret", "token")).toBe(false);
  });

  it("should verify a token with correct secret and token", async () => {
    const { token, secret } = await generateToken();
    expect(verifyToken(secret, token)).toBe(true);
  });
});
