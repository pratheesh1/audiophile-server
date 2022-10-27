import { PrismaClient } from "@prisma/client";
import { PrismaClientOptions } from "@prisma/client/runtime";
import { isDevEnv } from "@utils/config";
import { logger } from "@utils/logger";

export type TConnection = Awaited<ReturnType<typeof connectToDB>>;
export async function connectToDB(): Promise<PrismaClient> {
  const prismaDevOptions: Pick<PrismaClientOptions, "log"> = {
    log: [
      {
        emit: "event",
        level: "query",
      },
      {
        emit: "stdout",
        level: "error",
      },
      {
        emit: "stdout",
        level: "info",
      },
      {
        emit: "stdout",
        level: "warn",
      },
    ],
  };
  const prismaProdOptions = {} as PrismaClientOptions;
  const prisma = new PrismaClient(isDevEnv ? prismaDevOptions : prismaProdOptions);

  await prisma.$connect();
  logger.info("Connected to database");

  isDevEnv &&
    // Error: Argument of type '"query"' is not assignable to parameter of type '"beforeExit"'.ts(2345)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - This is an bug in type definitions provided by Prisma
    prisma.$on("query", e => {
      logger.info(`[PRISMA] ${JSON.stringify(e)}`);
    });

  return prisma;
}

export async function disconnectFromDB(connection: PrismaClient): Promise<void> {
  return connection.$disconnect();
}
