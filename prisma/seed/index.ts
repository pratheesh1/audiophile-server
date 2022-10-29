import { TConnection } from "../../src/utils/db";
import { countFiles } from "../../src/utils/fs";
// import { seedCategoriesData } from "./category";
import { seedCountriesData } from "./countries";

export type TSeederFunction = (dbConnection: TConnection) => Promise<void>;

export const seedsCount = countFiles(__dirname) - 1; // minus index.ts
export const seederFunctions: readonly TSeederFunction[] = [seedCountriesData] as const;
