import { BlackListedToken } from "@prisma/client";
import { connectToDB as db } from "@utils/db";

export type TBlackListedToken = Omit<BlackListedToken, "id" | "createdAt" | "updatedAt">;

export const createBlackListedToken = async (
  token: TBlackListedToken
): Promise<BlackListedToken> => {
  const client = await db();
  return client.blackListedToken.create({
    data: {
      ...token,
    },
  });
};

export const createBlackListedTokenByEmail = async (
  email: string
): Promise<BlackListedToken | null> => {
  const client = await db();
  const user = await client.user.findUnique({
    where: {
      email,
    },
  });

  if (user?.token) {
    return createBlackListedToken({
      userId: user.id,
      token: user.token,
    });
  }
  return null;
};
