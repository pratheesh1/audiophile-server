import { connectToDB, disconnectFromDB } from "../src/utils/db";
import seederFunctions from "./seed/";

async function seed() {
  const dbConnection = await connectToDB();
  try {
    let SEED_COUNT = 1;
    for (const seederFunction of seederFunctions) {
      console.info(`[SEED#${SEED_COUNT}] Running ${seederFunction.name}`);
      await seederFunction(dbConnection);
      console.info(`[SEED#${SEED_COUNT++}] Completed ${seederFunction.name}`);
    }
    await disconnectFromDB(dbConnection);
  } catch (error) {
    console.error(error);
    await disconnectFromDB(dbConnection);
    process.exit(1);
  }
}

seed();
