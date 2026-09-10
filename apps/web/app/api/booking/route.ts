import { NextRequest, NextResponse } from "next/server";
import {
  calculatePrice,
  formatError,
  bookingSchema,
  Booking,
} from "@pet-sitting/shared";
import { bookings } from "@/lib/bookings-store";

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const result = bookingSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      {
        error: "Invalid booking request",
        details: formatError(result.error),
      },
      { status: 400 },
    );
  }

  const input = result.data;
  const quote = calculatePrice(input.petType, input.hoursRequired);

  const booking: Booking = {
    ...input,
    id: crypto.randomUUID(),
    totalPrice: quote.totalPrice,
    createdAt: new Date().toISOString(),
  };

  bookings.push(booking);

  return NextResponse.json(booking, { status: 201 });
}

// Request param is not in use
// but I think it'd
// be nice to add filters
export async function GET(request: NextRequest) {
  return NextResponse.json({ data: bookings });
}
