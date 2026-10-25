
import { test, expect } from "@playwright/test";

test("home page loads successfully", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Create Next App|Lab 30/);
});

test("registration page displays the form", async ({ page }) => {
  await page.goto("/register");

  await expect(
    page.getByRole("heading", { name: "User Registration" })
  ).toBeVisible();

  await expect(
    page.getByRole("button", { name: "Register" })
  ).toBeVisible();
});

test("task page displays the add-task form", async ({ page }) => {
  await page.goto("/tasks/add");

  await expect(
    page.getByRole("heading", { name: "Add Task" })
  ).toBeVisible();

  await expect(
    page.getByRole("button", { name: "Add Task" })
  ).toBeVisible();
});
