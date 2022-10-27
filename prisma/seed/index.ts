import { TConnection } from "../../src/utils/db";
import { seedCountriesData } from "./countries";

export type TSeederFunction = (dbConnection: TConnection) => Promise<void>;

const seederFunctions: TSeederFunction[] = [seedCountriesData];
export default seederFunctions;
