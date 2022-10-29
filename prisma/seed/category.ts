import { logger } from "../../src/utils/logger";
import { Category } from "../generated_models/models/";
import { TSeederFunction } from "./index";

type TCategory = Pick<Category, "name">;
const categories: TCategory[] = [
  { name: "Headphones" },
  { name: "Earphones" },
  { name: "Boomboxes" },
  { name: "Music Players" },
  { name: "Speakers" },
  { name: "Microphones" },
  { name: "Cables" },
  { name: "Accessories" },
  { name: "Amplifiers" },
  { name: "Mixers" },
  { name: "Other" },
];

export const seedCategoriesDataUp: TSeederFunction = async dbConnection => {
  const transaction = await dbConnection.$transaction([
    ...categories.map(category =>
      dbConnection.category.create({
        data: {
          name: category.name,
        },
      })
    ),
  ]);

  logger.info(`Seeded ${transaction.length} categories`);
};

export const seedCategoriesDataDown: TSeederFunction = async dbConnection => {
  const transaction = await dbConnection.$transaction([dbConnection.category.deleteMany()]);

  logger.info(`Deleted ${transaction.length} categories`);
};
