import { User, UserRole } from "@prisma/client";
import { connectToDB as db } from "@utils/db";

import { createBlackListedTokenByEmail } from "./blacklistToken.repository";

export type TUser = Omit<User, "id" | "role" | "token" | "isVerified" | "createdAt" | "updatedAt">;

export const createUser = async (user: TUser): Promise<User> => {
  const client = await db();
  return client.user.create({
    data: {
      ...user,
      isVerified: false,
      role: UserRole.USER,
    },
  });
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const client = await db();
  return client.user.findUnique({
    where: {
      email,
    },
  });
};

export const addUserToken = async (id: number, token: string): Promise<boolean> => {
  const client = await db();
  await client.user.update({
    where: {
      id,
    },
    data: {
      token,
    },
  });
  return true;
};

export const resetUserToken = async (email: string): Promise<boolean> => {
  const client = await db();
  await client.user.update({
    where: {
      email,
    },
    data: {
      token: null,
    },
  });

  await createBlackListedTokenByEmail(email);
  return true;
};
