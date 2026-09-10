"use client";

import { useGetBooking } from "../_hooks/get-booking";
import BookingTable from "./_components/booking-table";

export default function AdminPage() {
  const { data: bookings, isFetching } = useGetBooking();

  if (isFetching) {
    return (
      <p className="flex justify-center items-center h-1/2 text-xl">
        Loading bookings...
      </p>
    );
  }

  if (!bookings || bookings.data.length === 0) {
    return (
      <p className="p-6 flex justify-center h-1/2 items-center text-xl">
        There are no bookings available yet.
      </p>
    );
  }

  return <BookingTable bookings={bookings.data} />;
}
