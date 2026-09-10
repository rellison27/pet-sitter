export const animalTypes = ["dog", "cat", "pig"] as const;
export type AnimalType = (typeof animalTypes)[number];

export type QuoteResponse = {
  basePrice: number;
  hourlyRate: number;
  hours: number;
  totalPrice: number;
};
