import { z } from "zod";

export const findUniqueCountryRequestSchema = z
  .object({
    code: z.string().min(2).max(2),
  })
  .strict();
