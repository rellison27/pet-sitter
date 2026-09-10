import { NextRequest, NextResponse } from "next/server";
import {
  quoteRequestSchema,
  calculatePrice,
  formatError,
} from "@pet-sitting/shared";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const result = quoteRequestSchema.safeParse({
    animalType: searchParams.get("animalType"),
    hours: searchParams.get("hours"),
  });

  if (!result.success) {
    return NextResponse.json(
      {
        error: "Invalid quote request",
        details: formatError(result.error),
      },
      { status: 400 },
    );
  }

  const quote = calculatePrice(result.data.animalType, result.data.hours);
  return NextResponse.json(quote);
}
