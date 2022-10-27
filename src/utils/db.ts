import { PrismaClient } from "@prisma/client";
import { PrismaClientOptions } from "@prisma/client/runtime";
import { isDevEnv } from "@utils/config";
import { logger } from "@utils/logger";

export type TConnection = Awaited<ReturnType<typeof connectToDB>>;
export async function connectToDB(): Promise<PrismaClient> {
  try {
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
      // @ts-expect-error - This is an bug in type definitions provided by Prisma
      // Error: Argument of type '"query"' is not assignable to parameter of type '"beforeExit"'.ts(2345)
      prisma.$on("query", e => {
        logger.info(`[PRISMA] ${JSON.stringify(e)}`);
      });

    return prisma;
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
}

export async function disconnectFromDB(connection: PrismaClient): Promise<void> {
  return connection.$disconnect();
}
