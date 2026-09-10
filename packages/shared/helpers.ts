import * as z from "zod";

export function formatError(error: z.ZodError) {
  const { fieldErrors } = z.flattenError(error);
  return Object.values(fieldErrors).flat().join(", ");
}

export function getToday() {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
