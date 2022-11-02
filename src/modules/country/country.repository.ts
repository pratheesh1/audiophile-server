import { Country } from "@prisma/client";
import { connectToDB as db } from "@utils/db";

export type TCountry = Pick<Country, "name" | "code">;
export const getAllCountries = async (): Promise<TCountry[]> => {
  const client = await db();
  return client.country.findMany({
    select: {
      name: true,
      code: true,
    },
  });
};

export const getCountriesByCode = async (codes: string[]): Promise<TCountry[]> => {
  const client = await db();
  return client.country.findMany({
    where: {
      code: {
        in: codes,
      },
    },
    select: {
      name: true,
      code: true,
    },
  });
};
