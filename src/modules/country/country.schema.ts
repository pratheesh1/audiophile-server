import type { Country } from "@prisma/client";
import { customErrorMap } from "@utils/zodConfig";
import { z } from "zod";

z.setErrorMap(customErrorMap);
export const findUniqueCountryRequestSchema: z.ZodType<Pick<Country, "code">> = z
  .object({
    code: z.string().min(2).max(2),
  })
  .strict();
