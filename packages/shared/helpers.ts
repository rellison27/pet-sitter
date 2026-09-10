import * as z from "zod";

export function formatError(error: z.ZodError) {
  const { fieldErrors } = z.flattenError(error);
  return Object.values(fieldErrors).flat().join(", ");
}
