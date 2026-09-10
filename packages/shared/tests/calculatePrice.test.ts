import { expect, test, describe } from "vitest";
import { calculatePrice } from "../pricing/calculatePrice";

describe("calculatePrice", () => {
  test("pet sitting a pig for two hours should be 60", () => {
    const sut = calculatePrice("pig", 2);
    const expectedValue = {
      basePrice: 20,
      hourlyRate: 20,
      hours: 2,
      totalPrice: 60,
    };
    expect(sut).toEqual(expectedValue);
  });

  test("pet sitting a dog for six hours should be 80", () => {
    const sut = calculatePrice("dog", 6);
    const expectedValue = {
      basePrice: 20,
      hourlyRate: 10,
      hours: 6,
      totalPrice: 80,
    };
    expect(sut).toEqual(expectedValue);
  });

  test("pet sitting a cat for eight hours should be 60", () => {
    const sut = calculatePrice("cat", 8);
    const expectedValue = {
      basePrice: 20,
      hourlyRate: 5,
      hours: 8,
      totalPrice: 60,
    };
    expect(sut).toEqual(expectedValue);
  });
});
