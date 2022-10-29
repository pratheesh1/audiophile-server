import { TConnection } from "../../src/utils/db";
import { countFiles } from "../../src/utils/fs";
import { seedCategoriesDataDown, seedCategoriesDataUp } from "./category";
import { seedCountriesDataDown, seedCountriesDataUp } from "./countries";

export type TSeederFunction = (dbConnection: TConnection) => Promise<void>;

export const seedsCount = countFiles(__dirname) - 1; // index.ts

export const seederUpFunctions: readonly TSeederFunction[] = [
  seedCategoriesDataUp,
  seedCountriesDataUp,
] as const;

export const seederDownFunctions: readonly TSeederFunction[] = [
  seedCategoriesDataDown,
  seedCountriesDataDown,
] as const;
