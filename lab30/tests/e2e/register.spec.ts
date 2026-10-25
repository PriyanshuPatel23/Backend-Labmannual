
import { test, expect } from "@playwright/test";

test("register a new user successfully", async ({ page }) => {
  await page.goto("/register");

  // Generate a unique email for every test run
  const email = `student-${Date.now()}@example.com`;

  // Fill in the registration form
  await page.getByPlaceholder("Username").fill("StudentTest");
  await page.getByPlaceholder("Email").fill(email);
  await page.getByPlaceholder("Password").fill("Student@123");

  // Submit the form
  await page.getByRole("button", { name: "Register" }).click();

  // Verify the success message
  await expect(page.getByRole("status"))
    .toHaveText("Registration successful!");

  // Verify that the form is reset
  await expect(page.getByPlaceholder("Username"))
    .toHaveValue("");
});
