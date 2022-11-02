import { customErrorMap } from "@utils/zodConfig";
import { z } from "zod";

z.setErrorMap(customErrorMap);

export const findCountriesByCodeRequestSchema: z.ZodType<string[]> = z
  .array(z.string())
  .min(1)
  .max(9);
