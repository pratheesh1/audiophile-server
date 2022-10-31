import type { Country } from "@prisma/client";
import { z } from "zod";

export const findUniqueCountryRequestSchema: z.ZodType<Pick<Country, "code">> = z
  .object({
    code: z.string().min(2).max(2),
  })
  .strict();
