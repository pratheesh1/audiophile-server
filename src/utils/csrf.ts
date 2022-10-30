import csrf from "csrf";

const tokens = new csrf();
Object.freeze(tokens);

export async function generateToken(): Promise<{ token: string; secret: string }> {
  const secret = await tokens.secret();
  const token = tokens.create(secret);
  return { token, secret };
}

export function verifyToken(secret: string, token: string): boolean {
  return tokens.verify(secret, token);
}
