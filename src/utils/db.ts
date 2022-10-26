import { PrismaClient } from "@prisma/client";
import { logger } from "@utils/logger";

export async function connectToDB(): Promise<PrismaClient> {
  try {
    const prisma = new PrismaClient();
    await prisma.$connect();
    logger.info("Connected to database");
    return prisma;
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
}

export async function disconnectFromDB(connection: PrismaClient): Promise<void> {
  return connection.$disconnect();
}
