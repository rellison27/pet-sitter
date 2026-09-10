import { useQuery } from "@tanstack/react-query";
import type { AnimalType, QuoteResponse } from "@pet-sitting/shared";

export function usePricing(animalType?: AnimalType, hours?: number) {
  return useQuery({
    queryKey: ["pricing", animalType, hours],
    queryFn: async (): Promise<QuoteResponse> => {
      const response = await fetch(
        `/api/pricing?animalType=${animalType}&hours=${hours}`,
      );

      if (!response.ok) {
        throw new Error("failed to fetch quote");
      }

      return response.json();
    },
    enabled: !!animalType && hours !== undefined,
  });
}
