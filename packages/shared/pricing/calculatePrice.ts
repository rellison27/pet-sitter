import { AnimalType } from "../types/type";

export const BASE_PRICE = 20;
export type HourlyRate = Record<AnimalType, number>;
export const HOURLY_RATES: HourlyRate = {
  pig: 20,
  dog: 10,
  cat: 5,
};

export type LiveQuote = {
  basePrice: number;
  hourlyRate: HourlyRate;
  hours: number;
  totalPrice: number;
};

export function calculatePrice(animalType: AnimalType, hours: number) {
  const hourlyRate = HOURLY_RATES[animalType];

  return {
    basePrice: BASE_PRICE,
    hourlyRate,
    hours,
    totalPrice: BASE_PRICE + hourlyRate * Number(hours),
  };
}
