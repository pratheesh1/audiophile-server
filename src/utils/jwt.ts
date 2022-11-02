import { IJwtUserPayload } from "@modules/user/user.model";
import jwt, { Algorithm, Secret, SignOptions, VerifyOptions } from "jsonwebtoken";

const GENERATE_OPTIONS = Object.freeze({ algorithm: "HS256", expiresIn: "1h" });
export const generateToken = (
  payload: string | Buffer | object,
  token: Secret,
  options?: SignOptions
): string => {
  const signOptions: SignOptions = options ? { ...options, ...GENERATE_OPTIONS } : GENERATE_OPTIONS;
  return jwt.sign(payload, token, signOptions);
};

const VERIFY_OPTIONS = Object.freeze({ algorithms: ["HS256"] as Algorithm[] });
export const verifyToken = (
  token: string,
  secret: Secret,
  options?: VerifyOptions
): string | IJwtUserPayload | undefined => {
  const verifyOptions: VerifyOptions = options ? { ...options, ...VERIFY_OPTIONS } : VERIFY_OPTIONS;
  return jwt.verify(token, secret, verifyOptions) as string | IJwtUserPayload | undefined;
};
