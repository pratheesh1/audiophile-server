import { connectToDB, disconnectFromDB } from "../src/utils/db";
import { logger } from "../src/utils/logger";
import seederFunctions from "./seed/";

async function seed() {
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
