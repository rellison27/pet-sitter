import { BookingInput, bookingSchema, formatError } from "@pet-sitting/shared";
import { useForm } from "@tanstack/react-form";
import { useCreateBooking } from "./create-booking";
import { toast } from "@/components/ui/toast";
import { title } from "process";

export function useBookingForm() {
  const createBooking = useCreateBooking();

  const defaultValues: BookingInput = {
    firstName: "",
    lastName: "",
    petName: "",
    petType: "dog" as const,
    hoursRequired: 2,
    dateOfService: "",
  };

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: bookingSchema,
    },

    onSubmit: async ({ value }) => {
      const result = bookingSchema.safeParse(value);
      if (!result.success) {
        toast.add({ title: "Unable to create booking" });
      }

      // make API call
      await createBooking.mutateAsync(value);
      toast.add({ title: "Booking created!" });
      form.reset();
    },
  });

  return form;
}

export type BookingFormApi = ReturnType<typeof useBookingForm>;
