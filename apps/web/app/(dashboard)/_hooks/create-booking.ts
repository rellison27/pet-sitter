import { useMutation } from "@tanstack/react-query";
import type { Booking, BookingInput } from "@pet-sitting/shared";

export function useCreateBooking() {
  return useMutation({
    mutationFn: async (booking: BookingInput): Promise<Booking> => {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(booking),
      });

      if (!response.ok) {
        throw new Error("failed to fetch quote");
      }

      return response.json();
    },
  });
}
