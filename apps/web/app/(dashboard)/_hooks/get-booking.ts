import { Booking, BookingResponse } from "@pet-sitting/shared";
import { useQuery } from "@tanstack/react-query";

export function useGetBooking() {
  return useQuery({
    queryKey: ["booking"],
    queryFn: async (): Promise<BookingResponse> => {
      const response = await fetch(`api/booking`);

      if (!response.ok) {
        throw new Error("failed to fetch quote");
      }

      return response.json();
    },
  });
}
