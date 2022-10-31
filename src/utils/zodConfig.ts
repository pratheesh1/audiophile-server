import { z } from "zod";

export const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  if (issue.code === z.ZodIssueCode.invalid_type) {
    return {
      message: `Invalid type! Expected ${issue.expected} but received ${issue.received}`,
    };
  }
  if (issue.code === z.ZodIssueCode.too_small) {
    return {
      message: `Too small! Expected minimum length ${issue.minimum}!`,
    };
  }
  if (issue.code === z.ZodIssueCode.too_big) {
    return {
      message: `Too big! Expected maximum length ${issue.maximum}!`,
    };
  }
  if (issue.code === z.ZodIssueCode.custom) {
    return { message: `less-than-${(issue.params || {}).minimum}` };
  }
  return { message: ctx.defaultError };
};
