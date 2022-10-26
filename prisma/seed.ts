import { PrismaClient } from "@prisma/client";

import countries from "./seed/countries";

const prisma = new PrismaClient();
const seederFunctions = [seedCountriesData];

async function main() {
  try {
    let COUNT = 1;
    for (const seederFunction of seederFunctions) {
      console.info(`[SEED#${COUNT}] Running ${seederFunction.name}`);
      await seederFunction();
      console.info(`[SEED#${COUNT++}] Completed ${seederFunction.name}`);
    }
    await prisma.$disconnect();
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

main();

// ------------- Seed functions ------------- //
async function seedCountriesData() {
  for (const country of countries) {
    const { name, code } = country;
    await prisma.country.create({
      data: {
        name,
        code,
      },
    });
  }
}
