import * as z from "zod";
import { animalTypes } from "../types/type";

export const hoursRequiredSchema = z.coerce
  .number()
  .int()
  .min(2, "The minimum is 2 hours")
  .max(8, "The maximum is 8 hours");

const hoursSchema = z
  .number()
  .int()
  .min(2, "The minimum is 2 hours")
  .max(8, "The maximum is 8 hours");

export const animalTypeSchema = z.enum(animalTypes, {
  error: "Animal type must be dog, cat, or pig",
});

export const bookingSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name required")
    .max(25, "First name must be 25 characters or less"),
  lastName: z
    .string()
    .min(1, "Last name required")
    .max(25, "Last name must be 25 characters or less"),
  petName: z
    .string()
    .min(1, "Pet name required")
    .max(13, "Pet name must be 13 characters or less"),
  petType: animalTypeSchema,
  hoursRequired: hoursSchema,
  dateOfService: z.string().min(1, "Date of service is required"),
});

export type BookingInput = z.infer<typeof bookingSchema>;
export type Booking = BookingInput & {
  id: string;
  totalPrice: number;
  createdAt: string;
};

export type BookingResponse = { data: Booking[] };

export const quoteRequestSchema = z.object({
  animalType: animalTypeSchema,
  hours: hoursRequiredSchema,
});

export type QuoteRequest = z.infer<typeof quoteRequestSchema>;
