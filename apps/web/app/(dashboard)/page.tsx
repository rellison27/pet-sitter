"use client";
import BookingForm from "./_components/booking-form";
import { usePricing } from "./_hooks/pricing";
import { useSelector } from "@tanstack/react-form";
import { useBookingForm } from "./_hooks/booking-form";
import QuoteReport from "./_components/quote-report";

export default function Home() {
  const form = useBookingForm();
  const petType = useSelector(form.store, (state) => state.values.petType);
  const hours = useSelector(form.store, (state) => state.values.hoursRequired);

  const { data: quote, isFetching } = usePricing(petType, hours);

  return (
    <main className="grid gap-4 lg:grid-cols-3 md:grid-cols-1 items-center py-10 px-10 sm:items-start">
      <div className="md:col-span-2 col-span-3">
        <BookingForm form={form} />
      </div>
      <div className="col-span-3 md:col-span-1">
        <QuoteReport quote={quote} />
      </div>
    </main>
  );
}
