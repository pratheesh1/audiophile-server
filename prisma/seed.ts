import { connectToDB, disconnectFromDB } from "../src/utils/db";
import { logger } from "../src/utils/logger";
import { seederFunctions, seedsCount } from "./seed/";

async function seed() {
  if (seedsCount !== seederFunctions.length) {
    logger.error(
      `${seedsCount} seed files found, but ${seederFunctions.length} seed functions defined.`
    );
    logger.warn("Press Ctrl+C to exit. Continuing in 5 seconds...");
    await new Promise(resolve => setTimeout(resolve, 5000));
  }

  try {
    const dbConnection = await connectToDB();

    let SEED_COUNT = 1;
    for (const seederFunction of seederFunctions) {
      console.info(`[SEED#${SEED_COUNT}] Running ${seederFunction.name}`);
      await seederFunction(dbConnection);
      console.info(`[SEED#${SEED_COUNT++}] Completed ${seederFunction.name}`);
    }
    await disconnectFromDB(dbConnection);
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
}

seed();
