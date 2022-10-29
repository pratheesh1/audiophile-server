import { connectToDB, disconnectFromDB } from "../src/utils/db";
import { logger } from "../src/utils/logger";
import { seederDownFunctions, seederUpFunctions, seedsCount } from "./seed/";

async function seed() {
  if (seedsCount !== seederUpFunctions.length) {
    logger.error(
      `${seedsCount} seed files found, but ${seederUpFunctions.length} seed functions defined.`
    );
    logger.warn("Press Ctrl+C to exit. Continuing in 5 seconds...");
    await new Promise(resolve => setTimeout(resolve, 5000));
  }

  try {
    const dbConnection = await connectToDB();

    for (const seedFunction of seederDownFunctions) {
      await seedFunction(dbConnection);
    }

    let SEED_COUNT = 0;
    for (const seederFunction of seederUpFunctions) {
      logger.info(`[SEED#${SEED_COUNT}] Running ${seederFunction.name}`);
      await seederFunction(dbConnection);
      logger.info(`[SEED#${SEED_COUNT++}] Completed ${seederFunction.name}`);
    }

    await disconnectFromDB(dbConnection);
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
}

seed();
