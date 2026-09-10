import { test, expect } from "@playwright/test";

test("customer can submit a booking", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel("First name").fill("Fred");
  await page.getByLabel("Last name").fill("Flintstone");
  await page.getByLabel("Pet name").fill("Dino");

  await page.getByLabel("Hours needed").click();
  await page.getByRole("option", { name: "4" }).click();

  await expect(page.getByText("$60", { exact: true })).toBeVisible();

  await page.getByLabel("Date of service").fill("2026-09-15");

  await page.getByRole("button", { name: /get quote/i }).click();

  await expect(page.getByText(/booking created/i)).toBeVisible();
});

test("shows validation errors when required fields are empty", async ({
  page,
}) => {
  await page.goto("/");

  await page.getByRole("button", { name: /get quote/i }).click();

  await expect(page.getByText(/first name required/i)).toBeVisible();
  await expect(page.getByText(/last name required/i)).toBeVisible();
  await expect(page.getByText(/pet name required/i)).toBeVisible();
  await expect(page.getByText(/date of service is required/i)).toBeVisible();
});
