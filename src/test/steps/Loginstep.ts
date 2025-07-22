// src/test/steps/Loginstep.ts
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { pageFixture } from "../../hooks/pageFixtures";
import LoginPage from "../../page/loginPage"; 

let loginPage: LoginPage;

Given('the user is on the login page', async function () {
  if (!pageFixture.page) throw new Error("Page is not initialized");
  await pageFixture.page.goto('https://demo.smart-hospital.in/site/login#');
  loginPage = new LoginPage(pageFixture.page);
  console.log("Navigated to login page");
});

When('the user selects the role {string}', async function (role: string) {
  await loginPage.selectRole(role);
});

When('the user clicks the Sign In button', async function () {
  await loginPage.clickSignIn();
});

Then('the user should see the dashboard page', async function () {
  const visible = await loginPage.isDashboardVisible();
  expect(visible).toBeTruthy();
});

When('User leaves the {string} field empty', async function (field: string) {
  await pageFixture.page?.waitForLoadState('domcontentloaded');

  if (field === 'username') {
    await loginPage.clearUsername();
  } else if (field === 'password') {
    await loginPage.clearPassword();
  } else if (field === 'both') {
    await loginPage.clearBothFields();
  } else {
    throw new Error(`Unknown field "${field}" provided`);
  }
});

Then('User should see an error message', async function () {
  const errorMsg = await loginPage.getErrorMessage();
  console.log("Error shown:", errorMsg);
  expect(errorMsg).toMatch(/Username field is required|Password field is required/);
});
