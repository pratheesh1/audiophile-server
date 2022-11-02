import crypto from "bcrypt";

const SALT_ROUNDS = 10;

export const hashPassword = async (password: string): Promise<string> => {
  return await crypto.hash(password, SALT_ROUNDS);
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return await crypto.compare(password, hash);
};
