import { test, expect } from "@playwright/test";

test("admin can view submitted bookings", async ({ page, request }) => {
  const response = await request.post("/api/booking", {
    data: {
      firstName: "Wilma",
      lastName: "Flintstone",
      petName: "Dino",
      petType: "cat",
      hoursRequired: 4,
      dateOfService: "2026-09-15",
    },
  });

  expect(response.status()).toBe(201);

  await page.goto("/admin");

  await expect(page.getByText("Wilma Flintstone").first()).toBeVisible();
  await expect(page.getByText("Dino").first()).toBeVisible();
  await expect(page.getByText("cat", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("$40", { exact: true }).first()).toBeVisible();
});
