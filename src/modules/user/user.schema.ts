import { customErrorMap } from "@utils/zodConfig";
import { z, ZodIssueCode } from "zod";

import { IJwtUserPayload } from "./user.model";
import { TUser } from "./user.repository";

z.setErrorMap(customErrorMap);

function transformAndTestPassword(pwd: string): string {
  const passRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
  const password = pwd.trim();
  if (!passRegex.test(password)) {
    const customZodIssue: z.ZodIssue = {
      code: ZodIssueCode.custom,
      path: ["password"],
      message: "Password must contain at least one number and one special character",
    };
    throw new z.ZodError([customZodIssue]);
  }
  return password;
}

export const createUserRequestSchema: z.ZodType<TUser> = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(8)
      .max(16)
      .transform(value => transformAndTestPassword(value)),
    firstName: z.string().min(2),
    middleName: z.string().min(2).nullable(),
    lastName: z.string().min(2),
    imageUri: z.string().url().nullable(),
    // TODO: Better phone number validation
    phone: z.string().min(10).max(10),
  })
  .strict();

export const loginUserRequestSchema: z.ZodType<{ email: string; password: string }> = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(16),
});

export const logoutUserRequestSchema: z.ZodType<{ email: string; refreshToken?: string | null }> = z
  .object({
    email: z.string().email(),
    refreshToken: z.string().optional().nullable(),
  })
  .strict();

export const jwtPayloadSchema: z.ZodType<IJwtUserPayload | { iat: number; exp: number }> = z
  .object({
    name: z.string(),
    email: z.string().email(),
    iat: z.number(),
    exp: z.number(),
  })
  .strict();
