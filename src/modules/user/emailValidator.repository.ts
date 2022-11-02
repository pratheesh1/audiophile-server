import { EmailValidationToken } from "@prisma/client";
import { connectToDB as db } from "@utils/db";

export const createEmailValidationToken = async (
  userId: number,
  token: string
): Promise<EmailValidationToken> => {
  const client = await db();
  return client.emailValidationToken.create({
    data: {
      userId,
      token,
    },
  });
};
